"use client";

import React, { useState, useTransition } from "react";
import {
  updateRoleMetadata,
  toggleRoleRelationship,
  updateTechnologyProficiency,
  updateRoleResume,
} from "./portfolio-actions";
import {
  Briefcase,
  Cpu,
  Layout,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  FolderGit2,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
} from "lucide-react";

interface PortfolioContentManagerProps {
  roles: any[];
  technologies: any[];
  experience: any[];
  projects: any[];
  blogs: any[];
  education: any[];
  certifications: any[];
  resumes: any[];
  roleTech: any[];
  roleExp: any[];
  roleEducation: any[];
  roleCert: any[];
  roleProj: any[];
  roleBlog: any[];
}

export function PortfolioContentManager({
  roles,
  technologies,
  experience,
  projects,
  blogs,
  education,
  certifications,
  resumes,
  roleTech: initialRoleTech,
  roleExp: initialRoleExp,
  roleEducation: initialRoleEducation,
  roleCert: initialRoleCert,
  roleProj: initialRoleProj,
  roleBlog: initialRoleBlog,
}: PortfolioContentManagerProps) {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [activeTab, setActiveTab] = useState<
    "identity" | "skills" | "career" | "work" | "academia"
  >("identity");

  const [localRoleTech, setLocalRoleTech] = useState(initialRoleTech);
  const [localRoleExp, setLocalRoleExp] = useState(initialRoleExp);
  const [localRoleEducation, setLocalRoleEducation] =
    useState(initialRoleEducation);
  const [localRoleCert, setLocalRoleCert] = useState(initialRoleCert);
  const [localRoleProj, setLocalRoleProj] = useState(initialRoleProj);
  const [localRoleBlog, setLocalRoleBlog] = useState(initialRoleBlog);

  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Sync local state when initial props change
  React.useEffect(() => {
    setLocalRoleTech(initialRoleTech);
    setLocalRoleExp(initialRoleExp);
    setLocalRoleEducation(initialRoleEducation);
    setLocalRoleCert(initialRoleCert);
    setLocalRoleProj(initialRoleProj);
    setLocalRoleBlog(initialRoleBlog);
  }, [
    initialRoleTech,
    initialRoleExp,
    initialRoleEducation,
    initialRoleCert,
    initialRoleProj,
    initialRoleBlog,
  ]);

  const handleMetadataChange = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as "headline" | "bio";
    const value = e.target.value;

    if (value === selectedRole[field]) return;

    // Background save
    startTransition(async () => {
      setSaveStatus("Saving...");
      const result = await updateRoleMetadata(
        selectedRole.id,
        field === "headline" ? value : selectedRole.headline,
        field === "bio" ? value : selectedRole.bio,
      );

      if (!result.error) {
        setSaveStatus("Synced");
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        setSaveStatus("Error!");
      }
    });
  };

  const handleResumeChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    const currentResume = resumes.find((r) => r.role_key === selectedRole.slug);

    if (newUrl === (currentResume?.resume_url || "")) return;

    setSaveStatus("Updating Resume...");
    startTransition(async () => {
      const result = await updateRoleResume(selectedRole.slug, newUrl);
      if (result?.error) {
        alert("Failed to update resume: " + result.error);
      }
      setSaveStatus(null);
    });
  };

  const isTechLinked = (techId: string) =>
    localRoleTech.some(
      (rt) => rt.role_id === selectedRole.id && rt.tech_id === techId,
    );

  const isExpLinked = (expId: string) =>
    localRoleExp.some(
      (re) => re.role_id === selectedRole.id && re.experience_id === expId,
    );

  const isEducationLinked = (eduId: string) =>
    localRoleEducation.some(
      (re) => re.role_id === selectedRole.id && re.education_id === eduId,
    );

  const isCertLinked = (certId: string) =>
    localRoleCert.some(
      (rc) => rc.role_id === selectedRole.id && rc.certification_id === certId,
    );

  const isProjLinked = (projId: string) =>
    localRoleProj.some(
      (rp) => rp.role_id === selectedRole.id && rp.project_id === projId,
    );

  const isBlogLinked = (blogId: string) =>
    localRoleBlog.some(
      (rb) => rb.role_id === selectedRole.id && rb.blog_id === blogId,
    );

  const handleToggle = (
    table: any,
    targetId: string,
    field: string,
    isActive: boolean,
  ) => {
    // 1. Optimistic Update
    if (table === "role_technologies") {
      if (isActive) {
        setLocalRoleTech((prev) =>
          prev.filter(
            (rt) =>
              !(rt.role_id === selectedRole.id && rt.tech_id === targetId),
          ),
        );
      } else {
        setLocalRoleTech((prev) => [
          ...prev,
          { role_id: selectedRole.id, tech_id: targetId },
        ]);
      }
    } else if (table === "role_experience") {
      if (isActive) {
        setLocalRoleExp((prev) =>
          prev.filter(
            (re) =>
              !(
                re.role_id === selectedRole.id && re.experience_id === targetId
              ),
          ),
        );
      } else {
        setLocalRoleExp((prev) => [
          ...prev,
          { role_id: selectedRole.id, experience_id: targetId },
        ]);
      }
    } else if (table === "role_education") {
      if (isActive) {
        setLocalRoleEducation((prev) =>
          prev.filter(
            (re) =>
              !(re.role_id === selectedRole.id && re.education_id === targetId),
          ),
        );
      } else {
        setLocalRoleEducation((prev) => [
          ...prev,
          { role_id: selectedRole.id, education_id: targetId },
        ]);
      }
    } else if (table === "role_certifications") {
      if (isActive) {
        setLocalRoleCert((prev) =>
          prev.filter(
            (rc) =>
              !(
                rc.role_id === selectedRole.id &&
                rc.certification_id === targetId
              ),
          ),
        );
      } else {
        setLocalRoleCert((prev) => [
          ...prev,
          { role_id: selectedRole.id, certification_id: targetId },
        ]);
      }
    } else if (table === "role_projects") {
      if (isActive) {
        setLocalRoleProj((prev) =>
          prev.filter(
            (rp) =>
              !(rp.role_id === selectedRole.id && rp.project_id === targetId),
          ),
        );
      } else {
        setLocalRoleProj((prev) => [
          ...prev,
          { role_id: selectedRole.id, project_id: targetId },
        ]);
      }
    } else if (table === "role_blogs") {
      if (isActive) {
        setLocalRoleBlog((prev) =>
          prev.filter(
            (rb) =>
              !(rb.role_id === selectedRole.id && rb.blog_id === targetId),
          ),
        );
      } else {
        setLocalRoleBlog((prev) => [
          ...prev,
          { role_id: selectedRole.id, blog_id: targetId },
        ]);
      }
    }

    // 2. Persistent Background Save
    startTransition(async () => {
      const result = await toggleRoleRelationship(
        table,
        selectedRole.id,
        targetId,
        field,
        isActive,
      );
      if (result?.error) {
        // Rollback
        setLocalRoleTech(initialRoleTech);
        setLocalRoleExp(initialRoleExp);
        setLocalRoleEducation(initialRoleEducation);
        setLocalRoleCert(initialRoleCert);
        setLocalRoleProj(initialRoleProj);
        setLocalRoleBlog(initialRoleBlog);
        alert("Failed to save. Please refresh.");
      }
    });
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col h-full">
      <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Layout className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Portfolio Command Center
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">
              Refining Variant:{" "}
              <span className="text-accent">{selectedRole.title}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              {saveStatus}
            </div>
          )}
          <select
            value={selectedRole.slug}
            onChange={(e) =>
              setSelectedRole(roles.find((r) => r.slug === e.target.value))
            }
            className="h-10 px-4 rounded-lg border bg-background font-bold text-sm focus:ring-2 focus:ring-accent outline-none cursor-pointer hover:border-accent transition-colors"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.slug}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="px-6 pt-4 flex items-center gap-1 border-b bg-muted/5 overflow-x-auto no-scrollbar">
        <TabButton
          active={activeTab === "identity"}
          onClick={() => setActiveTab("identity")}
          icon={<Layout className="w-4 h-4" />}
          label="Identity"
        />
        <TabButton
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
          icon={<Cpu className="w-4 h-4" />}
          label="Skills"
        />
        <TabButton
          active={activeTab === "career"}
          onClick={() => setActiveTab("career")}
          icon={<Briefcase className="w-4 h-4" />}
          label="Career"
        />
        <TabButton
          active={activeTab === "work"}
          onClick={() => setActiveTab("work")}
          icon={<FolderGit2 className="w-4 h-4" />}
          label="Projects & Blogs"
        />
        <TabButton
          active={activeTab === "academia"}
          onClick={() => setActiveTab("academia")}
          icon={<GraduationCap className="w-4 h-4" />}
          label="Education & Certs"
        />
      </div>

      <div className="p-6 md:p-8 min-h-[500px]">
        {/* Tab 1: Identity */}
        {activeTab === "identity" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" />
                  Hero Headline
                </label>
                <input
                  name="headline"
                  defaultValue={selectedRole.headline}
                  onBlur={handleMetadataChange}
                  className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-lg font-bold shadow-sm transition-all"
                  placeholder="The main hook for this role..."
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Target Resume URL
                </label>
                <input
                  name="resume_url"
                  defaultValue={
                    resumes.find((r) => r.role_key === selectedRole.slug)
                      ?.resume_url || ""
                  }
                  onBlur={handleResumeChange}
                  placeholder="Paste PDF link from Supabase Storage..."
                  className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-sm font-medium shadow-sm transition-all"
                />
                <p className="text-[10px] text-muted-foreground italic">
                  Note: This file will be served when visitors click "Download
                  Resume" on the {selectedRole.title} page.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Role Biography
              </label>
              <textarea
                name="bio"
                rows={4}
                defaultValue={selectedRole.bio}
                onBlur={handleMetadataChange}
                className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-sm leading-relaxed shadow-sm transition-all"
                placeholder="Briefly describe your expertise for this specific role..."
              />
            </div>
          </div>
        )}

        {/* Tab 2: Skills */}
        {activeTab === "skills" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" />
                Technical Skill Matrix
              </h3>
              <span className="text-[10px] text-muted-foreground">
                Toggling adds/removes items from this role's tech stack.
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {technologies.map((tech) => {
                const linked = isTechLinked(tech.id);
                return (
                  <button
                    key={tech.id}
                    onClick={() =>
                      handleToggle(
                        "role_technologies",
                        tech.id,
                        "tech_id",
                        linked,
                      )
                    }
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group ${
                      linked
                        ? "bg-accent/5 border-accent text-accent shadow-sm ring-1 ring-accent/20"
                        : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                    }`}
                  >
                    <span className="text-xs font-bold truncate pr-2">
                      {tech.name}
                    </span>
                    {linked ? (
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 opacity-10 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Career */}
        {activeTab === "career" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
              <Briefcase className="w-4 h-4 text-blue-500" />
              Role-Relevant Experience
            </h3>
            <div className="space-y-3 max-w-3xl">
              {experience.map((exp) => {
                const linked = isExpLinked(exp.id);
                return (
                  <button
                    key={exp.id}
                    onClick={() =>
                      handleToggle(
                        "role_experience",
                        exp.id,
                        "experience_id",
                        linked,
                      )
                    }
                    className={`flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                      linked
                        ? "bg-blue-500/5 border-blue-500/50 text-blue-700 shadow-sm ring-1 ring-blue-500/10"
                        : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-bold">{exp.title}</div>
                      <div className="text-[10px] opacity-70 font-medium tracking-tight">
                        {exp.company} • {exp.period}
                      </div>
                    </div>
                    {linked ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 opacity-10 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Work (Projects & Blogs) */}
        {activeTab === "work" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Projects */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
                <FolderGit2 className="w-4 h-4 text-purple-500" />
                Showcase Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((proj) => {
                  const linked = isProjLinked(proj.id);
                  return (
                    <button
                      key={proj.id}
                      onClick={() =>
                        handleToggle(
                          "role_projects",
                          proj.id,
                          "project_id",
                          linked,
                        )
                      }
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        linked
                          ? "bg-purple-500/5 border-purple-500/50 text-purple-700 shadow-sm ring-1 ring-purple-500/10"
                          : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                      }`}
                    >
                      <span className="text-xs font-bold line-clamp-1 flex-1">
                        {proj.title}
                      </span>
                      {linked ? (
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 opacity-10 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blogs */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
                <BookOpen className="w-4 h-4 text-orange-500" />
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogs.map((blog) => {
                  const linked = isBlogLinked(blog.id);
                  return (
                    <button
                      key={blog.id}
                      onClick={() =>
                        handleToggle("role_blogs", blog.id, "blog_id", linked)
                      }
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        linked
                          ? "bg-orange-500/5 border-orange-500/50 text-orange-700 shadow-sm ring-1 ring-orange-500/10"
                          : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                      }`}
                    >
                      <span className="text-xs font-bold line-clamp-1 flex-1">
                        {blog.title}
                      </span>
                      {linked ? (
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 opacity-10 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Academia */}
        {activeTab === "academia" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Education */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                Education Credentials
              </h3>
              <div className="space-y-3 max-w-3xl">
                {education.map((edu) => {
                  const linked = isEducationLinked(edu.id);
                  return (
                    <button
                      key={edu.id}
                      onClick={() =>
                        handleToggle(
                          "role_education",
                          edu.id,
                          "education_id",
                          linked,
                        )
                      }
                      className={`flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                        linked
                          ? "bg-emerald-500/5 border-emerald-500/50 text-emerald-700 shadow-sm ring-1 ring-emerald-500/10"
                          : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold">{edu.degree}</div>
                        <div className="text-[10px] opacity-70 font-medium">
                          {edu.school} • {edu.period}
                        </div>
                      </div>
                      {linked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 opacity-10 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-amber-500" />
                Certifications & Badges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((cert) => {
                  const linked = isCertLinked(cert.id);
                  return (
                    <button
                      key={cert.id}
                      onClick={() =>
                        handleToggle(
                          "role_certifications",
                          cert.id,
                          "certification_id",
                          linked,
                        )
                      }
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        linked
                          ? "bg-amber-500/5 border-amber-500/50 text-amber-700 shadow-sm ring-1 ring-amber-500/10"
                          : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                      }`}
                    >
                      <div className="flex-1 pr-2">
                        <div className="text-xs font-bold truncate">
                          {cert.title}
                        </div>
                        <div className="text-[10px] opacity-60 truncate">
                          {cert.description}
                        </div>
                      </div>
                      {linked ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 opacity-10 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-muted/30 border-t flex items-center gap-2 text-[10px] text-muted-foreground">
        <AlertCircle className="w-3.5 h-3.5" />
        Note: The Gateway Protocol ensures that visitors only see the content
        mapped to the specific role they access.
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
        active
          ? "border-accent text-accent bg-accent/5"
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
