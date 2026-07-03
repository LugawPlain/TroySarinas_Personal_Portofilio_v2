"use client";

import { useEffect } from "react";
import { Icon, addCollection } from "@iconify/react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import * as LucideIcons from "lucide-react";
import logosData from "@iconify-json/logos/icons.json";
import simpleIconsData from "@iconify-json/simple-icons/icons.json";
import CloudfareIcon from "./Icons/CloudfareIcon";

let collectionsAdded = false;

function loadIconifyCollections() {
  if (collectionsAdded) return;
  addCollection(logosData as any);
  addCollection(simpleIconsData as any);
  collectionsAdded = true;
}

interface DynamicIconProps {
  name?: string;
  iconUrl?: string;
  size?: number;
  className?: string;
}

const DynamicIcon = ({ name = "", iconUrl, size = 24, className }: DynamicIconProps) => {
  useEffect(() => {
    loadIconifyCollections();
  }, []);

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={name}
        width={size}
        height={size}
        className={`object-contain ${className || ""}`}
      />
    );
  }

  if (!name) {
    return <MdIcons.MdHelpOutline size={size} className={className} />;
  }

  // Manual check for custom icons
  if (name === "CloudfareIcon")
    return <CloudfareIcon size={size} className={className} />;

  // Prefixed icon sources: logos:, simple-icons:, lucide:, fa:, fa6:, pi:, si:, ri:, io5:, md:
  const colonIdx = name.indexOf(":");
  if (colonIdx > 0) {
    const prefix = name.slice(0, colonIdx);
    const iconName = name.slice(colonIdx + 1);

    if (prefix === "logos" || prefix === "simple-icons") {
      return (
        <Icon
          icon={`${prefix}:${iconName}`}
          width={size}
          height={size}
          className={className}
        />
      );
    }

    if (prefix === "lucide") {
      const LucideComponent = (LucideIcons as any)[
        iconName
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join("")
      ];
      if (LucideComponent) {
        return <LucideComponent size={size} className={className} />;
      }
    }

    const libMap: Record<string, any> = {
      fa: FaIcons,
      fa6: Fa6Icons,
      si: SiIcons,
      io5: IoIcons,
      ri: RiIcons,
      pi: PiIcons,
      md: MdIcons,
    };
    const lib = libMap[prefix];
    if (lib) {
      const IconComponent = lib[iconName];
      if (IconComponent) {
        return <IconComponent size={size} className={className} />;
      }
    }
  }

  // Search through icon libraries for legacy unprefixed names
  const IconComponent =
    (FaIcons as any)[name] ||
    (Fa6Icons as any)[name] ||
    (SiIcons as any)[name] ||
    (IoIcons as any)[name] ||
    (RiIcons as any)[name] ||
    (PiIcons as any)[name] ||
    (MdIcons as any)[name];

  if (!IconComponent) {
    return <MdIcons.MdHelpOutline size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
