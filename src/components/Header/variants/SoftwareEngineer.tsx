"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { X } from "lucide-react";

import NameTitle from "../../NameTitle";
import { useCursor } from "../../CursorProvider";
import { RiSettings5Fill } from "react-icons/ri";
import { Button } from "../../ui/button";
import ContactModal from "../../ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

const SoftwareEngineerHeader = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // Detect if we are in a role-specific portfolio
  const pathnameParts = pathname.split("/");
  const isRoleRoute = pathnameParts[1] === "portfolio" && pathnameParts[2];
  const rolePrefix = isRoleRoute ? `/portfolio/${pathnameParts[2]}` : "";
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isContactModalOpen, setIsContactModalOpen } = useContactModal();
  const { isCursorEffectEnabled, setIsCursorEffectEnabled } = useCursor();

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
      name: "Projects",
      href: rolePrefix ? `${rolePrefix}/projects` : "/projects",
    },
    { name: "Blogs", href: rolePrefix ? `${rolePrefix}/blog` : "/blog" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contacts", href: "#contacts" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/" || pathname.startsWith("/portfolio")) {
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
      <div
        className={`lg:px-16 Header top-0 bg-white z-50 backdrop-blur-2xl sticky flex items-center justify-between px-4 h-20 border-b-2 border-gray-200 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NameTitle
          className="text-black/80 text-nowrap cursor-pointer font-inter tracking-[-2px] font-bold"
          nameFontClass="font-spacemono"
          size="text-3xl"
        />

        <div className="flex items-center gap-6">
          <nav className="hidden xl:block">
            <ul className="flex gap-4 text-md font-medium text-black/80 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={
                      link.href.startsWith("#")
                        ? (rolePrefix || "") + link.href
                        : link.href
                    }
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-gray-600 font-inter transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-md  bg-stone-900 font-semibold rounded-full px-6 py-4  text-secondary-foreground  tracking-tight shadow-lg"
                >
                  Let&apos;s Talk
                </Button>
              </li>
            </ul>
          </nav>

          <button
            className="xl:hidden text-2xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <GiHamburgerMenu />}
          </button>

          <div className="relative">
            <button
              onClick={toggleSettings}
              className="p-1 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <RiSettings5Fill className="text-accent" size={30} />
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="p-2">
                  <div className="flex items-center justify-between py-2 px-3">
                    <span className="text-sm font-medium">Dark Mode</span>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isDarkMode ? "bg-secondary" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDarkMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 border-t border-gray-100">
                    <span className="text-sm font-medium">Cursor Effects</span>
                    <button
                      onClick={toggleCursorEffect}
                      className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isCursorEffectEnabled ? "bg-secondary" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isCursorEffectEnabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`xl:hidden fixed top-20 left-0 right-0 bg-white border-b-2 border-gray-200 z-40 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav>
          <ul className="flex flex-col font-inter divide-y-[0.5px] divide-gray-200">
            {navLinks.map((link) => (
              <li key={link.name} className="active:bg-secondary">
                <a
                  href={
                    link.href.startsWith("#")
                      ? (rolePrefix || "") + link.href
                      : link.href
                  }
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="block text-lg text-gray-800/80 hover:text-gray-600 px-4 py-3 active:text-white font-inter transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="border-t border-gray-200">
              <Button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-md font-semibold w-full bg-secondary text-secondary-foreground uppercase tracking-tight shadow-lg"
              >
                Let&apos;s Talk
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed h-full w-full bg-black/20 z-30 top-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default SoftwareEngineerHeader;
