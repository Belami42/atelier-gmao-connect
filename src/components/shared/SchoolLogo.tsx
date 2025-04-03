
import React from "react";
import BlurryCard from "@/components/ui/BlurryCard";

interface SchoolLogoProps {
  className?: string;
  showDescription?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "default" | "mspc";
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
  
  const gradientClass = variant === "mspc" 
    ? "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" 
    : "mimard-gradient-blue";
  
  return (
    <BlurryCard className={`p-4 ${className} ${gradientClass}`}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
          alt="Logo du Lycée Étienne Mimard"
          className={`${logoSizeClass} drop-shadow-md transition-all duration-300 hover:scale-105`}
        />
        {showDescription && (
          <>
            <h3 className="text-lg font-medium text-center text-white">Lycée Étienne Mimard</h3>
            {variant === "mspc" ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-white">MSPC-GMAO Edu</p>
                <p className="text-xs text-white/80">
                  Bac Pro Maintenance des Systèmes de Production Connectés
                </p>
              </div>
            ) : (
              <p className="text-sm text-white/80 text-center">
                Lycée général technologique et professionnel
              </p>
            )}
          </>
        )}
      </div>
    </BlurryCard>
  );
};

export default SchoolLogo;
