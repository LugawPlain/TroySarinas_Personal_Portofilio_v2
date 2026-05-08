import { createBrowserClient } from "@supabase/ssr";

/**
 * Tracks a user interaction event if they visited via a tracking link.
 * Only fires if the 'visitor_link_id' cookie is present.
 */
export const trackInteraction = async (
  eventName: string,
  metadata: any = {},
  section?: string,
) => {
  // Ensure we are on the client
  if (typeof window === "undefined") return;

  try {
    // 1. Extract the visitor_link_id from cookies
    const cookies = document.cookie.split(";").reduce((acc: any, curr) => {
      const splitPoint = curr.indexOf("=");
      if (splitPoint === -1) return acc;
      const name = curr.substring(0, splitPoint).trim();
      const value = curr.substring(splitPoint + 1);
      acc[name] = value;
      return acc;
    }, {});

    const linkId = cookies["visitor_link_id"];

    // 2. Only track if this is a known employer (linkId present)
    if (!linkId) {
      if (process.env.NODE_ENV !== "production") {
        console.log(
          "Tracker: No visitor_link_id found in cookies. Skipping tracking.",
        );
      }
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`Tracker: Logging ${eventName} for link ${linkId}`);
    }

    // 3. Initialize Supabase Browser Client
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    );

    // 4. Fire and forget the event logging
    const { error } = await supabase.from("gateway_events").insert({
      link_id: linkId,
      event_name: eventName,
      section: section,
      metadata: metadata,
    });

    if (error) {
      console.error("Tracking Error:", error.message);
    }
  } catch (err) {
    // Silent fail in production to avoid crashing the UI
    if (process.env.NODE_ENV !== "production") {
      console.error("Tracker Failure:", err);
    }
  }
};
