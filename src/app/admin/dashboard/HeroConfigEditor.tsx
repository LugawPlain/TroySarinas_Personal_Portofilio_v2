"use client";

import React, { useState, useEffect } from "react";
import { updateHeroConfig } from "./portfolio-actions";
import { Layout, Type, Eye, EyeOff, ToggleLeft, Palette, Loader2, Save } from "lucide-react";

interface HeroConfig {
  subHeadline?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  showAvatar: boolean;
  showStatusCards: boolean;
  showSocialLinks: boolean;
  displayName: string;
  accentColor?: string;
  avatarUrl?: string;
}

interface HeroConfigEditorProps {
  selectedRole: {
    id: string;
    hero_config?: HeroConfig;
  };
  onSave: (status: string) => void;
}

export function HeroConfigEditor({ selectedRole, onSave }: HeroConfigEditorProps) {
  const [config, setConfig] = useState<HeroConfig>(
    selectedRole.hero_config || {
      ctaPrimary: "Get in Touch",
      ctaSecondary: "Resume",
      showAvatar: true,
      showStatusCards: true,
      showSocialLinks: true,
      displayName: "Troy Sarinas",
    }
  );
  const [isSaving, setIsSaving] = useState(false);

  // Sync config when selected role changes
  useEffect(() => {
    setConfig(
      selectedRole.hero_config || {
        ctaPrimary: "Get in Touch",
        ctaSecondary: "Resume",
        showAvatar: true,
        showStatusCards: true,
        showSocialLinks: true,
        displayName: "Troy Sarinas",
      }
    );
  }, [selectedRole.id, selectedRole.hero_config]);

  const handleChange = (field: keyof HeroConfig, value: any) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
  };

  const handleSave = async () => {
    setIsSaving(true);
    onSave("Saving...");
    
    const result = await updateHeroConfig(selectedRole.id, config);
    
    if (!result.error) {
      onSave("Synced");
    } else {
      onSave("Error!");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-border">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Layout className="w-3.5 h-3.5" />
          Hero Configuration
        </label>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Config"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Type className="w-3 h-3" />
            Display Name
          </label>
          <input
            type="text"
            value={config.displayName}
            onChange={(e) => handleChange("displayName", e.target.value)}
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
            placeholder="Troy Sarinas"
          />
        </div>

        {/* Sub Headline */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Type className="w-3 h-3" />
            Sub-headline
          </label>
          <input
            type="text"
            value={config.subHeadline || ""}
            onChange={(e) => handleChange("subHeadline", e.target.value)}
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
            placeholder="Building Intelligent Digital Solutions"
          />
        </div>

        {/* Primary CTA */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Type className="w-3 h-3" />
            Primary CTA
          </label>
          <input
            type="text"
            value={config.ctaPrimary}
            onChange={(e) => handleChange("ctaPrimary", e.target.value)}
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
            placeholder="Get in Touch"
          />
        </div>

        {/* Secondary CTA */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Type className="w-3 h-3" />
            Secondary CTA
          </label>
          <input
            type="text"
            value={config.ctaSecondary}
            onChange={(e) => handleChange("ctaSecondary", e.target.value)}
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
            placeholder="Resume"
          />
        </div>

        {/* Accent Color */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Palette className="w-3 h-3" />
            Accent Color
          </label>
          <input
            type="color"
            value={config.accentColor || "#3b82f6"}
            onChange={(e) => handleChange("accentColor", e.target.value)}
            className="h-11 w-full cursor-pointer rounded-lg border bg-background p-1 focus:ring-2 focus:ring-accent outline-none transition-all"
          />
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Type className="w-3 h-3" />
            Avatar URL
          </label>
          <input
            type="text"
            value={config.avatarUrl || ""}
            onChange={(e) => handleChange("avatarUrl", e.target.value)}
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
            placeholder="/Me2.webp"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4">
        <ToggleButton
          label="Show Avatar"
          icon={config.showAvatar ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          active={config.showAvatar}
          onClick={() => handleChange("showAvatar", !config.showAvatar)}
        />
        <ToggleButton
          label="Status Cards"
          icon={config.showStatusCards ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          active={config.showStatusCards}
          onClick={() => handleChange("showStatusCards", !config.showStatusCards)}
        />
        <ToggleButton
          label="Social Links"
          icon={config.showSocialLinks ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          active={config.showSocialLinks}
          onClick={() => handleChange("showSocialLinks", !config.showSocialLinks)}
        />
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-border">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Configuration...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Hero Configuration
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ToggleButton({ 
  label, 
  icon, 
  active, 
  onClick 
}: { 
  label: string; 
  icon: React.ReactNode; 
  active: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-all ${
        active 
          ? "bg-accent/10 border-accent text-accent" 
          : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
