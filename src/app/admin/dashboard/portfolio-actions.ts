"use server";

import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateRoleMetadata(
  roleId: string,
  headline: string,
  bio: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_roles")
    .update({ headline, bio })
    .eq("id", roleId);

  if (error) {
    console.error("Error updating role metadata:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function toggleRoleRelationship(
  table:
    | "role_technologies"
    | "role_experience"
    | "role_projects"
    | "role_blogs"
    | "role_education"
    | "role_certifications",
  roleId: string,
  targetId: string,
  targetField: string,
  isActive: boolean,
) {
  const supabase = await createClient();

  if (isActive) {
    // Linked -> Unlink (Delete)
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("role_id", roleId)
      .eq(targetField, targetId);

    if (error) return { error: error.message };
  } else {
    // Unlinked -> Link (Insert)
    const { error } = await supabase
      .from(table)
      .insert({ role_id: roleId, [targetField]: targetId });

    if (error) return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateTechnologyProficiency(
  techId: string,
  proficiency: number,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("technologies")
    .update({ proficiency })
    .eq("id", techId);

  if (error) return { error: error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateRoleResume(roleKey: string, resumeUrl: string) {
  const supabase = await createClient();

  // Try to update first
  const { data, error: updateError } = await supabase
    .from("gateway_resumes")
    .update({ resume_url: resumeUrl, updated_at: new Date().toISOString() })
    .eq("role_key", roleKey)
    .select();

  // If no record found, insert
  if (!updateError && (!data || data.length === 0)) {
    const { error: insertError } = await supabase
      .from("gateway_resumes")
      .insert({ role_key: roleKey, resume_url: resumeUrl });

    if (insertError) return { error: insertError.message };
  } else if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

// --- CRUD Actions for Portfolio Content ---

export async function upsertTechnology(tech: any, roleId?: string) {
  const supabase = await createClient();

  console.log("upsertTechnology called", { id: tech.id, icon_url: tech.icon_url });

  let result;
  if (tech.id) {
    // Update
    result = await supabase
      .from("technologies")
      .update({
        name: tech.name,
        icon_name: tech.icon_name,
        icon_url: tech.icon_url,
        proficiency: tech.proficiency,
      })
      .eq("id", tech.id);
    console.log("upsertTechnology update result", result);
  } else {
    // Create
    const { data: newTech, error: insertError } = await supabase
      .from("technologies")
      .insert({
        name: tech.name,
        icon_name: tech.icon_name,
        icon_url: tech.icon_url,
        proficiency: tech.proficiency,
      })
      .select()
      .single();

    if (insertError) return { error: insertError.message };

    // Auto-link to role if provided
    if (roleId && newTech) {
      await supabase
        .from("role_technologies")
        .insert({ role_id: roleId, tech_id: newTech.id });
    }
    result = { error: null };
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("technologies").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function uploadSkillIcon(formData: FormData) {
  const supabase = createServiceRoleClient();

  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  try {
    const fileExt = file.name.split(".").pop() || "svg";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("skill_icons")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("skill_icons").getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (err) {
    return { error: `Unexpected error: ${err}` };
  }
}

export async function upsertExperience(exp: any, roleId?: string) {
  const supabase = await createClient();

  const data = {
    company: exp.company,
    title: exp.title,
    period: exp.period,
    location: exp.location,
    description: exp.description,
    highlights: exp.highlights || [],
    technologies: exp.technologies || [],
    logo_url: exp.logo_url,
    logo_bg_color: exp.logo_bg_color,
    display_order: exp.display_order || 0,
  };

  let result;
  if (exp.id) {
    result = await supabase.from("experience").update(data).eq("id", exp.id);
  } else {
    const { data: newExp, error: insertError } = await supabase
      .from("experience")
      .insert(data)
      .select()
      .single();

    if (insertError) return { error: insertError.message };

    if (roleId && newExp) {
      await supabase
        .from("role_experience")
        .insert({ role_id: roleId, experience_id: newExp.id });
    }
    result = { error: null };
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function upsertEducation(edu: any, roleId?: string) {
  const supabase = await createClient();

  const data = {
    school: edu.school,
    degree: edu.degree,
    period: edu.period,
    logo_url: edu.logo_url,
    description: edu.description,
    highlights: edu.highlights || [],
    website_url: edu.website_url,
    display_order: edu.display_order || 0,
  };

  let result;
  if (edu.id) {
    result = await supabase.from("education").update(data).eq("id", edu.id);
  } else {
    const { data: newEdu, error: insertError } = await supabase
      .from("education")
      .insert(data)
      .select()
      .single();

    if (insertError) return { error: insertError.message };

    if (roleId && newEdu) {
      await supabase
        .from("role_education")
        .insert({ role_id: roleId, education_id: newEdu.id });
    }
    result = { error: null };
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function upsertCertification(cert: any, roleId?: string) {
  const supabase = await createClient();

  const data = {
    title: cert.title,
    description: cert.description,
    logo_url: cert.logo_url,
    logo_alt: cert.logo_alt,
    cert_url: cert.cert_url,
    is_webinar: cert.is_webinar || false,
    organizer: cert.organizer,
    date_label: cert.date_label,
    display_order: cert.display_order || 0,
  };

  let result;
  if (cert.id) {
    result = await supabase
      .from("certifications")
      .update(data)
      .eq("id", cert.id);
  } else {
    const { data: newCert, error: insertError } = await supabase
      .from("certifications")
      .insert(data)
      .select()
      .single();

    if (insertError) return { error: insertError.message };

    if (roleId && newCert) {
      await supabase
        .from("role_certifications")
        .insert({ role_id: roleId, certification_id: newCert.id });
    }
    result = { error: null };
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateHeroConfig(roleId: string, heroConfig: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_roles")
    .update({ hero_config: heroConfig })
    .eq("id", roleId);

  if (error) {
    console.error("Error updating hero config:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateChatConfig(roleId: string, chatConfig: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_roles")
    .update({ chat_config: chatConfig })
    .eq("id", roleId);

  if (error) {
    console.error("Error updating chat config:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateChatPersona(roleId: string, chatPersona: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_roles")
    .update({ chat_persona: chatPersona })
    .eq("id", roleId);

  if (error) {
    console.error("Error updating chat persona:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

// --- Social Links Actions ---

export async function toggleSocialLink(
  roleId: string,
  socialLinkId: string,
  isEnabled: boolean,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("role_social_links")
    .update({ is_enabled: isEnabled })
    .eq("role_id", roleId)
    .eq("social_link_id", socialLinkId);

  if (error) {
    console.error("Error toggling social link:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function upsertSocialLink(socialLink: any, roleId?: string) {
  const supabase = await createClient();

  let result;
  if (socialLink.id) {
    // Update
    result = await supabase
      .from("social_links")
      .update({
        name: socialLink.name,
        platform: socialLink.platform,
        url: socialLink.url,
        icon_name: socialLink.icon_name,
        color_class: socialLink.color_class,
        display_order: socialLink.display_order || 0,
      })
      .eq("id", socialLink.id);
  } else {
    // Create
    const { data: newSocialLink, error: insertError } = await supabase
      .from("social_links")
      .insert({
        name: socialLink.name,
        platform: socialLink.platform,
        url: socialLink.url,
        icon_name: socialLink.icon_name,
        color_class: socialLink.color_class,
        display_order: socialLink.display_order || 0,
      })
      .select()
      .single();

    if (insertError) return { error: insertError.message };

    // Auto-link to role if provided
    if (roleId && newSocialLink) {
      await supabase
        .from("role_social_links")
        .insert({
          role_id: roleId,
          social_link_id: newSocialLink.id,
          is_enabled: true,
          display_order: socialLink.display_order || 0,
        });
    }
    result = { error: null };
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

export async function updateSocialLinkOrder(
  roleId: string,
  socialLinkId: string,
  displayOrder: number,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("role_social_links")
    .update({ display_order: displayOrder })
    .eq("role_id", roleId)
    .eq("social_link_id", socialLinkId);

  if (error) {
    console.error("Error updating social link order:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  return { success: true };
}

// --- Create Actions for Projects & Blogs ---

export async function createProject(projectData: {
  title: string;
  description: string;
  thumbnail_url?: string;
  hero_image_url?: string;
  technologies?: string[];
  live_url?: string;
  github_url?: string;
  roleIds?: string[];
}) {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title: projectData.title,
      description: projectData.description,
      thumbnail_url: projectData.thumbnail_url || null,
      hero_image_url: projectData.hero_image_url || null,
      technologies: projectData.technologies || [],
      live_url: projectData.live_url || null,
      github_url: projectData.github_url || null,
      is_published: true,
      display_order: 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return { error: error.message };
  }

  // Link to roles
  if (projectData.roleIds && projectData.roleIds.length > 0 && project) {
    const roleInserts = projectData.roleIds.map((roleId) => ({
      role_id: roleId,
      project_id: project.id,
    }));
    await supabase.from("role_projects").insert(roleInserts);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true, project };
}

export async function createBlog(blogData: {
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
  images?: { url: string; alt: string }[];
  roleIds?: string[];
}) {
  const supabase = await createClient();

  const slug = blogData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: blog, error } = await supabase
    .from("blogs")
    .insert({
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      slug,
      tags: blogData.tags || [],
      status: "published",
      read_time: "5 min read",
      images: blogData.images || [],
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating blog:", error);
    return { error: error.message };
  }

  // Link to roles
  if (blogData.roleIds && blogData.roleIds.length > 0 && blog) {
    const roleInserts = blogData.roleIds.map((roleId) => ({
      role_id: roleId,
      blog_id: blog.id,
    }));
    await supabase.from("role_blogs").insert(roleInserts);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true, blog };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBlog(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true };
}

// --- File Upload for Project Images ---

export async function uploadProjectImage(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  try {
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("projects_assets")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("projects_assets").getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (err) {
    return { error: `Unexpected error: ${err}` };
  }
}

// --- Edit/Update Actions for Projects & Blogs ---

export async function updateProject(
  id: string,
  projectData: {
    title?: string;
    description?: string;
    thumbnail_url?: string;
    hero_image_url?: string;
    technologies?: string[];
    live_url?: string;
    github_url?: string;
    roleIds?: string[];
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: projectData.title,
      description: projectData.description,
      thumbnail_url: projectData.thumbnail_url || null,
      hero_image_url: projectData.hero_image_url || null,
      technologies: projectData.technologies || [],
      live_url: projectData.live_url || null,
      github_url: projectData.github_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating project:", error);
    return { error: error.message };
  }

  // Update role associations if provided
  if (projectData.roleIds !== undefined) {
    // Delete existing associations
    await supabase.from("role_projects").delete().eq("project_id", id);

    // Insert new associations
    if (projectData.roleIds.length > 0) {
      const roleInserts = projectData.roleIds.map((roleId) => ({
        role_id: roleId,
        project_id: id,
      }));
      await supabase.from("role_projects").insert(roleInserts);
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true };
}

export async function updateBlog(
  id: string,
  blogData: {
    title?: string;
    excerpt?: string;
    content?: string;
    tags?: string[];
    images?: { url: string; alt: string }[];
    roleIds?: string[];
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blogs")
    .update({
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      tags: blogData.tags || [],
      images: blogData.images || [],
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating blog:", error);
    return { error: error.message };
  }

  // Update role associations if provided
  if (blogData.roleIds !== undefined) {
    // Delete existing associations
    await supabase.from("role_blogs").delete().eq("blog_id", id);

    // Insert new associations
    if (blogData.roleIds.length > 0) {
      const roleInserts = blogData.roleIds.map((roleId) => ({
        role_id: roleId,
        blog_id: id,
      }));
      await supabase.from("role_blogs").insert(roleInserts);
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");
  revalidatePath("/");
  return { success: true };
}
