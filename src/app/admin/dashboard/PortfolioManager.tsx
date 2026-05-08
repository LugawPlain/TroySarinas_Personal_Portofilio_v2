"use client";

import React, { useState, useTransition } from "react";
import {
  updateRoleMetadata,
  toggleRoleRelationship,
  updateTechnologyProficiency,
  updateRoleResume,
  upsertTechnology,
  deleteTechnology,
  upsertExperience,
  deleteExperience,
  upsertEducation,
  deleteEducation,
  upsertCertification,
  deleteCertification,
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
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
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

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingType, setEditingType] = useState<
    "tech" | "exp" | "edu" | "cert" | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);

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

  const handleOpenEditor = (type: any, item: any = null) => {
    setEditingType(type);
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setSaveStatus("Deleting...");
    startTransition(async () => {
      let result;
      if (type === "tech") result = await deleteTechnology(id);
      else if (type === "exp") result = await deleteExperience(id);
      else if (type === "edu") result = await deleteEducation(id);
      else if (type === "cert") result = await deleteCertification(id);

      if (result?.error) alert(result.error);
      setSaveStatus(null);
    });
  };

  const handleUpsert = async (data: any) => {
    setSaveStatus("Saving...");
    startTransition(async () => {
      let result;
      // Auto-link to currently selected role if it's a NEW item
      const roleId = data.id ? undefined : selectedRole.id;

      if (editingType === "tech") result = await upsertTechnology(data, roleId);
      else if (editingType === "exp")
        result = await upsertExperience(data, roleId);
      else if (editingType === "edu")
        result = await upsertEducation(data, roleId);
      else if (editingType === "cert")
        result = await upsertCertification(data, roleId);

      if (result?.error) {
        alert(result.error);
      } else {
        setIsEditorOpen(false);
      }
      setSaveStatus(null);
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
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent" />
                  Technical Skill Matrix
                </h3>
                <button
                  onClick={() => handleOpenEditor("tech")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Add New Tech
                </button>
              </div>
              <span className="text-[10px] text-muted-foreground">
                Toggling adds/removes items from this role's tech stack.
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {technologies.map((tech) => {
                const linked = isTechLinked(tech.id);
                return (
                  <div key={tech.id} className="group/item relative">
                    <button
                      onClick={() =>
                        handleToggle(
                          "role_technologies",
                          tech.id,
                          "tech_id",
                          linked,
                        )
                      }
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group ${
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

                    {/* CRUD Overlay */}
                    <div className="absolute -top-2 -right-2 hidden group-hover/item:flex items-center gap-1 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditor("tech", tech);
                        }}
                        className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-accent transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete("tech", tech.id);
                        }}
                        className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Career */}
        {activeTab === "career" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                Role-Relevant Experience
              </h3>
              <button
                onClick={() => handleOpenEditor("exp")}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-500 uppercase hover:bg-blue-500/20 transition-all"
              >
                <Plus className="w-3 h-3" />
                Add Experience
              </button>
            </div>
            <div className="space-y-3 max-w-3xl">
              {experience.map((exp) => {
                const linked = isExpLinked(exp.id);
                return (
                  <div key={exp.id} className="group/item relative">
                    <button
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

                    <div className="absolute top-4 right-14 hidden group-hover/item:flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditor("exp", exp);
                        }}
                        className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-blue-500 transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete("exp", exp.id);
                        }}
                        className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-500" />
                  Education Credentials
                </h3>
                <button
                  onClick={() => handleOpenEditor("edu")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-500 uppercase hover:bg-emerald-500/20 transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Add Education
                </button>
              </div>
              <div className="space-y-3 max-w-3xl">
                {education.map((edu) => {
                  const linked = isEducationLinked(edu.id);
                  return (
                    <div key={edu.id} className="group/item relative">
                      <button
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

                      <div className="absolute top-4 right-14 hidden group-hover/item:flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditor("edu", edu);
                          }}
                          className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-emerald-500 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete("edu", edu.id);
                          }}
                          className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Certifications & Badges
                </h3>
                <button
                  onClick={() => handleOpenEditor("cert")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-500 uppercase hover:bg-amber-500/20 transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Add Certification
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((cert) => {
                  const linked = isCertLinked(cert.id);
                  return (
                    <div key={cert.id} className="group/item relative">
                      <button
                        onClick={() =>
                          handleToggle(
                            "role_certifications",
                            cert.id,
                            "certification_id",
                            linked,
                          )
                        }
                        className={`flex items-center justify-between w-full h-full p-4 rounded-xl border text-left transition-all duration-200 ${
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

                      <div className="absolute top-2 right-2 hidden group-hover/item:flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditor("cert", cert);
                          }}
                          className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-amber-500 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete("cert", cert.id);
                          }}
                          className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
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
      {/* Content Editor Modal */}
      {isEditorOpen && (
        <ContentEditorModal
          type={editingType!}
          item={editingItem}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleUpsert}
          isPending={isPending}
        />
      )}
    </div>
  );
}

function ContentEditorModal({
  type,
  item,
  onClose,
  onSave,
  isPending,
}: {
  type: "tech" | "exp" | "edu" | "cert";
  item: any;
  onClose: () => void;
  onSave: (data: any) => void;
  isPending: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    item || {
      // Defaults
      highlights: [],
      technologies: [],
      is_webinar: false,
      display_order: 0,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const arr = value
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    handleChange(field, arr);
  };

  const getTitle = () => {
    const action = item ? "Edit" : "Add";
    if (type === "tech") return `${action} Skill`;
    if (type === "exp") return `${action} Experience`;
    if (type === "edu") return `${action} Education`;
    if (type === "cert") return `${action} Certification`;
    return "Editor";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b flex items-center justify-between bg-muted/30">
          <h2 className="text-xl font-bold">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {type === "tech" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Skill Name
                </label>
                <input
                  required
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium"
                  placeholder="e.g. Next.js"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Icon Name (Lucide/SimpleIcon)
                </label>
                <input
                  value={formData.icon_name || ""}
                  onChange={(e) => handleChange("icon_name", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono text-sm"
                  placeholder="e.g. SiNextdotjs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Proficiency (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency || 0}
                  onChange={(e) =>
                    handleChange("proficiency", parseInt(e.target.value))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
            </div>
          )}

          {type === "exp" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Title
                </label>
                <input
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Company
                </label>
                <input
                  required
                  value={formData.company || ""}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Period
                </label>
                <input
                  required
                  value={formData.period || ""}
                  onChange={(e) => handleChange("period", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Location
                </label>
                <input
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={2}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Highlights (one per line)
                </label>
                <textarea
                  value={formData.highlights?.join("\n") || ""}
                  onChange={(e) =>
                    handleArrayChange("highlights", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Logo URL
                </label>
                <input
                  value={formData.logo_url || ""}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) =>
                    handleChange("display_order", parseInt(e.target.value))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
          )}

          {type === "edu" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Degree / Course
                </label>
                <input
                  required
                  value={formData.degree || ""}
                  onChange={(e) => handleChange("degree", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  School / University
                </label>
                <input
                  required
                  value={formData.school || ""}
                  onChange={(e) => handleChange("school", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Period
                </label>
                <input
                  required
                  value={formData.period || ""}
                  onChange={(e) => handleChange("period", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Website URL
                </label>
                <input
                  value={formData.website_url || ""}
                  onChange={(e) => handleChange("website_url", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={2}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Highlights (one per line)
                </label>
                <textarea
                  value={formData.highlights?.join("\n") || ""}
                  onChange={(e) =>
                    handleArrayChange("highlights", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Logo URL
                </label>
                <input
                  value={formData.logo_url || ""}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) =>
                    handleChange("display_order", parseInt(e.target.value))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>
          )}

          {type === "cert" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Certification Title
                </label>
                <input
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Organizer
                </label>
                <input
                  required
                  value={formData.organizer || ""}
                  onChange={(e) => handleChange("organizer", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Date Label
                </label>
                <input
                  required
                  value={formData.date_label || ""}
                  onChange={(e) => handleChange("date_label", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="e.g. Feb 2024"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={2}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Credential URL
                </label>
                <input
                  value={formData.cert_url || ""}
                  onChange={(e) => handleChange("cert_url", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Logo URL
                </label>
                <input
                  value={formData.logo_url || ""}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_webinar"
                  checked={formData.is_webinar || false}
                  onChange={(e) => handleChange("is_webinar", e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                />
                <label
                  htmlFor="is_webinar"
                  className="text-sm font-medium text-muted-foreground"
                >
                  It's a Webinar / Participant Certificate
                </label>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) =>
                    handleChange("display_order", parseInt(e.target.value))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>
            </div>
          )}
        </form>

        <div className="p-6 border-t flex items-center justify-end gap-3 bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-muted rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 bg-foreground text-background text-sm font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {item ? "Update" : "Create"}
          </button>
        </div>
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
