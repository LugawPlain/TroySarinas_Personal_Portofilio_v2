"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const CinematicHeader = () => {
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
      
      // Show header after scrolling past hero
      setIsScrolled(currentScrollY > 100);
      setIsVisible(currentScrollY > 50);

      // Determine active section
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
    {
      name: "Work",
      href: "#projects",
      id: "projects",
    },
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
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 h-16">
          {/* Logo */}
          <a 
            href={rolePrefix || "/"}
            className="text-white font-bold text-lg tracking-wider z-10"
          >
            TROY SARINAS
          </a>

          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <nav className="hidden xl:block">
              <ul className="flex gap-1 items-center">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.name}>
                      <a
                        href={(rolePrefix || "") + link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                          isActive
                            ? "text-amber-400"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="cinematicActive"
                            className="absolute bottom-0 left-2 right-2 h-px bg-amber-400"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
                <li className="ml-4">
                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-xs font-semibold px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black tracking-tight rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    <MessageCircle className="w-3 h-3 mr-1.5" />
                    Contact
                  </Button>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 xl:hidden"
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
                      className="text-2xl font-medium text-white/80 hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                  >
                    <Button
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-semibold px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black tracking-tight rounded-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Get in Touch
                    </Button>
                  </motion.div>
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

export default CinematicHeader;
