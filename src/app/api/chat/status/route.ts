import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://n8n.troysarinas.dev/healthz", {
      method: "GET",
      cache: "no-store",
    });

    const isOnline = response.ok;

    return NextResponse.json({
      status: isOnline ? "online" : "offline",
      statusCode: response.status,
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json({
      status: "offline",
      statusCode: 0,
      error: "Failed to connect",
    });
  }
}
