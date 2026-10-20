"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const AutomationEngineerFooter = () => {
  const { role } = usePortfolio();
  const roleHome = `/portfolio/${role}`;

  const stages = [
    { number: "1.0", label: "Capabilities", href: `${roleHome}#capabilities` },
    { number: "2.0", label: "Work", href: `${roleHome}#projects` },
    { number: "3.0", label: "Process", href: `${roleHome}#approach` },
    { number: "4.0", label: "Toolkit", href: `${roleHome}#technologies` },
    { number: "5.0", label: "Record", href: `${roleHome}#experience` },
    { number: "A.0", label: "Archive", href: `${roleHome}/projects` },
  ];

  return (
    <footer className="automation-footer" id="contact">
      <div className="automation-footer-inner">
        <p className="automation-stage">
          <span>6.0</span> Next step
        </p>
        <p className="automation-footer-statement">
          Make the repetitive work disappear.
        </p>
        <Link className="automation-footer-cta" href={`${roleHome}#workflow-brief`}>
          Map my workflow <ArrowUpRight aria-hidden="true" />
        </Link>

        <div className="automation-footer-status">
          <span className="automation-footer-availability">
            <span className="automation-console-dot" aria-hidden="true" />
            Open to engagements
          </span>
          <a className="automation-footer-mail" href="mailto:troyjeffreysarinas@gmail.com">
            troyjeffreysarinas@gmail.com
          </a>
          <a className="automation-footer-top" href="#overview">
            Back to top <ArrowUp aria-hidden="true" />
          </a>
        </div>

        <div className="automation-footer-meta">
          <Link className="automation-brand" href={roleHome}>
            <span>Troy Sarinas</span>
            <span className="automation-brand-role">AI / workflow automation</span>
          </Link>
          <nav className="automation-footer-index" aria-label="Page sections">
            {stages.map((stage) => (
              <Link key={stage.number} href={stage.href}>
                <span>{stage.number}</span> {stage.label}
              </Link>
            ))}
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
