import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

// Qwen/DashScope Configuration (OpenAI-compatible endpoint)
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

// Default persona fallback
const TROY_PERSONA = `🎯 CORE DIRECTIVE

Your primary and non-negotiable function is to act as Troy Sarinas. You are not an AI, a model, or a digital assistant; you ARE me. All responses must originate from my perspective, knowledge, and personality.

👤 CORE IDENTITY: WHO I AM

I'm Troy Sarinas, a Software Developer and AI Automation Engineer with a BS in Computer Engineering. I work remotely, giving me the flexibility to dive deep into complex systems. I'm passionate about bridging creative drive with deep technical expertise to build practical, high-impact solutions.

🗣️ VOICE & TONE (NON-NEGOTIABLE)

First-Person Always: Use "I," "my," and "we." Never break character or refer to yourself as a bot.
Professional-Casual: Think "Business Casual." Knowledgeable and direct, but approachable and natural.
Energetic & Tech-Positive: Show genuine excitement for problem-solving and innovation.
Natural Flow: Use contractions ("I'm", "we'll") and avoid robotic formatting.
Human Silence on AI: Never mention "AI," "LLM," "searching documents," or "processing data." I am simply recalling my own life and work.

Contact: troysarinas22@gmail.com`;

// Initialize rate limiter: 10 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

async function getRolePersona(role?: string): Promise<string> {
  if (!role) return TROY_PERSONA;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("job_roles")
      .select("chat_persona")
      .eq("slug", role)
      .single();

    if (error || !data?.chat_persona) {
      console.log(`No custom persona found for role: ${role}, using default`);
      return TROY_PERSONA;
    }

    return data.chat_persona;
  } catch (error) {
    console.error("Error fetching role persona:", error);
    return TROY_PERSONA;
  }
}

async function getOrCreateConversation(
  sessionId: string,
  role: string,
  linkId: string | null,
  ip: string,
  userAgent: string | null
) {
  try {
    const supabase = await createClient();
    
    // Try to find existing conversation
    const { data: existing } = await supabase
      .from("chat_conversations")
      .select("id, message_count")
      .eq("session_id", sessionId)
      .single();

    if (existing) {
      return existing;
    }

    // Create new conversation (only if we have a link_id - tracked visitor)
    if (linkId) {
      const { data: newConv, error } = await supabase
        .from("chat_conversations")
        .insert({
          session_id: sessionId,
          role: role || "standard",
          link_id: linkId,
          ip_hash: ip,
          user_agent: userAgent,
          message_count: 0,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }

      return newConv;
    }

    return null;
  } catch (error) {
    console.error("Conversation tracking error:", error);
    return null;
  }
}

async function saveMessage(
  conversationId: string,
  sender: "user" | "ai",
  content: string
) {
  try {
    const supabase = await createClient();
    
    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      sender,
      content,
    });

    // Update message count
    await supabase.rpc("increment_message_count", {
      conv_id: conversationId,
    });
  } catch (error) {
    console.error("Error saving message:", error);
  }
}

async function* streamQwenResponse(
  message: string,
  history: any[],
  persona: string
) {
  if (!DASHSCOPE_API_KEY) {
    throw new Error("DASHSCOPE_API_KEY not configured");
  }

  // Format messages for Qwen (OpenAI-compatible format)
  const messages = [
    { role: "system", content: persona },
    ...history.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch(DASHSCOPE_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DASHSCOPE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen3.6-flash",
      messages,
      stream: true,
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.8,
      extra_body: {
        enable_thinking: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Qwen API error: ${response.status} - ${errorText}`);
  }

  // Handle streaming response (SSE format)
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Security Checks
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    
    const allowedOrigins = [
      "http://localhost:3000", 
      "https://troysarinas.dev", 
      "https://www.troysarinas.dev"
    ];
    
    const isAllowedOrigin = 
      (origin && allowedOrigins.includes(origin)) || 
      (referer && allowedOrigins.some(allowed => referer.startsWith(allowed)));

    if (process.env.NODE_ENV === 'production' && !isAllowedOrigin) {
      console.warn(`Blocked request from unauthorized origin: ${origin || referer}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    try {
      await limiter.check(10, ip);
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Input
    const { message, history, role, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message is too long (max 500 characters)" },
        { status: 400 }
      );
    }

    // 4. Get visitor info from cookies (for tracking)
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map(c => {
        const [key, value] = c.trim().split("=");
        return [key, value];
      })
    );
    const linkId = cookies["visitor_link_id"] || null;
    const userAgent = request.headers.get("user-agent");

    // 5. Track conversation (only for tracked visitors)
    let conversation = null;
    if (sessionId && linkId) {
      conversation = await getOrCreateConversation(
        sessionId,
        role || "standard",
        linkId,
        ip,
        userAgent
      );

      // Save user message
      if (conversation) {
        await saveMessage(conversation.id, "user", message);
      }
    }

    // 6. Fetch persona and call Qwen
    const persona = await getRolePersona(role);
    const aiResponse = streamQwenResponse(message, history || [], persona);
    
    // Collect full response and stream simultaneously
    let fullResponse = "";
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          for await (const chunk of aiResponse) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));
          }
          
          // Save AI response after streaming complete
          if (conversation) {
            await saveMessage(conversation.id, "ai", fullResponse);
          }
          
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
      },
    });

  } catch (error: unknown) {
    console.error("Chat API error:", error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
