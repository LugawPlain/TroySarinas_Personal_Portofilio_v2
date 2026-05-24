"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Database } from "lucide-react";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const DataHeader = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { isContactModalOpen, setIsContactModalOpen } = useContactModal();

  const pathnameParts = pathname.split("/");
  const isRoleRoute = pathnameParts[1] === "portfolio" && pathnameParts[2];
  const rolePrefix = isRoleRoute ? `/portfolio/${pathnameParts[2]}` : "";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY > 100);

      const sections = ["projects", "experience", "certifications", "technologies"];
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
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Tools", href: "#technologies", id: "technologies" },
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
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 h-16">
          <a
            href={rolePrefix || "/"}
            className="flex items-center gap-2 text-slate-900 font-bold text-lg"
          >
            <Database className="w-5 h-5 text-blue-600" />
            <span>TROY SARINAS</span>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden xl:block">
              <ul className="flex gap-1 items-center">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.name}>
                      <a
                        href={(rolePrefix || "") + link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="dataActive"
                            className="absolute bottom-0 left-2 right-2 h-px bg-blue-600"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
                <li className="ml-4">
                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-xs font-semibold px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all"
                  >
                    <MessageCircle className="w-3 h-3 mr-1.5" />
                    Contact
                  </Button>
                </li>
              </ul>
            </nav>

            <button
              className="xl:hidden p-2 text-slate-500 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 xl:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <nav className="flex flex-col items-center gap-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={(rolePrefix || "") + link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-2xl font-medium text-slate-500 hover:text-blue-600"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <Button
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full"
                  >
                    Get in Touch
                  </Button>
                </nav>
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

export default DataHeader;
