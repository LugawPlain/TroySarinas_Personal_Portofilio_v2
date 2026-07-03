"use client";

import { TrackedSection } from "@/components/TrackedSection";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Blogs from "@/components/Blogs";
import { Project } from "@/lib/projects";
import { SocialLink } from "@/lib/roles";
import { BlogPost } from "@/lib/blog";

interface SalesContentProps {
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
  blogs?: BlogPost[];
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}

export default function SalesContent({
  roleMetadata,
  projects,
  tech,
  experience,
  education,
  certifications,
  blogs,
  resumeUrl,
  socialLinks,
}: SalesContentProps) {
  return (
    <div className="min-h-screen bg-white selection:bg-red-600/30">
      <main className="space-y-0 pb-20">
        {/* 1. Hero - Quota/Attainment Metrics */}
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
          {/* 2. Experience - Quota Attainment Timeline */}
          <TrackedSection id="experience_view">
            <Experience initialExperience={experience} />
          </TrackedSection>

          {/* 3. Projects - Deal Showcases */}
          <TrackedSection id="projects_view">
            <Projects initialProjects={projects} />
          </TrackedSection>

          {/* 4. Certifications - Sales Credentials */}
          <TrackedSection id="certifications_view">
            <Certifications certifications={certifications} />
          </TrackedSection>

          {/* 5. Technologies - Sales Stack */}
          <TrackedSection id="skills_view">
            <Technologies initialTech={tech} />
          </TrackedSection>

          {/* 6. Blogs - Sales Strategy */}
          {blogs && blogs.length > 0 && (
            <TrackedSection id="blogs_view">
              <Blogs initialBlogs={blogs} />
            </TrackedSection>
          )}
        </div>
      </main>
    </div>
  );
}
