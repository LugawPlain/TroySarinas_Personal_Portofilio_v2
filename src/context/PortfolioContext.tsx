"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";

interface PortfolioContextType {
  role: string;
}

// HMR-safe context: store on globalThis so hot reloads don't create orphaned instances
const globalForContext = globalThis as unknown as {
  __PortfolioContext?: React.Context<PortfolioContextType | undefined>;
};

const PortfolioContext =
  globalForContext.__PortfolioContext ??
  createContext<PortfolioContextType | undefined>(undefined);

globalForContext.__PortfolioContext = PortfolioContext;

export function PortfolioProvider({
  children,
  role: manualRole,
}: {
  children: ReactNode;
  role?: string;
}) {
  const params = useParams();
  const pathname = usePathname();

  const getRole = () => {
    if (manualRole) return manualRole;
    if (params?.role) return params.role as string;

    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "portfolio" && segments[1]) {
      return segments[1];
    }

    return "software-engineer";
  };

  const role = getRole();

  return (
    <PortfolioContext.Provider value={{ role }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error(
      "usePortfolio must be used within a PortfolioProvider. Ensure layout.tsx wraps components with PortfolioProvider.",
    );
  }
  return context;
}
