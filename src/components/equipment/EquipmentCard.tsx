import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, MapPin, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface Equipment {
  id: string;
  tag: string;
  name: string;
  location: string;
  image: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  status: "operational" | "maintenance" | "faulty";
  lastMaintenance?: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
  onClick?: () => void;
}

const EquipmentCard = ({ equipment, onClick }: EquipmentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const statusColors = {
    operational: "bg-green-500",
    maintenance: "bg-amber-500",
    faulty: "bg-red-500"
  };

  const statusLabels = {
    operational: "Opérationnel",
    maintenance: "En maintenance",
    faulty: "En panne"
  };

  const statusIcons = {
    operational: <CheckCircle size={14} />,
    maintenance: <Wrench size={14} />,
    faulty: <AlertTriangle size={14} />
  };

  return (
    <BlurryCard 
      className="h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-muted/50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        <img
          src={equipment.image || "https://images.unsplash.com/photo-1581093458791-9f3c3e4f7b41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"}
          alt={equipment.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-black/30 backdrop-blur-md text-white border-white/20">
            {equipment.tag}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={`${statusColors[equipment.status]} flex items-center gap-1`}>
            {statusIcons[equipment.status]}
            {statusLabels[equipment.status]}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-medium text-lg line-clamp-1">{equipment.name}</h3>
        
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <MapPin size={14} className="mr-1" />
          <span>{equipment.location}</span>
        </div>
        
        {(equipment.brand || equipment.model) && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-1">
            {equipment.brand && equipment.model 
              ? `${equipment.brand} • ${equipment.model}`
              : equipment.brand || equipment.model}
          </p>
        )}
        
        <div className="mt-auto pt-4 flex justify-between items-center">
          <Button size="sm" variant="ghost" className="gap-2" asChild>
            <Link to={`/equipment/${equipment.id}`}>
              <FileText size={14} />
              <span>Détails</span>
            </Link>
          </Button>
          
          <Button size="sm" variant="outline" className="gap-2" asChild>
            <Link to={`/missions/new?equipment=${equipment.id}`}>
              <Wrench size={14} />
              <span>Créer OM</span>
            </Link>
          </Button>
        </div>
      </div>
    </BlurryCard>
  );
};

export default EquipmentCard;
