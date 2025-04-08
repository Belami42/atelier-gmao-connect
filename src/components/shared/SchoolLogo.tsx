
import React from "react";
import { cn } from "@/lib/utils";

interface SchoolLogoProps {
  className?: string;
  variant?: "default" | "top" | "mspc";
  size?: "small" | "medium" | "large" | "xlarge";
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className, 
  variant = "default", 
  size = "medium" 
}) => {
  const logoSizeClass = 
    size === "xlarge" ? "h-32" : 
    size === "large" ? "h-24" : 
    size === "small" ? "h-8" : 
    "h-16"; // medium default

  if (variant === "top") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <img 
          src="/lovable-uploads/a80dc935-64bb-4875-bbaf-5dd7f1c4ab9c.png" 
          alt="Logo Etienne Mimard" 
          className="h-8" 
        />
        <span className="text-sm font-medium">Lycée Etienne Mimard</span>
      </div>
    );
  }

  if (variant === "mspc") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <img 
          src="/lovable-uploads/a80dc935-64bb-4875-bbaf-5dd7f1c4ab9c.png" 
          alt="Logo Etienne Mimard" 
          className={cn(logoSizeClass)}
        />
        <div className="flex flex-col items-center mt-1">
          <span className="text-sm font-medium">MSPC-GMAO Edu</span>
          <span className="text-xs text-muted-foreground">Formation à la maintenance industrielle</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img 
        src="/lovable-uploads/a80dc935-64bb-4875-bbaf-5dd7f1c4ab9c.png" 
        alt="Logo Etienne Mimard" 
        className={cn(logoSizeClass)}
      />
      <div className="flex flex-col items-center mt-1">
        <span className="text-sm font-medium">Lycée Etienne Mimard</span>
      </div>
    </div>
  );
};

export default SchoolLogo;
