"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import { 
  ShoppingCart, 
  Shield, 
  CreditCard, 
  Truck, 
  BadgeCheck,
  Mail,
  Phone
} from "lucide-react";

const EcommerceFooter = () => {
  const { setIsContactModalOpen } = useContactModal();

  const trustBadges = [
    { icon: Shield, label: "SSL Secure" },
    { icon: CreditCard, label: "PCI Compliant" },
    { icon: Truck, label: "Fast Delivery" },
    { icon: BadgeCheck, label: "Verified" },
  ];

  const quickLinks = [
    { name: "Stores", href: "/portfolio/ecommerce-developer/projects" },
    { name: "Blog", href: "/portfolio/ecommerce-developer/blog" },
    { name: "Experience", href: "#experience" },
    { name: "Tech Stack", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <footer id="contacts" className="bg-slate-50 border-t border-slate-200">
      {/* Trust Bar */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-emerald-700"
              >
                <badge.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid md:grid-cols-3 gap-10"
        >
          {/* Brand Column */}
          <div className="space-y-4"
          >
            <div className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Troy Sarinas</h3>
                <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
                  E-Commerce Developer
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed"
            >
              Building high-converting online stores and scaling e-commerce 
              operations for brands worldwide.
            </p>
            <div className="flex gap-3 pt-2"
            >
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
              >
                Hire Me
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-600 hover:text-emerald-600 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:troyjeffreysarinas@gmail.com"
                className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                troyjeffreysarinas@gmail.com
              </a>
              <a 
                href="tel:+639569878251"
                className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                +63 956 987 8251
              </a>
            </div>

            {/* Payment Icons */}
            <div className="mt-6"
            >
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Accepted Payments</p>
              <div className="flex gap-2"
              >
                {["Visa", "MC", "Amex", "PayPal"].map((payment) => (
                  <div 
                    key={payment}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-slate-500">
              © 2025 Troy Sarinas. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Store is open for business
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EcommerceFooter;
