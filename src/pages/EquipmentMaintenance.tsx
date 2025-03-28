
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Wrench, 
  ArrowLeft, 
  CheckCircle,
  Trash2, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MaintenanceTask } from "@/components/equipment/EquipmentCard";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// Schema validation for the maintenance form
const maintenanceSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  type: z.enum(["preventive", "corrective", "improvement"], {
    required_error: "Veuillez sélectionner un type de maintenance",
  }),
});

type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;

const EquipmentMaintenance = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  const [isNewMaintenanceOpen, setIsNewMaintenanceOpen] = useState(false);
  
  const { 
    equipmentData, 
    addMaintenanceTask, 
    deleteMaintenanceTask, 
    updateMaintenanceTask 
  } = useEquipmentData();
  
  // Find the equipment by ID
  const equipment = equipmentData.find(eq => eq.id === equipmentId);
  
  // If equipment not found, redirect to equipment list
  if (!equipment) {
    navigate("/equipment");
    return null;
  }
  
  // Initialize the form
  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      title: "",
      type: "preventive",
    },
  });
  
  // Function to handle form submission
  const onSubmit = (values: MaintenanceFormValues) => {
    const newTask: MaintenanceTask = {
      id: `maint-${equipment.id}-${Date.now()}`,
      title: values.title,
      date: values.date,
      type: values.type,
      completed: false,
    };
    
    addMaintenanceTask(equipment.id, newTask);
    setIsNewMaintenanceOpen(false);
    form.reset();
  };
  
  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string, currentStatus: boolean) => {
    updateMaintenanceTask(equipment.id, taskId, { completed: !currentStatus });
  };
  
  // Function to handle task deletion
  const handleDeleteTask = (taskId: string) => {
    deleteMaintenanceTask(equipment.id, taskId);
  };
  
  // Function to create a new mission from a maintenance task
  const createMissionFromTask = (task: MaintenanceTask) => {
    navigate(`/missions/new?equipment=${equipment.id}&taskId=${task.id}&title=${encodeURIComponent(task.title)}&type=${task.type}`);
  };
  
  // Group maintenance tasks by month and year
  const maintenanceByMonth = React.useMemo(() => {
    const tasks = equipment.maintenanceSchedule || [];
    return tasks.reduce((groups, task) => {
      const date = new Date(task.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!groups[key]) {
        groups[key] = {
          month: format(date, 'MMMM yyyy', { locale: fr }),
          tasks: []
        };
      }
      
      groups[key].tasks.push(task);
      return groups;
    }, {} as Record<string, { month: string; tasks: MaintenanceTask[] }>);
  }, [equipment.maintenanceSchedule]);
  
  // Sort and prepare months for display
  const sortedMonths = React.useMemo(() => {
    return Object.entries(maintenanceByMonth)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([_, value]) => value);
  }, [maintenanceByMonth]);
  
  const taskTypeColors = {
    preventive: "bg-blue-500",
    corrective: "bg-amber-500",
    improvement: "bg-purple-500"
  };
  
  const taskTypeLabels = {
    preventive: "Préventive",
    corrective: "Corrective",
    improvement: "Amélioration"
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/equipment">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{equipment.name}</h1>
          <p className="text-muted-foreground">
            Calendrier de maintenance - {equipment.tag}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Informations sur l'équipement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Localisation</h3>
              <p className="text-muted-foreground">{equipment.location}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Modèle</h3>
              <p className="text-muted-foreground">
                {equipment.brand} {equipment.model}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">État actuel</h3>
              <Badge className={
                equipment.status === "operational" ? "bg-green-500" :
                equipment.status === "maintenance" ? "bg-amber-500" :
                "bg-red-500"
              }>
                {equipment.status === "operational" ? "Opérationnel" :
                 equipment.status === "maintenance" ? "En maintenance" :
                 "En panne"}
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to={`/equipment/${equipment.id}`}>
                <FileText size={16} />
                Voir tous les détails
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              Calendrier de maintenance
            </h2>
            
            <Dialog open={isNewMaintenanceOpen} onOpenChange={setIsNewMaintenanceOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  Nouvelle maintenance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Planifier une maintenance</DialogTitle>
                  <DialogDescription>
                    Programmez une tâche de maintenance pour cet équipement.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input placeholder="Titre de la maintenance" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de maintenance</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="preventive">Préventive</SelectItem>
                              <SelectItem value="corrective">Corrective</SelectItem>
                              <SelectItem value="improvement">Amélioration</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date prévue</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: fr })
                                  ) : (
                                    <span>Sélectionner une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          {sortedMonths.length === 0 ? (
            <div className="text-center py-16 border rounded-lg bg-muted/20">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">Aucune maintenance planifiée</h3>
              <p className="text-muted-foreground mb-6">
                Créez votre première tâche de maintenance pour cet équipement.
              </p>
              <Button onClick={() => setIsNewMaintenanceOpen(true)}>
                Planifier une maintenance
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedMonths.map((monthData, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium capitalize mb-3">
                    {monthData.month}
                  </h3>
                  
                  <div className="space-y-3">
                    {monthData.tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-md bg-background">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={task.completed ? "text-green-500" : "text-muted-foreground"}
                            onClick={() => toggleTaskCompletion(task.id, task.completed)}
                          >
                            <CheckCircle className={task.completed ? "fill-green-500" : ""} />
                          </Button>
                          
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {task.title}
                              <Badge className={taskTypeColors[task.type]}>
                                {taskTypeLabels[task.type]}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(task.date), 'dd MMMM yyyy', { locale: fr })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="gap-1"
                            onClick={() => createMissionFromTask(task)}
                          >
                            <Wrench size={14} />
                            <span className="hidden sm:inline">Créer OM</span>
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 size={14} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer cette tâche</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer cette tâche de maintenance ?
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentMaintenance;
