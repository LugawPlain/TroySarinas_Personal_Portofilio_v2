import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // 1. Update session (required for Supabase Auth in Server Components)
  let response = await updateSession(request);

  const url = request.nextUrl;
  const ver = url.searchParams.get("ver");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value }) =>
            response.cookies.set(name, value),
          );
        },
      },
    },
  );

  // Check if user is authenticated (Admin)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user;

  // A. HANDLE VERSION PARAMETER (?ver=1.23.456)
  if (ver) {
    // Look up the link
    const { data: link, error } = await supabase
      .from("gateway_links")
      .select("id, target_role, is_active")
      .eq("version_slug", ver)
      .single();

    if (!error && link && link.is_active) {
      // 1. Log the visit (fire and forget)
      const ip = request.headers.get("x-forwarded-for") || "unknown";
      supabase
        .from("gateway_visits")
        .insert({
          link_id: link.id,
          user_agent: request.headers.get("user-agent"),
          ip_hash: ip,
        })
        .then();

      // 2. Prepare the clean Redirect to the role page
      const redirectUrl = new URL(
        `/portfolio/${link.target_role}`,
        request.url,
      );
      const redirectResponse = NextResponse.redirect(redirectUrl);

      // 3. Set the 7-day Sticky Cookies
      redirectResponse.cookies.set("portfolio_role", link.target_role, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      redirectResponse.cookies.set("visitor_link_id", link.id, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        httpOnly: false, // Allow client-side tracker.js to read this
        sameSite: "lax",
      });

      return redirectResponse;
    }
  }

  // B. LOCK-IN LOGIC (Skip for Admins)
  if (!isAdmin) {
    const savedRole = request.cookies.get("portfolio_role")?.value;
    const isPortfolioPage = url.pathname.startsWith("/portfolio/");
    const currentPathRole = url.pathname.split("/")[2]; // /portfolio/[role]

    if (savedRole) {
      // 1. Redirect from home to locked role
      if (url.pathname === "/") {
        return NextResponse.redirect(
          new URL(`/portfolio/${savedRole}`, request.url),
        );
      }

      // 2. Prevent access to other roles if locked
      if (isPortfolioPage && currentPathRole && currentPathRole !== savedRole) {
        return NextResponse.redirect(
          new URL(`/portfolio/${savedRole}`, request.url),
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
