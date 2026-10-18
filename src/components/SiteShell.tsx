"use client";

import { usePathname } from "next/navigation";
import ClientProviders from "@/components/ClientProviders";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandalonePreview = pathname.startsWith("/website-preview/");

  return (
    <ClientProviders>
      {isStandalonePreview ? (
        children
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </ClientProviders>
  );
}
