import React from "react";
import { cn } from "@/lib/utils";

interface SchoolLogoProps {
  className?: string;
  variant?: "default" | "top";
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ className, variant = "default" }) => {
  if (variant === "top") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <img src="/logo-lycee-top.png" alt="Logo du lycée" className="h-8" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">Lycée Polyvalent</span>
          <span className="text-sm font-medium">Les Savarières</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img src="/logo-lycee.png" alt="Logo du lycée" className="h-16" />
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">Lycée Polyvalent</span>
        <span className="text-sm font-medium">Les Savarières</span>
      </div>
    </div>
  );
};

export default SchoolLogo;
