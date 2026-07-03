"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardExperience from "./variants/Standard";
import SoftwareEngineerExperience from "./variants/SoftwareEngineer";
import GTMExperience from "./variants/GTM";
import CinematicExperience from "./variants/Cinematic";
import DataExperience from "./variants/Data";
import SocialExperience from "./variants/Social";
import MarketingExperience from "./variants/Marketing";
import EcommerceExperience from "./variants/Ecommerce";
import CPAExperience from "./variants/CPA";
import SalesExperience from "./variants/Sales";
import VAExperience from "./variants/VA";

interface ExperienceHighlights {
  icon?: string;
  title: string;
  label: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  highlights: ExperienceHighlights[];
  technologies: string[];
  logo_url: string;
  logo_bg_color: string;
}

interface ExperienceProps {
  initialExperience: ExperienceItem[];
}

export default function Experience(props: ExperienceProps) {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerExperience {...props} />;
    case "gtm-engineer":
      return <GTMExperience {...props} />;
    case "video-editor":
      return <CinematicExperience {...props} />;
    case "data-analyst":
      return <DataExperience {...props} />;
    case "social-media-manager":
      return <SocialExperience {...props} />;
    case "marketing-manager":
      return <MarketingExperience {...props} />;
    case "ecommerce-developer":
      return <EcommerceExperience {...props} />;
    case "cpa":
      return <CPAExperience {...props} />;
    case "sales-representative":
      return <SalesExperience {...props} />;
    case "virtual-assistant":
      return <VAExperience {...props} />;

    default:
      return <StandardExperience {...props} />;
  }
}
