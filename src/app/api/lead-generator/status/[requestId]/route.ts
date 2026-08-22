import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ requestId: string }>;
}

export async function GET(_request: NextRequest, { params }: Props) {
  const { requestId } = await params;
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("lead_generator_requests")
    .select("status, results, error_message")
    .eq("id", requestId)
    .single();

  if (error || !data)
    return NextResponse.json({ error: "Request not found." }, { status: 404 });

  return NextResponse.json({
    status: data.status,
    results: data.status === "complete" ? data.results : [],
    error: data.status === "failed" ? data.error_message : null,
  });
}
