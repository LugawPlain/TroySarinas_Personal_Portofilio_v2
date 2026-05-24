import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const ver = url.searchParams.get("ver");

  // ─── 1. Update session (required for Supabase Auth in Server Components)
  let response: NextResponse;
  try {
    response = await updateSession(request);
  } catch (e) {
    console.warn("[Middleware] updateSession failed, continuing:", e);
    response = NextResponse.next({ request });
  }

  // ─── 2. Build Supabase client on the updated response
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
          // Re-create response so cookies are forwarded
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

  // ─── 3. Check admin auth (with fallback on failure)
  let isAdmin = false;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isAdmin = !!user;
  } catch (e) {
    console.warn("[Middleware] getUser failed, treating as non-admin:", e);
  }

  // ─── A. HANDLE VERSION PARAMETER (?ver=1.23.456)
  if (ver) {
    try {
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

        // 2. Redirect to the role page
        const redirectUrl = new URL(
          `/portfolio/${link.target_role}`,
          request.url,
        );
        const redirectResponse = NextResponse.redirect(redirectUrl);

        // 3. Set 30-day sticky cookies
        redirectResponse.cookies.set("portfolio_role", link.target_role, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        redirectResponse.cookies.set("visitor_link_id", link.id, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
          httpOnly: false,
          sameSite: "lax",
        });

        return redirectResponse;
      }
    } catch (e) {
      console.warn("[Middleware] Version lookup failed:", e);
    }
  }

  // ─── B. SET COOKIE ON DIRECT PORTFOLIO VISITS
  const isPortfolioPage = url.pathname.startsWith("/portfolio/");
  const currentPathRole = url.pathname.split("/")[2]; // /portfolio/[role]

  if (isPortfolioPage && currentPathRole && !isAdmin) {
    const savedRole = request.cookies.get("portfolio_role")?.value;
    if (!savedRole) {
      console.log(`[Middleware] Setting cookie for role: ${currentPathRole}`);
      response.cookies.set("portfolio_role", currentPathRole, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }
  }

  // ─── C. LOCK-IN LOGIC (Skip for Admins)
  if (!isAdmin) {
    const savedRole = request.cookies.get("portfolio_role")?.value;

    console.log("[Middleware]", {
      path: url.pathname,
      hasCookie: !!savedRole,
      cookieRole: savedRole,
      isPortfolioPage,
      currentPathRole,
      isAdmin,
    });

    if (savedRole) {
      // 1. Redirect from home to locked role
      if (url.pathname === "/") {
        console.log(`[Middleware] Cookie found, redirecting / → /portfolio/${savedRole}`);
        return NextResponse.redirect(
          new URL(`/portfolio/${savedRole}`, request.url),
        );
      }

      // 2. Prevent access to other roles if locked
      if (isPortfolioPage && currentPathRole && currentPathRole !== savedRole) {
        console.log(`[Middleware] Wrong role, redirecting → /portfolio/${savedRole}`);
        return NextResponse.redirect(
          new URL(`/portfolio/${savedRole}`, request.url),
        );
      }
    } else {
      // No saved role - root page should be inaccessible (404)
      if (url.pathname === "/") {
        console.log("[Middleware] No cookie, showing 404 for root");
        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
