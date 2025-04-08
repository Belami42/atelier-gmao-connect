import React from "react";
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mission } from "@/types/types";
import { ArrowLeft, CheckCircle, Clock, Flag, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";

const MissionDetails = () => {
  const router = useRouter();
  const { missionId } = router.query;

  // Mock mission data (replace with actual data fetching)
  const mission: Mission | undefined = {
    id: "1",
    title: "Maintenance corrective sur presse hydraulique",
    description: "Réparation de la fuite d'huile sur le vérin principal.",
    dueDate: new Date(),
    priority: "high",
    status: "in progress",
    assignedTo: "Technicien 1",
    estimatedDuration: 60, // in minutes
  };

  // Add a fallback for the estimatedDuration property
  const duration = mission?.estimatedDuration || 0;

  return (
    <div className="max-w-3xl mx-auto py-6 pt-24 pb-16">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{mission?.title}</CardTitle>
          <CardDescription>{mission?.description}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 opacity-70" />
            Priorité:{" "}
            <Badge variant="secondary">{mission?.priority}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 opacity-70" />
            Durée estimée: {duration} minutes
          </div>

          <div className="flex items-center gap-2">
            <User2 className="h-4 w-4 opacity-70" />
            Assigné à: {mission?.assignedTo}
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 opacity-70" />
            Statut: {mission?.status}
          </div>

          <div>
            <Separator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Date d'échéance
              </h3>
              <p className="font-semibold">
                {mission?.dueDate ? format(mission.dueDate, "PPP", { locale: fr }) : "Non définie"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Calendrier</h3>
              <Calendar
                mode="single"
                selected={mission?.dueDate}
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
