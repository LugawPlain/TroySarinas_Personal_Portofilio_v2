"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { HeroConfig, SocialLink } from "@/lib/roles";
import StandardHeroSection from "./variants/Standard";
import SoftwareEngineerHeroSection from "./variants/SoftwareEngineer";
import GTMHeroSection from "./variants/GTM";
import CinematicHeroSection from "./variants/Cinematic";
import DataHeroSection from "./variants/Data";
import SocialHeroSection from "./variants/Social";
import MarketingHeroSection from "./variants/Marketing";
import EcommerceHeroSection from "./variants/Ecommerce";
import CPAHeroSection from "./variants/CPA";
import SalesHeroSection from "./variants/Sales";
import VAHeroSection from "./variants/VA";

interface HeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
  socialLinks?: SocialLink[];
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
    case "ecommerce-developer":
      return <EcommerceHeroSection {...props} />;
    case "cpa":
      return <CPAHeroSection {...props} />;
    case "sales-representative":
      return <SalesHeroSection {...props} />;
    case "virtual-assistant":
      return <VAHeroSection {...props} />;
    default:
      return <StandardHeroSection {...props} />;
  }
}
