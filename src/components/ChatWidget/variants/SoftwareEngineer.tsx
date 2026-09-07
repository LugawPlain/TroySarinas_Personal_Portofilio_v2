"use client";

import { BaseChatWidget, ChatConfig } from "../BaseChatWidget";

export const softwareEngineerChatConfig: ChatConfig = {
  welcomeMessage:
    "👋 Hey! I'm Troy. Ask me about my engineering work, tech stack, or how I approach building scalable systems.",
  suggestedQuestions: [
    "👋 Tell me about your engineering background",
    "💻 What's your tech stack?",
    "🚀 Tell me about a challenging project",
    "⚡ How do you optimize performance?",
    "🔧 What's your approach to system design?",
  ],
  statusText: "Engineering Mode 🤖",
  typingIndicator: "Initializing dev environment...",
};

export default function SoftwareEngineerChatWidget() {
  return <BaseChatWidget config={softwareEngineerChatConfig} />;
}
