import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
interface SocialLinksProps {
  className?: string;
  size?: number;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className, size = 24 }) => {
  return (
    <div className={cn("flex gap-4", className)}>
      <Link
        href={"https://github.com/LugawPlain"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaGithub size={size} />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/troy-sarinas-47062b1ba/"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaLinkedin className="text-blue-400" size={size} />
      </Link>
      <Link
        href={"mailto:troysarinas22@gmail.com"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaEnvelope className="text-red-400" size={size} />
      </Link>
      <Link
        href={"https://www.instagram.com/troysarinas/"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaInstagram className="" size={size} />
      </Link>
      <Link
        href={"https://www.facebook.com/TroyGwapoOmsim/"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaFacebook className="text-blue-400" size={size} />
      </Link>
      <Link
        href={"#"}
        className="flex p-2 bg-gray-50 justify-center items-center rounded-lg shadow-xl"
      >
        <FaXTwitter className="" size={size} />
      </Link>
    </div>
  );
};

export default SocialLinks;
