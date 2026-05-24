"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardFooter from "./variants/Standard";
import SoftwareEngineerFooter from "./variants/SoftwareEngineer";
import CinematicFooter from "./variants/Cinematic";
import GTMFooter from "./variants/GTM";
import DataFooter from "./variants/Data";
import SocialFooter from "./variants/Social";
import MarketingFooter from "./variants/Marketing";

export default function Footer() {
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
    default:
      return <StandardFooter />;
  }
}
