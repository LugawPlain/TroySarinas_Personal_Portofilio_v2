"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createGatewayLink(prevState: any, formData: FormData) {
  const job_role = formData.get("job_role") as string;
  const label = formData.get("label") as string;
  const job_url = formData.get("job_url") as string;

  if (!job_role || !label) {
    return { error: "Missing required fields" };
  }

  // Generate a random-looking version slug
  // Format: x.xx.xxx
  const ver = `${Math.floor(Math.random() * 9) + 1}.${Math.floor(
    Math.random() * 99,
  )
    .toString()
    .padStart(2, "0")}.${Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0")}`;

  const supabase = await createClient();

  const { error } = await supabase.from("gateway_links").insert([
    {
      version_slug: ver,
      target_role: job_role,
      label: label,
      is_active: true,
      job_url: job_url || null,
    },
  ]);

  if (error) {
    console.error("Error creating link:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true, message: "Link created successfully!" };
}

export async function deleteGatewayLink(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gateway_links").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function getInteractionEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gateway_events")
    .select(
      `
      *,
      gateway_links (
        label,
        target_role
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data;
}

export async function getRoleAnalytics(roleKeys: string[]) {
  if (roleKeys.length === 0) return {};

  const supabase = await createClient();

  const [
    { data: visits, error: visitsError },
    { data: events, error: eventsError },
  ] = await Promise.all([
    supabase
      .from("portfolio_role_visits")
      .select("role_key, ip_hash, visited_at")
      .in("role_key", roleKeys),
    supabase
      .from("gateway_events")
      .select("role_key, event_name, section, created_at")
      .in("role_key", roleKeys),
  ]);

  if (visitsError || eventsError) {
    console.error("Error fetching role analytics:", visitsError || eventsError);
    return {};
  }

  const analytics: Record<
    string,
    {
      totalVisits: number;
      uniqueVisitors: number;
      totalEvents: number;
      sectionViews: Record<string, number>;
      recentEvents: any[];
    }
  > = {};

  roleKeys.forEach((roleKey) => {
    const roleVisits = (visits || []).filter(
      (visit) => visit.role_key === roleKey,
    );
    const roleEvents = (events || []).filter(
      (event) => event.role_key === roleKey,
    );
    const sectionViews: Record<string, number> = {};

    roleEvents.forEach((event) => {
      if (event.event_name === "section_view" && event.section) {
        sectionViews[event.section] = (sectionViews[event.section] || 0) + 1;
      }
    });

    analytics[roleKey] = {
      totalVisits: roleVisits.length,
      uniqueVisitors: new Set(roleVisits.map((visit) => visit.ip_hash)).size,
      totalEvents: roleEvents.length,
      sectionViews,
      recentEvents: roleEvents.slice(0, 5),
    };
  });

  return analytics;
}

export async function getLinkAnalytics(linkId: string) {
  const supabase = await createClient();

  // Get all visits for this link
  const { data: visits, error: visitsError } = await supabase
    .from("gateway_visits")
    .select("*")
    .eq("link_id", linkId)
    .order("visited_at", { ascending: false });

  // Get all events for this link
  const { data: events, error: eventsError } = await supabase
    .from("gateway_events")
    .select("*")
    .eq("link_id", linkId)
    .order("created_at", { ascending: false });

  if (visitsError || eventsError) {
    console.error("Error fetching analytics:", visitsError || eventsError);
    return null;
  }

  // Process analytics
  const totalVisits = visits?.length || 0;

  // Unique visitors by ip_hash
  const uniqueVisitors = new Set(visits?.map((v) => v.ip_hash) || []).size;

  // Visits by day (last 30 days)
  const visitsByDay: Record<string, number> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    visitsByDay[d.toISOString().split("T")[0]] = 0;
  }

  visits?.forEach((v) => {
    const day = v.visited_at?.split("T")[0];
    if (day && visitsByDay[day] !== undefined) {
      visitsByDay[day]++;
    }
  });

  // Device breakdown from user_agent
  const deviceBreakdown = {
    desktop: 0,
    mobile: 0,
    tablet: 0,
    unknown: 0,
  };

  const browserBreakdown: Record<string, number> = {};

  visits?.forEach((v) => {
    const ua = v.user_agent || "";
    if (ua.match(/Mobile|Android|iPhone/i) && !ua.match(/iPad/i)) {
      deviceBreakdown.mobile++;
    } else if (ua.match(/iPad|Tablet/i)) {
      deviceBreakdown.tablet++;
    } else if (ua.match(/Windows|Mac|Linux/i)) {
      deviceBreakdown.desktop++;
    } else {
      deviceBreakdown.unknown++;
    }

    // Browser detection
    let browser = "Unknown";
    if (ua.match(/Chrome/i)) browser = "Chrome";
    else if (ua.match(/Firefox/i)) browser = "Firefox";
    else if (ua.match(/Safari/i) && !ua.match(/Chrome/i)) browser = "Safari";
    else if (ua.match(/Edge/i)) browser = "Edge";
    else if (ua.match(/Opera/i)) browser = "Opera";

    browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
  });

  // Section engagement from events
  const sectionViews: Record<string, number> = {};
  const eventTypes: Record<string, number> = {};

  events?.forEach((e) => {
    if (e.event_name === "section_view" && e.section) {
      sectionViews[e.section] = (sectionViews[e.section] || 0) + 1;
    }
    eventTypes[e.event_name] = (eventTypes[e.event_name] || 0) + 1;
  });

  // Time distribution (hour of day)
  const hourlyDistribution = new Array(24).fill(0);
  visits?.forEach((v) => {
    const hour = new Date(v.visited_at).getHours();
    hourlyDistribution[hour]++;
  });

  return {
    totalVisits,
    uniqueVisitors,
    visitsByDay,
    deviceBreakdown,
    browserBreakdown,
    sectionViews,
    eventTypes,
    hourlyDistribution,
    recentEvents: events?.slice(0, 20) || [],
    recentVisits: visits?.slice(0, 20) || [],
  };
}
