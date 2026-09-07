"use client";

import { BaseChatWidget, ChatConfig } from "../BaseChatWidget";

export const gtmEngineerChatConfig: ChatConfig = {
  welcomeMessage:
    "👋 Hi there! I'm Troy. Let's talk growth, product strategy, and how engineering drives business outcomes.",
  suggestedQuestions: [
    "📈 Tell me about your growth engineering experience",
    "🎯 How do you align engineering with business goals?",
    "📊 What's your approach to product analytics?",
    "🔄 How do you optimize conversion funnels?",
    "💡 Tell me about a growth experiment you ran",
  ],
  statusText: "Growth Mode 📈",
  typingIndicator: "Analyzing growth metrics...",
};

export default function GTMEngineerChatWidget() {
  return <BaseChatWidget config={gtmEngineerChatConfig} />;
}
