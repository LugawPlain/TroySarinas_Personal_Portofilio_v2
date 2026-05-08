"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardCertifications from "./variants/Standard";
import { CertificationItem } from "@/lib/roles";

interface CertificationsProps {
  certifications: CertificationItem[];
  role?: string;
  title?: string;
  subtitle?: string;
}

export default function Certifications({
  certifications = [],
  role: propRole,
  title,
  subtitle,
}: CertificationsProps) {
  const { role: contextRole } = usePortfolio();
  const activeRole = contextRole || propRole;

  switch (activeRole) {
    // case "video-editor": return <CinematicCertifications certifications={certifications} />;

    default:
      return (
        <StandardCertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
  }
}
