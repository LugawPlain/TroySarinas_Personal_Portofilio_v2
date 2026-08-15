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

// Icon mapping
const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
};

interface SocialLink {
  id: string;
  name: string;
  platform: string;
  url: string;
  icon_name: string;
  color_class?: string;
  display_order: number;
}

interface SocialLinksProps {
  className?: string;
  size?: number;
  links?: SocialLink[];
  itemClassName?: string;
}

// Fallback links for backward compatibility
const fallbackLinks: SocialLink[] = [
  {
    id: "1",
    name: "GitHub",
    platform: "github",
    url: "https://github.com/LugawPlain",
    icon_name: "FaGithub",
    color_class: "",
    display_order: 1,
  },
  {
    id: "2",
    name: "LinkedIn",
    platform: "linkedin",
    url: "https://www.linkedin.com/in/troy-sarinas-47062b1ba/",
    icon_name: "FaLinkedin",
    color_class: "text-blue-400",
    display_order: 2,
  },
  {
    id: "3",
    name: "Email",
    platform: "email",
    url: "mailto:troyjeffreysarinas@gmail.com",
    icon_name: "FaEnvelope",
    color_class: "text-red-400",
    display_order: 3,
  },
  {
    id: "4",
    name: "Instagram",
    platform: "instagram",
    url: "https://www.instagram.com/troysarinas/",
    icon_name: "FaInstagram",
    color_class: "",
    display_order: 4,
  },
  {
    id: "5",
    name: "Facebook",
    platform: "facebook",
    url: "https://www.facebook.com/TroyGwapoOmsim/",
    icon_name: "FaFacebook",
    color_class: "text-blue-400",
    display_order: 5,
  },
  {
    id: "6",
    name: "X (Twitter)",
    platform: "twitter",
    url: "#",
    icon_name: "FaXTwitter",
    color_class: "",
    display_order: 6,
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  size = 24,
  links,
  itemClassName,
}) => {
  const trackSocial = useTrack("social_click", "hero");
  const displayLinks = links || fallbackLinks;

  const handleClick = (platform: string, url: string) => {
    trackSocial({ platform, url });
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || FaGithub;
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {displayLinks.map((link) => {
        const IconComponent = getIcon(link.icon_name);
        return (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.platform, link.url)}
            className={cn(
              itemClassName ||
                "flex p-2 bg-primary justify-center items-center rounded-lg shadow-lg border-[0.5px] border-border hover:-translate-y-1 transition duration-300",
            )}
          >
            <IconComponent className={link.color_class} size={size} />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialLinks;
