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
import { getResumeForRole } from "@/lib/resume";
import VAContent from "./VAContent";

const role = "virtual-assistant";

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

export default async function VirtualAssistantPortfolio() {

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
    <VAContent
      roleMetadata={roleMetadata}
      projects={projects}
      tech={tech}
      experience={experience}
      education={education}
      certifications={certifications}
      resumeUrl={resumeUrl}
      socialLinks={socialLinks}
    />
  );
}
