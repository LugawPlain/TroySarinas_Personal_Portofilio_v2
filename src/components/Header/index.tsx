"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardHeader from "./variants/Standard";
import SoftwareEngineerHeader from "./variants/SoftwareEngineer";

export default function Header() {
  const { role } = usePortfolio();

  switch (role) {
    case "software-engineer":
      return <SoftwareEngineerHeader />;

    default:
      return <StandardHeader />;
  }
}
