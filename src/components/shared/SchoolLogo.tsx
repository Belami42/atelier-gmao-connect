
import React from "react";
import BlurryCard from "@/components/ui/BlurryCard";

interface SchoolLogoProps {
  className?: string;
  showDescription?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "default" | "mspc" | "top";
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className = "", 
  showDescription = true,
  size = "medium",
  variant = "default"
}) => {
  const logoSizeClass = 
    size === "xlarge" ? "w-48 h-48" : 
    size === "large" ? "w-32 h-32" : 
    size === "small" ? "w-16 h-16" : 
    "w-24 h-24"; // medium
  
  // Different styling for the top of page variant
  if (variant === "top") {
    return (
      <div className={`bg-gradient-to-r from-gray-800 to-blue-900 w-full py-2 px-4 flex justify-center items-center ${className}`}>
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
            alt="Logo du Lycée"
            className="h-12 w-12 drop-shadow-md" 
          />
          <div className="text-white">
            <h3 className="text-lg font-medium">Lycée Professionnel</h3>
            {variant === "mspc" && (
              <p className="text-xs text-white/80">
                Bac Pro Maintenance des Systèmes de Production Connectés
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  const gradientClass = variant === "mspc" 
    ? "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" 
    : "mimard-gradient-blue";
  
  return (
    <BlurryCard className={`p-4 ${className} ${gradientClass}`}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
          alt="Logo du Lycée"
          className={`${logoSizeClass} drop-shadow-md transition-all duration-300 hover:scale-105`}
        />
        {showDescription && (
          <h3 className="text-lg font-medium text-center text-white">Lycée Professionnel</h3>
        )}
        {(showDescription && variant === "mspc") && (
          <div className="text-center">
            <p className="text-xs text-white/80">
              Bac Pro Maintenance des Systèmes de Production Connectés
            </p>
          </div>
        )}
      </div>
    </BlurryCard>
  );
};

export default SchoolLogo;
