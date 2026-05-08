"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardFooter from "./variants/Standard";

export default function Footer() {
  const { role } = usePortfolio();

  switch (role) {
    // case "video-editor": return <CinematicFooter />;

    default:
      return <StandardFooter />;
  }
}
