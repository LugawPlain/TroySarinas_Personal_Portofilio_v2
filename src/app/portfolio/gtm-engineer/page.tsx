import { getProjects } from "@/lib/projects";
import {
  getTechnologies,
  getExperience,
  getRoleMetadata,
  getEducation,
  getCertifications,
} from "@/lib/roles";
import { getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Blogs from "@/components/Blogs";
import { getResumeForRole } from "@/lib/resume";

import { TrackedSection } from "@/components/TrackedSection";

export default async function GTMEngineerPortfolio() {
  const role = "gtm-engineer";

  // Parallel data fetching
  const [
    roleMetadata,
    projects,
    tech,
    experience,
    education,
    certifications,
    blogs,
    resumeUrl,
  ] = await Promise.all([
    getRoleMetadata(role),
    getProjects(role),
    getTechnologies(role),
    getExperience(role),
    getEducation(role),
    getCertifications(role),
    getBlogPosts(role),
    getResumeForRole(role),
  ]);

  if (!roleMetadata) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30">
      <main className="space-y-24 pb-20">
        {/* 1. Hero - Metrics/Impact */}
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleMetadata.headline}
            bio={roleMetadata.bio}
            resumeUrl={resumeUrl}
            heroConfig={roleMetadata.hero_config}
          />
        </TrackedSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* 2. Projects - Case Studies */}
          <TrackedSection id="projects_view">
            <Projects initialProjects={projects} />
          </TrackedSection>

          {/* 3. Experience - Achievement-focused */}
          <TrackedSection id="experience_view">
            <Experience initialExperience={experience} />
          </TrackedSection>

          {/* 4. Certifications - Trust Badges */}
          <TrackedSection id="certifications_view">
            <Certifications certifications={certifications} />
          </TrackedSection>

          {/* 5. Blogs - Thought Leadership */}
          <TrackedSection id="blogs_view">
            <Blogs initialBlogs={blogs} />
          </TrackedSection>

          {/* 6. Technologies - Stack Diagram */}
          <TrackedSection id="skills_view">
            <Technologies initialTech={tech} />
          </TrackedSection>

          {/* Education - Minimized for GTM roles */}
          <TrackedSection id="education_view">
            <Education educationItems={education} />
          </TrackedSection>
        </div>
      </main>
    </div>
  );
}
