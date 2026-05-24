"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { HeroConfig } from "@/lib/roles";
import StandardHeroSection from "./variants/Standard";
import SoftwareEngineerHeroSection from "./variants/SoftwareEngineer";
import GTMHeroSection from "./variants/GTM";
import CinematicHeroSection from "./variants/Cinematic";
import DataHeroSection from "./variants/Data";
import SocialHeroSection from "./variants/Social";
import MarketingHeroSection from "./variants/Marketing";

interface HeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

export default function HeroSection(props: HeroSectionProps) {
  const { role } = usePortfolio();

  switch (role) {
    case "video-editor":
      return <CinematicHeroSection {...props} />;
    case "software-engineer":
      return <SoftwareEngineerHeroSection {...props} />;
    case "gtm-engineer":
      return <GTMHeroSection {...props} />;
    case "data-analyst":
      return <DataHeroSection {...props} />;
    case "social-media-manager":
      return <SocialHeroSection {...props} />;
    case "marketing-manager":
      return <MarketingHeroSection {...props} />;
    default:
      return <StandardHeroSection {...props} />;
  }
}
