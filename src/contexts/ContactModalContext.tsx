"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContactModalContextType {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (isOpen: boolean) => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export const ContactModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <ContactModalContext.Provider
      value={{ isContactModalOpen, setIsContactModalOpen }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = (): ContactModalContextType => {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider"
    );
  }
  return context;
};
