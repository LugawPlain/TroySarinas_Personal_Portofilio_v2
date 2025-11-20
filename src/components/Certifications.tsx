import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Certification {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  bgColor?: string;
  url?: string;
}

interface WebinarCertificate {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  date?: string;
  organizer?: string;
  url?: string;
}

interface CertificationsProps {
  certifications?: Certification[];
  webinarCertificates?: WebinarCertificate[];
  title?: string;
  subtitle?: string;
}
// Default certifications data
const defaultCertifications: Certification[] = [
  {
    id: "1",
    title: "N8n",
    description: "N8n Certification Badge",
    logo: "/N8nbadge.png",
    logoAlt: "N8n badge 2",
    url: "https://community.n8n.io/badges/104/completed-n8n-course-level-1?username=troy_sarinas",
  },
  {
    id: "2",
    title: "N8n",
    description: "N8n Certification Badge 2",
    logo: "/N8nbadge2.png",
    logoAlt: "N8n badge 2",
    url: "https://community.n8n.io/badges/104/completed-n8n-course-level-2?username=troy_sarinas",
  },
  {
    id: "3",
    title: "IBM",
    description: "Introduction to Devops",
    logo: "/IBMLogo.webp",
    logoAlt: "IBM Logo",
    url: "https://coursera.org/share/d526d7881be989589f77a7e9124b4338",
  },
  {
    id: "4",
    title: "React Developer",
    description: "Modern Web Development with React & TypeScript",
    logo: "/Icons/react.svg",
    logoAlt: "React Logo",
    url: "",
  },
  {
    id: "5",
    title: "Azure Fundamentals",
    description: "Microsoft Azure Cloud Services",
    logo: "/Icons/aws-svgrepo-com.svg",
    logoAlt: "Azure Logo",
    url: "",
  },
];

// Default webinar certificates data
const defaultWebinarCertificates: WebinarCertificate[] = [
  {
    id: "w1",
    title: "Cloud Security Fundamentals",
    description:
      "Understanding cloud security best practices and implementation",
    logo: "/Icons/cloudflare-svgrepo-com.svg",
    logoAlt: "Cloud Security Webinar",
    date: "2024",
    organizer: "Cloud Security Alliance",
    url: "",
  },
  {
    id: "w2",
    title: "AI & Machine Learning Workshop",
    description: "Practical applications of AI and ML in modern development",
    logo: "/Icons/python.svg",
    logoAlt: "AI Workshop Certificate",
    date: "2024",
    organizer: "Tech Conference 2024",
    url: "",
  },
  {
    id: "w3",
    title: "DevOps Best Practices",
    description: "Modern DevOps workflows and automation strategies",
    logo: "/Icons/docker-svgrepo-com.svg",
    logoAlt: "DevOps Webinar",
    date: "2024",
    organizer: "DevOps Community",
    url: "",
  },
  {
    id: "w4",
    title: "Web Performance Optimization",
    description: "Advanced techniques for web performance and optimization",
    logo: "/Icons/next.svg",
    logoAlt: "Web Performance Certificate",
    date: "2024",
    organizer: "Web Dev Summit",
    url: "",
  },
];

const Certifications: React.FC<CertificationsProps> = ({
  certifications = defaultCertifications,
  webinarCertificates = defaultWebinarCertificates,
  title = "Professional Certifications & Credentials 📜",
  subtitle = "Industry Recognized certifications and webinar certificates",
}) => {
  const renderCertificateCard = (
    cert: Certification | WebinarCertificate,
    isWebinar?: boolean
  ) => (
    <div
      key={cert.id}
      className="block shadow-2xl rounded-2xl overflow-clip group hover:shadow-3xl transition-all duration-300"
    >
      {cert.url ? (
        <Link
          href={cert.url}
          className="h-45 w-full flex items-center justify-center cursor-pointer border-b border-border bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Image
            className="group-hover:scale-125 transition duration-300"
            src={cert.logo}
            alt={cert.logoAlt}
            height={150}
            width={150}
          />
        </Link>
      ) : (
        <div className="h-45 w-full flex items-center justify-center border-b border-border bg-gray-100">
          <Image
            className="group-hover:scale-125 transition duration-300"
            src={cert.logo}
            alt={cert.logoAlt}
            height={150}
            width={150}
          />
        </div>
      )}
      <div className="text-center py-4 px-4">
        <h3 className="mt-1 text-2xl font-bold mb-1 text-secondary">
          {cert.title}
        </h3>
        <p className="text-center text-base/5 text-muted-foreground mb-2">
          {cert.description}
        </p>
        {isWebinar && "date" in cert && cert.date && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Date:</span> {cert.date}
          </p>
        )}
        {isWebinar && "organizer" in cert && cert.organizer && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Organizer:</span> {cert.organizer}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="certifications"
      className="flex-col flex px-4 items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center font-bold xl:text-4xl text-3xl mt-2 text-foreground/90">
          {title}
        </h1>
        <p className="text-center text-muted-foreground">{subtitle}</p>

        {/* Professional Certifications Section */}
        <div className="w-full max-w-[80rem] mt-12">
          <h2 className="text-center font-bold text-3xl mb-8 text-foreground/80">
            Professional Certifications 🏆
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-14 gap-y-12">
            {certifications.map((cert) => renderCertificateCard(cert))}
          </div>
        </div>

        {/* Webinar Certificates Section */}
        <div className="w-full max-w-[80rem] mt-16">
          <h2 className="text-center font-bold text-3xl mb-8 text-foreground/80">
            Webinar Certificates & Workshops 🎓
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-14 gap-y-12">
            {webinarCertificates.map((cert) =>
              renderCertificateCard(cert, true)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
