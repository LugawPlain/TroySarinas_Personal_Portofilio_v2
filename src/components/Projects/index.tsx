"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardProjects from "./variants/Standard";
import SoftwareEngineerProjects from "./variants/SoftwareEngineer";
import GTMProjects from "./variants/GTM";
import CinematicProjects from "./variants/Cinematic";
import DataProjects from "./variants/Data";
import SocialProjects from "./variants/Social";
import MarketingProjects from "./variants/Marketing";
import EcommerceProjects from "./variants/Ecommerce";
import CPAProjects from "./variants/CPA";
import SalesProjects from "./variants/Sales";
import VAProjects from "./variants/VA";
import { Sparkles } from "lucide-react";
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

  if (projects.length === 0) {
    return (
      <div className="relative py-16 px-4">
        <div className="max-w-[85rem] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Featured Projects
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto mb-10">
            No featured projects are published yet for this role.
            If you were expecting work here, check the full projects page or return soon.
          </p>
          <div className="rounded-3xl border border-dashed border-secondary/30 bg-secondary/5 p-10">
            <p className="text-base text-stone-600/80">
              I’m still adding work for this area. Your portfolio section will display once projects are available.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
    case "ecommerce-developer":
      return <EcommerceProjects projects={projects} role={activeRole} />;
    case "cpa":
      return <CPAProjects projects={projects} role={activeRole} />;
    case "sales-representative":
      return <SalesProjects projects={projects} role={activeRole} />;
    case "virtual-assistant":
      return <VAProjects projects={projects} role={activeRole} />;

    default:
      return <StandardProjects projects={projects} role={activeRole} />;
  }
}
