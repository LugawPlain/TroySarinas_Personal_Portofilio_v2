import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");
  if (!role) {
    return NextResponse.json({ error: "role is required" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("job_roles")
    .select("chat_config, hero_config")
    .eq("slug", role)
    .single();

  if (error) {
    return NextResponse.json({ error: "Role config unavailable" }, { status: 404 });
  }

  return NextResponse.json({
    config: data?.chat_config || null,
    themeColor: data?.hero_config?.accentColor || null,
  });
}
