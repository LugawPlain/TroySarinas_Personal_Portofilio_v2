"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import SoftwareEngineerChatWidget from "./variants/SoftwareEngineer";
import GTMEngineerChatWidget from "./variants/GTMEngineer";
import StandardChatWidget from "./variants/Standard";

export default function ChatWidget() {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerChatWidget />;
    case "gtm-engineer":
      return <GTMEngineerChatWidget />;
    default:
      return <StandardChatWidget />;
  }
}
