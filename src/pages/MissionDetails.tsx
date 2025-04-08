import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Wrench, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  BarChart2,
  FileText,
  Upload,
  GraduationCap,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { getMissionById, updateMission } from "@/services/missionService";
import { Mission, MissionStatus } from "@/components/mission/MissionCard";
import { toast } from "sonner";

const MissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [status, setStatus] = useState<MissionStatus>("to_assign");
  
  // Define maintenanceImages to avoid similar errors
  const maintenanceImages = [
    "/lovable-uploads/89799078-f0a6-43dc-a2f0-bcd0e8907332.png",
    "/lovable-uploads/552dcec9-49b8-4640-99f8-c6989b60b59a.png",
    "/lovable-uploads/61cdf18f-b447-4984-b172-082bc046ad1f.png",
  ];

  // Sample comments
  const comments = [
    {
      id: "1",
      user: "Thomas D.",
      date: "2023-11-16T08:30:00",
      content: "J'ai vérifié le capteur, il est effectivement défectueux. Il faudra commander la référence XYZ-123."
    },
    {
      id: "2",
      user: "Julie M.",
      date: "2023-11-16T10:15:00",
      content: "La pièce a été commandée, livraison prévue demain."
    }
  ];

  // Sample tasks
  const tasks = [
    {
      id: "1",
      title: "Diagnostic du capteur",
      description: "Vérifier le câblage et la connexion du capteur",
      status: "completed",
      assignedTo: "Thomas D."
    },
    {
      id: "2",
      title: "Commander le capteur de remplacement",
      description: "Commander la référence XYZ-123",
      status: "completed",
      assignedTo: "Julie M."
    },
    {
      id: "3",
      title: "Remplacer le capteur",
      description: "Installer le nouveau capteur",
      status: "in_progress",
      assignedTo: "Thomas D."
    },
    {
      id: "4",
      title: "Calibrer la position",
      description: "Ajuster la position du capteur et tester",
      status: "to_do",
      assignedTo: "Julie M."
    }
  ];

  // Sample skills
  const skills = [
    {
      id: "1",
      code: "MS1",
      name: "Analyser un système",
      validated: true
    },
    {
      id: "2",
      code: "MS2",
      name: "Préparer une intervention",
      validated: true
    },
    {
      id: "3",
      code: "MS3",
      name: "Mettre en œuvre une intervention",
      validated: false
    }
  ];

  const typeLabels: Record<string, string> = {
    preventive: "Préventif",
    corrective: "Correctif",
    improvement: "Amélioratif"
  };

  const typeColors: Record<string, string> = {
    preventive: "bg-[#0EA5E9] text-white",
    corrective: "bg-[#F97316] text-white",
    improvement: "bg-[#8B5CF6] text-white"
  };

  const statusLabels: Record<string, string> = {
    to_assign: "À assigner",
    assigned: "Assigné",
    in_progress: "En cours",
    to_validate: "À valider",
    completed: "Terminé",
    cancelled: "Annulé"
  };

  const statusColors: Record<string, string> = {
    to_assign: "bg-gray-500 text-white",
    assigned: "bg-[#0EA5E9] text-white",
    in_progress: "bg-[#F97316] text-white",
    to_validate: "bg-[#D946EF] text-white",
    completed: "bg-[#10B981] text-white",
    cancelled: "bg-red-500 text-white"
  };

  const priorityLabels: Record<string, string> = {
    low: "Basse",
    normal: "Normale",
    high: "Haute"
  };

  const priorityIcons: Record<string, React.ReactNode> = {
    low: <AlertCircle size={14} />,
    normal: <AlertCircle size={14} />,
    high: <AlertCircle size={14} className="text-red-500" />
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Non définie";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleStatusChange = (newStatus: string) => {
    if (!mission) return;
    
    try {
      const updatedMission = updateMission({
        ...mission,
        status: newStatus as MissionStatus
      });
      
      setMission(updatedMission);
      setStatus(updatedMission.status);
      toast.success(`Statut mis à jour: ${statusLabels[newStatus as MissionStatus]}`);
    } catch (error) {
      console.error("Error updating mission status:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-2"></div>
          <div className="h-4 w-48 bg-muted rounded mb-8"></div>
          
          <div className="h-40 bg-muted rounded-xl mb-6"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
            <div>
              <div className="h-64 bg-muted rounded-lg mb-6"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!mission) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Mission introuvable</h2>
          <p className="text-muted-foreground mb-6">La mission que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button asChild>
            <Link to="/missions">Retour aux missions</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="pl-0 text-muted-foreground mb-2 -ml-3" 
            onClick={() => navigate("/missions")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux missions
          </Button>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            {mission.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            Ordre de mission #{mission.id} - {mission.equipmentName}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="to_assign">À assigner</SelectItem>
              <SelectItem value="assigned">Assigné</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="to_validate">À valider</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 vibrant-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4 px-4">
            {maintenanceImages.map((img, idx) => (
              <div key={idx} className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img 
                  src={img} 
                  alt={`Maintenance ${idx + 1}`}
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col items-center">
            <h2 className="text-white font-bold text-2xl shadow-text mb-2">Ordre de Mission</h2>
            <div className="flex gap-2">
              <Badge className={typeColors[mission.type]}>
                <Wrench size={14} className="mr-1" />
                {typeLabels[mission.type]}
              </Badge>
              <Badge className={statusColors[mission.status]}>
                {statusLabels[mission.status]}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="tasks">Tâches</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
              <TabsTrigger value="skills">Compétences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <BlurryCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Détails de la mission</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                    <p className="mt-1">{mission.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                      <Badge className={`mt-1 ${typeColors[mission.type]}`}>
                        {typeLabels[mission.type]}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Priorité</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {priorityIcons[mission.priority]}
                        <span>{priorityLabels[mission.priority]}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
                      <Badge className={`mt-1 ${statusColors[mission.status]}`}>
                        {statusLabels[mission.status]}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Équipement</h4>
                      <div className="mt-1">
                        <div className="font-medium">{mission.equipmentName}</div>
                        <Button variant="ghost" size="sm" className="pl-0 text-primary" asChild>
                          <Link to={`/equipment/${mission.equipmentId}`}>
                            Voir l'équipement
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Date planifiée</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={14} className="text-primary" />
                        <span>{mission.plannedDate ? formatDate(mission.plannedDate) : "Non planifiée"}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Durée estimée</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-primary" />
                        <span>{mission.estimatedDuration ? `${mission.estimatedDuration} minutes` : "Non estimée"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Créé le</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={14} className="text-primary" />
                        <span>{formatDate(mission.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Dernière mise à jour</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-primary" />
                        <span>{formatDate(mission.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurryCard>
              
              <BlurryCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Pièces jointes</h3>
                
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Glisser-déposer des fichiers ou cliquez pour parcourir
                  </p>
                  <Button variant="outline" className="mt-4">
                    Parcourir les fichiers
                  </Button>
                </div>
              </BlurryCard>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-6">
              <BlurryCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Liste des tâches</h3>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Ajouter une tâche
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          <Checkbox id={`task-${task.id}`} checked={task.status === "completed"} />
                          <div>
                            <Label 
                              htmlFor={`task-${task.id}`} 
                              className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.title}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          </div>
                        </div>
                        <Badge className={
                          task.status === "completed" ? "bg-green-500 text-white" : 
                          task.status === "in_progress" ? "bg-[#F97316] text-white" : 
                          "bg-gray-500 text-white"
                        }>
                          {task.status === "completed" ? "Terminé" : 
                           task.status === "in_progress" ? "En cours" : "À faire"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>Assigné à: {task.assignedTo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </BlurryCard>
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-6">
              <BlurryCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Commentaires</h3>
                
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(comment.user)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{comment.user}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(comment.date)}
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <Textarea placeholder="Ajouter un commentaire..." rows={3} />
                  <div className="flex justify-end">
                    <Button>
                      <MessageSquare size={16} className="mr-2" />
                      Commenter
                    </Button>
                  </div>
                </div>
              </BlurryCard>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-6">
              <BlurryCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Compétences associées</h3>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{skill.code}</Badge>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <Badge className={skill.validated ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                          {skill.validated ? "Validé" : "Non validé"}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Checkbox id={`validate-${skill.id}`} checked={skill.validated} />
                          <Label htmlFor={`validate-${skill.id}`}>Valider la compétence</Label>
                        </div>
                        
                        <Select defaultValue={skill.validated ? "validated" : "not_validated"}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_validated">Non validé</SelectItem>
                            <SelectItem value="validated">Validé</SelectItem>
                            <SelectItem value="in_progress">En cours d'acquisition</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </BlurryCard>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <BlurryCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Personnel assigné</h3>
            
            <div className="space-y-3">
              {mission.assignedToNames?.map((name, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground">
                        {index === 0 ? "Responsable" : "Assistant"}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <User size={16} />
                  </Button>
                </div>
              ))}
              
              {(!mission.assignedToNames || mission.assignedToNames.length === 0) && (
                <div className="text-center text-muted-foreground py-3">
                  Aucun personnel assigné
                </div>
              )}
              
              <Button variant="outline" className="w-full gap-2">
                <Plus size={16} />
                <span>Ajouter du personnel</span>
              </Button>
            </div>
          </BlurryCard>
          
          <BlurryCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Actions</h3>
            
            <div className="space-y-3">
              <Button className="w-full gap-2 justify-start" asChild>
                <Link to={`/equipment/${mission.equipmentId}`}>
                  <Wrench size={16} />
                  <span>Voir l'équipement</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <GraduationCap size={16} />
                <span>Voir les compétences</span>
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <FileText size={16} />
                <span>Générer un rapport</span>
              </Button>
              
              <Button variant="outline" className="w-full gap-2 justify-start">
                <BarChart2 size={16} />
                <span>Voir les statistiques</span>
              </Button>
            </div>
          </BlurryCard>
          
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-500">Zone de danger</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Les actions suivantes sont irréversibles.
              </p>
              <Button variant="destructive" className="w-full">Annuler la mission</Button>
            </CardContent>
          </Card>
          
          <div className="md:hidden">
            <SchoolLogo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;
