import React from "react";
import { cn } from "@/lib/utils";

interface NameTitleProps {
  className?: string;
}

const NameTitle: React.FC<NameTitleProps> = ({ className }) => {
  return (
    <h1 className={cn("text-3xl font-extralight flex items-center", className)}>
      <span className="text-gray-400">{"<"}</span>
      <span className="font-passionconflict text-5xl text-test">
        Troy Sarinas
      </span>
      <span className="text-gray-400">{"/>"}</span>
    </h1>
  );
};

export default NameTitle;
