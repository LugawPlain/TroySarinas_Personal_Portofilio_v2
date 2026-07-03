"use client";

import { CartProvider, CartDrawer, FloatingCartButton } from "@/contexts/CartContext";
import { TrackedSection } from "@/components/TrackedSection";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import RevenueCounter from "@/components/RevenueCounter";
import { Project } from "@/lib/projects";
import { SocialLink } from "@/lib/roles";

interface EcommerceContentProps {
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

export default function EcommerceContent({
  roleMetadata,
  projects,
  tech,
  experience,
  education,
  certifications,
  resumeUrl,
  socialLinks,
}: EcommerceContentProps) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white selection:bg-emerald-500/30">
        <main className="space-y-0 pb-20">
          {/* 1. Hero - Storefront Style */}
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
            {/* 2. Revenue Counter */}
          <TrackedSection id="revenue_counter">
            <RevenueCounter />
          </TrackedSection>

          {/* 3. Projects - Product Showcase */}
            <TrackedSection id="projects_view">
              <section id="projects">
                <div className="space-y-4 mb-12">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900"
                  >
                    Featured{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
                    >
                      Stores
                    </span>
                  </h2>
                  <p className="text-slate-600 text-lg max-w-2xl"
                  >
                    E-commerce platforms and online stores I've built and optimized
                    for maximum conversion and revenue growth. Add projects to your cart!
                  </p>
                </div>
                <Projects initialProjects={projects} />
              </section>
            </TrackedSection>

            {/* 3. Experience - Store Portfolio */}
            <TrackedSection id="experience_view">
              <Experience initialExperience={experience} />
            </TrackedSection>

            {/* 4. Technologies - Platform Stack */}
            <TrackedSection id="skills_view">
              <Technologies initialTech={tech} />
            </TrackedSection>

            {/* 5. Certifications - Trust Badges */}
            <TrackedSection id="certifications_view">
              <Certifications certifications={certifications} />
            </TrackedSection>

            {/* 6. Education */}
            <TrackedSection id="education_view">
              <Education educationItems={education} />
            </TrackedSection>
          </div>
        </main>
      </div>

      {/* Cart UI */}
      <CartDrawer />
      <FloatingCartButton />
    </CartProvider>
  );
}
