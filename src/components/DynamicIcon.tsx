"use client";

import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import CloudfareIcon from "./Icons/CloudfareIcon";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const DynamicIcon = ({ name, size = 24, className }: DynamicIconProps) => {
  // Manual check for custom icons
  if (name === "CloudfareIcon")
    return <CloudfareIcon size={size} className={className} />;

  // Search through icon libraries
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
