"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { X, MessageCircle, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import NameTitle from "../../NameTitle";
import { useCursor } from "../../CursorProvider";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const MarketingHeader = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  // Detect if we are in a role-specific portfolio
  const pathnameParts = pathname.split("/");
  const isRoleRoute = pathnameParts[1] === "portfolio" && pathnameParts[2];
  const rolePrefix = isRoleRoute ? `/portfolio/${pathnameParts[2]}` : "";
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isContactModalOpen, setIsContactModalOpen } = useContactModal();
  const { isCursorEffectEnabled, setIsCursorEffectEnabled } = useCursor();

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (currentScrollY / documentHeight) * 100;
      
      setScrollProgress(progress);

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      // Determine active section
      const sections = ["projects", "experience", "certifications", "blogs", "technologies"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleCursorEffect = () => {
    setIsCursorEffectEnabled(!isCursorEffectEnabled);
  };

  const navLinks = [
    {
      name: "Campaigns",
      href: rolePrefix ? `${rolePrefix}/projects` : "/projects",
      id: "projects",
    },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Blogs", href: rolePrefix ? `${rolePrefix}/blog` : "/blog", id: "blogs" },
    { name: "MarTech", href: "#technologies", id: "technologies" },
  ];

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
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:px-16 top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 flex items-center justify-between px-4 h-20 border-b border-gray-200/50 shadow-sm"
      >
        <NameTitle className="text-nowrap cursor-pointer" />

        <div className="flex items-center gap-6">
          <nav className="hidden xl:block">
            <ul className="flex gap-1 text-base items-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={
                        link.href.startsWith("#")
                          ? (rolePrefix || "") + link.href
                          : link.href
                      }
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className={`relative px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        isActive
                          ? "text-orange-700 bg-orange-50"
                          : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-orange-50 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-2">
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-sm font-semibold px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white tracking-tight shadow-lg shadow-orange-500/20 rounded-full transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Let's Talk Strategy
                </Button>
              </li>
            </ul>
          </nav>

          <button
            className="xl:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <GiHamburgerMenu className="w-6 h-6" />}
          </button>

          <div className="relative">
            <button
              onClick={toggleSettings}
              className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <Settings className="text-gray-500 hover:text-orange-600 transition-colors" size={22} />
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h3>
                      
                      <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isDarkMode ? "bg-orange-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                              isDarkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-sm font-medium text-gray-700">Cursor Effects</span>
                        <button
                          onClick={toggleCursorEffect}
                          className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isCursorEffectEnabled ? "bg-orange-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                              isCursorEffectEnabled
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSettingsOpen(false)}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 z-40 overflow-hidden shadow-xl"
            >
              <nav className="p-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <a
                          href={
                            link.href.startsWith("#")
                              ? (rolePrefix || "") + link.href
                              : link.href
                          }
                          onClick={(e) => handleSmoothScroll(e, link.href)}
                          className={`block text-base font-medium px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? "text-orange-700 bg-orange-50"
                              : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                          }`}
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    );
                  })}
                  <li className="mt-2 pt-2 border-t border-gray-100">
                    <Button
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-sm font-semibold py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white tracking-tight shadow-lg rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Let's Talk Strategy
                    </Button>
                  </li>
                </ul>
              </nav>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-0 bg-black/20 z-30 top-20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
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

export default MarketingHeader;
