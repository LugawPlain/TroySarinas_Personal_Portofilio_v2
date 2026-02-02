import { getProjects } from "@/lib/projects";
import { getTechnologies, getExperience, getRoleMetadata } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";

export default async function SoftwareEngineerPortfolio() {
  const role = "software-engineer";

  // Parallel data fetching for performance
  const [roleMetadata, projects, tech, experience, supabase] =
    await Promise.all([
      getRoleMetadata(role),
      getProjects(role),
      getTechnologies(role),
      getExperience(role),
      createClient(),
    ]);

  if (!roleMetadata) {
    return notFound();
  }

  // Fetch Role-Specific Resume
  const { data: resumeData } = await supabase
    .from("gateway_resumes")
    .select("resume_url")
    .eq("role_key", role)
    .single();

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      <main className="space-y-24 pb-20">
        <HeroSection
          headline={roleMetadata.headline}
          bio={roleMetadata.bio}
          resumeUrl={resumeData?.resume_url}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* Projects Section (Dynamic) */}
          <section id="projects">
            <div className="space-y-4 mb-12">
              <h2 className="text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                A curated selection of my work specifically relevant to{" "}
                {roleMetadata.title}.
              </p>
            </div>
            <Projects initialProjects={projects} role={role} />
          </section>

          <Technologies role={role} initialTech={tech} />
          <Experience role={role} initialExperience={experience} />
          <Education />
          <Certifications />
        </div>
      </main>
    </div>
  );
}
