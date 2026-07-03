"use client";

import { TrackedSection } from "@/components/TrackedSection";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import { Project } from "@/lib/projects";
import { SocialLink } from "@/lib/roles";

interface CPAContentProps {
  roleMetadata: {
    headline?: string;
    bio?: string;
    hero_config?: any;
  };
  projects: Project[];
  tech: any[];
  experience: any[];
  education: any[];
  certifications: any[];
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}

export default function CPAContent({
  roleMetadata,
  projects,
  tech,
  experience,
  education,
  certifications,
  resumeUrl,
  socialLinks,
}: CPAContentProps) {
  return (
    <div className="min-h-screen bg-white selection:bg-[#1e3a5f]/30">
      <main className="space-y-0 pb-20">
        {/* 1. Hero - Credentials Focused */}
        <TrackedSection id="hero_view">
          <HeroSection
            headline={roleMetadata.headline}
            bio={roleMetadata.bio}
            resumeUrl={resumeUrl}
            heroConfig={roleMetadata.hero_config}
            socialLinks={socialLinks}
          />
        </TrackedSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* 2. Certifications - Highest Priority */}
          <TrackedSection id="certifications_view">
            <Certifications certifications={certifications} />
          </TrackedSection>

          {/* 3. Experience - Firm Timeline */}
          <TrackedSection id="experience_view">
            <Experience initialExperience={experience} />
          </TrackedSection>

          {/* 4. Projects - Engagement Case Studies */}
          <TrackedSection id="projects_view">
            <Projects initialProjects={projects} />
          </TrackedSection>

          {/* 5. Education */}
          <TrackedSection id="education_view">
            <Education educationItems={education} />
          </TrackedSection>

          {/* 6. Technologies - Minimal */}
          <TrackedSection id="skills_view">
            <Technologies initialTech={tech} />
          </TrackedSection>
        </div>
      </main>
    </div>
  );
}
