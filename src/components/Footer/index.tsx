"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardFooter from "./variants/Standard";
import SoftwareEngineerFooter from "./variants/SoftwareEngineer";
import CinematicFooter from "./variants/Cinematic";
import GTMFooter from "./variants/GTM";
import DataFooter from "./variants/Data";
import SocialFooter from "./variants/Social";
import MarketingFooter from "./variants/Marketing";
import EcommerceFooter from "./variants/Ecommerce";
import CPAFooter from "./variants/CPA";
import SalesFooter from "./variants/Sales";
import VAFooter from "./variants/VA";

export default function Footer() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : undefined;

  // Hide footer on root path where there's no role
  if (pathname === "/") return null;

  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerFooter />;
    case "video-editor":
      return <CinematicFooter />;
    case "gtm-engineer":
      return <GTMFooter />;
    case "data-analyst":
      return <DataFooter />;
    case "social-media-manager":
      return <SocialFooter />;
    case "marketing-manager":
      return <MarketingFooter />;
    case "ecommerce-developer":
      return <EcommerceFooter />;
    case "cpa":
      return <CPAFooter />;
    case "sales-representative":
      return <SalesFooter />;
    case "virtual-assistant":
      return <VAFooter />;
    default:
      return <StandardFooter />;
  }
}
