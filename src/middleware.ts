import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // 1. Update session (required for Supabase Auth in Server Components)
  // This also returns the initial response object which we can modify
  let response = await updateSession(request);

  const url = request.nextUrl;
  const ver = url.searchParams.get("ver");

  // A. NEW GUEST WITH VERSION LINK? (?ver=1.23.456)
  if (ver) {
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
          ip_hash: ip, // In a real app, you might hash this
        })
        .then();

      // 2. Prepare the clean Redirect
      const redirectUrl = new URL(
        `/portfolio/${link.target_role}`,
        request.url,
      );
      const redirectResponse = NextResponse.redirect(redirectUrl);

      // 3. Set the 7-day Sticky Cookie
      redirectResponse.cookies.set("portfolio_role", link.target_role, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return redirectResponse;
    }
  }

  // B. RETURNING GUEST? (Sticky Session)
  // If they land on the root "/" and have a portfolio_role cookie, send them back to their role
  const savedRole = request.cookies.get("portfolio_role")?.value;
  if (url.pathname === "/" && savedRole && !ver) {
    return NextResponse.redirect(
      new URL(`/portfolio/${savedRole}`, request.url),
    );
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
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
