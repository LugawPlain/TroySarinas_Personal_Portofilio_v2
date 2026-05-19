"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardTechnologies from "./variants/Standard";
import SoftwareEngineerTechnologies from "./variants/SoftwareEngineer";

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
    case "software-engineer":
      return <SoftwareEngineerTechnologies {...props} />;
    // case "video-editor": return <CinematicTechnologies {...props} />;

    default:
      return <StandardTechnologies {...props} />;
  }
}
