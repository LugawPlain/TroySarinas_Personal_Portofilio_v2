import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Passions_Conflict,
  Fraunces,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CursorProvider } from "@/components/CursorProvider";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const passionConflict = Passions_Conflict({
  variable: "--font-passionconflict",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Troy Sarinas | Software Engineer & Web Developer",
    template: "%s | Troy Sarinas",
  },
  description:
    "Portfolio of Troy Sarinas, a Software Engineer specializing in Next.js, React, Automation, and Full Stack Development. Explore my projects and technical expertise.",
  keywords: [
    "Troy Sarinas",
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "Automation",
    "Portfolio",
  ],
  authors: [{ name: "Troy Sarinas" }],
  creator: "Troy Sarinas",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Troy Sarinas | Software Engineer & Web Developer",
    description:
      "Portfolio of Troy Sarinas, a Software Engineer specializing in Next.js, React, Automation, and Full Stack Development.",
    url: "https://troysarinas.vercel.app",
    siteName: "Troy Sarinas Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or use a valid one
        width: 1200,
        height: 630,
        alt: "Troy Sarinas Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Troy Sarinas | Software Engineer & Web Developer",
    description:
      "Portfolio of Troy Sarinas, a Software Engineer specializing in Next.js, React, Automation, and Full Stack Development.",
    images: ["/og-image.png"], // Ensure this image exists
    creator: "@troysarinas", // Updated handle if known, or keep generic
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          passionConflict.variable,
          inter.variable,
          fraunces.variable,
          montserrat.variable,
          "antialiased"
        )}
      >
        <CursorProvider>
          <ContactModalProvider>
            <Header />
            {children}
            <Footer />
          </ContactModalProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
