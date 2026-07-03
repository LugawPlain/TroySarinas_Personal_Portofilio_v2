"use client";

import { TrackedSection } from "@/components/TrackedSection";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import { Project } from "@/lib/projects";
import { SocialLink } from "@/lib/roles";

interface VAContentProps {
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

export default function VAContent({
  roleMetadata,
  projects,
  tech,
  experience,
  education,
  certifications,
  resumeUrl,
  socialLinks,
}: VAContentProps) {
  return (
    <div className="min-h-screen bg-white selection:bg-[#0d9488]/30">
      <main className="space-y-0 pb-20">
        {/* 1. Hero - Productivity Metrics */}
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
          {/* 2. Services - What I Can Do */}
          <TrackedSection id="services_view">
            <Services />
          </TrackedSection>

          {/* 3. Experience - Client Support Timeline */}
          <TrackedSection id="experience_view">
            <Experience initialExperience={experience} />
          </TrackedSection>

          {/* 4. Projects - Service Showcases */}
          <TrackedSection id="projects_view">
            <Projects initialProjects={projects} />
          </TrackedSection>

          {/* 5. Certifications - VA Credentials */}
          <TrackedSection id="certifications_view">
            <Certifications certifications={certifications} />
          </TrackedSection>

          {/* 6. Technologies - Productivity Stack */}
          <TrackedSection id="skills_view">
            <Technologies initialTech={tech} />
          </TrackedSection>

          {/* 7. Education */}
          <TrackedSection id="education_view">
            <Education educationItems={education} />
          </TrackedSection>
        </div>
      </main>
    </div>
  );
}
