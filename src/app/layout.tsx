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
  title: "Troy Sarinas | SoftWare Engineer",
  description: "Portfolio of Troy Sarinas.",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Troy Sarinas | SoftWare Engineer",
    description: "Portfolio of Troy Sarinas.",
    url: "https:troysarinas.vercel.app",
    siteName: "Troy Sarinas Portfolio",
    images: [
      {
        url: "",
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
    title: "Troy Sarinas | SoftWare Engineer",
    description: "Portfolio of Troy Sarinas.",
    images: [""],
    creator: "@yourtwitterhandle",
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
