"use client";

import { BaseChatWidget, ChatConfig } from "../BaseChatWidget";

export const standardChatConfig: ChatConfig = {
  accentColor: "#8b5cf6", // Violet
  welcomeMessage:
    "👋 Hi there! I'm Troy Sarinas. You can ask more about my background, skills, and projects.",
  suggestedQuestions: [
    "👋 Tell me about yourself",
    "🎮 What do you do for fun?",
    "💻 What are your technical skills?",
    "🚀 What projects have you worked on?",
    "📧 How can I contact you?",
  ],
  statusText: "not a robot 🤖 beep boop",
  typingIndicator: "Hello! How can I help you?",
};

export default function StandardChatWidget() {
  return <BaseChatWidget config={standardChatConfig} />;
}
