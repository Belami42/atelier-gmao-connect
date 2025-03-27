
import React from "react";
import { Link } from "react-router-dom";
import { 
  Clipboard, 
  Tool, 
  Clock, 
  User, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type MissionType = "preventive" | "corrective" | "improvement";
export type MissionStatus = 
  | "to_assign" 
  | "assigned" 
  | "in_progress" 
  | "to_validate" 
  | "completed" 
  | "cancelled";

export type MissionPriority = "low" | "normal" | "high";

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  equipmentId: string;
  equipmentName: string;
  status: MissionStatus;
  priority: MissionPriority;
  assignedTo?: string[];
  assignedToNames?: string[];
  plannedDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
}

const MissionCard = ({ mission, onClick }: MissionCardProps) => {
  const typeLabels: Record<MissionType, string> = {
    preventive: "Préventif",
    corrective: "Correctif",
    improvement: "Amélioratif"
  };

  const typeColors: Record<MissionType, string> = {
    preventive: "bg-blue-500",
    corrective: "bg-amber-500",
    improvement: "bg-violet-500"
  };

  const statusLabels: Record<MissionStatus, string> = {
    to_assign: "À assigner",
    assigned: "Assigné",
    in_progress: "En cours",
    to_validate: "À valider",
    completed: "Terminé",
    cancelled: "Annulé"
  };

  const statusColors: Record<MissionStatus, string> = {
    to_assign: "bg-gray-500",
    assigned: "bg-blue-500",
    in_progress: "bg-amber-500",
    to_validate: "bg-purple-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500"
  };

  const priorityLabels: Record<MissionPriority, string> = {
    low: "Basse",
    normal: "Normale",
    high: "Haute"
  };

  const priorityIcons: Record<MissionPriority, React.ReactNode> = {
    low: <Circle size={14} />,
    normal: <AlertCircle size={14} />,
    high: <AlertCircle size={14} className="text-red-500" />
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  };

  return (
    <BlurryCard
      className="h-full flex flex-col"
      onClick={onClick}
      hightlight={mission.status === "to_validate"}
    >
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          <Badge className={`${typeColors[mission.type]}`}>
            <Tool size={14} className="mr-1" />
            {typeLabels[mission.type]}
          </Badge>
          
          <Badge className={`${statusColors[mission.status]}`}>
            {statusLabels[mission.status]}
          </Badge>
        </div>
        
        <h3 className="mt-3 font-medium text-lg line-clamp-2">{mission.title}</h3>
        
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Tool size={14} className="mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{mission.equipmentName}</span>
          </div>
          
          {mission.plannedDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-2 flex-shrink-0" />
              <span>Prévu: {formatDate(mission.plannedDate)}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span>Créé: {formatDate(mission.createdAt)}</span>
          </div>
        </div>
        
        {mission.assignedToNames && mission.assignedToNames.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="flex items-center gap-2">
              <User size={14} className="text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {mission.assignedToNames.map((name, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
        
        <Separator className="my-3" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {priorityIcons[mission.priority]}
            <span className="text-sm">
              Priorité: <span className="font-medium">{priorityLabels[mission.priority]}</span>
            </span>
          </div>
          
          <Button size="sm" variant="ghost" className="gap-1" asChild>
            <Link to={`/missions/${mission.id}`}>
              <span>Détails</span>
              <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </BlurryCard>
  );
};

export default MissionCard;
