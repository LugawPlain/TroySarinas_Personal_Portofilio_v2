"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const AutomationEngineerHeader = () => {
  const { role } = usePortfolio();
  const roleHome = `/portfolio/${role}`;

  return (
    <header className="automation-header">
      <div className="automation-header-inner">
        <Link className="automation-brand" href={roleHome} aria-label="Troy Sarinas, Automation Engineer">
          <span>Troy Sarinas</span>
          <span className="automation-brand-role">AI / workflow automation</span>
        </Link>

        <nav className="automation-nav" aria-label="Automation portfolio">
          <Link href={`${roleHome}#capabilities`}>Capabilities</Link>
          <Link href={`${roleHome}#projects`}>Selected work</Link>
          <Link href={`${roleHome}#approach`}>Approach</Link>
        </nav>

        <Link className="automation-nav-contact" href={`${roleHome}#workflow-brief`}>
          Map my workflow <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

export default AutomationEngineerHeader;