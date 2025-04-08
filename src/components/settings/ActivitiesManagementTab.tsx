
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { NiveauFormation } from "@/types/mspc";
import { Plus, Edit, Trash, CalendarPlus } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  class: NiveauFormation;
  duration: string;
  dateCreation: string;
}

const ActivitiesManagementTab = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Maintenance préventive sur tour CNC",
      description: "Réaliser une maintenance préventive sur un tour CNC",
      class: NiveauFormation.SECONDE,
      duration: "4h",
      dateCreation: "2023-09-15",
    },
    {
      id: "2",
      title: "Diagnostic d'une panne électrique",
      description: "Diagnostiquer et réparer une panne sur un système électrique",
      class: NiveauFormation.PREMIERE,
      duration: "3h",
      dateCreation: "2023-10-22",
    },
    {
      id: "3",
      title: "Installation d'un nouvel équipement",
      description: "Installation et paramétrage d'un équipement de production",
      class: NiveauFormation.TERMINALE,
      duration: "6h",
      dateCreation: "2023-11-05",
    },
  ]);

  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isEditingActivity, setIsEditingActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityClass, setActivityClass] = useState<NiveauFormation>(NiveauFormation.SECONDE);
  const [duration, setDuration] = useState("");

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      description,
      class: activityClass,
      duration,
      dateCreation: new Date().toISOString().split("T")[0],
    };

    setActivities([...activities, newActivity]);
    resetForm();
    setIsAddingActivity(false);
    toast.success("Activité ajoutée avec succès");
  };

  const handleEditActivity = () => {
    if (!selectedActivity) return;

    const updatedActivities = activities.map((activity) => {
      if (activity.id === selectedActivity.id) {
        return {
          ...activity,
          title,
          description,
          class: activityClass,
          duration,
        };
      }
      return activity;
    });

    setActivities(updatedActivities);
    resetForm();
    setIsEditingActivity(false);
    toast.success("Activité modifiée avec succès");
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(activities.filter((activity) => activity.id !== activityId));
    toast.success("Activité supprimée avec succès");
  };

  const handleEditClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setTitle(activity.title);
    setDescription(activity.description);
    setActivityClass(activity.class);
    setDuration(activity.duration);
    setIsEditingActivity(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setActivityClass(NiveauFormation.SECONDE);
    setDuration("");
    setSelectedActivity(null);
  };

  const classCountMap = activities.reduce((acc, activity) => {
    const classKey = activity.class;
    acc[classKey] = (acc[classKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des activités pédagogiques</CardTitle>
          <CardDescription>
            Créez et gérez les activités pour les trois années de formation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-md text-center">
              <h4 className="font-bold">2nde PMIA</h4>
              <p className="text-3xl font-bold">{classCountMap[NiveauFormation.SECONDE] || 0}</p>
              <p className="text-sm text-muted-foreground">activités</p>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="font-bold">1ère MSPC</h4>
              <p className="text-3xl font-bold">{classCountMap[NiveauFormation.PREMIERE] || 0}</p>
              <p className="text-sm text-muted-foreground">activités</p>
            </div>
            <div className="p-4 border rounded-md text-center">
              <h4 className="font-bold">Terminale MSPC</h4>
              <p className="text-3xl font-bold">{classCountMap[NiveauFormation.TERMINALE] || 0}</p>
              <p className="text-sm text-muted-foreground">activités</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Liste des activités</h3>
            <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Ajouter une activité
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une activité</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle activité pédagogique
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Titre</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">Classe</Label>
                    <Select
                      value={activityClass}
                      onValueChange={(value) => setActivityClass(value as NiveauFormation)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                        <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                        <SelectItem value={NiveauFormation.TERMINALE}>Terminale MSPC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Durée</Label>
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="col-span-3"
                      placeholder="ex: 4h"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingActivity(false)}>Annuler</Button>
                  <Button onClick={handleAddActivity}>Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.title}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{activity.class}</TableCell>
                  <TableCell>{activity.duration}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(activity)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              {activities.length === 0 
                ? "Aucune activité n'a été créée." 
                : `Total: ${activities.length} activités sur 60 recommandées`}
            </TableCaption>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Activity Dialog */}
      <Dialog open={isEditingActivity} onOpenChange={setIsEditingActivity}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'activité</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'activité
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">Titre</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Input
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-class" className="text-right">Classe</Label>
              <Select
                value={activityClass}
                onValueChange={(value) => setActivityClass(value as NiveauFormation)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                  <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                  <SelectItem value={NiveauFormation.TERMINALE}>Terminale MSPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">Durée</Label>
              <Input
                id="edit-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingActivity(false)}>Annuler</Button>
            <Button onClick={handleEditActivity}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivitiesManagementTab;
