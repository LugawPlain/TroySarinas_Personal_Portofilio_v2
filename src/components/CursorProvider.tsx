"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CursorContextType {
  isCursorEffectEnabled: boolean;
  setIsCursorEffectEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

const CURSOR_EFFECT_KEY = "cursorEffectEnabled";

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEffectEnabled, setIsCursorEffectEnabled] = useState(() => {
    // Initialize from localStorage if available, default to true
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CURSOR_EFFECT_KEY);
      return stored !== null ? JSON.parse(stored) : true;
    }
    return true;
  });

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        CURSOR_EFFECT_KEY,
        JSON.stringify(isCursorEffectEnabled)
      );
    }
  }, [isCursorEffectEnabled]);

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
