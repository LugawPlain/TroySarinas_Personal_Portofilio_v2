"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardProjects from "./variants/Standard";
import SoftwareEngineerProjects from "./variants/SoftwareEngineer";
import GTMProjects from "./variants/GTM";
import CinematicProjects from "./variants/Cinematic";
import DataProjects from "./variants/Data";
import SocialProjects from "./variants/Social";
import MarketingProjects from "./variants/Marketing";
import { Project } from "@/lib/projects";

interface ProjectsProps {
  initialProjects?: Project[] | null;
  role?: string; // Still accepted for backwards compatibility if needed
}

export default function Projects({
  initialProjects,
  role: propRole,
}: ProjectsProps) {
  const { role: contextRole } = usePortfolio();
  const activeRole = contextRole || propRole;

  // If no projects provided, we might need a client-side fetcher or just handle empty state
  // But typically the page passes them down.
  const projects = initialProjects || [];

  switch (activeRole) {
    case "software-engineer":
      return <SoftwareEngineerProjects projects={projects} role={activeRole} />;
    case "gtm-engineer":
      return <GTMProjects projects={projects} role={activeRole} />;
    case "video-editor":
      return <CinematicProjects projects={projects} role={activeRole} />;
    case "data-analyst":
      return <DataProjects projects={projects} role={activeRole} />;
    case "social-media-manager":
      return <SocialProjects projects={projects} role={activeRole} />;
    case "marketing-manager":
      return <MarketingProjects projects={projects} role={activeRole} />;

    default:
      return <StandardProjects projects={projects} role={activeRole} />;
  }
}
