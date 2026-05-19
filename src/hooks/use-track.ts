import { trackInteraction } from "@/lib/tracker";

/**
 * A hook that returns a tracking function for a specific event.
 * Usage:
 *   const trackResume = useTrack("resume_download", "hero");
 *   <button onClick={() => trackResume({ format: "pdf" })}>Download</button>
 */
export function useTrack(eventName: string, section?: string) {
  return (metadata?: Record<string, any>) => {
    trackInteraction(eventName, metadata, section);
  };
}
