import { createClient } from "@/lib/supabase/server";
import {
  Link2,
  MousePointer2,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import {
  LinkGeneratorForm,
  LinkActions,
  ResumeManager,
} from "./DashboardComponents";
import { PortfolioContentManager } from "./PortfolioManager";

async function getDashboardData() {
  const supabase = await createClient();

  // Parallel data fetching for maximum performance
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

  return {
    links: links || [],
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
  const {
    links,
    stats,
    resumes,
    roles,
    technologies,
    experience,
    roleTech,
    roleExp,
    roleEducation,
    roleCert,
    roleProj,
    roleBlog,
    projects,
    blogs,
    education,
    certifications,
  } = await getDashboardData();

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Full control over your camouflage links and role-specific content.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Gateway Protocol Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Links"
          value={stats.totalLinks}
          icon={<Link2 className="w-5 h-5 text-accent" />}
          description="Generated camouflage links"
        />
        <StatCard
          title="Total Visits"
          value={stats.totalVisits}
          icon={<MousePointer2 className="w-5 h-5 text-blue-500" />}
          description="Total clicks across all links"
        />
        <StatCard
          title="Active Roles"
          value={stats.activeRoles}
          icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
          description="Configured portfolio variants"
        />
      </div>

      {/* Role Portfolio Content Manager (NEW) */}
      <section id="content-management">
        <PortfolioContentManager
          roles={roles}
          technologies={technologies}
          experience={experience}
          projects={projects}
          blogs={blogs}
          education={education}
          certifications={certifications}
          resumes={resumes}
          roleTech={roleTech}
          roleExp={roleExp}
          roleEducation={roleEducation}
          roleCert={roleCert}
          roleProj={roleProj}
          roleBlog={roleBlog}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Forms */}
        <div className="lg:col-span-1 space-y-8">
          <LinkGeneratorForm />
          <ResumeManager initialResumes={resumes} />
        </div>

        {/* Right Side: Links Table */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Gateway Links</h2>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                View all logs
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead className="bg-muted/50 text-xs uppercase font-medium text-muted-foreground border-b">
                  <tr>
                    <th className="px-6 py-4">Label & Version</th>
                    <th className="px-6 py-4">Target Role</th>
                    <th className="px-6 py-4 text-center">Clicks</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {links.length > 0 ? (
                    links.map((link) => (
                      <tr
                        key={link.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm">
                            {link.label || "Untitled"}
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                            ver={link.version_slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 capitalize">
                            {link.target_role.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`text-sm font-bold ${link.gateway_visits?.[0]?.count > 0 ? "text-foreground" : "text-muted-foreground opacity-50"}`}
                          >
                            {link.gateway_visits?.[0]?.count || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">
                          {new Date(link.created_at).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <LinkActions
                            linkId={link.id}
                            verSlug={link.version_slug}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-20 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Link2 className="w-8 h-8 opacity-20" />
                          <p>No links generated yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: any) {
  return (
    <div className="bg-card rounded-xl border p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-xl bg-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all" />
      </div>
      <div className="mt-5">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <div className="text-sm font-semibold text-muted-foreground mt-1">
          {title}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
