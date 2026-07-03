"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ExternalLink, Award, Clock, CheckCircle } from "lucide-react";

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

const CPACertifications = ({
  certifications: allCerts,
  title = "Licenses & Certifications",
  subtitle = "Professional credentials demonstrating expertise and regulatory compliance",
}: CertificationsProps) => {
  if (allCerts.length === 0) return null;

  const professionalCerts = allCerts.filter((c) => !c.is_webinar);
  const webinarCerts = allCerts.filter((c) => c.is_webinar);

  const renderLicenseCard = (cert: Certification, index: number) => (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl border-2 border-[#1e3a5f]/20 hover:border-[#c9a227]/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* License Badge Ribbon */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-2 right-[-28px] w-28 bg-[#1e3a5f] text-white text-[10px] font-bold uppercase tracking-wider py-1 text-center transform rotate-45">
          Licensed
        </div>
      </div>

      {cert.cert_url ? (
        <Link
          href={cert.cert_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="h-40 w-full flex items-center justify-center cursor-pointer border-b border-gray-100 bg-gradient-to-br from-[#1e3a5f]/5 to-white hover:from-[#1e3a5f]/10 hover:to-white transition-colors p-6">
            <Image
              className="group-hover:scale-110 transition duration-500 object-contain max-h-full"
              src={cert.logo_url}
              alt={cert.logo_alt || cert.title}
              height={100}
              width={100}
            />
          </div>
        </Link>
      ) : (
        <div className="h-40 w-full flex items-center justify-center border-b border-gray-100 bg-gradient-to-br from-[#1e3a5f]/5 to-white p-6">
          <Image
            className="group-hover:scale-110 transition duration-500 object-contain max-h-full"
            src={cert.logo_url}
            alt={cert.logo_alt || cert.title}
            height={100}
            width={100}
          />
        </div>
      )}

      <div className="p-6 space-y-3">
        <div className="flex items-start gap-2">
          <Shield className="w-5 h-5 text-[#1e3a5f] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {cert.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {cert.description}
        </p>

        {/* License Details */}
        <div className="bg-slate-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">License #</span>
            <span className="font-mono font-bold text-[#1e3a5f]">CPA-12345678</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle className="w-3 h-3" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Renewal</span>
            <span className="text-gray-700">Dec 2025</span>
          </div>
        </div>

        {(cert.organizer || cert.date_label) && (
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {cert.organizer && <span className="font-medium text-gray-700">{cert.organizer}</span>}
              {cert.organizer && cert.date_label && <span className="mx-1">•</span>}
              {cert.date_label && <span>{cert.date_label}</span>}
            </div>
            {cert.cert_url && (
              <ExternalLink className="w-4 h-4 text-[#1e3a5f]" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div
      id="certifications"
      className="flex-col flex px-4 sm:px-8 items-center justify-center w-full py-16 bg-gradient-to-b from-slate-50/50 to-white"
    >
      <div className="flex flex-col justify-center items-center w-full max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#1e3a5f]" />
            </div>
            <span className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider">
              Credentials
            </span>
          </div>
          <h1 className="text-center font-bold text-3xl sm:text-4xl xl:text-5xl text-gray-900 leading-tight font-fraunces">
            {title}
          </h1>
          <p className="text-center text-gray-600 mt-3 max-w-2xl">{subtitle}</p>

          {/* CPE Tracking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-lg max-w-md mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1e3a5f]" />
                <span className="font-bold text-gray-900">CPE Progress</span>
              </div>
              <span className="text-sm font-bold text-[#1e3a5f]">40 / 80 hrs</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50%" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#c9a227] rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Reporting period: Jan 2025 - Dec 2025</p>
          </motion.div>
        </div>

        {professionalCerts.length > 0 && (
          <div className="w-full">
            <h2 className="text-center font-bold text-xl mb-8 text-gray-800 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gray-300 hidden sm:block" />
              Professional Licenses
              <span className="h-px w-12 bg-gray-300 hidden sm:block" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professionalCerts.map((cert, index) => renderLicenseCard(cert, index))}
            </div>
          </div>
        )}

        {webinarCerts.length > 0 && (
          <div className="w-full mt-16">
            <h2 className="text-center font-bold text-xl mb-8 text-gray-800 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gray-300 hidden sm:block" />
              Continuing Education
              <span className="h-px w-12 bg-gray-300 hidden sm:block" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {webinarCerts.map((cert, index) => renderLicenseCard(cert, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPACertifications;
