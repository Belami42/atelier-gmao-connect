
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, ClipboardList, Trash, Wrench, CheckCircle, AlertTriangle, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MaintenanceTask } from "@/components/equipment/EquipmentCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CompetencesList from "@/components/mspc/CompetencesList";
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

type TaskDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: MaintenanceTask;
  equipmentId?: string;
  equipmentName?: string;
  onUpdate?: (updates: Partial<MaintenanceTask>) => void;
  onDelete?: () => void;
  onCreateMission?: () => void;
};

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
  equipmentId = "",
  equipmentName = "Équipement",
  onUpdate = () => {},
  onDelete = () => {},
  onCreateMission = () => {}
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  
  // Déterminer le type de badge
  const getBadgeVariant = () => {
    switch (task.type) {
      case "preventive":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "corrective":
        return "bg-red-100 text-red-800 border-red-200";
      case "improvement":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Type de maintenance en français
  const getTypeLabel = () => {
    switch (task.type) {
      case "preventive":
        return "Préventive";
      case "corrective":
        return "Corrective";
      case "improvement":
        return "Améliorative";
      default:
        return "Inconnue";
    }
  };
  
  // Obtenir une icône selon le type
  const getTypeIcon = () => {
    switch (task.type) {
      case "preventive":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case "corrective":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "improvement":
        return <Wrench className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };

  // Afficher le badge de niveau
  const getNiveauBadge = () => {
    if (!task.niveau) return null;
    
    switch (task.niveau) {
      case "2nde":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            2nde PMIA
          </Badge>
        );
      case "1ère":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            1ère MSPC
          </Badge>
        );
      case "Terminale":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Terminale MSPC
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const taskDate = task.date instanceof Date ? task.date : new Date(task.date);
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Détails de la tâche</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className={`${getBadgeVariant()} flex items-center gap-1`}>
                  {getTypeIcon()}
                  {getTypeLabel()}
                </Badge>
                {getNiveauBadge()}
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Planifiée pour le {format(taskDate, "PPP", { locale: fr })}</span>
            </div>
            
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Wrench className="h-4 w-4" />
              <span>Équipement: {equipmentName}</span>
            </div>
            
            <Separator className="my-4" />
            
            {task.description && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            )}
            
            {task.competences && task.competences.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Compétences associées</h4>
                <div className="bg-slate-50 p-3 rounded-md">
                  <CompetencesList 
                    selectedCompetences={task.competences} 
                    readOnly={true}
                  />
                </div>
              </div>
            )}
            
            <div className="mt-6 flex items-center space-x-2">
              <Checkbox 
                id="completed" 
                checked={task.completed}
                onCheckedChange={(checked) => onUpdate({ completed: !!checked })}
              />
              <Label htmlFor="completed" className="cursor-pointer">
                Marquer comme terminée
              </Label>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)} className="gap-2">
              <Trash className="h-4 w-4" />
              Supprimer
            </Button>
            <div className="flex-1"></div>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={onCreateMission} className="gap-2">
              <ClipboardList className="h-4 w-4" />
              Créer un ordre de mission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette tâche de maintenance ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete();
                setIsDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskDetailsModal;
