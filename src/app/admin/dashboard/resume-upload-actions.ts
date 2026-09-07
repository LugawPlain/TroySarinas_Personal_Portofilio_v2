"use server";

import { createClient } from "@/lib/supabase/server";
import { extractResumeText } from "@/lib/resume-text";
import { revalidatePath } from "next/cache";

async function upsertResume(
  supabase: ReturnType<() => ReturnType<typeof createClient>> extends Promise<
    infer T
  >
    ? T
    : never,
  data: {
    role_key: string;
    link_id: string | null;
    resume_url: string;
    file_path: string | null;
    is_upload: boolean;
    resume_text: string | null;
  },
) {
  let query = supabase
    .from("gateway_resumes")
    .select("id")
    .eq("role_key", data.role_key);

  if (data.link_id) {
    query = query.eq("link_id", data.link_id);
  } else {
    query = query.is("link_id", null);
  }

  const { data: existingRows } = await query
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);
  const existing = existingRows?.[0];

  if (existing) {
    const { error } = await supabase
      .from("gateway_resumes")
      .update({
        resume_url: data.resume_url,
        file_path: data.file_path,
        is_upload: data.is_upload,
        resume_text: data.resume_text,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
    return { error };
  }

  const { error } = await supabase.from("gateway_resumes").insert([data]);
  return { error };
}

export async function uploadResume(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get("file") as File;
  const roleKey = formData.get("role_key") as string;
  const linkId = formData.get("link_id") as string | null;

  if (!file || !roleKey) {
    return { error: "Missing required fields" };
  }

  try {
    const fileExt = file.name.split(".").pop() || "pdf";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `resumes/${roleKey}/${fileName}`;
    const resumeText = await extractResumeText(file);

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("resumes").getPublicUrl(filePath);

    const { error: dbError } = await upsertResume(supabase, {
      role_key: roleKey,
      link_id: linkId || null,
      resume_url: publicUrl,
      file_path: filePath,
      is_upload: true,
      resume_text: resumeText,
    });

    if (dbError) {
      await supabase.storage.from("resumes").remove([filePath]);
      return { error: `Database error: ${dbError.message}` };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/portfolio/[role]", "layout");

    return { success: true, url: publicUrl };
  } catch (err) {
    return { error: `Unexpected error: ${err}` };
  }
}

export async function setResumeUrl(
  roleKey: string,
  url: string,
  linkId?: string,
) {
  const supabase = await createClient();

  const { error } = await upsertResume(supabase, {
    role_key: roleKey,
    link_id: linkId || null,
    resume_url: url,
    file_path: null,
    is_upload: false,
    resume_text: null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");

  return { success: true };
}

export async function deleteResume(roleKey: string, linkId?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("gateway_resumes")
    .select("file_path, is_upload, id")
    .eq("role_key", roleKey);

  if (linkId) {
    query = query.eq("link_id", linkId);
  } else {
    query = query.is("link_id", null);
  }

  const { data: records, error: lookupError } = await query
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);

  if (lookupError) {
    return { error: lookupError.message };
  }

  const record = records?.[0];
  if (!record) {
    return { error: `No default resume found for role "${roleKey}".` };
  }

  if (record?.is_upload && record.file_path) {
    await supabase.storage.from("resumes").remove([record.file_path]);
  }

  const { error } = await supabase
    .from("gateway_resumes")
    .delete()
    .eq("id", record.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio/[role]", "layout");

  return { success: true };
}
