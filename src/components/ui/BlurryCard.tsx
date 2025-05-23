
import React from "react";
import { cn } from "@/lib/utils";

interface BlurryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  hightlight?: boolean;
}

const BlurryCard = ({ 
  children, 
  className, 
  hoverEffect = true,
  hightlight = false,
  ...props 
}: BlurryCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl overflow-hidden smooth-transition relative bg-card/90 shadow-lg border border-accent/10",
        hoverEffect && "hover:shadow-xl hover:translate-y-[-2px]",
        hightlight && "ring-2 ring-primary/50",
        className
      )}
      {...props}
    >
      {hightlight && (
        <div className="absolute inset-0 bg-indigo-500/20 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BlurryCard;
