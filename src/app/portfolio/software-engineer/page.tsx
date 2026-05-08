import { getProjects } from "@/lib/projects";
import {
  getTechnologies,
  getExperience,
  getRoleMetadata,
  getEducation,
  getCertifications,
} from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";

import { TrackedSection } from "@/components/TrackedSection";

export default async function SoftwareEngineerPortfolio() {
  const role = "software-engineer";

  // Parallel data fetching for performance
  const [
    roleMetadata,
    projects,
    tech,
    experience,
    education,
    certifications,
    supabase,
  ] = await Promise.all([
    getRoleMetadata(role),
    getProjects(role),
    getTechnologies(role),
    getExperience(role),
    getEducation(role),
    getCertifications(role),
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
    <div className=" bg-background selection:bg-accent/30">
      <main className="space-y-24 pb-20">
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleMetadata.headline}
            bio={roleMetadata.bio}
            resumeUrl={resumeData?.resume_url}
          />
        </TrackedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <TrackedSection id="projects_view">
            <Projects initialProjects={projects} />
          </TrackedSection>
          <TrackedSection id="experience_view">
            <Experience initialExperience={experience} />
          </TrackedSection>
          <Education educationItems={education} />
          <Certifications certifications={certifications} />
          <TrackedSection id="skills_view">
            <Technologies initialTech={tech} />
          </TrackedSection>
        </div>
      </main>
    </div>
  );
}
