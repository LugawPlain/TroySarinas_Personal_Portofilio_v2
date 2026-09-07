"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { useEffect, useState } from "react";
import { BaseChatWidget, ChatConfig } from "./BaseChatWidget";
import { softwareEngineerChatConfig } from "./variants/SoftwareEngineer";
import { gtmEngineerChatConfig } from "./variants/GTMEngineer";
import { standardChatConfig } from "./variants/Standard";

export default function ChatWidget() {
  const { role } = usePortfolio();
  const [savedConfig, setSavedConfig] = useState<ChatConfig | null>(null);
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    let active = true;
    fetch(`/api/chat-config?role=${encodeURIComponent(role)}`, {
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active) {
          setSavedConfig(result?.config || null);
          setThemeColor(result?.themeColor || undefined);
        }
      })
      .catch(() => {
        if (active) {
          setSavedConfig(null);
          setThemeColor(undefined);
        }
      });

    return () => {
      active = false;
    };
  }, [role]);

  const defaultConfig =
    role === "software-engineer"
      ? softwareEngineerChatConfig
      : role === "gtm-engineer"
        ? gtmEngineerChatConfig
        : standardChatConfig;
  const config = { ...defaultConfig, ...savedConfig };

  switch (role) {
    case "software-engineer":
      return <BaseChatWidget config={config} themeColor={themeColor} />;
    case "gtm-engineer":
      return <BaseChatWidget config={config} themeColor={themeColor} />;
    case "ecommerce-developer":
      return <BaseChatWidget config={config} themeColor={themeColor} />;
    case "virtual-assistant":
      return <></>;
    default:
      return <BaseChatWidget config={config} themeColor={themeColor} />;
  }
}
