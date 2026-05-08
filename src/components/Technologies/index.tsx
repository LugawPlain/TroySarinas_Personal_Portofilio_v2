"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardTechnologies from "./variants/Standard";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface TechnologiesProps {
  initialTech: TechItem[];
}

export default function Technologies(props: TechnologiesProps) {
  const { role } = usePortfolio();

  switch (role) {
    // Add custom role variants here as we build them
    // case "video-editor": return <CinematicTechnologies {...props} />;

    default:
      return <StandardTechnologies {...props} />;
  }
}
