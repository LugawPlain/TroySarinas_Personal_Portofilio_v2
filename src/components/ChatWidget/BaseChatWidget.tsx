"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LuBotMessageSquare } from "react-icons/lu";
import { usePortfolio } from "@/context/PortfolioContext";
import { trackInteraction } from "@/lib/tracker";

export interface ChatConfig {
  welcomeMessage?: string;
  suggestedQuestions?: string[];
  avatarIcon?: string;
  typingIndicator?: string;
  statusText?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isHtml?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

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

const MarkdownComponents = {
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-2 last:mb-0" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-lg font-bold mb-2" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-base font-bold mb-2" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-sm font-bold mb-1" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-current" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    return (
      <code
        className={`bg-black/10 rounded px-1 py-0.5 text-xs font-mono ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </code>
    );
  },
};

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

interface BaseChatWidgetProps {
  config: ChatConfig;
  themeColor?: string;
}

export function BaseChatWidget({ config, themeColor }: BaseChatWidgetProps) {
  const { role } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const MESSAGE_COOLDOWN = 1000;
  const [isSending, setIsSending] = useState(false);
  const MAX_MESSAGES_PER_SESSION = 20;

  const accentColor = themeColor || "#3b82f6";
  const welcomeMessage =
    config.welcomeMessage ||
    "Hi there! I'm Troy Sarinas. You can ask more about my background, skills, and projects.";
  const suggestedQuestions = config.suggestedQuestions || [
    "Tell me about yourself",
    "What do you do for fun?",
    "What are your technical skills?",
    "What projects have you worked on?",
    "How can I contact you?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      return;
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

      // Track message sent (only for tracked visitors)
    trackInteraction("chat_message_sent", {
      message_length: userMessageText.length,
      session_id: sessionId,
    });

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessageText,
          history: conversationHistory,
          role: role,
          sessionId: sessionId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

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
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      // Track chat open (only for tracked visitors)
      trackInteraction("chat_open", {
        session_id: sessionId,
        message_count: messages.length,
      });
    }
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
        {/* Header */}
        <div
          className="p-3 md:p-4 rounded-t-lg flex items-center justify-between"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <LuBotMessageSquare className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                Troy Sarinas{" "}
                <span className="text-white/70 text-sm">
                  ({config.statusText || "not a robot 🤖 beep boop"})
                </span>
              </h3>
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs opacity-90 text-white">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {messages.length > 0 && (
              <button
                onClick={restartSession}
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 md:px-3 md:py-1 rounded transition-colors"
              >
                Restart
              </button>
            )}
            <button
              onClick={toggleChat}
              className="hover:bg-white/20 text-white/70 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-start">
                <div
                  className="max-w-[90%] md:max-w-[85%] bg-white text-black border-2 rounded-2xl p-3 md:p-4 rounded-bl-none shadow-md"
                  style={{ borderColor: `${accentColor}50` }}
                >
                  <div className="text-xs md:text-sm chat-prose">
                    <p className="mb-2">{welcomeMessage}</p>
                    <p className="mb-3">
                      Feel free to ask me anything, or try one of these common
                      questions:
                    </p>
                    <div className="grid grid-cols-1 gap-1 md:gap-2">
                      {suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInputValue(question)}
                          className="text-left p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs md:text-sm text-gray-700"
                        >
                          {question}
                        </button>
                      ))}
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
                    : "bg-white text-black border-2 rounded-bl-none"
                } shadow-md`}
                style={
                  message.sender === "ai"
                    ? { borderColor: `${accentColor}50` }
                    : {}
                }
              >
                <div className="text-xs md:text-sm chat-prose">
                  {message.isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : message.sender === "ai" && message.text === "" ? (
                    <div className="flex gap-1 h-5 items-center">
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ backgroundColor: accentColor }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce delay-100"
                        style={{ backgroundColor: accentColor }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce delay-200"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  ) : message.sender === "ai" ? (
                    <StreamingText text={message.text} />
                  ) : (
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
              className="px-3 py-2 md:px-4 md:py-2 text-white cursor-pointer rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: accentColor }}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <div className="fixed bottom-4 right-4 md:bottom-4 md:right-10 z-50">
        {showHelpPopup && (
          <div className="absolute right-full -translate-x-3 animate-fade-in-up">
            <div className="bg-secondary/90 backdrop-blur-xs text-white px-4 py-3 rounded-lg shadow-lg max-w-xs md:max-w-md text-center">
              <div className="text-nowrap">
                {config.typingIndicator || "Hello! How can I help you?"}
                <span className="animate-pulse">|</span>
              </div>
              <div className="absolute transform right-0 translate-x-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary/90 rotate-45"></div>
            </div>
          </div>
        )}

        <button
          onClick={toggleChat}
          className={`w-12 h-12 md:w-14 md:h-14 cursor-pointer rounded-full relative border-2 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300`}
          style={{
            borderColor: accentColor,
            backgroundColor: "white",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 animate-[var(--animate-slowping)] rounded-full -z-10"
            style={{ backgroundColor: accentColor }}
          />
          {isOpen ? (
            <X
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ color: accentColor }}
            />
          ) : (
            <LuBotMessageSquare
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ color: accentColor }}
            />
          )}
        </button>
      </div>
    </>
  );
}
