"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

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

interface CinematicCertificationsProps {
  certifications: Certification[];
}

const CinematicCertifications = ({ certifications }: CinematicCertificationsProps) => {
  if (certifications.length === 0) return null;

  const professionalCerts = certifications.filter((c) => !c.is_webinar);
  const webinarCerts = certifications.filter((c) => c.is_webinar);

  const renderBadgeCard = (cert: Certification, index: number) => (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
    >
      {/* Badge Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {cert.cert_url ? (
        <Link
          href={cert.cert_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          <div className="h-48 sm:h-56 w-full flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent p-8 border-b border-white/5">
            <Image
              className="object-contain max-h-full transition-transform duration-500 group-hover:scale-110"
              src={cert.logo_url}
              alt={cert.logo_alt || cert.title}
              height={120}
              width={120}
            />
          </div>
        </Link>
      ) : (
        <div className="h-48 sm:h-56 w-full flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent p-8 border-b border-white/5">
          <Image
            className="object-contain max-h-full transition-transform duration-500 group-hover:scale-110"
            src={cert.logo_url}
            alt={cert.logo_alt || cert.title}
            height={120}
            width={120}
          />
        </div>
      )}

      <div className="p-6 relative">
        <div className="flex items-start gap-3 mb-3">
          <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <h3 className="text-lg font-bold text-white leading-tight">
            {cert.title}
          </h3>
        </div>

        <p className="text-sm text-white/40 mb-4 line-clamp-2">
          {cert.description}
        </p>

        {(cert.organizer || cert.date_label) && (
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="text-xs text-white/30">
              {cert.organizer && <span className="text-white/50">{cert.organizer}</span>}
              {cert.organizer && cert.date_label && <span className="mx-2">•</span>}
              {cert.date_label && <span>{cert.date_label}</span>}
            </div>
            {cert.cert_url && (
              <ExternalLink className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div
      id="certifications"
      className="relative py-20 px-4 sm:px-8 bg-black"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-amber-400/80 mb-4 block">
            Credentials
          </span>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-4">
            Certifications
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Industry-recognized certifications that validate expertise in professional video editing and post-production.
          </p>
        </motion.div>

        {professionalCerts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-center text-sm font-semibold text-white/60 uppercase tracking-widest mb-10">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professionalCerts.map((cert, index) => renderBadgeCard(cert, index))}
            </div>
          </div>
        )}

        {webinarCerts.length > 0 && (
          <div>
            <h3 className="text-center text-sm font-semibold text-white/60 uppercase tracking-widest mb-10">
              Workshops & Training
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {webinarCerts.map((cert, index) => renderBadgeCard(cert, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinematicCertifications;
