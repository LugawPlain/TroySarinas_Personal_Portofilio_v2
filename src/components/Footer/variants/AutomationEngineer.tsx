"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const AutomationEngineerFooter = () => {
  const { role } = usePortfolio();
  const roleHome = `/portfolio/${role}`;

  return (
    <footer className="automation-footer" id="contact">
      <div className="automation-footer-inner">
        <p className="automation-footer-statement">
          Make the repetitive work disappear.
        </p>
        <Link className="automation-footer-cta" href={`${roleHome}#workflow-brief`}>
          Map my workflow <ArrowUpRight aria-hidden="true" />
        </Link>
        <div className="automation-footer-meta">
          <Link className="automation-brand" href={roleHome}>
            <span>Troy Sarinas</span>
            <span className="automation-brand-role">AI / workflow automation</span>
          </Link>
          <nav className="automation-footer-links" aria-label="Footer">
            <Link href={`${roleHome}#capabilities`}>Capabilities</Link>
            <Link href={`${roleHome}#projects`}>Work</Link>
            <a href="mailto:troyjeffreysarinas@gmail.com">Email</a>
          </nav>
          <p className="automation-footer-role">
            © {new Date().getFullYear()} Troy Sarinas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AutomationEngineerFooter;