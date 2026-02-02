"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createGatewayLink(prevState: any, formData: FormData) {
  const job_role = formData.get("job_role") as string;
  const label = formData.get("label") as string;

  if (!job_role || !label) {
    return { error: "Missing required fields" };
  }

  // Generate a random-looking version slug
  // Format: x.xx.xxx
  const ver = `${Math.floor(Math.random() * 9) + 1}.${Math.floor(
    Math.random() * 99,
  )
    .toString()
    .padStart(2, "0")}.${Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0")}`;

  const supabase = await createClient();

  const { error } = await supabase.from("gateway_links").insert([
    {
      version_slug: ver,
      target_role: job_role,
      label: label,
      is_active: true,
    },
  ]);

  if (error) {
    console.error("Error creating link:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true, message: "Link created successfully!" };
}

export async function deleteGatewayLink(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gateway_links").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}
