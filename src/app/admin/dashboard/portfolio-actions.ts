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
