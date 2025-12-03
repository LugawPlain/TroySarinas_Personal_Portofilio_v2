
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import { Metadata } from "next";
import ProjectImage from "@/components/ProjectImage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Troy Sarinas`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-8 max-w-5xl mx-auto font-inter">
      <Link
        href="/projects"
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold font-fraunces text-foreground/90">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Image Section */}
        
      <ProjectImage project={project}/>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground/90">
              About the Project
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            
            {/* Placeholder for more content if available in future */}
            {/* <div className="p-6 bg-primary/50 rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Responsive Design</li>
                <li>Performance Optimized</li>
                <li>Modern UI/UX</li>
              </ul>
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-primary rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
                Project Links
              </h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 hover:bg-secondary hover:text-background transition-colors font-semibold ">
                      <FiExternalLink /> Live Demo
                    </Button>
                  </Link>
                )}
                {project.githubUrl ? (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full gap-2 font-semibold">
                      <FiGithub /> View Code
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="w-full gap-2 font-semibold opacity-70 cursor-not-allowed"
                  >
                    <FiGithub /> Private Repository
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
