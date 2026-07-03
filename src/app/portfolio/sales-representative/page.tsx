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
import SalesContent from "./SalesContent";

export default async function SalesRepresentativePortfolio() {
  const role = "sales-representative";

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
    <SalesContent
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
