"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardEducation from "./variants/Standard";
import SoftwareEngineerEducation from "./variants/SoftwareEngineer";
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
    case "software-engineer":
      return <SoftwareEngineerEducation educationItems={educationItems} />;
    case "ecommerce-developer":
      return <StandardEducation educationItems={educationItems} />;
    // case "video-editor": return <CinematicEducation educationItems={educationItems} />;

    default:
      return <StandardEducation educationItems={educationItems} />;
  }
}
