"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardEducation from "./variants/Standard";
import { EducationItem } from "@/lib/roles";

interface EducationProps {
  educationItems: EducationItem[];
  role?: string;
}

export default function Education({
  educationItems = [],
  role: propRole,
}: EducationProps) {
  const { role: contextRole } = usePortfolio();
  const activeRole = contextRole || propRole;

  switch (activeRole) {
    // case "video-editor": return <CinematicEducation educationItems={educationItems} />;

    default:
      return <StandardEducation educationItems={educationItems} />;
  }
}
