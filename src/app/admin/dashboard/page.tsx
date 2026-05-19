import { createClient } from "@/lib/supabase/server";
import { DashboardTabs } from "./DashboardTabs";

async function getDashboardData() {
  const supabase = await createClient();

  const [
    { data: roles },
    { data: technologies },
    { data: experience },
    { data: roleTech },
    { data: roleExp },
    { data: roleEducation },
    { data: roleCertifications },
    { data: roleProjects },
    { data: roleBlogs },
    { data: links },
    { count: totalVisits },
    { data: resumes },
    { data: projects },
    { data: blogs },
    { data: education },
    { data: certifications },
  ] = await Promise.all([
    supabase.from("job_roles").select("*").order("title"),
    supabase.from("technologies").select("*").order("name"),
    supabase.from("experience").select("*").order("display_order"),
    supabase.from("role_technologies").select("*"),
    supabase.from("role_experience").select("*"),
    supabase.from("role_education").select("*"),
    supabase.from("role_certifications").select("*"),
    supabase.from("role_projects").select("*"),
    supabase.from("role_blogs").select("*"),
    supabase
      .from("gateway_links")
      .select("*, gateway_visits (count)")
      .order("created_at", { ascending: false }),
    supabase.from("gateway_visits").select("*", { count: "exact", head: true }),
    supabase.from("gateway_resumes").select("*"),
    supabase.from("projects").select("*").order("title"),
    supabase.from("blogs").select("*").order("date", { ascending: false }),
    supabase.from("education").select("*").order("school"),
    supabase.from("certifications").select("*").order("title"),
  ]);

  const linkResumesMap = new Map<string, any>();
  (resumes || []).forEach((resume: any) => {
    if (resume.link_id) {
      linkResumesMap.set(resume.link_id, resume);
    }
  });

  return {
    links: links || [],
    linkResumesMap,
    resumes: resumes || [],
    roles: roles || [],
    technologies: technologies || [],
    experience: experience || [],
    roleTech: roleTech || [],
    roleExp: roleExp || [],
    roleEducation: roleEducation || [],
    roleCert: roleCertifications || [],
    roleProj: roleProjects || [],
    roleBlog: roleBlogs || [],
    projects: projects || [],
    blogs: blogs || [],
    education: education || [],
    certifications: certifications || [],
    stats: {
      totalLinks: links?.length || 0,
      totalVisits: totalVisits || 0,
      activeRoles: roles?.length || 0,
    },
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardTabs
      links={data.links}
      linkResumesMap={data.linkResumesMap}
      resumes={data.resumes}
      roles={data.roles}
      technologies={data.technologies}
      experience={data.experience}
      roleTech={data.roleTech}
      roleExp={data.roleExp}
      roleEducation={data.roleEducation}
      roleCert={data.roleCert}
      roleProj={data.roleProj}
      roleBlog={data.roleBlog}
      projects={data.projects}
      blogs={data.blogs}
      education={data.education}
      certifications={data.certifications}
      stats={data.stats}
    />
  );
}
