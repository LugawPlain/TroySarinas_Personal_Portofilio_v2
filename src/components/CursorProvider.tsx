"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CursorContextType {
  isCursorEffectEnabled: boolean;
  setIsCursorEffectEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEffectEnabled, setIsCursorEffectEnabled] = useState(true);

  return (
    <CursorContext.Provider
      value={{ isCursorEffectEnabled, setIsCursorEffectEnabled }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
