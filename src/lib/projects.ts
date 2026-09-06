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
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoType?: "lead-generator";
  displayOrder: number;
}

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  technologies: string[] | null;
  tags: string[] | null;
  live_url: string | null;
  github_url: string | null;
  demo_type: "lead-generator" | null;
  display_order: number;
  created_at?: string;
  role_projects?: Array<{
    is_featured: boolean;
    display_order: number | null;
    featured_display_order: number | null;
  }>;
}

export interface GetProjectsOptions {
  featuredOnly?: boolean;
}

export async function getProjects(
  role?: string,
  options: GetProjectsOptions = {},
): Promise<Project[]> {
  const { featuredOnly = false } = options;

  let query = supabase
    .from("projects")
    .select(
      role
        ? "*, role_projects!inner(job_roles!inner(slug), is_featured, display_order, featured_display_order)"
        : "*",
    )
    .eq("is_published", true);

  if (role) {
    query = query.eq("role_projects.job_roles.slug", role);

    if (featuredOnly) {
      query = query.eq("role_projects.is_featured", true);
    }

    query = query
      .order("is_featured", {
        foreignTable: "role_projects",
        ascending: false,
      })
      .order("featured_display_order", {
        foreignTable: "role_projects",
        ascending: true,
      })
      .order("display_order", {
        foreignTable: "role_projects",
        ascending: true,
      });
  } else {
    query = query.order("display_order", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  const mappedProjects = (data as unknown as ProjectRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.thumbnail_url || null,
    clickedImage: item.hero_image_url || item.thumbnail_url || null,
    technologies: item.technologies || [],
    tags: item.tags || [],
    liveUrl: item.live_url || undefined,
    githubUrl: item.github_url || undefined,
    demoType: item.demo_type || undefined,
    displayOrder: item.display_order,
  }));

  if (!role) return mappedProjects;

  return mappedProjects.sort((a, b) => {
    const aRow = (data as unknown as ProjectRow[]).find(
      (item) => item.id === a.id,
    )?.role_projects?.[0];
    const bRow = (data as unknown as ProjectRow[]).find(
      (item) => item.id === b.id,
    )?.role_projects?.[0];

    if (!aRow || !bRow) return 0;
    if (aRow.is_featured !== bRow.is_featured) {
      return aRow.is_featured ? -1 : 1;
    }

    const aOrder = aRow.is_featured
      ? aRow.featured_display_order
      : aRow.display_order;
    const bOrder = bRow.is_featured
      ? bRow.featured_display_order
      : bRow.display_order;

    return (aOrder ?? Number.MAX_SAFE_INTEGER) -
      (bOrder ?? Number.MAX_SAFE_INTEGER);
  });
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
    tags: project.tags || [],
    liveUrl: project.live_url || undefined,
    githubUrl: project.github_url || undefined,
    demoType: project.demo_type || undefined,
    displayOrder: project.display_order,
  };
}
