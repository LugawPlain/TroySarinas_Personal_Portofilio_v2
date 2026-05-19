"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Trophy, Star } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  description: string;
  logo_url: string;
  logo_alt?: string;
  cert_url?: string;
  is_webinar: boolean;
  organizer?: string;
  date_label?: string;
}

interface CertificationsProps {
  certifications: Certification[];
  title?: string;
  subtitle?: string;
}

const SoftwareEngineerCertifications = ({
  certifications: allCerts,
  title = "Professional Certifications & Credentials",
  subtitle = "Industry recognized certifications and continuous learning achievements",
}: CertificationsProps) => {
  if (allCerts.length === 0) return null;

  const professionalCerts = allCerts.filter((c) => !c.is_webinar);
  const webinarCerts = allCerts.filter((c) => c.is_webinar);

  const renderCertificateCard = (cert: Certification, index: number) => {
    const gradients = [
      "from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)]",
      "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]",
      "from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.1)]",
    ];
    const borderColors = [
      "border-[rgba(102,126,234,0.3)]",
      "border-[rgba(17,153,142,0.3)]",
      "border-[rgba(59,130,246,0.3)]",
    ];

    return (
      <div
        key={cert.id}
        className={`group relative backdrop-blur-[20%] bg-linear-to-br ${gradients[index % 3]} 
          ${borderColors[index % 3]} border-2 rounded-3xl overflow-hidden
          hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="h-32 flex items-center justify-center mb-4"
          >
            {cert.cert_url ? (
              <Link
                href={cert.cert_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  className="group-hover:scale-110 transition-transform duration-500 object-contain max-h-full"
                  src={cert.logo_url}
                  alt={cert.logo_alt || cert.title}
                  height={100}
                  width={100}
                />
              </Link>
            ) : (
              <Image
                className="group-hover:scale-110 transition-transform duration-500 object-contain max-h-full"
                src={cert.logo_url}
                alt={cert.logo_alt || cert.title}
                height={100}
                width={100}
              />
            )}
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h3 className="font-fraunces text-lg font-semibold text-secondary line-clamp-1">
              {cert.title}
            </h3>
            <p className="text-sm text-stone-600/80 font-light line-clamp-2">
              {cert.description}
            </p>
            {(cert.organizer || cert.date_label) && (
              <div className="pt-3 mt-2 border-t border-white/30">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold space-y-1">
                  {cert.organizer && <span>{cert.organizer}</span>}
                  {cert.date_label && <span>{cert.date_label}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="certifications"
      className="relative py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Credentials
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            {title}
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {professionalCerts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px flex-1 max-w-24 bg-secondary/20" />
              <h3 className="text-center font-fraunces text-2xl font-semibold text-secondary flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Professional Certifications
              </h3>
              <span className="h-px flex-1 max-w-24 bg-secondary/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professionalCerts.map((cert, index) => renderCertificateCard(cert, index))}
            </div>
          </div>
        )}

        {webinarCerts.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px flex-1 max-w-24 bg-secondary/20" />
              <h3 className="text-center font-fraunces text-2xl font-semibold text-secondary flex items-center gap-2">
                <Star className="w-5 h-5" />
                Webinars & Workshops
              </h3>
              <span className="h-px flex-1 max-w-24 bg-secondary/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {webinarCerts.map((cert, index) => renderCertificateCard(cert, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareEngineerCertifications;
