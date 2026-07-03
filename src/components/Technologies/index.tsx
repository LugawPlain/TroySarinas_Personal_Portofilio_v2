"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardTechnologies from "./variants/Standard";
import SoftwareEngineerTechnologies from "./variants/SoftwareEngineer";
import GTMTechnologies from "./variants/GTM";
import CinematicTechnologies from "./variants/Cinematic";
import DataTechnologies from "./variants/Data";
import SocialTechnologies from "./variants/Social";
import MarketingTechnologies from "./variants/Marketing";
import EcommerceTechnologies from "./variants/Ecommerce";
import CPATechnologies from "./variants/CPA";
import SalesTechnologies from "./variants/Sales";
import VATechnologies from "./variants/VA";

interface TechItem {
  name: string;
  icon_name: string;
  icon_url?: string;
  proficiency: number;
}

interface TechnologiesProps {
  initialTech: TechItem[];
}

export default function Technologies(props: TechnologiesProps) {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerTechnologies {...props} />;
    case "gtm-engineer":
      return <GTMTechnologies {...props} />;
    case "video-editor":
      return <CinematicTechnologies {...props} />;
    case "data-analyst":
      return <DataTechnologies {...props} />;
    case "social-media-manager":
      return <SocialTechnologies {...props} />;
    case "marketing-manager":
      return <MarketingTechnologies {...props} />;
    case "ecommerce-developer":
      return <EcommerceTechnologies {...props} />;
    case "cpa":
      return <CPATechnologies {...props} />;
    case "sales-representative":
      return <SalesTechnologies {...props} />;
    case "virtual-assistant":
      return <VATechnologies {...props} />;

    default:
      return <StandardTechnologies {...props} />;
  }
}
