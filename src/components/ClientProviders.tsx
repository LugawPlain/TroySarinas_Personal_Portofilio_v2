"use client";

import React from "react";
import { CursorProvider } from "@/components/CursorProvider";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { PortfolioProvider } from "@/context/PortfolioContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <CursorProvider>
        <ContactModalProvider>{children}</ContactModalProvider>
      </CursorProvider>
    </PortfolioProvider>
  );
}
