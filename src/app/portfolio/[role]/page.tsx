import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Blogs from "@/components/Blogs";
import {
  getTechnologies,
  getExperience,
  getEducation,
  getCertifications,
  getRoleMetadata,
} from "@/lib/roles";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";

import { TrackedSection } from "@/components/TrackedSection";

interface Props {
  params: Promise<{ role: string }>;
}

export default async function RolePortfolioPage({ params }: Props) {
  const { role } = await params;
  const supabase = await createClient();

  // 1. Fetch Role Data
  const roleData = await getRoleMetadata(role);

  if (!roleData) {
    return notFound();
  }

  // 2. Fetch Role-Specific Data in Parallel
  const [
    resumeData,
    projects,
    techData,
    experienceData,
    education,
    certifications,
    blogs,
  ] = await Promise.all([
    supabase
      .from("gateway_resumes")
      .select("resume_url")
      .eq("role_key", role)
      .single(),
    getProjects(role),
    getTechnologies(role),
    getExperience(role),
    getEducation(role),
    getCertifications(role),
    getBlogPosts(role),
  ]);

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      <main className="space-y-24 pb-20">
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleData.headline}
            bio={roleData.bio}
            resumeUrl={resumeData.data?.resume_url}
          />
        </TrackedSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* Projects Section (Filtered) */}
          <TrackedSection id="projects_view">
            <section id="projects">
              <div className="space-y-4 mb-12">
                <h2 className="text-4xl font-bold tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  A curated selection of my work specifically relevant to{" "}
                  {roleData.title} roles.
                </p>
              </div>
              <Projects initialProjects={projects} />
            </section>
          </TrackedSection>

          <TrackedSection id="skills_view">
            <Technologies initialTech={techData} />
          </TrackedSection>

          <TrackedSection id="blog_view">
            <Blogs initialBlogs={blogs} />
          </TrackedSection>

          <TrackedSection id="experience_view">
            <Experience initialExperience={experienceData} />
          </TrackedSection>

          <Education educationItems={education} />
          <Certifications certifications={certifications} />
        </div>
      </main>
    </div>
  );
}
