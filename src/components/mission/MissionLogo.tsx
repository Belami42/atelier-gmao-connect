
import React from "react";
import BlurryCard from "@/components/ui/BlurryCard";

interface MissionLogoProps {
  className?: string;
}

const MissionLogo: React.FC<MissionLogoProps> = ({ className }) => {
  return (
    <BlurryCard className={`p-4 ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src="/lovable-uploads/4a126662-bd80-4409-bc7e-51241cd339c9.png" 
          alt="Logo du Lycée Étienne Mimard"
          className="h-16 md:h-20 object-contain" 
        />
        <h3 className="text-lg font-medium text-center">Lycée Étienne Mimard</h3>
        <p className="text-sm text-muted-foreground text-center">
          Lycée général technologique et professionnel
        </p>
      </div>
    </BlurryCard>
  );
};

export default MissionLogo;
