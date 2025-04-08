
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Flag, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mission } from "@/components/mission/MissionCard";

const MissionDetails = () => {
  const navigate = useNavigate();
  const { id: missionId } = useParams();

  // Mock mission data (replace with actual data fetching)
  const mission: Mission = {
    id: "1",
    title: "Maintenance corrective sur presse hydraulique",
    description: "Réparation de la fuite d'huile sur le vérin principal.",
    type: "corrective",
    status: "in_progress",
    priority: "high",
    assignedTo: ["tech1"],
    assignedToNames: ["Technicien 1"],
    equipmentId: "equip1",
    equipmentName: "Presse hydraulique",
    plannedDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // For backward compatibility with the existing template
  const dueDate = mission.plannedDate ? new Date(mission.plannedDate) : undefined;
  
  return (
    <div className="max-w-3xl mx-auto py-6 pt-24 pb-16">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{mission.title}</CardTitle>
          <CardDescription>{mission.description}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 opacity-70" />
            Priorité:{" "}
            <Badge variant="secondary">{mission.priority}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 opacity-70" />
            Type de maintenance: {mission.type}
          </div>

          <div className="flex items-center gap-2">
            <User2 className="h-4 w-4 opacity-70" />
            Assigné à: {mission.assignedToNames?.join(", ")}
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 opacity-70" />
            Statut: {mission.status}
          </div>

          <div>
            <Separator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Date prévue
              </h3>
              <p className="font-semibold">
                {dueDate ? format(dueDate, "PPP", { locale: fr }) : "Non définie"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Calendrier</h3>
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={() => {}}
                locale={fr}
                className="rounded-md border"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionDetails;
