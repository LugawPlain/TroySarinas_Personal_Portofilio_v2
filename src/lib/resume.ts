import { createClient } from "./supabase/server";
import { cookies } from "next/headers";

/**
 * Resumes priority: employer-specific → role-default → null
 * Reads visitor_link_id cookie to check for employer-specific resume
 */
export async function getResumeForRole(role: string): Promise<string | undefined> {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const linkId = cookieStore.get("visitor_link_id")?.value;

  // 1. Try employer-specific resume (if visitor came via tracking link)
  if (linkId) {
    const { data: employerResume } = await supabase
      .from("gateway_resumes")
      .select("resume_url")
      .eq("role_key", role)
      .eq("link_id", linkId)
      .single();

    if (employerResume?.resume_url) {
      return employerResume.resume_url;
    }
  }

  // 2. Fallback to role default
  const { data: defaultResume } = await supabase
    .from("gateway_resumes")
    .select("resume_url")
    .eq("role_key", role)
    .is("link_id", null)
    .single();

  return defaultResume?.resume_url || undefined;
}

/**
 * Get all resumes for a role (both default and employer-specific)
 * Used in dashboard
 */
export async function getResumesForRole(role: string) {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from("gateway_resumes")
    .select("*")
    .eq("role_key", role)
    .order("created_at", { ascending: false });

  return data || [];
}