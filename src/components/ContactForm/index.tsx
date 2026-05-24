"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardContactForm from "./variants/Standard";
import SoftwareEngineerContactForm from "./variants/SoftwareEngineer";
import CinematicContactForm from "./variants/Cinematic";
import GTMContactForm from "./variants/GTM";

export default function ContactForm() {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerContactForm />;
    case "video-editor":
      return <CinematicContactForm />;
    case "gtm-engineer":
      return <GTMContactForm />;
    default:
      return <StandardContactForm />;
  }
}
