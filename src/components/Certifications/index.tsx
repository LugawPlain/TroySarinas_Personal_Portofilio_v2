"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardCertifications from "./variants/Standard";
import SoftwareEngineerCertifications from "./variants/SoftwareEngineer";
import GTMCertifications from "./variants/GTM";
import CinematicCertifications from "./variants/Cinematic";
import DataCertifications from "./variants/Data";
import SocialCertifications from "./variants/Social";
import MarketingCertifications from "./variants/Marketing";
import CPACertifications from "./variants/CPA";
import SalesCertifications from "./variants/Sales";
import VACertifications from "./variants/VA";
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
    case "software-engineer":
      return (
        <SoftwareEngineerCertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
    case "gtm-engineer":
      return (
        <GTMCertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
    case "video-editor":
      return (
        <CinematicCertifications
          certifications={certifications}
        />
      );
    case "data-analyst":
      return (
        <DataCertifications
          certifications={certifications}
        />
      );
    case "social-media-manager":
      return (
        <SocialCertifications
          certifications={certifications}
        />
      );
    case "marketing-manager":
      return (
        <MarketingCertifications
          certifications={certifications}
        />
      );
    case "ecommerce-developer":
      return (
        <StandardCertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
    case "cpa":
      return (
        <CPACertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
    case "sales-representative":
      return (
        <SalesCertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );
    case "virtual-assistant":
      return (
        <VACertifications
          certifications={certifications}
          title={title}
          subtitle={subtitle}
        />
      );

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
