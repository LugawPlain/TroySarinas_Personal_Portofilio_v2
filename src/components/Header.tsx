"use client";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { X } from "lucide-react";

// Mock components - replace with your actual imports
import NameTitle from "./NameTitle";
import { useCursor } from "./CursorProvider";
import { RiSettings5Fill } from "react-icons/ri";
import { Button } from "./ui/button";
import ContactModal from "./ContactModal";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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
    // TODO: Implement dark mode logic
  };

  const toggleCursorEffect = () => {
    setIsCursorEffectEnabled(!isCursorEffectEnabled);
  };

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contacts", href: "#contacts" },
  ];
  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80; // Height of your header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
        <NameTitle className="text-nowrap cursor-pointer" />

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden xl:block">
            <ul className="flex gap-6 text-lg items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-md font-semibold px-4 py-2 bg-secondary text-secondary-foreground uppercase tracking-tight shadow-lg"
                >
                  Get in Touch
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="xl:hidden text-2xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <GiHamburgerMenu />}
          </button>

          {/* Dark Mode Button */}
          <div className="hidden md:block">
            {/* <Button className="text-xs">Dark Mode</Button> */}
          </div>

          {/* Settings Dropdown */}
          <div className="relative ">
            <button
              onClick={toggleSettings}
              className="p-1 rounded-md cursor-pointer  hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <RiSettings5Fill className="text-accent" size={30} />
            </button>

            {/* Settings Dropdown Menu */}
            {isSettingsOpen && (
              <div className="absolute  right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="p-2">
                  {/* Dark Mode Toggle */}
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

                  {/* Cursor Effects Toggle */}
                  <div className="flex items-center   justify-between py-2 px-3 border-t border-gray-100">
                    <span className="text-sm font-medium">Cursor Effects</span>
                    <button
                      onClick={toggleCursorEffect}
                      className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isCursorEffectEnabled ? "bg-secondary" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block  h-4 w-4 transform rounded-full bg-white transition-transform ${
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

      {/* Mobile Dropdown Menu */}
      <div
        className={`xl:hidden fixed top-20 left-0 right-0 bg-white border-b-2 border-gray-200 z-40 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="block text-lg hover:text-gray-600 transition-colors py-2"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-md font-semibold w-full bg-secondary text-secondary-foreground uppercase tracking-tight shadow-lg"
              >
                Get in Touch
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed h-full w-full bg-black/20 z-30 top-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Overlay to close settings dropdown when clicking outside */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Header;
