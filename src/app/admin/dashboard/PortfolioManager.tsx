"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  updateRoleMetadata,
  toggleRoleRelationship,
  setProjectFeaturedForRole,
  updateTechnologyProficiency,
  updateRoleResume,
  upsertTechnology,
  deleteTechnology,
  uploadSkillIcon,
  upsertExperience,
  deleteExperience,
  upsertEducation,
  deleteEducation,
  upsertCertification,
  deleteCertification,
  createProject,
  createBlog,
  deleteProject,
  deleteBlog,
  updateProject,
  updateBlog,
  uploadProjectImage,
  saveProjectOrder,
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
  Upload,
  ExternalLink,
  MessageSquare,
  Link2,
  Share2,
  Search,
  ArrowUpDown,
  ListOrdered,
  GripVertical,
} from "lucide-react";
import { uploadResume, deleteResume } from "./resume-upload-actions";
import { HeroConfigEditor } from "./HeroConfigEditor";
import DynamicIcon from "@/components/DynamicIcon";
import IconPicker from "./IconPicker";
import Image from "next/image";
import { ChatConfigEditor } from "./ChatConfigEditor";
import ProjectTagInput from "@/components/Projects/ProjectTagInput";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  socialLinks: any[];
  roleSocialLinks: any[];
}

const MemoSortableProjectCard = React.memo(function SortableProjectCard({
  project,
  projectIndex,
  linked,
  linkedRoles,
  isSortMode,
  handleToggle,
  handleToggleFeatured,
  isProjFeatured,
  setEditType,
  setEditItem,
  setEditFormData,
  setIsEditModalOpen,
  handleDelete,
}: {
  project: any;
  projectIndex: number;
  linked: boolean;
  linkedRoles: any[];
  isSortMode: boolean;
  handleToggle: (
    table: string,
    targetId: string,
    field: string,
    isActive: boolean,
  ) => void;
  handleToggleFeatured: (projectId: string) => void;
  isProjFeatured: (projectId: string) => boolean;
  setEditType: (value: "project" | "blog") => void;
  setEditItem: (item: any) => void;
  setEditFormData: (data: any) => void;
  setIsEditModalOpen: (open: boolean) => void;
  handleDelete: (type: string, id: string) => Promise<void>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
        linked
          ? "bg-purple-500/5 border-purple-500/50 text-purple-700 shadow-sm ring-1 ring-purple-500/10"
          : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
      } ${
        isSortMode
          ? "cursor-grab active:cursor-grabbing hover:border-purple-500/60"
          : ""
      } ${isDragging ? "opacity-60 ring-2 ring-purple-500/60" : ""}`}
      {...attributes}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isSortMode && (
              <button
                type="button"
                {...listeners}
                aria-label={`Reorder ${project.title}`}
                className="inline-flex h-4 w-4 shrink-0 cursor-grab items-center justify-center text-purple-500/70"
              >
                <GripVertical className="h-4 w-4" />
              </button>
            )}
            <span
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-purple-500/10 px-1.5 text-[10px] font-bold tabular-nums text-purple-600"
              title="Display order: lower numbers appear first"
            >
              {projectIndex + 1}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle("role_projects", project.id, "project_id", linked);
              }}
              className="text-xs font-bold line-clamp-1 text-left min-w-0"
            >
              {project.title}
            </button>
          </div>

          <p className="text-[10px] opacity-60 mt-1 line-clamp-1">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-1.5 py-0.5 text-[9px] font-semibold text-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {linkedRoles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {linkedRoles.map((role: any) => (
                <span
                  key={role.id}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20"
                >
                  {role.title}
                </span>
              ))}
            </div>
          )}

          {linked && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFeatured(project.id);
              }}
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] font-bold uppercase transition-colors ${
                isProjFeatured(project.id)
                  ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-700"
                  : "border-border bg-background text-muted-foreground hover:text-purple-600"
              }`}
            >
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isProjFeatured(project.id)
                    ? "bg-yellow-500"
                    : "bg-muted-foreground/40"
                }`}
              />
              {isProjFeatured(project.id) ? "Featured" : "Mark Featured"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditType("project");
              setEditItem(project);
              setEditFormData({
                title: project.title,
                description: project.description,
                thumbnail_url: project.thumbnail_url || "",
                hero_image_url: project.hero_image_url || "",
                technologies: (project.technologies || []).join(", "),
                tags: project.tags || [],
                live_url: project.live_url || "",
                github_url: project.github_url || "",
                demo_type: project.demo_type || "",
                display_order: project.display_order || 0,
                roleIds: linkedRoles.map((role: any) => role.id),
              });
              setIsEditModalOpen(true);
            }}
            aria-label={`Edit ${project.title}`}
            className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-blue-500 transition-colors"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete("project", project.id);
            }}
            aria-label={`Delete ${project.title}`}
            className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            type="button"
            aria-label={
              linked
                ? `Unlink ${project.title} from this role`
                : `Link ${project.title} to this role`
            }
            title={linked ? "Unlink project" : "Link project"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle("role_projects", project.id, "project_id", linked);
            }}
            className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {linked ? (
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground/40" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

const ProjectSortableList = React.memo(function ProjectSortableList({
  projects,
  isProjLinked,
  localRoleProj,
  roles,
  selectedRoleId,
  handleToggle,
  handleToggleFeatured,
  isProjFeatured,
  setEditType,
  setEditItem,
  setEditFormData,
  setIsEditModalOpen,
  handleDelete,
  setCreateType,
  setCreateFormData,
  setIsCreateModalOpen,
}: {
  projects: any[];
  isProjLinked: (projId: string) => boolean;
  localRoleProj: any[];
  roles: any[];
  selectedRoleId: string;
  handleToggle: (
    table: any,
    targetId: string,
    field: string,
    isActive: boolean,
  ) => void;
  handleToggleFeatured: (projectId: string) => void;
  isProjFeatured: (projectId: string) => boolean;
  setEditType: (value: "project" | "blog") => void;
  setEditItem: (item: any) => void;
  setEditFormData: (data: any) => void;
  setIsEditModalOpen: (open: boolean) => void;
  handleDelete: (type: string, id: string) => Promise<void>;
  setCreateType: (value: "project" | "blog") => void;
  setCreateFormData: (data: any) => void;
  setIsCreateModalOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const roleProjectOrder = React.useMemo(() => {
    const roleOrderMap = new Map(
      localRoleProj
        .filter((row: any) => row.role_id === selectedRoleId)
        .map((row: any) => [
          String(row.project_id),
          {
            displayOrder: row.display_order ?? 0,
            featuredDisplayOrder: row.featured_display_order ?? 0,
            isFeatured: !!row.is_featured,
          },
        ]),
    );

    const linkedProjects = [...projects]
      .filter((project) => roleOrderMap.has(String(project.id)))
      .sort((a, b) => {
        const aMeta = roleOrderMap.get(String(a.id));
        const bMeta = roleOrderMap.get(String(b.id));

        if (!aMeta || !bMeta) return 0;
        if (aMeta.isFeatured !== bMeta.isFeatured) {
          return aMeta.isFeatured ? -1 : 1;
        }

        const aOrder = aMeta.isFeatured
          ? aMeta.featuredDisplayOrder
          : aMeta.displayOrder;
        const bOrder = bMeta.isFeatured
          ? bMeta.featuredDisplayOrder
          : bMeta.displayOrder;

        return aOrder - bOrder;
      });

    const unlinkedProjects = projects.filter(
      (project) => !roleOrderMap.has(String(project.id)),
    );

    return [...linkedProjects, ...unlinkedProjects];
  }, [localRoleProj, projects, selectedRoleId]);

  const [orderedProjects, setOrderedProjects] = useState(roleProjectOrder);
  const [isSortMode, setIsSortMode] = useState(false);
  const [isSavingOrder, startOrderSave] = useTransition();

  useEffect(() => {
    setOrderedProjects(roleProjectOrder);
  }, [roleProjectOrder]);

  const handleProjectDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedProjects((currentProjects) => {
      const oldIndex = currentProjects.findIndex(
        (project) => project.id === String(active.id),
      );
      const newIndex = currentProjects.findIndex(
        (project) => project.id === String(over.id),
      );

      if (oldIndex === -1 || newIndex === -1) return currentProjects;
      return arrayMove(currentProjects, oldIndex, newIndex);
    });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleSaveOrder = () => {
    startOrderSave(async () => {
      const result = await saveProjectOrder(
        selectedRoleId,
        orderedProjects.map((project) => project.id),
      );

      if (result?.error) {
        alert(`Failed to save project order: ${result.error}`);
        return;
      }

      setIsSortMode(false);
      router.refresh();
    });
  };

  const featuredProjects = orderedProjects.filter((project) =>
    localRoleProj.some(
      (row: any) =>
        row.role_id === selectedRoleId &&
        String(row.project_id) === String(project.id) &&
        row.is_featured,
    ),
  );

  const regularProjects = orderedProjects.filter(
    (project) =>
      !featuredProjects.some((featured) => featured.id === project.id),
  );

  const renderProjectCards = (projects: any[]) =>
    projects.map((proj, projectIndex) => {
      const linked = isProjLinked(proj.id);
      const projRoleLinks = localRoleProj.filter(
        (rp: any) => rp.project_id === proj.id,
      );
      const linkedRoles = roles.filter((r: any) =>
        projRoleLinks.some((pr: any) => pr.role_id === r.id),
      );

      return (
        <MemoSortableProjectCard
          key={proj.id}
          project={proj}
          projectIndex={projectIndex}
          linked={linked}
          linkedRoles={linkedRoles}
          isSortMode={isSortMode}
          handleToggle={handleToggle}
          handleToggleFeatured={handleToggleFeatured}
          isProjFeatured={isProjFeatured}
          setEditType={setEditType}
          setEditItem={setEditItem}
          setEditFormData={setEditFormData}
          setIsEditModalOpen={setIsEditModalOpen}
          handleDelete={handleDelete}
        />
      );
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-purple-500" />
          Showcase Projects
          <span className="text-xs bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-full">
            {projects.length}
          </span>
        </h3>
        <div className="flex items-center gap-2">
          {isSortMode ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setOrderedProjects(roleProjectOrder);
                  setIsSortMode(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] font-bold uppercase text-muted-foreground transition-all hover:bg-muted"
                disabled={isSavingOrder}
              >
                <X className="w-3 h-3" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveOrder}
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-500 px-3 py-1.5 text-[10px] font-bold uppercase text-white transition-all hover:bg-purple-600 disabled:opacity-50"
                disabled={isSavingOrder}
              >
                <Save className="w-3 h-3" />
                {isSavingOrder ? "Saving..." : "Save order"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                title="Drag projects to reorder them"
                onClick={() => setIsSortMode(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 px-3 py-1.5 text-[10px] font-bold uppercase text-purple-600 transition-all hover:bg-purple-500/10"
              >
                <ListOrdered className="w-3 h-3" />
                Sort projects
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreateType("project");
                  setCreateFormData({});
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-500 uppercase hover:bg-purple-500/20 transition-all"
              >
                <Plus className="w-3 h-3" />
                New Project
              </button>
            </>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleProjectDragEnd}
      >
        <SortableContext
          items={orderedProjects.map((project) => project.id)}
          strategy={rectSortingStrategy}
        >
          {featuredProjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500" />
                Featured order
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {renderProjectCards(featuredProjects)}
              </div>
            </div>
          )}

          {regularProjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-purple-500" />
                Main order
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {renderProjectCards(regularProjects)}
              </div>
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
});

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
  socialLinks,
  roleSocialLinks: initialRoleSocialLinks,
}: PortfolioContentManagerProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [activeTab, setActiveTab] = useState<
    "identity" | "skills" | "career" | "work" | "academia" | "chat"
  >("identity");

  const [localRoleTech, setLocalRoleTech] = useState(initialRoleTech);
  const [localRoleExp, setLocalRoleExp] = useState(initialRoleExp);
  const [localRoleEducation, setLocalRoleEducation] =
    useState(initialRoleEducation);
  const [localRoleCert, setLocalRoleCert] = useState(initialRoleCert);
  const [localRoleProj, setLocalRoleProj] = useState(initialRoleProj);
  const [localRoleBlog, setLocalRoleBlog] = useState(initialRoleBlog);
  const [localRoleSocialLinks, setLocalRoleSocialLinks] = useState(
    initialRoleSocialLinks,
  );

  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingType, setEditingType] = useState<
    "tech" | "exp" | "edu" | "cert" | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<"project" | "blog">("project");
  const [createFormData, setCreateFormData] = useState<any>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<"project" | "blog">("project");
  const [editItem, setEditItem] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [editLoading, setEditLoading] = useState(false);

  // Sync local state when initial props change
  React.useEffect(() => {
    setLocalRoleTech(initialRoleTech);
    setLocalRoleExp(initialRoleExp);
    setLocalRoleEducation(initialRoleEducation);
    setLocalRoleCert(initialRoleCert);
    setLocalRoleProj(initialRoleProj);
    setLocalRoleBlog(initialRoleBlog);
    setLocalRoleSocialLinks(initialRoleSocialLinks);
  }, [
    projects,
    initialRoleTech,
    initialRoleExp,
    initialRoleEducation,
    initialRoleCert,
    initialRoleProj,
    initialRoleBlog,
    initialRoleSocialLinks,
  ]);

  const handleMetadataChange = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as
      | "headline"
      | "bio"
      | "hobbies"
      | "interests"
      | "workStyle"
      | "goals"
      | "languages";
    const value = e.target.value;

    const personalFields = [
      "hobbies",
      "interests",
      "workStyle",
      "goals",
      "languages",
    ] as const;
    const isPersonalField = personalFields.includes(field as (typeof personalFields)[number]);
    if (!isPersonalField && value === selectedRole[field]) return;
    if (isPersonalField && value === selectedRole.personal_profile?.[field]) return;

    const personalProfile = isPersonalField
      ? {
          ...(selectedRole.personal_profile || {}),
          [field]: value,
        }
      : undefined;

    // Background save
    startTransition(async () => {
      setSaveStatus("Saving...");
      const result = await updateRoleMetadata(
        selectedRole.id,
        field === "headline" ? value : selectedRole.headline,
        field === "bio" ? value : selectedRole.bio,
        personalProfile,
      );

      if (!result.error) {
        setSaveStatus("Synced");
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        setSaveStatus("Error!");
      }
    });
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setSaveStatus("Uploading resume...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role_key", selectedRole.slug);

    try {
      const result = await uploadResume(formData);
      if (result.error) {
        alert("Upload failed: " + result.error);
      } else {
        setSaveStatus("Resume uploaded!");
        setTimeout(() => setSaveStatus(null), 2000);
      }
    } catch (err) {
      alert("Upload failed: " + err);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleResumeDelete = async () => {
    const currentResume = resumes.find(
      (r) => r.role_key === selectedRole.slug && !r.link_id,
    );
    if (!currentResume) return;

    if (!confirm("Are you sure you want to delete this resume?")) return;

    setSaveStatus("Deleting resume...");
    const result = await deleteResume(selectedRole.slug);
    if (result.error) {
      alert("Failed to delete: " + result.error);
    } else {
      setSaveStatus("Resume deleted");
      setTimeout(() => setSaveStatus(null), 2000);
    }
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

  const isProjFeatured = React.useCallback(
    (projId: string) =>
      localRoleProj.some(
        (rp) =>
          rp.role_id === selectedRole.id &&
          rp.project_id === projId &&
          rp.is_featured === true,
      ),
    [localRoleProj, selectedRole.id],
  );

  const handleToggleFeatured = React.useCallback(
    (projectId: string) => {
      const currentlyFeatured = isProjFeatured(projectId);

      setLocalRoleProj((prev) => {
        const existing = prev.some(
          (rp) => rp.role_id === selectedRole.id && rp.project_id === projectId,
        );

        if (existing) {
          return prev.map((rp) =>
            rp.role_id === selectedRole.id && rp.project_id === projectId
              ? { ...rp, is_featured: !currentlyFeatured }
              : rp,
          );
        }

        return [
          ...prev,
          {
            role_id: selectedRole.id,
            project_id: projectId,
            is_featured: true,
          },
        ];
      });

      startTransition(async () => {
        const result = await setProjectFeaturedForRole(
          selectedRole.id,
          projectId,
          !currentlyFeatured,
        );

        if (result?.error) {
          setLocalRoleProj(initialRoleProj);
          alert("Failed to update project feature flag. Please refresh.");
        }
      });
    },
    [initialRoleProj, isProjFeatured, selectedRole.id, startTransition],
  );

  const isBlogLinked = (blogId: string) =>
    localRoleBlog.some(
      (rb) => rb.role_id === selectedRole.id && rb.blog_id === blogId,
    );

  const isSocialLinkEnabled = (socialLinkId: string) =>
    localRoleSocialLinks.some(
      (rsl) =>
        rsl.role_id === selectedRole.id &&
        rsl.social_link_id === socialLinkId &&
        rsl.is_enabled,
    );

  const handleToggle = React.useCallback(
    (table: any, targetId: string, field: string, isActive: boolean) => {
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
                  re.role_id === selectedRole.id &&
                  re.experience_id === targetId
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
                !(
                  re.role_id === selectedRole.id && re.education_id === targetId
                ),
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
      } else if (table === "role_social_links") {
        if (isActive) {
          setLocalRoleSocialLinks((prev) =>
            prev.map((rsl) =>
              rsl.role_id === selectedRole.id && rsl.social_link_id === targetId
                ? { ...rsl, is_enabled: false }
                : rsl,
            ),
          );
        } else {
          setLocalRoleSocialLinks((prev) => [
            ...prev,
            {
              role_id: selectedRole.id,
              social_link_id: targetId,
              is_enabled: true,
            },
          ]);
        }
      }

      // 2. Persistent Background Save
      startTransition(async () => {
        let result;
        if (table === "role_social_links") {
          const { toggleSocialLink } = await import("./portfolio-actions");
          result = await toggleSocialLink(selectedRole.id, targetId, !isActive);
        } else {
          result = await toggleRoleRelationship(
            table,
            selectedRole.id,
            targetId,
            field,
            isActive,
          );
        }
        if (result?.error) {
          // Rollback
          setLocalRoleTech(initialRoleTech);
          setLocalRoleExp(initialRoleExp);
          setLocalRoleEducation(initialRoleEducation);
          setLocalRoleCert(initialRoleCert);
          setLocalRoleProj(initialRoleProj);
          setLocalRoleBlog(initialRoleBlog);
          setLocalRoleSocialLinks(initialRoleSocialLinks);
          alert("Failed to save. Please refresh.");
        }
      });
    },
    [
      initialRoleBlog,
      initialRoleCert,
      initialRoleEducation,
      initialRoleExp,
      initialRoleProj,
      initialRoleSocialLinks,
      initialRoleTech,
      selectedRole.id,
      startTransition,
    ],
  );

  const handleOpenEditor = (type: any, item: any = null) => {
    setEditingType(type);
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleDelete = React.useCallback(
    async (type: string, id: string) => {
      if (!confirm("Are you sure you want to delete this item?")) return;

      setSaveStatus("Deleting...");
      startTransition(async () => {
        let result;
        if (type === "tech") result = await deleteTechnology(id);
        else if (type === "exp") result = await deleteExperience(id);
        else if (type === "edu") result = await deleteEducation(id);
        else if (type === "cert") result = await deleteCertification(id);
        else if (type === "project") result = await deleteProject(id);
        else if (type === "blog") result = await deleteBlog(id);

        if (result?.error) alert(result.error);
        setSaveStatus(null);
      });
    },
    [startTransition],
  );

  const handleUpsert = React.useCallback(
    async (data: any) => {
      setSaveStatus("Saving...");
      startTransition(async () => {
        let result;
        // Auto-link to currently selected role if it's a NEW item
        const roleId = data.id ? undefined : selectedRole.id;

        if (editingType === "tech")
          result = await upsertTechnology(data, roleId);
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
    },
    [editingType, selectedRole.id, startTransition],
  );

  return (
    <div className="flex flex-col h-full -m-5 md:-m-7">
      <div className="p-5 md:px-6 md:py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 rounded-xl">
            <Layout className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Portfolio content
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Editing{" "}
              <span className="font-medium text-foreground">
                {selectedRole.title}
              </span>
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
          <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            Role
            <select
              value={selectedRole.slug}
              onChange={(e) =>
                setSelectedRole(roles.find((r) => r.slug === e.target.value))
              }
              className="h-10 px-3 rounded-lg border bg-background font-semibold text-sm text-foreground focus:ring-2 focus:ring-accent outline-none cursor-pointer hover:border-accent transition-colors"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.slug}>
                  {r.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-125">
        <aside className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r bg-muted/10 p-3">
          <p className="px-3 pt-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Edit sections
          </p>
          <nav
            className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar"
            aria-label="Content sections"
          >
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
            <TabButton
              active={activeTab === "chat"}
              onClick={() => setActiveTab("chat")}
              icon={<MessageSquare className="w-4 h-4" />}
              label="Chat Config"
            />
          </nav>
        </aside>

        <div className="flex-1 p-5 md:p-8">
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
                    key={`headline-${selectedRole.id}`}
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
                    Role Resume
                  </label>

                  {(() => {
                    const currentResume = resumes.find(
                      (r) => r.role_key === selectedRole.slug && !r.link_id,
                    );
                    return currentResume?.resume_url ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
                          <FileText className="w-5 h-5 text-accent" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {currentResume.is_upload
                                ? "Uploaded Resume"
                                : "External Resume Link"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {currentResume.resume_url}
                            </p>
                          </div>
                          <a
                            href={currentResume.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-muted rounded-md transition-colors"
                            title="View Resume"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={handleResumeDelete}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                            title="Delete Resume"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-md border border-accent/30 px-2 py-1 text-xs text-accent hover:bg-accent/5"
                          >
                            Replace PDF
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Click to upload resume
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF only for automatic AI resume parsing
                        </p>
                      </div>
                    );
                  })()}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />

                  {uploadingResume && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground italic">
                    This file will be served when visitors click "Download
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
                  key={`bio-${selectedRole.id}`}
                  name="bio"
                  rows={4}
                  defaultValue={selectedRole.bio}
                  onBlur={handleMetadataChange}
                  className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-sm leading-relaxed shadow-sm transition-all"
                  placeholder="Briefly describe your expertise for this specific role..."
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-6 border-t border-border">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Personal Profile (Optional)
                  </label>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Public details the role chatbot may use when visitors ask personal or conversational questions.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    ["hobbies", "Hobbies", "Hardware tinkering, AI exploration"],
                    ["interests", "Interests", "Automation, design, emerging technology"],
                    ["workStyle", "Work Style", "Independent, practical, collaborative"],
                    ["goals", "Goals", "Build useful systems that improve productivity"],
                    ["languages", "Languages", "English (Native), Spanish (Conversational)"],
                  ].map(([name, label, placeholder]) => (
                    <div key={name} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {label}
                      </label>
                      <textarea
                        key={`${name}-${selectedRole.id}`}
                        name={name}
                        rows={2}
                        defaultValue={selectedRole.personal_profile?.[name] || ""}
                        onBlur={handleMetadataChange}
                        className="w-full rounded-lg border bg-background p-3 text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links Configuration */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5" />
                    Social Links
                  </label>
                  <span className="text-[10px] text-muted-foreground">
                    Toggle which social links appear for this role
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {socialLinks.map((socialLink) => {
                    const enabled = isSocialLinkEnabled(socialLink.id);
                    return (
                      <div key={socialLink.id} className="group/item relative">
                        <button
                          onClick={() =>
                            handleToggle(
                              "role_social_links",
                              socialLink.id,
                              "social_link_id",
                              enabled,
                            )
                          }
                          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group ${
                            enabled
                              ? "bg-accent/5 border-accent text-accent shadow-sm ring-1 ring-accent/20"
                              : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                          }`}
                        >
                          <span className="text-xs font-bold truncate pr-2">
                            {socialLink.name}
                          </span>
                          {enabled ? (
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 opacity-10 shrink-0" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hero Configuration */}
              <HeroConfigEditor
                selectedRole={selectedRole}
                onSave={(status) => {
                  setSaveStatus(status);
                  if (status === "Synced")
                    setTimeout(() => setSaveStatus(null), 2000);
                }}
              />
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
                        className={`w-full flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 group ${
                          linked
                            ? "bg-accent/5 border-accent text-accent shadow-sm ring-1 ring-accent/20"
                            : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {tech.icon_url ? (
                            <img
                              src={tech.icon_url}
                              alt={tech.name}
                              className="w-5 h-5 object-contain shrink-0"
                            />
                          ) : (
                            <DynamicIcon
                              name={tech.icon_name || "CircleHelp"}
                              size={20}
                              className="shrink-0"
                            />
                          )}
                          <span className="text-xs font-bold truncate">
                            {tech.name}
                          </span>
                        </div>
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
                <ProjectSortableList
                  projects={projects}
                  isProjLinked={isProjLinked}
                  localRoleProj={localRoleProj}
                  roles={roles}
                  selectedRoleId={selectedRole.id}
                  handleToggle={handleToggle}
                  handleToggleFeatured={handleToggleFeatured}
                  isProjFeatured={isProjFeatured}
                  setEditType={setEditType}
                  setEditItem={setEditItem}
                  setEditFormData={setEditFormData}
                  setIsEditModalOpen={setIsEditModalOpen}
                  handleDelete={handleDelete}
                  setCreateType={setCreateType}
                  setCreateFormData={setCreateFormData}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                />
              </div>

              {/* Blogs */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    Featured Articles
                    <span className="text-xs bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full">
                      {blogs.length}
                    </span>
                  </h3>
                  <button
                    onClick={() => {
                      setCreateType("blog");
                      setCreateFormData({});
                      setIsCreateModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-500 uppercase hover:bg-orange-500/20 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    New Blog
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {blogs.map((blog) => {
                    const linked = isBlogLinked(blog.id);
                    const blogRoleLinks = localRoleBlog.filter(
                      (rb: any) => rb.blog_id === blog.id,
                    );
                    const linkedRoles = roles.filter((r: any) =>
                      blogRoleLinks.some((br: any) => br.role_id === r.id),
                    );
                    return (
                      <div
                        key={blog.id}
                        className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
                          linked
                            ? "bg-orange-500/5 border-orange-500/50 text-orange-700 shadow-sm ring-1 ring-orange-500/10"
                            : "bg-background hover:bg-muted/50 text-muted-foreground border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() =>
                                handleToggle(
                                  "role_blogs",
                                  blog.id,
                                  "blog_id",
                                  linked,
                                )
                              }
                              className="text-xs font-bold line-clamp-1 text-left w-full"
                            >
                              {blog.title}
                            </button>
                            <p className="text-[10px] opacity-60 mt-1 line-clamp-1">
                              {blog.excerpt || blog.description}
                            </p>

                            {/* Role Tags */}
                            {linkedRoles.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {linkedRoles.map((role: any) => (
                                  <span
                                    key={role.id}
                                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/10 text-orange-600 border border-orange-500/20"
                                  >
                                    {role.title}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditType("blog");
                                setEditItem(blog);
                                setEditFormData({
                                  title: blog.title,
                                  excerpt: blog.excerpt || "",
                                  content: blog.content || "",
                                  tags: (blog.tags || []).join(", "),
                                  roleIds: blogRoleLinks.map(
                                    (br: any) => br.role_id,
                                  ),
                                });
                                setIsEditModalOpen(true);
                              }}
                              className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete("blog", blog.id);
                              }}
                              className="p-1.5 bg-background border rounded-lg shadow-sm hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                            {linked ? (
                              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 opacity-10 shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
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
                            <div className="text-sm font-bold">
                              {edu.degree}
                            </div>
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

          {/* Tab 6: Chat Configuration */}
          {activeTab === "chat" && (
            <ChatConfigEditor
              selectedRole={selectedRole}
              onSave={(status) => {
                setSaveStatus(status);
                if (
                  status === "Chat config synced" ||
                  status === "Persona synced"
                )
                  setTimeout(() => setSaveStatus(null), 2000);
              }}
            />
          )}
        </div>
      </div>

      <div className="p-4 bg-muted/30 border-t flex items-center gap-2 text-xs text-muted-foreground">
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

      {/* Create Project/Blog Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Create New {createType === "project" ? "Project" : "Blog"}
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCreateLoading(true);
                try {
                  let thumbnailUrl = createFormData.thumbnail_url;
                  let heroImageUrl = createFormData.hero_image_url;

                  if (createFormData.thumbnailFile) {
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", createFormData.thumbnailFile);
                    const result = await uploadProjectImage(uploadFormData);
                    if (result.error) {
                      alert("Thumbnail upload failed: " + result.error);
                      setCreateLoading(false);
                      return;
                    }
                    thumbnailUrl = result.url;
                  }

                  if (createFormData.heroImageFile) {
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", createFormData.heroImageFile);
                    const result = await uploadProjectImage(uploadFormData);
                    if (result.error) {
                      alert("Hero image upload failed: " + result.error);
                      setCreateLoading(false);
                      return;
                    }
                    heroImageUrl = result.url;
                  }

                  if (createType === "project") {
                    await createProject({
                      title: createFormData.title,
                      description: createFormData.description,
                      thumbnail_url: thumbnailUrl,
                      hero_image_url: heroImageUrl,
                      technologies: createFormData.technologies
                        ?.split(",")
                        .map((t: string) => t.trim())
                        .filter(Boolean),
                      tags: createFormData.tags || [],
                      live_url: createFormData.live_url,
                      github_url: createFormData.github_url,
                      demo_type: createFormData.demo_type || null,
                      display_order: createFormData.display_order || 0,
                      roleIds: createFormData.roleIds || [],
                    });
                  } else {
                    await createBlog({
                      title: createFormData.title,
                      excerpt: createFormData.excerpt,
                      content: createFormData.content,
                      tags: createFormData.tags
                        ?.split(",")
                        .map((t: string) => t.trim())
                        .filter(Boolean),
                      roleIds: createFormData.roleIds || [],
                    });
                  }
                  setIsCreateModalOpen(false);
                  setCreateFormData({});
                  router.refresh();
                } catch (err) {
                  alert("Error creating content");
                } finally {
                  setCreateLoading(false);
                }
              }}
              className="p-6 space-y-5"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Title *
                </label>
                <input
                  required
                  value={createFormData.title || ""}
                  onChange={(e) =>
                    setCreateFormData((prev: any) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {createType === "project" ? "Description" : "Excerpt"} *
                </label>
                <textarea
                  required
                  value={
                    createType === "project"
                      ? createFormData.description || ""
                      : createFormData.excerpt || ""
                  }
                  onChange={(e) =>
                    setCreateFormData((prev: any) => ({
                      ...prev,
                      [createType === "project" ? "description" : "excerpt"]:
                        e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-base"
                />
              </div>

              {createType === "project" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Technologies (comma-separated)
                      </label>
                      <input
                        value={createFormData.technologies || ""}
                        onChange={(e) =>
                          setCreateFormData((prev: any) => ({
                            ...prev,
                            technologies: e.target.value,
                          }))
                        }
                        placeholder="React, TypeScript, Node.js"
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Project tags
                      </label>
                      <ProjectTagInput
                        tags={createFormData.tags || []}
                        onChange={(tags) =>
                          setCreateFormData((prev: any) => ({ ...prev, tags }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Thumbnail Image
                      </label>
                      {editFormData.thumbnail_url ? (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                          <img
                            src={editFormData.thumbnail_url}
                            alt="Current thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] text-white">
                            Current image
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No thumbnail image uploaded.
                        </p>
                      )}
                      <div className="relative">
                        <span className="mb-1 block text-[10px] text-muted-foreground">
                          Choose a replacement image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setCreateFormData((prev: any) => ({
                                ...prev,
                                thumbnailFile: file,
                                thumbnail_url: URL.createObjectURL(file),
                              }));
                            }
                          }}
                          className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-500/10 file:text-purple-600 hover:file:bg-purple-500/20"
                        />
                      </div>
                      {createFormData.thumbnail_url && (
                        <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border">
                          <img
                            src={createFormData.thumbnail_url}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Hero Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCreateFormData((prev: any) => ({
                              ...prev,
                              heroImageFile: file,
                              hero_image_url: URL.createObjectURL(file),
                            }));
                          }
                        }}
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-500/10 file:text-purple-600 hover:file:bg-purple-500/20"
                      />
                    </div>
                    {createFormData.hero_image_url && (
                      <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border">
                        <img
                          src={createFormData.hero_image_url}
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={createFormData.live_url || ""}
                        onChange={(e) =>
                          setCreateFormData((prev: any) => ({
                            ...prev,
                            live_url: e.target.value,
                          }))
                        }
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={createFormData.github_url || ""}
                        onChange={(e) =>
                          setCreateFormData((prev: any) => ({
                            ...prev,
                            github_url: e.target.value,
                          }))
                        }
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Interactive demo
                      </label>
                      <select
                        value={createFormData.demo_type || ""}
                        onChange={(e) =>
                          setCreateFormData((prev: any) => ({
                            ...prev,
                            demo_type: e.target.value || null,
                          }))
                        }
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                      >
                        <option value="">No interactive demo</option>
                        <option value="lead-generator">
                          Google Maps lead generator
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        Display Order
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        aria-label="Display order"
                        value={createFormData.display_order ?? ""}
                        onChange={(e) =>
                          setCreateFormData((prev: any) => ({
                            ...prev,
                            display_order:
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value),
                          }))
                        }
                        className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                        placeholder="End of list"
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Use a position from 1 onward. Leave blank to add this
                        project last.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {createType === "blog" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Content
                    </label>
                    <textarea
                      value={createFormData.content || ""}
                      onChange={(e) =>
                        setCreateFormData((prev: any) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={8}
                      className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Tags (comma-separated)
                    </label>
                    <input
                      value={createFormData.tags || ""}
                      onChange={(e) =>
                        setCreateFormData((prev: any) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="Tutorial, React, Web Development"
                      className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-base"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Portfolio Tags (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role: any) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        const currentIds = createFormData.roleIds || [];
                        setCreateFormData((prev: any) => ({
                          ...prev,
                          roleIds: currentIds.includes(role.id)
                            ? currentIds.filter((id: string) => id !== role.id)
                            : [...currentIds, role.id],
                        }));
                      }}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                        (createFormData.roleIds || []).includes(role.id)
                          ? createType === "project"
                            ? "bg-purple-500 text-white border-purple-500"
                            : "bg-orange-500 text-white border-orange-500"
                          : "bg-muted text-muted-foreground border-border hover:border-purple-500/30"
                      }`}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  type="submit"
                  disabled={createLoading || !createFormData.title}
                  className="w-full bg-linear-to-r from-purple-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl py-3 transition-all disabled:opacity-50"
                >
                  {createLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create {createType === "project" ? "Project" : "Blog"}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project/Blog Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="flex max-h-[min(90vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/20 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-500">
                  Portfolio editor
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Edit {editType === "project" ? "Project" : "Blog"}
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close editor"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setEditLoading(true);
                try {
                  let thumbnailUrl = editFormData.thumbnail_url;
                  let heroImageUrl = editFormData.hero_image_url;

                  if (editFormData.thumbnailFile) {
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", editFormData.thumbnailFile);
                    const result = await uploadProjectImage(uploadFormData);
                    if (result.error) {
                      alert("Thumbnail upload failed: " + result.error);
                      setEditLoading(false);
                      return;
                    }
                    thumbnailUrl = result.url;
                  }

                  if (editFormData.heroImageFile) {
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", editFormData.heroImageFile);
                    const result = await uploadProjectImage(uploadFormData);
                    if (result.error) {
                      alert("Hero image upload failed: " + result.error);
                      setEditLoading(false);
                      return;
                    }
                    heroImageUrl = result.url;
                  }

                  if (editType === "project" && editItem) {
                    const projectUpdate = {
                      title: editFormData.title,
                      description: editFormData.description,
                      thumbnail_url: thumbnailUrl,
                      hero_image_url: heroImageUrl,
                      technologies: editFormData.technologies
                        ?.split(",")
                        .map((t: string) => t.trim())
                        .filter(Boolean),
                      tags: editFormData.tags || [],
                      live_url: editFormData.live_url,
                      github_url: editFormData.github_url,
                      demo_type: editFormData.demo_type || null,
                      roleIds: editFormData.roleIds || [],
                      ...(Number(editFormData.display_order) !==
                      Number(editItem.display_order)
                        ? { display_order: Number(editFormData.display_order) }
                        : {}),
                    };
                    await updateProject(editItem.id, projectUpdate);
                  } else if (editType === "blog" && editItem) {
                    await updateBlog(editItem.id, {
                      title: editFormData.title,
                      excerpt: editFormData.excerpt,
                      content: editFormData.content,
                      tags: editFormData.tags
                        ?.split(",")
                        .map((t: string) => t.trim())
                        .filter(Boolean),
                      roleIds: editFormData.roleIds || [],
                    });
                  }
                  setIsEditModalOpen(false);
                  setEditFormData({});
                  setEditItem(null);
                  router.refresh();
                } catch (err) {
                  alert("Error updating content");
                } finally {
                  setEditLoading(false);
                }
              }}
              className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-7"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Title *
                </label>
                <input
                  required
                  value={editFormData.title || ""}
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {editType === "project" ? "Description" : "Excerpt"} *
                </label>
                <textarea
                  required
                  value={
                    editType === "project"
                      ? editFormData.description || ""
                      : editFormData.excerpt || ""
                  }
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      [editType === "project" ? "description" : "excerpt"]:
                        e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-base"
                />
              </div>

              {editType === "project" && (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Technologies (comma-separated)
                      </label>
                      <input
                        value={editFormData.technologies || ""}
                        onChange={(e) =>
                          setEditFormData((prev: any) => ({
                            ...prev,
                            technologies: e.target.value,
                          }))
                        }
                        placeholder="React, TypeScript, Node.js"
                        className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Project tags
                      </label>
                      <ProjectTagInput
                        tags={editFormData.tags || []}
                        onChange={(tags) =>
                          setEditFormData((prev: any) => ({ ...prev, tags }))
                        }
                      />
                    </div>
                    <div className="rounded-xl border border-border bg-muted/20 p-3 md:col-span-2">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Project images
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Use wide images for the best portfolio presentation.
                          </p>
                        </div>
                        <Upload className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          {
                            label: "Thumbnail image",
                            field: "thumbnail_url",
                            fileField: "thumbnailFile",
                            alt: "Thumbnail preview",
                          },
                          {
                            label: "Hero image",
                            field: "hero_image_url",
                            fileField: "heroImageFile",
                            alt: "Hero preview",
                          },
                        ].map((image) => (
                          <div
                            key={image.field}
                            className="space-y-3 rounded-lg border border-border bg-background p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {image.label}
                              </label>
                              <span className="text-[10px] text-muted-foreground">
                                {editFormData[image.fileField]
                                  ? "New image"
                                  : editFormData[image.field]
                                    ? "Current"
                                    : "Not set"}
                              </span>
                            </div>
                            <div className="relative aspect-16/8 overflow-hidden rounded-md border border-border bg-muted">
                              {editFormData[image.field] ? (
                                <img
                                  src={editFormData[image.field]}
                                  alt={image.alt}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                  No image uploaded
                                </div>
                              )}
                            </div>
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-purple-500/40 px-3 py-2 text-xs font-semibold text-purple-600 transition-colors hover:bg-purple-500/10">
                              <Upload className="h-3.5 w-3.5" />
                              Choose replacement
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setEditFormData((prev: any) => ({
                                      ...prev,
                                      [image.fileField]: file,
                                      [image.field]: URL.createObjectURL(file),
                                    }));
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={editFormData.live_url || ""}
                        onChange={(e) =>
                          setEditFormData((prev: any) => ({
                            ...prev,
                            live_url: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={editFormData.github_url || ""}
                        onChange={(e) =>
                          setEditFormData((prev: any) => ({
                            ...prev,
                            github_url: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Interactive demo
                      </label>
                      <select
                        value={editFormData.demo_type || ""}
                        onChange={(e) =>
                          setEditFormData((prev: any) => ({
                            ...prev,
                            demo_type: e.target.value || null,
                          }))
                        }
                        className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="">No interactive demo</option>
                        <option value="lead-generator">
                          Google Maps lead generator
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        Display Order
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        aria-label="Display order"
                        value={editFormData.display_order || ""}
                        onChange={(e) =>
                          setEditFormData((prev: any) => ({
                            ...prev,
                            display_order:
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value),
                          }))
                        }
                        className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                        placeholder="End of list"
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Use a position from 1 onward. Leave blank to move this
                        project last.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {editType === "blog" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Content
                    </label>
                    <textarea
                      value={editFormData.content || ""}
                      onChange={(e) =>
                        setEditFormData((prev: any) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={8}
                      className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Tags (comma-separated)
                    </label>
                    <input
                      value={editFormData.tags || ""}
                      onChange={(e) =>
                        setEditFormData((prev: any) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="Tutorial, React, Web Development"
                      className="w-full bg-background border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-base"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Portfolio Tags (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role: any) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        const currentIds = editFormData.roleIds || [];
                        setEditFormData((prev: any) => ({
                          ...prev,
                          roleIds: currentIds.includes(role.id)
                            ? currentIds.filter((id: string) => id !== role.id)
                            : [...currentIds, role.id],
                        }));
                      }}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                        (editFormData.roleIds || []).includes(role.id)
                          ? editType === "project"
                            ? "bg-purple-500 text-white border-purple-500"
                            : "bg-orange-500 text-white border-orange-500"
                          : "bg-muted text-muted-foreground border-border hover:border-purple-500/30"
                      }`}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 -mx-5 -mb-5 flex flex-col-reverse gap-3 border-t bg-background/95 p-5 backdrop-blur-sm sm:-mx-7 sm:-mb-7 sm:flex-row sm:items-center sm:justify-end sm:p-7">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading || !editFormData.title}
                  className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:min-w-36"
                >
                  {editLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const ICON_LIBRARIES = [
  { value: "logos", label: "Brand Logos", placeholder: "e.g. microsoft-icon" },
  {
    value: "simple-icons",
    label: "Simple Icons",
    placeholder: "e.g. microsoftexcel",
  },
  { value: "lucide", label: "Lucide", placeholder: "e.g. box" },
  { value: "fa", label: "Font Awesome", placeholder: "e.g. Microsoft" },
  { value: "fa6", label: "Font Awesome 6", placeholder: "e.g. Microsoft" },
  {
    value: "si",
    label: "Simple Icons (legacy)",
    placeholder: "e.g. SiMicrosoftexcel",
  },
  { value: "pi", label: "Phosphor", placeholder: "e.g. MicrosoftExcelLogo" },
  { value: "ri", label: "Remix Icon", placeholder: "e.g. MicrosoftFill" },
  { value: "io5", label: "Ionicons", placeholder: "e.g. LogoMicrosoft" },
  { value: "md", label: "Material", placeholder: "e.g. MdAutoAwesome" },
];

function parseIconName(
  iconName?: string,
  iconUrl?: string,
): { source: string; name: string } {
  if (iconUrl) return { source: "custom", name: "" };
  if (!iconName) return { source: "logos", name: "" };
  const colonIdx = iconName.indexOf(":");
  if (colonIdx > 0) {
    const source = iconName.slice(0, colonIdx);
    const name = iconName.slice(colonIdx + 1);
    if (ICON_LIBRARIES.some((lib) => lib.value === source)) {
      return { source, name };
    }
  }
  // Legacy Simple Icons names default to si source
  if (
    iconName.startsWith("Si") &&
    iconName.length > 2 &&
    iconName[2] === iconName[2].toUpperCase()
  ) {
    return { source: "si", name: iconName };
  }
  return { source: "logos", name: iconName };
}

function buildIconName(source: string, name: string): string {
  if (source === "custom" || !name.trim()) return "";
  return `${source}:${name.trim()}`;
}

function IconLibrarySelector({
  source,
  name,
  onChange,
  onOpenPicker,
}: {
  source: string;
  name: string;
  onChange: (iconName: string) => void;
  onOpenPicker: () => void;
}) {
  const selectedLib =
    ICON_LIBRARIES.find((l) => l.value === source) || ICON_LIBRARIES[0];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
          Icon Library
        </label>
        <select
          value={source}
          onChange={(e) => onChange(buildIconName(e.target.value, name))}
          className="w-full bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
        >
          {ICON_LIBRARIES.map((lib) => (
            <option key={lib.value} value={lib.value}>
              {lib.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
          Icon Name
        </label>
        <div className="flex items-center gap-3">
          <input
            value={name}
            onChange={(e) => onChange(buildIconName(source, e.target.value))}
            className="flex-1 bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono text-sm"
            placeholder={selectedLib.placeholder}
          />
          <div className="w-12 h-12 rounded-lg border bg-white flex items-center justify-center overflow-hidden shrink-0">
            <DynamicIcon name={name ? `${source}:${name}` : ""} size={24} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Preview updates as you type. Use the prefix automatically.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenPicker}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent/10 border border-accent/20 rounded-lg text-xs font-bold uppercase tracking-widest text-accent hover:bg-accent/20 transition-all"
      >
        <Search className="w-4 h-4" />
        Browse Tool Icons
      </button>
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
  const [formData, setFormData] = useState<any>(() => {
    const base = item || {
      highlights: [],
      technologies: [],
      is_webinar: false,
      display_order: 0,
    };
    if (type === "tech") {
      const { source, name } = parseIconName(base.icon_name, base.icon_url);
      return { ...base, _iconSource: source, _iconName: name };
    }
    return base;
  });
  const [showIconPicker, setShowIconPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    if (type === "tech") {
      payload.icon_name = buildIconName(
        formData._iconSource,
        formData._iconName,
      );
      delete payload._iconSource;
      delete payload._iconName;
    }
    onSave(payload);
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

              <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Skill Icon
                </label>

                {formData.icon_url ? (
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src={formData.icon_url}
                        alt="Skill icon"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleChange("icon_url", "");
                          handleChange("_iconSource", "logos");
                          handleChange("_iconName", "");
                        }}
                        className="text-xs text-destructive hover:underline"
                      >
                        Remove custom icon
                      </button>
                      <span className="text-xs text-muted-foreground">
                        Switches back to library icon below
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/svg+xml,image/png,image/jpeg,image/webp"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append("file", file);
                        const res = await uploadSkillIcon(fd);
                        if (res.error) {
                          alert(res.error);
                        } else if (res.url) {
                          handleChange("icon_url", res.url);
                          handleChange("_iconSource", "custom");
                          handleChange("_iconName", "");
                        }
                      }}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90"
                    />
                    <p className="text-xs text-muted-foreground">
                      SVG, PNG, JPEG or WebP. Max 2 MB.
                    </p>
                  </div>
                )}

                <IconLibrarySelector
                  source={formData._iconSource || "logos"}
                  name={formData._iconName || ""}
                  onChange={(iconName) => {
                    handleChange("icon_name", iconName);
                    const { source, name } = parseIconName(iconName);
                    handleChange("_iconSource", source);
                    handleChange("_iconName", name);
                  }}
                  onOpenPicker={() => setShowIconPicker(true)}
                />

                {showIconPicker &&
                  createPortal(
                    <IconPicker
                      value={formData.icon_name || ""}
                      onChange={(iconName) => {
                        handleChange("icon_name", iconName);
                        const { source, name } = parseIconName(iconName);
                        handleChange("_iconSource", source);
                        handleChange("_iconName", name);
                      }}
                      onClose={() => setShowIconPicker(false)}
                    />,
                    document.body,
                  )}
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
      type="button"
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 w-full md:justify-start rounded-lg px-3 py-2.5 border-l-2 transition-colors duration-200 text-sm font-medium whitespace-nowrap ${
        active
          ? "border-accent text-foreground bg-background shadow-sm"
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
