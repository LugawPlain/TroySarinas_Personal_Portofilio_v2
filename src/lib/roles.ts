import { createClient } from "@/lib/supabase/server";
import { unstable_cache } from "next/cache";

export interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

export interface ExperienceHighlights {
  icon?: string;
  title: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  highlights: ExperienceHighlights[];
  technologies: string[];
  logo_url: string;
  logo_bg_color: string;
}

export interface HeroConfig {
  subHeadline?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  showAvatar: boolean;
  showStatusCards: boolean;
  showSocialLinks: boolean;
  displayName: string;
  accentColor?: string;
  avatarUrl?: string;
}

export interface ChatConfig {
  accentColor?: string;
  welcomeMessage?: string;
  suggestedQuestions?: string[];
  avatarIcon?: string;
  typingIndicator?: string;
  statusText?: string;
}

export interface JobRole {
  id: string;
  slug: string;
  title: string;
  headline: string;
  bio: string;
  hero_config: HeroConfig;
  chat_config?: ChatConfig;
  chat_persona?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  logo_url: string;
  description: string;
  highlights: { icon: string; text: string }[];
  website_url?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  description: string;
  logo_url: string;
  logo_alt: string;
  cert_url?: string;
  is_webinar: boolean;
  organizer?: string;
}

/**
 * Fetches all technologies linked to a specific role.
 * If no role is provided, fetches all technologies.
 */
export async function getTechnologies(role?: string): Promise<TechItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("technologies")
    .select(role ? "*, role_technologies!inner(job_roles!inner(slug))" : "*");

  if (role) {
    query = query.eq("role_technologies.job_roles.slug", role);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tech:", error);
    return [];
  }

  return (data as any[]).map((t) => ({
    name: t.name,
    icon_name: t.icon_name,
    proficiency: t.proficiency,
  }));
}

/**
 * Fetches all experience items linked to a specific role.
 * If no role is provided, fetches all experience.
 */
export async function getExperience(role?: string): Promise<ExperienceItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("experience")
    .select(role ? "*, role_experience!inner(job_roles!inner(slug))" : "*")
    .order("display_order", { ascending: true });

  if (role) {
    query = query.eq("role_experience.job_roles.slug", role);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching experience:", error);
    return [];
  }

  return (data as any[]).map((exp) => ({
    id: exp.id,
    company: exp.company,
    title: exp.title,
    period: exp.period,
    location: exp.location,
    description: exp.description,
    highlights: exp.highlights || [],
    technologies: exp.technologies || [],
    logo_url: exp.logo_url,
    logo_bg_color: exp.logo_bg_color,
  }));
}

/**
 * Fetches the core role metadata (headline, bio) from the DB.
 */
export async function getRoleMetadata(role: string): Promise<JobRole | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_roles")
    .select("*")
    .eq("slug", role)
    .single();

  if (error) {
    console.error("Error fetching role metadata:", error);
    return null;
  }

  return data as JobRole;
}

/**
 * Fetches chat configuration and persona for a specific role.
 */
export async function getChatConfig(role: string): Promise<{ config: ChatConfig | null; persona: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_roles")
    .select("chat_config, chat_persona")
    .eq("slug", role)
    .single();

  if (error) {
    console.error("Error fetching chat config:", error);
    return { config: null, persona: null };
  }

  return {
    config: data?.chat_config as ChatConfig || null,
    persona: data?.chat_persona || null,
  };
}

export async function getEducation(role?: string): Promise<EducationItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("education")
    .select(role ? "*, role_education!inner(job_roles!inner(slug))" : "*")
    .order("display_order", { ascending: true });

  if (role) {
    query = query.eq("role_education.job_roles.slug", role);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching education:", error);
    return [];
  }

  return (data as any[]).map((e) => ({
    id: e.id,
    school: e.school,
    degree: e.degree,
    period: e.period,
    logo_url: e.logo_url,
    description: e.description,
    highlights: e.highlights || [],
    website_url: e.website_url,
  }));
}

export async function getCertifications(
  role?: string,
): Promise<CertificationItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("certifications")
    .select(role ? "*, role_certifications!inner(job_roles!inner(slug))" : "*")
    .order("display_order", { ascending: true });

  if (role) {
    query = query.eq("role_certifications.job_roles.slug", role);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching certs:", error);
    return [];
  }

  return (data as any[]).map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    logo_url: c.logo_url,
    logo_alt: c.logo_alt,
    cert_url: c.cert_url,
    is_webinar: c.is_webinar,
    organizer: c.organizer,
  }));
}
