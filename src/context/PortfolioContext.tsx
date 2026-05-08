"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";

interface PortfolioContextType {
  role: string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

export function PortfolioProvider({
  children,
  role: manualRole,
}: {
  children: ReactNode;
  role?: string;
}) {
  const params = useParams();
  const pathname = usePathname();

  // Detection logic:
  // 1. Manual prop (passed directly)
  // 2. Dynamic route param [role]
  // 3. Current URL segment (for static routes like /portfolio/software-engineer)
  // 4. Default fallback
  const getRole = () => {
    if (manualRole) return manualRole;
    if (params?.role) return params.role as string;

    // Extract role from pathname: /portfolio/[role]/...
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
