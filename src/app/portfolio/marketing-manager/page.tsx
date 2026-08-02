import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import {
  getTechnologies,
  getExperience,
  getRoleMetadata,
  getEducation,
  getCertifications,
  getSocialLinks,
} from "@/lib/roles";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import { getResumeForRole } from "@/lib/resume";

import { TrackedSection } from "@/components/TrackedSection";

const role = "marketing-manager";

export async function generateMetadata(): Promise<Metadata> {
  const roleMetadata = await getRoleMetadata(role);

  if (!roleMetadata) {
    return {
      title: "Portfolio Not Found",
    };
  }

  return {
    title: roleMetadata.title,
    description: roleMetadata.headline,
  };
}

export default async function MarketingManagerPortfolio() {

  // Parallel data fetching
  const [
    roleMetadata,
    projects,
    tech,
    experience,
    education,
    certifications,
    resumeUrl,
    socialLinks,
  ] = await Promise.all([
    getRoleMetadata(role),
    getProjects(role),
    getTechnologies(role),
    getExperience(role),
    getEducation(role),
    getCertifications(role),
    getResumeForRole(role),
    getSocialLinks(role),
  ]);

  if (!roleMetadata) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white selection:bg-orange-500/30">
      <main className="space-y-0 pb-20">
        {/* 1. Hero - Campaign metrics */}
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleMetadata.headline}
            bio={roleMetadata.bio}
            resumeUrl={resumeUrl}
            heroConfig={roleMetadata.hero_config}
            socialLinks={socialLinks}
          />
        </TrackedSection>

        {/* 2. Projects - Campaign portfolio */}
        <TrackedSection id="projects_view">
          <Projects initialProjects={projects} />
        </TrackedSection>

        {/* 3. Experience - Brand growth timeline */}
        <TrackedSection id="experience_view">
          <Experience initialExperience={experience} />
        </TrackedSection>

        {/* 4. Technologies - MarTech stack */}
        <TrackedSection id="skills_view">
          <Technologies initialTech={tech} />
        </TrackedSection>

        {/* 5. Certifications - Marketing credentials */}
        <TrackedSection id="certifications_view">
          <Certifications certifications={certifications} />
        </TrackedSection>

        {/* 6. Education */}
        <TrackedSection id="education_view">
          <Education educationItems={education} />
        </TrackedSection>
      </main>
    </div>
  );
}
