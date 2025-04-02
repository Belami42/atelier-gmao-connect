
import React from "react";
import BlurryCard from "@/components/ui/BlurryCard";

interface SchoolLogoProps {
  className?: string;
  showDescription?: boolean;
  size?: "small" | "medium" | "large";
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className = "", 
  showDescription = true,
  size = "medium"
}) => {
  const logoSizeClass = size === "large" ? "logo-large" : 
                         size === "small" ? "logo-small" : "logo-medium";
  
  return (
    <BlurryCard className={`p-4 ${className} mimard-gradient-blue`}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
          alt="Logo du Lycée Étienne Mimard"
          className={logoSizeClass}
        />
        {showDescription && (
          <>
            <h3 className="text-lg font-medium text-center">Lycée Étienne Mimard</h3>
            <p className="text-sm text-muted-foreground text-center">
              Lycée général technologique et professionnel
            </p>
          </>
        )}
      </div>
    </BlurryCard>
  );
};

export default SchoolLogo;
