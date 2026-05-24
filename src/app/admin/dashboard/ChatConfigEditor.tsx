"use client";

import React, { useState, useEffect } from "react";
import { updateChatConfig, updateChatPersona } from "./portfolio-actions";
import {
  MessageSquare,
  Type,
  Palette,
  HelpCircle,
  Loader2,
  Save,
  Bot,
} from "lucide-react";

interface ChatConfig {
  accentColor?: string;
  welcomeMessage?: string;
  suggestedQuestions?: string[];
  statusText?: string;
  typingIndicator?: string;
}

interface ChatConfigEditorProps {
  selectedRole: {
    id: string;
    chat_config?: ChatConfig;
    chat_persona?: string;
  };
  onSave: (status: string) => void;
}

export function ChatConfigEditor({ selectedRole, onSave }: ChatConfigEditorProps) {
  const [config, setConfig] = useState<ChatConfig>(
    selectedRole.chat_config || {
      accentColor: "#3b82f6",
      welcomeMessage: "",
      suggestedQuestions: [],
      statusText: "",
      typingIndicator: "",
    }
  );
  const [persona, setPersona] = useState(selectedRole.chat_persona || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setConfig(
      selectedRole.chat_config || {
        accentColor: "#3b82f6",
        welcomeMessage: "",
        suggestedQuestions: [],
        statusText: "",
        typingIndicator: "",
      }
    );
    setPersona(selectedRole.chat_persona || "");
  }, [selectedRole.id, selectedRole.chat_config, selectedRole.chat_persona]);

  const handleConfigChange = (field: keyof ChatConfig, value: any) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    onSave("Saving chat config...");

    const result = await updateChatConfig(selectedRole.id, config);

    if (!result.error) {
      onSave("Chat config synced");
    } else {
      onSave("Error saving config!");
    }
    setIsSaving(false);
  };

  const handleSavePersona = async () => {
    setIsSaving(true);
    onSave("Saving persona...");

    const result = await updateChatPersona(selectedRole.id, persona);

    if (!result.error) {
      onSave("Persona synced");
    } else {
      onSave("Error saving persona!");
    }
    setIsSaving(false);
  };

  const suggestedQuestionsText = config.suggestedQuestions?.join("\n") || "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Persona Editor */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            AI Persona / System Prompt
          </label>
          <button
            onClick={handleSavePersona}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Persona"}
          </button>
        </div>
        <textarea
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          rows={12}
          className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-sm leading-relaxed shadow-sm transition-all font-mono"
          placeholder="Enter the AI persona/system prompt for this role..."
        />
        <p className="text-[10px] text-muted-foreground">
          This persona will be used by the AI when visitors chat with this role variant.
          Leave empty to use the default Troy Sarinas persona.
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-6">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Chat UI Configuration
          </label>
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Config"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Accent Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.accentColor || "#3b82f6"}
                onChange={(e) => handleConfigChange("accentColor", e.target.value)}
                className="w-12 h-10 rounded-lg border cursor-pointer"
              />
              <input
                type="text"
                value={config.accentColor || "#3b82f6"}
                onChange={(e) => handleConfigChange("accentColor", e.target.value)}
                className="flex-1 p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all font-mono"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {/* Status Text */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Status Text
            </label>
            <input
              type="text"
              value={config.statusText || ""}
              onChange={(e) => handleConfigChange("statusText", e.target.value)}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="not a robot 🤖 beep boop"
            />
          </div>

          {/* Welcome Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Welcome Message
            </label>
            <textarea
              value={config.welcomeMessage || ""}
              onChange={(e) => handleConfigChange("welcomeMessage", e.target.value)}
              rows={2}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Hi there! I'm Troy..."
            />
          </div>

          {/* Typing Indicator */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Type className="w-3 h-3" />
              Typing Indicator Text
            </label>
            <input
              type="text"
              value={config.typingIndicator || ""}
              onChange={(e) => handleConfigChange("typingIndicator", e.target.value)}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Hello! How can I help you?"
            />
          </div>

          {/* Suggested Questions */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              Suggested Questions (one per line)
            </label>
            <textarea
              value={suggestedQuestionsText}
              onChange={(e) =>
                handleConfigChange(
                  "suggestedQuestions",
                  e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter((s) => s !== "")
                )
              }
              rows={5}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Tell me about yourself&#10;What are your technical skills?&#10;..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Chat Configuration...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Chat Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
