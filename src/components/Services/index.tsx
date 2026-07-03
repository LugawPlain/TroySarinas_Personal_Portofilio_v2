"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import VAServices from "./variants/VA";

interface ServicesProps {
  role?: string;
}

export default function Services({ role: propRole }: ServicesProps) {
  const { role: contextRole } = usePortfolio();
  const activeRole = contextRole || propRole;

  switch (activeRole) {
    case "virtual-assistant":
      return <VAServices />;
    default:
      return null;
  }
}
