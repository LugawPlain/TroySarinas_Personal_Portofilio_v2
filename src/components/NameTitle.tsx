import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NameTitleProps {
  className?: string;
  size?: string;
  href?: string;
  nameFontClass?: string;
}

const NameTitle: React.FC<NameTitleProps> = ({
  className,
  size,
  href = "/",
  nameFontClass,
}) => {
  return (
    <Link href={href}>
      <h1 className={cn("text-2xl flex items-center", className)}>
        <p className="text-secondary/80 ">{"<"}</p>
        <span
          className={cn(
            nameFontClass || "font-passionconflict ",
            size || "text-5xl",
          )}
        >
          Troy
        </span>
        <p className="pl-2 text-secondary/80">{"/>"}</p>
      </h1>
    </Link>
  );
};

export default NameTitle;
