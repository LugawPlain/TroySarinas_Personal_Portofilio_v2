"use client";

import { createClient } from "@/lib/supabase/clients";
import { KeyRound, Chrome, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:flex bg-muted relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20" />
        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-8 animate-bounce">
            <KeyRound className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Command Center
          </h2>
          <p className="text-lg text-muted-foreground">
            Manage your smart portfolio gateway, track views, and customize
            recruiter experiences from one place.
          </p>
        </div>
      </div>

      {/* Login Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to site
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
            <p className="text-muted-foreground">
              Sign in with your authorized Google account.
            </p>
          </div>

          <div className="p-6 bg-card rounded-2xl border shadow-xl space-y-6">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex gap-3 text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <p className="text-xs">
                Access is restricted to authorized administrative accounts only.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Protected by Row Level Security and Google Cloud Identity.
          </p>
        </div>
      </div>
    </div>
  );
}
