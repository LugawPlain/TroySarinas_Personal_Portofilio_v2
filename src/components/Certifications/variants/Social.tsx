"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ExternalLink, TrendingUp } from "lucide-react";

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

interface SocialCertificationsProps {
  certifications: Certification[];
}

const SocialCertifications = ({ certifications }: SocialCertificationsProps) => {
  if (certifications.length === 0) return null;

  const professionalCerts = certifications.filter((c) => !c.is_webinar);
  const webinarCerts = certifications.filter((c) => c.is_webinar);

  const renderBadgeCard = (cert: Certification, index: number) => (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-pink-500/30 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {cert.cert_url ? (
        <Link href={cert.cert_url} target="_blank" rel="noopener noreferrer" className="block">
          <div className="h-40 w-full flex items-center justify-center bg-gray-800/50 p-6 border-b border-gray-800">
            <Image
              className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500"
              src={cert.logo_url}
              alt={cert.logo_alt || cert.title}
              height={80}
              width={80}
            />
          </div>
        </Link>
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-gray-800/50 p-6 border-b border-gray-800">
          <Image
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500"
            src={cert.logo_url}
            alt={cert.logo_alt || cert.title}
            height={80}
            width={80}
          />
        </div>
      )}

      <div className="p-6 relative">
        <div className="flex items-start gap-2 mb-2">
          <Award className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
          <h3 className="text-lg font-bold text-white">{cert.title}</h3>
        </div>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{cert.description}</p>

        {(cert.organizer || cert.date_label) && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-800">
            <div className="text-xs text-gray-500">
              {cert.organizer && <span className="text-gray-400">{cert.organizer}</span>}
              {cert.organizer && cert.date_label && <span className="mx-1">•</span>}
              {cert.date_label && <span>{cert.date_label}</span>}
            </div>
            {cert.cert_url && <ExternalLink className="w-4 h-4 text-pink-400" />}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div id="certifications" className="relative py-20 px-4 sm:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-pink-400" />
            </div>
            <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Industry-recognized credentials validating expertise in social media management.</p>
        </div>

        {professionalCerts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">Professional Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professionalCerts.map((cert, index) => renderBadgeCard(cert, index))}
            </div>
          </div>
        )}

        {webinarCerts.length > 0 && (
          <div>
            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">Workshops & Training</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {webinarCerts.map((cert, index) => renderBadgeCard(cert, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialCertifications;
