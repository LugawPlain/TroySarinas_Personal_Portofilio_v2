"use server";

import { createClient } from "@/lib/supabase/server";
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

  let result;
  if (tech.id) {
    // Update
    result = await supabase
      .from("technologies")
      .update({
        name: tech.name,
        icon_name: tech.icon_name,
        proficiency: tech.proficiency,
      })
      .eq("id", tech.id);
  } else {
    // Create
    const { data: newTech, error: insertError } = await supabase
      .from("technologies")
      .insert({
        name: tech.name,
        icon_name: tech.icon_name,
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
