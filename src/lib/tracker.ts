import { createBrowserClient } from "@supabase/ssr";

/**
 * Tracks a user interaction event for either a gateway link or an organic role visit.
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

    const roleKey = cookies["portfolio_role"];

    // Keep organic role analytics separate from generated-link analytics.
    if (!linkId && !roleKey) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `Tracker: Logging ${eventName} for ${linkId ? `link ${linkId}` : `role ${roleKey}`}`,
      );
    }

    // 3. Initialize Supabase Browser Client
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    );

    // 4. Fire and forget the event logging
    const { error } = await supabase.from("gateway_events").insert({
      link_id: linkId || null,
      role_key: linkId ? null : roleKey,
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
