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
import GridBackground from "@/components/GridBackground";
import { getResumeForRole } from "@/lib/resume";

import { TrackedSection } from "@/components/TrackedSection";

const role = "software-engineer";

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

export default async function SoftwareEngineerPortfolio() {
  // Parallel data fetching for performance
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
    getProjects(role, { featuredOnly: true }),
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
    <div className="selection:bg-accent/30 relative">
      <GridBackground />
      <main className="pb-20 relative z-10">
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleMetadata.headline}
            bio={roleMetadata.bio}
            resumeUrl={resumeUrl}
            socialLinks={socialLinks}
          />
        </TrackedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
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
