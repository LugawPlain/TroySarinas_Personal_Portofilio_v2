"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoChatbubbles, IoSend, IoClose } from "react-icons/io5";
import { Button } from "./ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Client-side Chat cooldown
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const MESSAGE_COOLDOWN = 1000;

  // Disable button during chat processing
  const [isSending, setIsSending] = useState(false);

  // Session chat message limit
  const MAX_MESSAGES_PER_SESSION = 20;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkHealthStatus = async () => {
    try {
      const response = await fetch("/api/chat/status");
      const data = await response.json();
      setIsOnline(data.status === "online");
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

  // Check health status when chat widget is opened
  useEffect(() => {
    if (isOpen) {
      checkHealthStatus();
    }
  }, [isOpen]);

  // Generate or retrieve session ID
  useEffect(() => {
    const getOrCreateSessionId = () => {
      if (typeof window !== "undefined") {
        // Try to get existing session ID from localStorage
        const existingSessionId = localStorage.getItem("chatSessionId");
        if (existingSessionId) {
          setSessionId(existingSessionId);
          return existingSessionId;
        } else {
          // Generate new session ID
          const newSessionId = `session_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          localStorage.setItem("chatSessionId", newSessionId);
          setSessionId(newSessionId);
          return newSessionId;
        }
      }
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    getOrCreateSessionId();
  }, []);
  const handleSendMessage = async () => {
    // Prevent sending if already processing
    if (!inputValue.trim() || isSending) return;

    // Check message limit per session
    if (messages.length >= MAX_MESSAGES_PER_SESSION) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "You've reached the maximum number of messages for this session. Please refresh the page to start a new conversation.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Check cooldown
    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_COOLDOWN) {
      const waitTime = Math.ceil(
        (MESSAGE_COOLDOWN - (now - lastMessageTime)) / 1000
      );
      const cooldownMessage: Message = {
        id: Date.now().toString(),
        text: `Please wait ${waitTime} second${
          waitTime > 1 ? "s" : ""
        } before sending another message.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cooldownMessage]);
      return;
    }
    setLastMessageTime(now);

    // Set sending state
    setIsSending(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: messageText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Chat API error:", response.status, errorData);

        // Handle rate limit error specifically
        if (response.status === 429) {
          throw new Error(
            errorData.error || "Too many requests. Please try again later."
          );
        }

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Chat API response:", data);

      // Display AI response - try multiple possible response fields
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.output ||
          data.response ||
          data.message ||
          data.text ||
          "Thank you for your message! I'll get back to you soon.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Display error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          error instanceof Error
            ? error.message
            : "Sorry, I'm having trouble connecting right now. Please try again later or contact me directly via email.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false); // Option 2: Reset sending state
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const restartSession = () => {
    // Clear messages
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setIsSending(false);
    setLastMessageTime(0);

    // Generate new session ID
    if (typeof window !== "undefined") {
      const newSessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("chatSessionId", newSessionId);
      setSessionId(newSessionId);
    }

    // Focus on input after restart
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-10 w-[500px] h-[600px] bg-white border-2 border-gray-200 rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <IoChatbubbles size="24" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary">Troy Sarinas AI</h3>
              <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={restartSession}
                className="text-xs bg-accent hover:bg-accent/80 text-white px-3 py-1 rounded transition-colors"
                aria-label="Restart conversation"
              >
                Restart
              </button>
            )}
            <button
              onClick={toggleChat}
              className="hover:bg-black/20 text-black/50 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <IoClose size="24" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Predefined Messages - Show only when no messages exist */}
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center mb-4">
                Try asking me:
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setInputValue("Tell me about yourself")}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  👋 Tell me about yourself
                </button>
                <button
                  onClick={() => setInputValue("What do you do for fun?")}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  🎮 What do you do for fun?
                </button>
                <button
                  onClick={() =>
                    setInputValue("What are your technical skills?")
                  }
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  💻 What are your technical skills?
                </button>
                <button
                  onClick={() =>
                    setInputValue("What projects have you worked on?")
                  }
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  🚀 What projects have you worked on?
                </button>
                <button
                  onClick={() => setInputValue("How can I contact you?")}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  📧 How can I contact you?
                </button>
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
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-black ml-auto border-2 border-secondary/50 rounded-br-none"
                    : "bg-white text-black border-2 border-accent/50 rounded-bl-none"
                } shadow-md`}
              >
                <div
                  className="text-sm chat-prose"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isSending}
              className="px-4 py-2 bg-accent text-white cursor-pointer rounded-lg hover:bg-accent hover:text-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoSend size="20" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 cursor-pointer fixed rounded-full border-2 border-secondary bg-primary bottom-4 right-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50 ${
          isOpen ? "rotate-0" : "rotate-0"
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <IoClose size="32" className="text-accent" />
        ) : (
          <IoChatbubbles size="32" className="text-accent" />
        )}
      </button>
    </>
  );
};

export default ChatWidget;
