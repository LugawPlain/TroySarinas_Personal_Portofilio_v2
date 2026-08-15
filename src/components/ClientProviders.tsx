"use client";

import React from "react";
import { CursorProvider } from "@/components/CursorProvider";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ResumeModalProvider } from "@/contexts/ResumeModalContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <ResumeModalProvider>
        <CursorProvider>
          <ContactModalProvider>{children}</ContactModalProvider>
        </CursorProvider>
      </ResumeModalProvider>
    </PortfolioProvider>
  );
}
