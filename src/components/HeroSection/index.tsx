"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { HeroConfig } from "@/lib/roles";
import StandardHeroSection from "./variants/Standard";
import SoftwareEngineerHeroSection from "./variants/SoftwareEngineer";

interface HeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

export default function HeroSection(props: HeroSectionProps) {
  const { role } = usePortfolio();

  switch (role) {
    // case "video-editor": return <CinematicHeroSection {...props} />;
    case "software-engineer":
      return <SoftwareEngineerHeroSection {...props} />;
    default:
      return <StandardHeroSection {...props} />;
  }
}
