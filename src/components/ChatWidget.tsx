"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
// 1. IMPORT MARKDOWN LIBRARIES
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  className?: string;
}

// ... [Button component remains the same] ...
const Button = ({ className = "", children, ...props }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ... [TextType component remains the same] ...
const TextType = ({
  text,
  typingSpeed = 100,
  pauseDuration = 1000,
  showCursor = true,
  className = "",
}: TextTypeProps) => {
  // ... existing implementation ...
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentFullText = text[currentTextIndex];

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % text.length);
        }
      } else {
        setDisplayedText((prev) => currentFullText.slice(0, prev.length + 1));
        if (displayedText === currentFullText) {
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
      }

      timeout = setTimeout(
        handleTyping,
        isDeleting ? typingSpeed / 2 : typingSpeed
      );
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    text,
    typingSpeed,
    pauseDuration,
  ]);

  return (
    <div className={className}>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </div>
  );
};

// 2. DEFINE MARKDOWN STYLES
// Custom components to ensure markdown looks good in small chat bubbles
const MarkdownComponents = {
  p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,
  h1: ({ node, ...props }: any) => (
    <h1 className="text-lg font-bold mb-2" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-base font-bold mb-2" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-sm font-bold mb-1" {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-current" {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <a
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ node, className, children, ...props }: any) => {
    // Simple inline code styling
    return (
      <code
        className="bg-black/10 rounded px-1 py-0.5 text-xs font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
};

// 3. UPDATE STREAMING TEXT TO RENDER MARKDOWN
const StreamingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    if (displayedText === text) return;
    if (
      Math.abs(text.length - displayedText.length) > 50 &&
      displayedText.length > 0
    ) {
      setDisplayedText(text);
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText((current) => {
        if (current.length < text.length) {
          return text.slice(0, current.length + 1);
        }
        clearInterval(interval);
        return current;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [text, displayedText]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
      {displayedText}
    </ReactMarkdown>
  );
};

// ... [Interfaces and ChatWidget setup remain the same] ...
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isHtml?: boolean;
}

const ChatWidget = () => {
  // ... [Keep all your state and useEffects exactly the same until the rendering loop] ...
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const MESSAGE_COOLDOWN = 1000;
  const [isSending, setIsSending] = useState(false);
  const MAX_MESSAGES_PER_SESSION = 20;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkHealthStatus = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "ping" }),
      });
      setIsOnline(response.status !== 500);
    } catch (error) {
      console.error("Health check failed:", error);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      checkHealthStatus();
    }
  }, [isOpen]);

  // ... [Keep getOrCreateSessionId and other useEffects] ...
  useEffect(() => {
    const getOrCreateSessionId = () => {
      if (typeof window !== "undefined") {
        const existingSessionId = localStorage.getItem("chatSessionId");
        if (existingSessionId) {
          setSessionId(existingSessionId);
          return existingSessionId;
        } else {
          const newSessionId = `session_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 11)}`;
          localStorage.setItem("chatSessionId", newSessionId);
          setSessionId(newSessionId);
          return newSessionId;
        }
      }
      return "";
    };
    getOrCreateSessionId();
  }, []);

  useEffect(() => {
    setShowHelpPopup(true);
    const timer = setTimeout(() => {
      setShowHelpPopup(false);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  // ... [Keep handleSendMessage, handleKeyPress, toggleChat, restartSession] ...

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    if (messages.length >= MAX_MESSAGES_PER_SESSION) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "You've reached the maximum number of messages for this session. Please refresh the page.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_COOLDOWN) {
      return; // Silent fail on cooldown
    }
    setLastMessageTime(now);
    setIsSending(true);

    const userMessageText = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const streamingMessageId = (Date.now() + 1).toString();
      const streamingMessage: Message = {
        id: streamingMessageId,
        text: "",
        sender: "ai",
        timestamp: new Date(),
        isHtml: false,
      };
      setMessages((prev) => [...prev, streamingMessage]);

      const conversationHistory = messages
        .filter((msg) => !msg.text.includes("Sorry, I'm having trouble"))
        .map((msg) => ({
          text: msg.text,
          sender: msg.sender,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessageText,
          history: conversationHistory,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamingMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }

      console.log("Stream complete");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((m) => m.text !== ""));

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setShowHelpPopup(false);
    setIsOpen(!isOpen);
  };

  const restartSession = () => {
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setIsSending(false);
    if (typeof window !== "undefined") {
      const newSessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 11)}`;
      localStorage.setItem("chatSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-18 left-1/2 -translate-x-1/2 md:-translate-x-0 md:bottom-20 md:right-4 md:left-auto w-[95%] md:w-[600px] h-[80vh] md:h-[600px] max-h-[600px] bg-white border-2 border-gray-200 rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* ... [Header section remains the same] ... */}
        <div className="bg-primary text-white p-3 md:p-4 rounded-t-lg flex items-center justify-between">
          {/* ... header content ... */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary text-sm md:text-base">
                Troy Sarinas{" "}
                <span className="text-gray-500 text-sm">
                  (not a robot 🤖 beep boop)
                </span>
              </h3>
              <div className="flex items-center gap-1 md:gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline === null
                      ? "bg-gray-400"
                      : isOnline
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <p className="text-xs opacity-90 text-secondary">
                  {isTyping
                    ? "Typing..."
                    : isOnline === null
                    ? "Checking..."
                    : isOnline
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {messages.length > 0 && (
              <button
                onClick={restartSession}
                className="text-xs bg-accent hover:bg-accent/80 text-white px-2 py-1 md:px-3 md:py-1 rounded transition-colors"
              >
                Restart
              </button>
            )}
            <button
              onClick={toggleChat}
              className="hover:bg-black/20 text-black/50 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[90%] md:max-w-[85%] bg-white text-black border-2 border-accent/50 rounded-2xl p-3 md:p-4 rounded-bl-none shadow-md">
                  <div className="text-xs md:text-sm chat-prose">
                    <p className="mb-2">
                      👋 Hi there! I'm Troy Sarinas. You can ask more about my
                      background, skills, and projects.
                    </p>
                    <p className="mb-3">
                      Feel free to ask me anything, or try one of these common
                      questions:
                    </p>
                    <div className="grid grid-cols-1 gap-1 md:gap-2">
                      <button
                        onClick={() => setInputValue("Tell me about yourself")}
                        className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                      >
                        👋 Tell me about yourself
                      </button>
                      <button
                        onClick={() => setInputValue("What do you do for fun?")}
                        className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                      >
                        🎮 What do you do for fun?
                      </button>
                      <button
                        onClick={() =>
                          setInputValue("What are your technical skills?")
                        }
                        className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                      >
                        💻 What are your technical skills?
                      </button>
                      <button
                        onClick={() =>
                          setInputValue("What projects have you worked on?")
                        }
                        className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                      >
                        🚀 What projects have you worked on?
                      </button>
                      <button
                        onClick={() => setInputValue("How can I contact you?")}
                        className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                      >
                        📧 How can I contact you?
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] mt-1 text-gray-400 text-right">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex font-inter tracking-wide ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-3 md:p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-black ml-auto border-2 border-secondary/50 rounded-br-none"
                    : "bg-white text-black border-2 border-accent/50 rounded-bl-none"
                } shadow-md`}
              >
                {/* 4. UPDATE MESSAGE RENDERING LOGIC */}
                <div className="text-xs md:text-sm chat-prose">
                  {message.isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : message.sender === "ai" && message.text === "" ? (
                    <div className="flex gap-1 h-5 items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  ) : message.sender === "ai" ? (
                    // This handles streaming AND static AI messages
                    <StreamingText text={message.text} />
                  ) : (
                    // User messages are usually just text, but good to handle formatting too
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>

                {message.text !== "" && (
                  <p className="text-[10px] mt-1 text-gray-400 text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {/* ... [Input area remains the same] ... */}
        <div className="p-3 md:p-4 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isSending}
              className="px-3 py-2 md:px-4 md:py-2 bg-accent text-white cursor-pointer rounded-lg hover:bg-accent hover:text-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      {/* ... [Trigger button remains the same] ... */}
      <div className="fixed bottom-4 right-4 md:bottom-4 md:right-10 z-50">
        {showHelpPopup && (
          <div className="absolute right-full -translate-x-3 animate-fade-in-up">
            <div className="bg-secondary/90 backdrop-blur-xs text-white px-4 py-3 rounded-lg shadow-lg max-w-xs md:max-w-md text-center">
              <TextType
                className="text-nowrap"
                text={["Hello! How can I help you?"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
              />
              <div className="absolute transform right-0 translate-x-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary/90 rotate-45"></div>
            </div>
          </div>
        )}

        <button
          onClick={toggleChat}
          className={`w-12 h-12 md:w-14 md:h-14 cursor-pointer rounded-full border-2 border-secondary bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300`}
        >
          {isOpen ? (
            <X className="text-accent w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <MessageCircle className="text-accent w-6 h-6 md:w-8 md:h-8" />
          )}
        </button>
      </div>
    </>
  );
};

export default ChatWidget;
