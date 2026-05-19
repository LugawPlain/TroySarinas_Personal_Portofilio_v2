"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/use-track";
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
  const trackSocial = useTrack("social_click", "hero");

  const handleClick = (platform: string, url: string) => {
    trackSocial({ platform, url });
  };

  return (
    <div className={cn("flex gap-4", className)}>
      <Link
        href={"https://github.com/LugawPlain"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("github", "https://github.com/LugawPlain")}
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300    "
      >
        <FaGithub size={size} />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/troy-sarinas-47062b1ba/"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleClick("linkedin", "https://www.linkedin.com/in/troy-sarinas-47062b1ba/")
        }
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300    "
      >
        <FaLinkedin className="text-blue-400" size={size} />
      </Link>
      <Link
        href={"mailto:troysarinas22@gmail.com"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("email", "mailto:troysarinas22@gmail.com")}
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300    "
      >
        <FaEnvelope className="text-red-400" size={size} />
      </Link>
      <Link
        href={"https://www.instagram.com/troysarinas/"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleClick("instagram", "https://www.instagram.com/troysarinas/")
        }
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300    "
      >
        <FaInstagram className="" size={size} />
      </Link>
      <Link
        href={"https://www.facebook.com/TroyGwapoOmsim/"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleClick("facebook", "https://www.facebook.com/TroyGwapoOmsim/")
        }
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300     "
      >
        <FaFacebook className="text-blue-400" size={size} />
      </Link>
      <Link
        href={"#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("twitter", "#")}
        className="flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300     "
      >
        <FaXTwitter className="" size={size} />
      </Link>
    </div>
  );
};

export default SocialLinks;
