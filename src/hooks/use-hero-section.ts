"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useResumeModal } from "@/contexts/ResumeModalContext";
import { useTrack } from "./use-track";

interface UseHeroSectionReturn {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  handleResumeClick: () => void;
  trackContactOpen: (metadata?: Record<string, any>) => void;
}

/**
 * Shared hook for HeroSection variants.
 * Manages modal state, resume navigation, and analytics tracking.
 * Use this in every HeroSection variant to avoid duplicating logic.
 */
export function useHeroSection(resumeUrl?: string): UseHeroSectionReturn {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeModal = useResumeModal();

  const trackResumeOpen = useTrack("resume_view", "hero");
  const trackContactOpen = useTrack("contact_open", "hero");

  const handleResumeClick = useCallback(() => {
    trackResumeOpen({ url: resumeUrl, source: "hero_button" });
    if (resumeUrl) {
      // open via global resume modal so footer and hero share behavior
      try {
        resumeModal.openResume(resumeUrl);
      } catch (e) {
        // fallback to navigation if provider not mounted
        router.push("/?resume=true");
      }
    } else {
      router.push("/?resume=true");
    }
  }, [resumeUrl, router, trackResumeOpen, resumeModal]);

  return {
    isContactModalOpen,
    setIsContactModalOpen,
    isResumeOpen,
    setIsResumeOpen,
    handleResumeClick,
    trackContactOpen,
  };
}
