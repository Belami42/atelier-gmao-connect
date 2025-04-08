
import React from "react";
import { cn } from "@/lib/utils";

interface SchoolLogoProps {
  className?: string;
  variant?: "default" | "top" | "mspc";
  size?: string;
  showDescription?: boolean;
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className, 
  variant = "default", 
  size, 
  showDescription = true 
}) => {
  if (variant === "top") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <img src="/logo-lycee-top.png" alt="Logo du lycée" className={size || "h-8"} />
        {showDescription && (
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Lycée Polyvalent</span>
            <span className="text-sm font-medium">Les Savarières</span>
          </div>
        )}
      </div>
    );
  }
  
  if (variant === "mspc") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <img src="/logo-mspc.png" alt="Logo MSPC" className={size || "h-16"} />
        {showDescription && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-sm font-medium">Bac Pro MSPC</span>
            <span className="text-xs text-muted-foreground">Maintenance des Systèmes de Production Connectés</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img src="/logo-lycee.png" alt="Logo du lycée" className={size || "h-16"} />
      {showDescription && (
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">Lycée Polyvalent</span>
          <span className="text-sm font-medium">Les Savarières</span>
        </div>
      )}
    </div>
  );
};

export default SchoolLogo;
