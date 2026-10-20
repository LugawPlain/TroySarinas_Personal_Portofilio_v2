import { readFile } from "node:fs/promises";
import path from "node:path";
import { getResumeForRole } from "@/lib/resume";
import { getRoleMetadata } from "@/lib/roles";

interface RouteContext {
  params: Promise<{ role: string }>;
}

const publicDirectory = path.resolve(process.cwd(), "public");
const inlineContentTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isInsidePublicDirectory(filePath: string) {
  return filePath.startsWith(`${publicDirectory}${path.sep}`);
}

function inlineResponse(body: BodyInit, contentType: string, filename: string) {
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${filename.replace(/["\\]/g, "")}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { role } = await params;
  if (!/^[a-z0-9-]+$/.test(role)) {
    return new Response("Invalid resume role.", { status: 400 });
  }

  const [roleData, roleResumeUrl] = await Promise.all([
    getRoleMetadata(role),
    getResumeForRole(role),
  ]);
  if (!roleData) {
    return new Response("Portfolio role was not found.", { status: 404 });
  }
  const resumeUrl = roleResumeUrl ?? "/SoftwareEngineerDeveloperSarinas.pdf";

  if (resumeUrl.startsWith("/") && !resumeUrl.startsWith("//")) {
    const relativePath = decodeURIComponent(resumeUrl.slice(1));
    if (
      relativePath.includes("\\") ||
      relativePath.split("/").some((segment) => segment === "." || segment === "..")
    ) {
      return new Response("Invalid resume file path.", { status: 400 });
    }

    const filePath = path.resolve(publicDirectory, relativePath);
    if (!isInsidePublicDirectory(filePath)) {
      return new Response("Invalid resume file path.", { status: 400 });
    }

    try {
      const file = await readFile(filePath);
      const extension = path.extname(filePath).toLowerCase();
      const contentType =
        extension === ".pdf"
          ? "application/pdf"
          : extension === ".png"
            ? "image/png"
            : extension === ".jpg" || extension === ".jpeg"
              ? "image/jpeg"
              : extension === ".webp"
                ? "image/webp"
                : null;

      if (!contentType) {
        return new Response("Unsupported resume file type.", { status: 415 });
      }

      return inlineResponse(
        new Uint8Array(file),
        contentType,
        path.basename(filePath),
      );
    } catch (error) {
      console.error(`Unable to read local resume for role "${role}":`, error);
      return new Response("Resume file could not be read.", { status: 500 });
    }
  }

  let sourceUrl: URL;
  let supabaseOrigin: string;
  try {
    sourceUrl = new URL(resumeUrl);
    supabaseOrigin = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin;
  } catch (error) {
    console.error(`Invalid resume URL configured for role "${role}":`, error);
    return new Response("Resume URL is not configured correctly.", {
      status: 500,
    });
  }

  if (
    sourceUrl.protocol !== "https:" ||
    sourceUrl.origin !== supabaseOrigin
  ) {
    return new Response("This resume host cannot be served through the portfolio.", {
      status: 502,
    });
  }

  try {
    const upstream = await fetch(sourceUrl, { redirect: "error" });
    if (!upstream.ok || !upstream.body) {
      console.error(
        `Resume upstream returned ${upstream.status} for role "${role}".`,
      );
      return new Response("Resume could not be retrieved.", { status: 502 });
    }

    const contentType =
      upstream.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ??
      "";
    if (!inlineContentTypes.has(contentType)) {
      return new Response("Unsupported resume file type.", { status: 415 });
    }

    const filename = path.basename(sourceUrl.pathname) || `resume-${role}`;
    return inlineResponse(upstream.body, contentType, filename);
  } catch (error) {
    console.error(`Unable to fetch resume for role "${role}":`, error);
    return new Response("Resume could not be retrieved.", { status: 502 });
  }
}
