
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Info, Wrench, Calendar, QrCode, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import QRCodeGenerator from "./QRCodeGenerator";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type MaintenanceTask = {
  id: string;
  title: string;
  date: Date | string;
  type: "preventive" | "corrective" | "improvement";
  completed: boolean;
  description?: string; // Added description as optional
};

export type Equipment = {
  id: string;
  tag: string;
  name: string;
  location: string;
  image?: string;
  brand?: string;
  model?: string;
  status: "operational" | "maintenance" | "faulty";
  maintenanceSchedule?: MaintenanceTask[];
};

type EquipmentCardProps = {
  equipment: Equipment;
  onDelete?: (id: string) => void;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onDelete }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Get status badge
  const getStatusBadge = () => {
    switch (equipment.status) {
      case "operational":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Opérationnel
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            En maintenance
          </Badge>
        );
      case "faulty":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            En panne
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get next maintenance date
  const getNextMaintenance = () => {
    if (!equipment.maintenanceSchedule || equipment.maintenanceSchedule.length === 0) {
      return "Aucune maintenance planifiée";
    }

    const upcomingMaintenance = equipment.maintenanceSchedule
      .filter(task => !task.completed)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      })[0];

    if (!upcomingMaintenance) {
      return "Aucune maintenance à venir";
    }

    const maintenanceDate = new Date(upcomingMaintenance.date);
    const today = new Date();
    const diffDays = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "Maintenance en retard";
    } else if (diffDays === 0) {
      return "Maintenance aujourd'hui";
    } else if (diffDays === 1) {
      return "Maintenance demain";
    } else if (diffDays < 7) {
      return `Maintenance dans ${diffDays} jours`;
    } else {
      return `Prochaine maintenance: ${maintenanceDate.toLocaleDateString()}`;
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(equipment.id);
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">
                {equipment.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Info className="h-3 w-3" />
                {equipment.tag}
              </CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>

        {equipment.image && (
          <div className="px-4">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="object-cover w-full h-full brightness-90"
              />
            </AspectRatio>
          </div>
        )}

        <CardContent className="p-4 pt-3">
          <div className="text-sm">
            <div className="flex items-start gap-2 mb-1.5">
              <Wrench className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground">Marque / Modèle</p>
                <p>{equipment.brand || "N/A"} {equipment.model ? `/ ${equipment.model}` : ""}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground">Maintenance</p>
                <p>{getNextMaintenance()}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/equipment/${equipment.id}/maintenance`}>
              Maintenance
            </Link>
          </Button>

          <Popover open={showQRCode} onOpenChange={setShowQRCode}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="center">
              <QRCodeGenerator value={equipment.id} label={equipment.name} />
            </PopoverContent>
          </Popover>

          <div className="grow"></div>

          <Button variant="ghost" size="icon" onClick={handleDeleteClick} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet équipement ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'équipement sera définitivement supprimé du système.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EquipmentCard;
