"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ListChecks,
  Terminal,
  Clock,
  Award,
  Users,
  X,
  Menu,
  Settings2,
  Moon,
  Sun,
  MousePointer2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { useCursor } from "../../CursorProvider";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const VAHeader = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { isContactModalOpen, setIsContactModalOpen } = useContactModal();
  const { isCursorEffectEnabled, setIsCursorEffectEnabled } = useCursor();

  const pathnameParts = pathname.split("/");
  const isRoleRoute = pathnameParts[1] === "portfolio" && pathnameParts[2];
  const rolePrefix = isRoleRoute ? `/portfolio/${pathnameParts[2]}` : "";

  const navLinks = [
    {
      name: "Projects",
      href: rolePrefix ? `${rolePrefix}/projects` : "/projects",
      icon: ListChecks,
    },
    {
      name: "Blogs",
      href: rolePrefix ? `${rolePrefix}/blog` : "/blog",
      icon: Terminal,
    },
    {
      name: "Experience",
      href: "#experience",
      icon: Clock,
    },
    {
      name: "Certifications",
      href: "#certifications",
      icon: Award,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleSectionObserver = () => {
      const sections = ["experience", "education", "certifications", "technologies"];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    if (!isMobileMenuOpen) {
      handleSectionObserver();
    }
  }, [isMobileMenuOpen, pathname]);

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      const isMainPortfolioPage = pathname === rolePrefix || pathname === `${rolePrefix}/`;
      if (pathname === "/" || isMainPortfolioPage) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeSection === href;
    }
    return pathname === href;
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
          <div
            className="backdrop-blur-[20px] bg-white/80 border border-[#0d9488]/20
              rounded-2xl shadow-lg shadow-[#0d9488]/10
              flex items-center justify-between px-4 sm:px-6 py-3"
          >
            {/* Logo */}
            <Link
              href={rolePrefix || "/"}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#0d9488]/20 to-[#0f766e]/15
                border border-[#0d9488]/30 flex items-center justify-center
                group-hover:shadow-md transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#0d9488]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-spacemono text-sm font-bold text-gray-900 tracking-tight leading-none">
                  Troy Sarinas
                </span>
                <span className="font-spacemono text-[10px] text-[#0d9488] tracking-wider uppercase">
                  Virtual Assistant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href.startsWith("#") ? (rolePrefix || "") + link.href : link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`relative px-4 py-2 rounded-lg font-spacemono text-sm
                      transition-all duration-300 flex items-center gap-1.5
                      ${active
                        ? "text-[#0f766e] bg-[#0d9488]/10 font-semibold"
                        : "text-stone-600/80 hover:text-[#0f766e] hover:bg-[#0d9488]/5"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="vaActiveNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0d9488]/60 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Contact Button - Desktop */}
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="hidden sm:flex rounded-full font-spacemono text-sm font-semibold
                  px-5 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0f766e]
                  text-white tracking-tight shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Let&apos;s Get Organized
              </Button>

              {/* Settings Toggle */}
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2 rounded-lg transition-all duration-300
                  ${isSettingsOpen
                    ? "bg-[#0d9488]/15 text-[#0f766e]"
                    : "hover:bg-[#0d9488]/10 text-stone-600/80"
                  }`}
                aria-label="Settings"
              >
                <Settings2 className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`xl:hidden p-2 rounded-lg transition-all duration-300
                  ${isMobileMenuOpen
                    ? "bg-[#0d9488]/15 text-[#0f766e]"
                    : "hover:bg-[#0d9488]/10 text-stone-600/80"
                  }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Settings Dropdown */}
          <AnimatePresence>
            {isSettingsOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-6 sm:right-10 top-full mt-2 w-64
                    backdrop-blur-[20px] bg-white/90 border border-[#0d9488]/20
                    rounded-2xl shadow-xl shadow-[#0d9488]/10 overflow-hidden z-50"
                >
                  <div className="p-4 space-y-3">
                    <h3 className="font-spacemono text-xs uppercase tracking-wider text-[#0d9488] font-semibold mb-2">
                      Preferences
                    </h3>

                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2.5">
                        {isDarkMode ? (
                          <Moon className="w-4 h-4 text-[#0f766e]" />
                        ) : (
                          <Sun className="w-4 h-4 text-[#0f766e]" />
                        )}
                        <span className="text-sm font-medium text-stone-700">Dark Mode</span>
                      </div>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          isDarkMode ? "bg-[#0d9488]" : "bg-stone-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                            isDarkMode ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Cursor Effects Toggle */}
                    <div className="flex items-center justify-between py-2 border-t border-[#0d9488]/10">
                      <div className="flex items-center gap-2.5">
                        <MousePointer2 className="w-4 h-4 text-[#0f766e]" />
                        <span className="text-sm font-medium text-stone-700">Cursor Effects</span>
                      </div>
                      <button
                        onClick={() => setIsCursorEffectEnabled(!isCursorEffectEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          isCursorEffectEnabled ? "bg-[#0d9488]" : "bg-stone-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                            isCursorEffectEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSettingsOpen(false)}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-24 left-4 right-4 z-50 xl:hidden"
            >
              <div className="backdrop-blur-[20px] bg-white/95 border border-[#0d9488]/20
                rounded-3xl shadow-2xl shadow-[#0d9488]/15 overflow-hidden"
              >
                {/* Mobile Menu Header */}
                <div className="px-6 py-4 border-b border-[#0d9488]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488]/20 to-[#0f766e]/15
                      border border-[#0d9488]/30 flex items-center justify-center"
                    >
                      <Briefcase className="w-5 h-5 text-[#0d9488]" />
                    </div>
                    <div>
                      <span className="font-spacemono text-sm font-bold text-gray-900 block">
                        Troy Sarinas
                      </span>
                      <span className="font-spacemono text-[10px] text-[#0d9488] tracking-wider uppercase">
                        Virtual Assistant
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Nav Links */}
                <nav className="p-3">
                  <ul className="space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <li key={link.name}>
                          <a
                            href={link.href.startsWith("#") ? (rolePrefix || "") + link.href : link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-spacemono text-sm
                              transition-all duration-300
                              ${active
                                ? "text-[#0f766e] bg-[#0d9488]/10 font-semibold"
                                : "text-stone-600/80 hover:text-[#0f766e] hover:bg-[#0d9488]/5"
                              }`}
                          >
                            <Icon className="w-4 h-4" />
                            {link.name}
                            {active && (
                              <motion.div
                                layoutId="vaMobileActiveNav"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0d9488]"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-[#0d9488]/10">
                  <Button
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-full font-spacemono text-sm font-semibold
                      py-3 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0f766e]
                      text-white tracking-tight shadow-lg transition-all hover:shadow-xl"
                  >
                    Let&apos;s Get Organized
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default VAHeader;
