"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Store, 
  X, 
  Menu,
  Settings2,
  Moon,
  Sun,
  MousePointer2,
  ChevronRight,
  Shield,
  CreditCard
} from "lucide-react";
import Link from "next/link";

import { useCursor } from "../../CursorProvider";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const EcommerceHeader = () => {
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
      name: "Stores",
      href: rolePrefix ? `${rolePrefix}/projects` : "/projects",
      icon: Store,
    },
    { 
      name: "Blog", 
      href: rolePrefix ? `${rolePrefix}/blog` : "/blog",
      icon: ShoppingCart,
    },
    { 
      name: "Experience", 
      href: "#experience",
      icon: ChevronRight,
    },
    { 
      name: "Stack", 
      href: "#skills",
      icon: ChevronRight,
    },
    { 
      name: "Certs", 
      href: "#certifications",
      icon: Shield,
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
      const sections = ["experience", "skills", "certifications"];
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
            className="backdrop-blur-[20px] bg-white/80 border border-emerald-200/60 
              rounded-2xl shadow-lg shadow-emerald-500/5 
              flex items-center justify-between px-4 sm:px-6 py-3"
          >
            {/* Logo */}
            <Link 
              href={rolePrefix || "/"}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-50 
                border border-emerald-300/50 flex items-center justify-center
                group-hover:shadow-md transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-spacemono text-sm font-bold text-slate-800 tracking-tight leading-none"
                >
                  Troy Sarinas
                </span>
                <span className="font-spacemono text-[10px] text-emerald-600 tracking-wider uppercase"
                >
                  E-Commerce Developer
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
                        ? "text-emerald-700 bg-emerald-50 font-semibold" 
                        : "text-slate-600/80 hover:text-emerald-700 hover:bg-emerald-50/50"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Trust Badge - Desktop */}
              <div className="hidden md:flex items-center gap-1.5 text-emerald-600 text-xs font-medium bg-emerald-50 px-3 py-1.5 rounded-full"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">PCI Compliant</span>
              </div>

              {/* Contact Button - Desktop */}
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="hidden sm:flex rounded-full font-spacemono text-sm font-semibold 
                  px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white 
                  tracking-tight shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <CreditCard className="w-4 h-4 mr-1.5" />
                Hire Me
              </Button>

              {/* Settings Toggle */}
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2 rounded-lg transition-all duration-300 
                  ${isSettingsOpen 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "hover:bg-emerald-50 text-slate-600/80"
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
                    ? "bg-emerald-100 text-emerald-700" 
                    : "hover:bg-emerald-50 text-slate-600/80"
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
                    backdrop-blur-[20px] bg-white/90 border border-emerald-200/60 
                    rounded-2xl shadow-xl shadow-emerald-500/10 overflow-hidden z-50"
                >
                  <div className="p-4 space-y-3">
                    <h3 className="font-spacemono text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2"
                    >
                      Store Settings
                    </h3>
                    
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-2.5"
                      >
                        {isDarkMode ? (
                          <Moon className="w-4 h-4 text-emerald-600/70" />
                        ) : (
                          <Sun className="w-4 h-4 text-emerald-600/70" />
                        )}
                        <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                      </div>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          isDarkMode ? "bg-emerald-600" : "bg-slate-200"
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
                    <div className="flex items-center justify-between py-2 border-t border-emerald-100"
                    >
                      <div className="flex items-center gap-2.5"
                      >
                        <MousePointer2 className="w-4 h-4 text-emerald-600/70" />
                        <span className="text-sm font-medium text-slate-700">Cursor Effects</span>
                      </div>
                      <button
                        onClick={() => setIsCursorEffectEnabled(!isCursorEffectEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          isCursorEffectEnabled ? "bg-emerald-600" : "bg-slate-200"
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
              <div className="backdrop-blur-[20px] bg-white/95 border border-emerald-200/60 
                rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden"
              >
                {/* Mobile Menu Header */}
                <div className="px-6 py-4 border-b border-emerald-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 
                      border border-emerald-300/50 flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-spacemono text-sm font-bold text-slate-800 block"
                      >
                        Troy Sarinas
                      </span>
                      <span className="font-spacemono text-[10px] text-emerald-600 tracking-wider uppercase"
                      >
                        E-Commerce Developer
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
                                ? "text-emerald-700 bg-emerald-50 font-semibold" 
                                : "text-slate-600/80 hover:text-emerald-700 hover:bg-emerald-50/50"
                              }`}
                          >
                            <Icon className="w-4 h-4" />
                            {link.name}
                            {active && (
                              <motion.div
                                layoutId="mobileActiveNav"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-emerald-100">
                  <Button
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-full font-spacemono text-sm font-semibold 
                      py-3 bg-emerald-600 hover:bg-emerald-700 text-white 
                      tracking-tight shadow-lg transition-all hover:shadow-xl"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Hire Me
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

export default EcommerceHeader;
