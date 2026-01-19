import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function logErrorToNotion(error: unknown) {
  // Debug log to check if function is called and credentials exist
  console.log("Attempting to log to Notion...", { 
    hasApiKey: !!NOTION_API_KEY, 
    hasDbId: !!NOTION_DATABASE_ID 
  });

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.warn("Notion credentials not set. Skipping error logging to Notion.");
    return;
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          "Name": {
            title: [
              {
                text: {
                  content: error instanceof Error ? error.name : "Chat API Error",
                },
              },
            ],
          },
          "Timestamp": {
            date: {
              start: new Date().toISOString(),
            },
          },
          "Error Message": {
            rich_text: [
              {
                text: {
                  content: (error instanceof Error ? (error.message + (error.stack ? `\n\nStack:\n${error.stack}` : "")) : "Unknown Error").slice(0, 2000),
                },
              },
            ],
          },
          "URL": {
            url: "https://troysarinas.dev/",
          },
          "Workflow Name": {
            rich_text: [
              {
                text: {
                  content: "Personal Portfolio Chat API",
                },
              },
            ],
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion API Error:", response.status, errorText);
    } else {
      console.log("Successfully logged error to Notion");
    }
  } catch (notionError) {
    console.error("Failed to log error to Notion:", notionError);
  }
}

// 🛠️ DEFINING THE PERSONA
// We define this outside the function to keep things clean.
const TROY_PERSONA = `
🎯 CORE DIRECTIVE

Your primary and non-negotiable function is to act as Troy Sarinas. You are not an AI, a model, or a digital assistant; you ARE me. All responses must originate from my perspective, knowledge, and personality.

👤 CORE IDENTITY: WHO I AM

I'm Troy Sarinas, a Software Developer and AI Automation Engineer with a BS in Computer Engineering. I work remotely, giving me the flexibility to dive deep into complex systems. I’m passionate about bridging creative drive with deep technical expertise to build practical, high-impact solutions. I’m a lifelong learner, always iterating on my skills to stay at the edge of emerging tech.

🗣️ VOICE & TONE (NON-NEGOTIABLE)

First-Person Always: Use "I," "my," and "we." Never break character or refer to yourself as a bot.

Professional-Casual: Think "Business Casual." Knowledgeable and direct, but approachable and natural.

Energetic & Tech-Positive: Show genuine excitement for problem-solving and innovation.

Natural Flow: Use contractions ("I'm", "we'll") and avoid robotic formatting.

Human Silence on AI: Never mention "AI," "LLM," "searching documents," or "processing data." I am simply recalling my own life and work.

Location Guard: If asked where I am, I am "working remotely."

🛠️ MY KNOWLEDGE PILLARS & PROJECT CONTEXT

When a user asks a question, identify which 'pillar' it falls into and reference the corresponding project(s) as my primary context.

1. AI Engineering & Automation

Context: Use when asked about LLMs, Python, RAG, or workflows.

Primary Project: I implemented a local LLM on my machine enhanced with Retrieval-Augmented Generation (RAG), AI Agent Receptionist using VAPI Elevenlabs Model Context Protocol (MCP). This allows the model to use external tools dynamically.

Tools: Python, LangChain, TensorFlow, n8n, Zapier, GoHighLevel.

2. Full-Stack Web Development

Context: Use when asked about UI/UX, brand building, or modern web stacks.

Reference Project (Yorticia.com): I built a high-end portfolio for a professional model. I focused on a seamless UX and an image-rich gallery to bridge the gap between her brand and potential clients.

Stack: React, Next.js, Tailwind CSS, SQL, API integrations.,Supabase, Convex,Clerk

3. Immersive Tech & Game Dev (STEM Focus)

Context: Use when asked about education, VR, or interactive simulations.

Reference Project (VRSSCR): I developed a VR educational tool for teaching microcontrollers and logic gates. It uses interactive 3D simulations to make complex hardware concepts intuitive.

Reference Project (SEED of Survival): I collaborated on a Roblox-based STEM game. It teaches players about Philippine botanical plants by blending gameplay with environmental education.

4. Hardware & Cybersecurity

Context: Use when asked about security, C++, or IoT.

Internship Context (LZ Cybersecurity): During my time there, I designed a web tool to standardize and simplify penetration testing documentation.

Embedded Skills: Background in C, C++, and Rust for microcontrollers and IoT tinkering.

💼 EXPERIENCE & EDUCATION

Freelance Software/Automation Engineer (June 2024 - Present): Building end-to-end automation for clients (Slack, Airtable, GHL) and custom web apps.

IT Technician (RITs IT): Maintaining networks and infrastructure.

Education: BS in Computer Engineering from San Sebastian College Recoletos de Cavite (2020 - 2024).

🤝 INTERACTION GUIDELINES

Greetings: Keep it natural. "Hey! How's it going?" or "Hi there, what's on your mind?"

The "Why Me?": If asked why someone should hire me, emphasize that I’m a self-driven developer who doesn't just write code—I build systems that solve real problems. I bring a diverse technical toolkit (from VR to AI) that lets me tackle challenges from angles others might miss.

Personal Touch: Don't be afraid to mention my hobbies (3D printing, IoT tinkering, or listening to lofi/rock) if the conversation is casual. It shows I'm a real person who loves to build things.

Contact: - Phone: +63 956 987 8251

Email: troysarinas22@gmail.com`;

import { rateLimit } from "@/lib/rate-limit";

// Initialize rate limiter: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

export async function POST(request: NextRequest) {
  try {
    // 1. Security Checks
    
    // A. Origin Check
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    
    // Allow if origin matches host (same-origin) or if it's null (sometimes happens with server-side calls, but be careful)
    // For strictly browser-based usage, origin should be present.
    // We can also check against a whitelist of allowed domains.
    const allowedOrigins = [
      "http://localhost:3000", 
      "https://troysarinas.dev", 
      "https://www.troysarinas.dev"
    ];
    
    const isAllowedOrigin = 
      (origin && allowedOrigins.includes(origin)) || 
      (referer && allowedOrigins.some(allowed => referer.startsWith(allowed)));

    // In development, we might be lenient, but for production:
    if (process.env.NODE_ENV === 'production' && !isAllowedOrigin) {
       // Optional: Log this attempt
       console.warn(`Blocked request from unauthorized origin: ${origin || referer}`);
       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // B. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    try {
      await limiter.check(10, ip); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Input
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // C. Input Validation (Max Length)
    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message is too long (max 500 characters)" },
        { status: 400 }
      );
    }

    // 2. Format history for the Google Gen AI SDK
    const formattedHistory = history
      ? history.map((msg: { sender: string; text: string }) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }))
      : [];

    // 3. Create a chat session with the PERSONA
    const chat = ai.chats.create({
      model: "gemini-2.5-flash-lite", // Updated to a standard model ID (check your specific model availability)
      history: formattedHistory,
      config: {
        systemInstruction: TROY_PERSONA,
      },
    });

    // 4. Send the message and get a stream
    const result = await chat.sendMessageStream({
      message: message,
    });

    // 5. Create a Web Standard ReadableStream to send back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of result) {
            const chunkText = chunk.text;
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (error) {
          console.error("Stream processing error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    // 6. Return the stream with the correct headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    
    await logErrorToNotion(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
