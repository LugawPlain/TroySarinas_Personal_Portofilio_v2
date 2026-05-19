"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardExperience from "./variants/Standard";
import SoftwareEngineerExperience from "./variants/SoftwareEngineer";

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
    // case "video-editor": return <CinematicExperience {...props} />;

    default:
      return <StandardExperience {...props} />;
  }
}
