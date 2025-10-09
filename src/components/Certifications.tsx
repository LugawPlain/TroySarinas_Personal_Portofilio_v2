import React from "react";
import Image from "next/image";

interface Certification {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  bgColor?: string;
}

interface CertificationsProps {
  certifications?: Certification[];
  title?: string;
  subtitle?: string;
}

// Default certifications data
const defaultCertifications: Certification[] = [
  {
    id: "1",
    title: "Python",
    description: "Advanced Android Development with Kotlin & Java",
    logo: "/CiscoLogo.png",
    logoAlt: "Cisco Logo",
  },
  {
    id: "2",
    title: "AWS Solutions Architect",
    description: "Cloud Architecture and Infrastructure Design",
    logo: "/CiscoLogo.png",
    logoAlt: "AWS Logo",
  },
  {
    id: "3",
    title: "React Developer",
    description: "Modern Web Development with React & TypeScript",
    logo: "/ReactLogo.png",
    logoAlt: "React Logo",
  },
  {
    id: "4",
    title: "Azure Fundamentals",
    description: "Microsoft Azure Cloud Services",
    logo: "/AzureLogo.png",
    logoAlt: "Azure Logo",
  },
];

const Certifications: React.FC<CertificationsProps> = ({
  certifications = defaultCertifications,
  title = "Professional Certifications & Credentials 📜",
  subtitle = "Industry Recognized certifications",
}) => {
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
        <div className="max-w-[80rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-14 gap-y-12 mt-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="block shadow-2xl rounded-2xl overflow-clip group cursor-pointer"
            >
              <div className="h-45 w-full flex items-center justify-center border-b border-border bg-gray-100">
                <Image
                  className="group-hover:scale-125 transition duration-300"
                  src={cert.logo}
                  alt={cert.logoAlt}
                  height={150}
                  width={150}
                />
              </div>
              <div className="text-center py-2 px-4">
                <h3 className="mt-1 text-2xl font-bold mb-1 text-secondary">
                  {cert.title}
                </h3>
                <p className="text-center text-base/5 text-muted-foreground">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
