import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  clickedImage: string | null;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  technologies: string[] | null;
  live_url: string | null;
  github_url: string | null;
  created_at?: string;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });
  
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data as unknown as ProjectRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.thumbnail_url || null,
    clickedImage: item.hero_image_url || item.thumbnail_url || null,
    technologies: item.technologies || [],
    liveUrl: item.live_url || undefined,
    githubUrl: item.github_url || undefined,
  }));
}

export async function getProject(id: string): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return undefined;
  }

  const project = data as unknown as ProjectRow;

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.thumbnail_url || null,
    clickedImage: project.hero_image_url || project.thumbnail_url || null,
    technologies: project.technologies || [],
    liveUrl: project.live_url || undefined,
    githubUrl: project.github_url || undefined,
  };
}

