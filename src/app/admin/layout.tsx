import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Check if logged in
  if (!user) {
    redirect("/login");
  }

  // 2. Check if it's YOU (The Admin)
  // Hardcoded for your security as requested in the plan
  const adminEmail = "troysarinas22@gmail.com";
  if (user.email !== adminEmail) {
    redirect("/"); // Or a "Not Authorized" page
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between min-h-16 items-center gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2 h-8 rounded-full bg-accent shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-bold tracking-tight block truncate">
                  Portfolio admin
                </span>
                <span className="text-[11px] text-muted-foreground hidden sm:block">
                  Manage your public presence
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted-foreground hidden md:block">
                {user.email}
              </span>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-xs font-semibold border rounded-md px-3 py-2 hover:border-accent hover:text-accent transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        {children}
      </main>
    </div>
  );
}
