"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateResume(roleKey: string, resumeUrl: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gateway_resumes").upsert({
    role_key: roleKey,
    resume_url: resumeUrl,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}
