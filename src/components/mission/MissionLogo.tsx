
import React from "react";
import BlurryCard from "@/components/ui/BlurryCard";

interface MissionLogoProps {
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "default" | "mspc";
}

const MissionLogo: React.FC<MissionLogoProps> = ({ 
  className = "",
  size = "medium",
  variant = "default"
}) => {
  const logoSizeClass = 
    size === "xlarge" ? "w-48 h-48" : 
    size === "large" ? "w-32 h-32" : 
    size === "small" ? "w-16 h-16" : 
    "w-24 h-24"; // medium
  
  const gradientClass = variant === "mspc" 
    ? "bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" 
    : "mimard-gradient-purple";
  
  return (
    <BlurryCard className={`p-4 ${className} ${gradientClass}`}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src="/logo-lycee.png" 
          alt="Logo du Lycée Les Savarières"
          className={`${logoSizeClass} drop-shadow-md transition-all duration-300 hover:scale-105`}
        />
        {variant === "mspc" ? (
          <div className="text-center">
            <h3 className="text-lg font-bold text-white">MSPC-GMAO Edu</h3>
            <p className="text-xs text-white/80">
              Formation à la maintenance industrielle
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-medium text-center text-white">Lycée Polyvalent Les Savarières</h3>
            <p className="text-sm text-white/80 text-center">
              Lycée général technologique et professionnel
            </p>
          </>
        )}
      </div>
    </BlurryCard>
  );
};

export default MissionLogo;
