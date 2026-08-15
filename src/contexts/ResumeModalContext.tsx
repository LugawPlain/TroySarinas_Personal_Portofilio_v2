"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Resume from "@/components/Resume";

interface ResumeModalContextType {
  isOpen: boolean;
  resumeUrl?: string;
  openResume: (url?: string) => void;
  closeResume: () => void;
  setResumeUrl: (url?: string) => void;
}

const globalForResumeModal = globalThis as unknown as {
  __ResumeModalContext?: React.Context<ResumeModalContextType | undefined>;
};

const ResumeModalContext =
  globalForResumeModal.__ResumeModalContext ??
  createContext<ResumeModalContextType | undefined>(undefined);

globalForResumeModal.__ResumeModalContext = ResumeModalContext;

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined);

  const openResume = (url?: string) => {
    if (url) setResumeUrl(url);
    setIsOpen(true);
  };

  const closeResume = () => setIsOpen(false);

  const value: ResumeModalContextType = {
    isOpen,
    resumeUrl,
    openResume,
    closeResume,
    setResumeUrl,
  };

  return (
    <ResumeModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <Resume resumeUrl={resumeUrl} onClose={() => closeResume()} />
      ) : null}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (ctx === undefined) {
    throw new Error(
      "useResumeModal must be used within a ResumeModalProvider. Wrap your app with ResumeModalProvider.",
    );
  }
  return ctx;
}

export default ResumeModalContext;
