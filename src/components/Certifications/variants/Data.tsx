"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ExternalLink, Database, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

interface DataCertificationsProps {
  certifications: Certification[];
}

// Certification category distribution data
const certCategoryData = [
  { name: "Data Science", value: 35, color: "#3b82f6" },
  { name: "Analytics", value: 28, color: "#8b5cf6" },
  { name: "Cloud", value: 20, color: "#06b6d4" },
  { name: "Visualization", value: 17, color: "#10b981" },
];

const DataCertifications = ({ certifications }: DataCertificationsProps) => {
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
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {cert.cert_url ? (
        <Link
          href={cert.cert_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="h-40 w-full flex items-center justify-center bg-slate-50 p-6 border-b border-slate-100">
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
        <div className="h-40 w-full flex items-center justify-center bg-slate-50 p-6 border-b border-slate-100">
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
          <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <h3 className="text-lg font-bold text-slate-900">{cert.title}</h3>
        </div>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {cert.description}
        </p>

        {(cert.organizer || cert.date_label) && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-400">
              {cert.organizer && (
                <span className="text-slate-500">{cert.organizer}</span>
              )}
              {cert.organizer && cert.date_label && (
                <span className="mx-1">•</span>
              )}
              {cert.date_label && <span>{cert.date_label}</span>}
            </div>
            {cert.cert_url && (
              <ExternalLink className="w-4 h-4 text-blue-600" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div id="certifications" className="relative py-20 px-4 sm:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Credentials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Certifications
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in data analytics
            and science.
          </p>
        </div>

        {/* Certification Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{professionalCerts.length}</p>
              <p className="text-xs text-slate-500">Professional Certs</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
              <Award className="w-6 h-6 text-violet-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{webinarCerts.length}</p>
              <p className="text-xs text-slate-500">Workshops</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
              <Database className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">98%</p>
              <p className="text-xs text-slate-500">Avg. Score</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
              <ExternalLink className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-500">Verified</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Category Distribution
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={certCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {certCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2">
                          <p
                            className="text-xs font-medium"
                            style={{ color: payload[0].payload.color }}
                          >
                            {payload[0].name}: {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center">
              {certCategoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {professionalCerts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professionalCerts.map((cert, index) => renderBadgeCard(cert, index))}
            </div>
          </div>
        )}

        {webinarCerts.length > 0 && (
          <div>
            <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
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

export default DataCertifications;
