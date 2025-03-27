
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ClipboardList, 
  Save, 
  Wrench, 
  Calendar,
  Users,
  User,
  Lightbulb,
  Link as LinkIcon,
  FileText,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

// Schéma de validation pour le formulaire de mission
const missionSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  type: z.enum(["preventive", "corrective", "improvement"]),
  priority: z.enum(["low", "normal", "high"]),
  equipmentId: z.string().min(1, "Veuillez sélectionner un équipement"),
  plannedDate: z.date().optional(),
  resources: z.array(z.string()).optional(),
  assignedUsers: z.array(z.string()).min(1, "Assignez au moins un élève"),
  skills: z.array(z.string()).min(1, "Sélectionnez au moins une compétence")
});

type MissionForm = z.infer<typeof missionSchema>;

const NewMission = () => {
  const navigate = useNavigate();
  const [resourcesUpload, setResourcesUpload] = useState<string[]>([]);
  const [datePlanned, setDatePlanned] = useState<boolean>(false);
  
  // Données de démo
  const equipments = [
    { id: "robot1", name: "Robot FANUC LR Mate 200iD" },
    { id: "line1", name: "Ligne d'embouteillage Festo" },
    { id: "cnc1", name: "Machine CNC Haas" },
    { id: "pump1", name: "Système hydraulique" },
    { id: "conveyor1", name: "Convoyeur à bande" }
  ];
  
  const students = [
    { id: "student1", name: "Alexandre Martin", group: "TMSPC" },
    { id: "student2", name: "Sophie Dubois", group: "TMSPC" },
    { id: "student3", name: "Lucas Bernard", group: "1MSPC" },
    { id: "student4", name: "Emma Petit", group: "1MSPC" },
    { id: "student5", name: "Hugo Lefebvre", group: "2PMIA" },
    { id: "student6", name: "Camille Leroy", group: "2PMIA" },
  ];
  
  const skills = [
    { id: "skill1", code: "MSP1.1", name: "Préparer son intervention" },
    { id: "skill2", code: "MSP1.2", name: "Identifier les risques professionnels" },
    { id: "skill3", code: "MSP1.3", name: "Gérer les déchets" },
    { id: "skill4", code: "MSP2.1", name: "Diagnostiquer les pannes" },
    { id: "skill5", code: "MSP2.2", name: "Dépanner par échange standard" },
    { id: "skill6", code: "MSP3.1", name: "Réaliser les opérations de surveillance" },
    { id: "skill7", code: "MSP3.2", name: "Réaliser des opérations de maintenance préventive" },
    { id: "skill8", code: "MSP3.3", name: "Réaliser des travaux d'amélioration" },
  ];
  
  // Filtrage par groupe d'élèves
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const filteredStudents = selectedGroup === "all" 
    ? students 
    : students.filter(student => student.group === selectedGroup);
  
  // Groupes d'élèves uniques
  const studentGroups = Array.from(new Set(students.map(student => student.group)));
  
  // Initialiser le formulaire avec React Hook Form
  const form = useForm<MissionForm>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "preventive",
      priority: "normal",
      equipmentId: "",
      assignedUsers: [],
      skills: []
    },
  });
  
  // Gérer le téléchargement de ressources
  const handleResourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newResources = Array.from(files).map(file => file.name);
      setResourcesUpload(prev => [...prev, ...newResources]);
      toast.success(`${files.length} ressource(s) ajoutée(s)`);
    }
  };
  
  // Supprimer une ressource
  const removeResource = (index: number) => {
    setResourcesUpload(prev => prev.filter((_, i) => i !== index));
  };
  
  // Soumettre le formulaire
  const onSubmit = (data: MissionForm) => {
    // Ajouter les ressources téléchargées
    const completeData = {
      ...data,
      resources: resourcesUpload
    };
    
    // Dans une application réelle, vous enverriez ces données à une API
    console.log("Données de mission soumises:", completeData);
    
    // Simuler la création réussie
    toast.success("Ordre de mission créé avec succès");
    
    // Rediriger vers la liste des missions
    setTimeout(() => {
      navigate("/missions");
    }, 1500);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="h-8 w-8" />
            Nouvel ordre de mission
          </h1>
          <p className="text-muted-foreground mt-1">
            Créez un nouvel ordre de mission et assignez-le aux élèves
          </p>
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informations générales</h2>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de la mission</FormLabel>
                    <FormControl>
                      <Input placeholder="Maintenance préventive robot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez les tâches à réaliser..." 
                        {...field} 
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de mission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="preventive">Préventive</SelectItem>
                          <SelectItem value="corrective">Corrective</SelectItem>
                          <SelectItem value="improvement">Améliorative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priorité</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Niveau de priorité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Basse</SelectItem>
                          <SelectItem value="normal">Normale</SelectItem>
                          <SelectItem value="high">Haute</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Wrench className="h-4 w-4" />
                        Équipement
                      </FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un équipement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {equipments.map(equipment => (
                            <SelectItem 
                              key={equipment.id} 
                              value={equipment.id}
                            >
                              {equipment.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox 
                  id="plannedDate" 
                  checked={datePlanned}
                  onCheckedChange={(checked) => {
                    setDatePlanned(!!checked);
                    if (!checked) {
                      form.setValue("plannedDate", undefined);
                    }
                  }}
                />
                <label 
                  htmlFor="plannedDate" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Planifier une date d'intervention
                </label>
              </div>
              
              {datePlanned && (
                <FormField
                  control={form.control}
                  name="plannedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date prévue</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={
                                !field.value ? "text-muted-foreground" : ""
                              }
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                "Sélectionner une date"
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assignation des élèves
              </h2>
              
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <Label className="text-sm mb-1 md:pt-2 md:mr-2">Filtrer par classe:</Label>
                <Select 
                  value={selectedGroup} 
                  onValueChange={setSelectedGroup}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    {studentGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <FormField
                control={form.control}
                name="assignedUsers"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {filteredStudents.map((student) => (
                        <FormField
                          key={student.id}
                          control={form.control}
                          name="assignedUsers"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={student.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(student.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, student.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== student.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-medium flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {student.name}
                                  </FormLabel>
                                  <p className="text-xs text-muted-foreground">
                                    Classe {student.group}
                                  </p>
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Compétences à évaluer
              </h2>
              
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 gap-2">
                      {skills.map((skill) => (
                        <FormField
                          key={skill.id}
                          control={form.control}
                          name="skills"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={skill.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(skill.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, skill.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== skill.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-medium">
                                    {skill.code} - {skill.name}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ressources documentaires
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    id="resources"
                    type="file"
                    multiple
                    onChange={handleResourceUpload}
                    className="hidden"
                  />
                  <label htmlFor="resources" className="cursor-pointer text-center">
                    <div className="py-4 flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="font-medium">Cliquez pour ajouter des ressources</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC, XLS, JPG, PNG (max 10MB par fichier)
                      </p>
                    </div>
                  </label>
                </div>
                
                {resourcesUpload.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Ressources ajoutées:</h3>
                    <ul className="border rounded-md divide-y">
                      {resourcesUpload.map((resource, index) => (
                        <li key={index} className="flex items-center justify-between p-2">
                          <span className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {resource}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeResource(index)}
                            className="h-7 w-7 p-0"
                          >
                            <span className="sr-only">Supprimer</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate("/missions")}
              >
                Annuler
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Créer l'ordre de mission
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewMission;
