import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCertifications } from "@/lib/roles";

interface CertificationsProps {
  role?: string;
  title?: string;
  subtitle?: string;
}

const Certifications = async ({
  role,
  title = "Professional Certifications & Credentials 📜",
  subtitle = "Industry recognized certifications and webinar certificates",
}: CertificationsProps) => {
  const allCerts = await getCertifications(role);

  if (allCerts.length === 0) return null;

  const certifications = allCerts.filter((c) => !c.is_webinar);
  const webinarCertificates = allCerts.filter((c) => c.is_webinar);

  const renderCertificateCard = (cert: any, isWebinar?: boolean) => (
    <div
      key={cert.id}
      className="block shadow-2xl rounded-2xl overflow-clip group hover:shadow-3xl transition-all duration-300 bg-card border border-border/50"
    >
      {cert.cert_url ? (
        <Link
          href={cert.cert_url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-48 w-full flex items-center justify-center cursor-pointer border-b border-border bg-muted/30 hover:bg-muted/50 transition-colors p-6"
        >
          <Image
            className="group-hover:scale-110 transition duration-500 object-contain max-h-full"
            src={cert.logo_url}
            alt={cert.logo_alt || cert.title}
            height={120}
            width={120}
          />
        </Link>
      ) : (
        <div className="h-48 w-full flex items-center justify-center border-b border-border bg-muted/30 p-6">
          <Image
            className="group-hover:scale-110 transition duration-500 object-contain max-h-full"
            src={cert.logo_url}
            alt={cert.logo_alt || cert.title}
            height={120}
            width={120}
          />
        </div>
      )}
      <div className="text-center py-6 px-4 space-y-2">
        <h3 className="text-xl font-bold text-secondary line-clamp-1">
          {cert.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {cert.description}
        </p>
        {(cert.organizer || cert.date_label) && (
          <div className="pt-2 border-t mt-4 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold flex flex-col gap-1">
            {cert.organizer && <span>{cert.organizer}</span>}
            {cert.date_label && <span>{cert.date_label}</span>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="certifications"
      className="flex-col flex px-4 items-center justify-center w-full"
    >
      <div className="flex flex-col justify-center items-center w-full max-w-[80rem]">
        <h1 className="text-center font-bold xl:text-4xl text-3xl mt-2 text-foreground/90 leading-tight">
          {title}
        </h1>
        <p className="text-center text-muted-foreground mt-2">{subtitle}</p>

        {/* Professional Certifications Section */}
        {certifications.length > 0 && (
          <div className="w-full mt-16">
            <h2 className="text-center font-bold text-2xl mb-10 text-foreground/80 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-border hidden sm:block" />
              Professional Certifications 🏆
              <span className="h-px w-12 bg-border hidden sm:block" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {certifications.map((cert) => renderCertificateCard(cert))}
            </div>
          </div>
        )}

        {/* Webinar Certificates Section */}
        {webinarCertificates.length > 0 && (
          <div className="w-full mt-24 pb-12">
            <h2 className="text-center font-bold text-2xl mb-10 text-foreground/80 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-border hidden sm:block" />
              Webinar Certificates & Workshops 🎓
              <span className="h-px w-12 bg-border hidden sm:block" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {webinarCertificates.map((cert) =>
                renderCertificateCard(cert, true),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
