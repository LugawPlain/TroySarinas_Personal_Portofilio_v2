"use client";

import React, { useState, useMemo } from "react";
import { Icon, addCollection } from "@iconify/react";
import logosData from "@iconify-json/logos/icons.json";
import simpleIconsData from "@iconify-json/simple-icons/icons.json";
import { Search, X, Check } from "lucide-react";

addCollection(logosData as any);
addCollection(simpleIconsData as any);

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  onClose: () => void;
}

const POPULAR_CATEGORIES: Record<string, string[]> = {
  "Microsoft": ["microsoft", "microsoftexcel", "microsoftoutlook", "microsoftteams", "microsoftword", "microsoftpowerpoint", "microsoftonenote", "microsoftonedrive", "microsoft-365", "microsoft-icon"],
  "Google": ["google", "google-icon", "google-gmail", "google-calendar", "google-docs", "google-sheets", "google-slides", "google-drive", "google-meet", "google-looker", "google-workspace"],
  "Project Management": ["notion", "notion-icon", "asana", "asana-icon", "trello", "monday", "monday-icon", "airtable", "clickup", "clickup-icon"],
  "Communication": ["slack", "slack-icon", "zoom", "zoom-icon", "microsoft-teams", "discord", "telegram", "whatsapp"],
  "CRM & Sales": ["salesforce", "hubspot", "pipedrive", "zoho", "freshsales"],
  "Automation": ["zapier", "zapier-icon", "make", "n8n", "ifttt"],
  "Design & AI": ["canva", "canva-icon", "openai", "openai-icon", "claude", "claude-icon", "google-gemini", "midjourney"],
  "Social": ["facebook", "instagram", "instagram-icon", "linkedin", "linkedin-icon", "x", "threads", "tiktok"],
};

const CATEGORY_ICON_SETS = {
  logos: "Brand Logos",
  "simple-icons": "Simple Icons",
};

export default function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"logos" | "simple-icons">(() => {
    if (value?.startsWith("simple-icons:")) return "simple-icons";
    return "logos";
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allIcons = useMemo(() => {
    const data = source === "logos" ? logosData : simpleIconsData;
    return Object.keys((data as any).icons || {});
  }, [source]);

  const filteredIcons = useMemo(() => {
    let list = allIcons;

    if (selectedCategory) {
      const categoryIcons = new Set(
        POPULAR_CATEGORIES[selectedCategory]?.map((name) => name.toLowerCase()) || []
      );
      list = list.filter((name) => categoryIcons.has(name.toLowerCase()));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((name) => name.toLowerCase().includes(q));
    }

    return list.slice(0, 120);
  }, [allIcons, query, selectedCategory]);

  const handleSelect = (name: string) => {
    onChange(`${source}:${name}`);
    onClose();
  };

  const currentName = value.includes(":") ? value.split(":")[1] : value;
  const currentSource = value.includes(":") ? value.split(":")[0] : "logos";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-lg font-bold">Choose Tool Icon</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Search brand icons from {Object.values(CATEGORY_ICON_SETS).join(" & ")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source tabs */}
        <div className="flex border-b">
          {(Object.keys(CATEGORY_ICON_SETS) as Array<keyof typeof CATEGORY_ICON_SETS>).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSource(key);
                setSelectedCategory(null);
              }}
              className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                source === key
                  ? "bg-accent/10 text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {CATEGORY_ICON_SETS[key]}
            </button>
          ))}
        </div>

        {/* Search + Categories */}
        <div className="p-4 border-b space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCategory(null);
              }}
              placeholder="Search icons..."
              className="w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setQuery("");
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === null && !query
                  ? "bg-accent text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {Object.keys(POPULAR_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setQuery("");
                }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No icons found.
            </div>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {filteredIcons.map((name) => {
                const fullName = `${source}:${name}`;
                const isSelected = currentSource === source && currentName === name;
                return (
                  <button
                    key={fullName}
                    type="button"
                    onClick={() => handleSelect(name)}
                    title={name}
                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 p-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-accent bg-accent/10 ring-1 ring-accent"
                        : "bg-background border-border hover:border-accent/50 hover:bg-muted/50"
                    }`}
                  >
                    <Icon icon={fullName} width={24} height={24} />
                    <span className="text-[9px] text-center leading-tight line-clamp-2 break-all text-muted-foreground">
                      {name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {filteredIcons.length === 120 && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              Showing top 120 results. Refine your search to see more.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Selected: <span className="font-mono text-foreground">{value || "none"}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-muted rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
