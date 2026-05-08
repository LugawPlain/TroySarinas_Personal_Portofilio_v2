"use client";

import { useEffect, useRef } from "react";
import { trackInteraction } from "@/lib/tracker";

interface TrackedSectionProps {
  id: string;
  children: React.ReactNode;
  /**
   * How much of the section must be visible (0 to 1).
   * Default is 0.5 (50% visibility)
   */
  threshold?: number;
  /**
   * Minimum time in milliseconds to count as a valid "view".
   * Default is 3000ms (3 seconds)
   */
  minTime?: number;
  metadata?: any;
}

/**
 * A wrapper component that tracks when a section is viewed by an employer.
 * It uses the Intersection Observer API to detect visibility and a timer
 * to ensure we only log meaningful "dwell time" views.
 */
export const TrackedSection = ({
  id,
  children,
  threshold = 0.5,
  minTime = 3000,
  metadata = {},
}: TrackedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasLogged = useRef(false);

  useEffect(() => {
    // Only set up observer if we haven't already logged this view in this session
    // (We don't want to spam the database every time they scroll up and down)
    if (hasLogged.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Recruiter is looking at this section, start the timer
            timerRef.current = setTimeout(() => {
              trackInteraction(
                "section_view",
                { ...metadata, duration_min: minTime / 1000 },
                id,
              );
              hasLogged.current = true;
              // Once logged, we can stop observing this specific instance
              observer.disconnect();
            }, minTime);
          } else {
            // Recruiter scrolled away before the threshold time, clear the timer
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }
        });
      },
      { threshold },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [id, threshold, minTime, metadata]);

  return (
    <div ref={sectionRef} data-section-id={id}>
      {children}
    </div>
  );
};
