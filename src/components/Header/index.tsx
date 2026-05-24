"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardHeader from "./variants/Standard";
import SoftwareEngineerHeader from "./variants/SoftwareEngineer";
import GTMHeader from "./variants/GTM";
import CinematicHeader from "./variants/Cinematic";
import DataHeader from "./variants/Data";
import SocialHeader from "./variants/Social";
import MarketingHeader from "./variants/Marketing";

export default function Header() {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerHeader />;
    case "gtm-engineer":
      return <GTMHeader />;
    case "video-editor":
      return <CinematicHeader />;
    case "data-analyst":
      return <DataHeader />;
    case "social-media-manager":
      return <SocialHeader />;
    case "marketing-manager":
      return <MarketingHeader />;

    default:
      return <StandardHeader />;
  }
}
