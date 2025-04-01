
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart2,
  Wrench,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MaintenanceTaskModal from "@/components/maintenance/MaintenanceTaskModal";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";

const EquipmentMaintenance = () => {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  // Sample data - in a real app, this would come from an API
  const equipment = {
    id: equipmentId,
    name: "Robot FANUC LR Mate 200iD",
    image: "/maintenance-1.jpg",
    category: "robot",
    location: "Atelier 1",
    status: "operational",
    nextMaintenance: "2023-12-15",
    lastMaintenance: "2023-09-15"
  };

  const maintenanceTasks = [
    {
      id: "1",
      title: "Vérification articulations",
      description: "Contrôle et graissage des articulations du robot",
      date: "2023-09-15",
      duration: 45, // minutes
      type: "preventive",
      status: "completed",
      assignedTo: ["Thomas D."]
    },
    {
      id: "2",
      title: "Remplacement capteur",
      description: "Remplacement du capteur de proximité défectueux",
      date: "2023-08-10",
      duration: 60, // minutes
      type: "corrective",
      status: "completed",
      assignedTo: ["Julie M."]
    },
    {
      id: "3",
      title: "Maintenance trimestrielle",
      description: "Contrôle complet et maintenance préventive trimestrielle",
      date: "2023-12-15", // future
      duration: 120, // minutes
      type: "preventive",
      status: "scheduled",
      assignedTo: ["Alex B."]
    }
  ];

  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

  // Stats for the equipment
  const stats = [
    {
      title: "Temps moyen entre pannes",
      value: "45 jours",
      icon: <Clock className="h-8 w-8 text-primary" />
    },
    {
      title: "Taux de disponibilité",
      value: "94%",
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />
    },
    {
      title: "Interventions totales",
      value: "12",
      icon: <Wrench className="h-8 w-8 text-secondary" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="pl-0 text-muted-foreground mb-2 -ml-3" 
            onClick={() => navigate("/equipment")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux équipements
          </Button>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            {equipment.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Historique et planification de maintenance
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Button className="gap-2 bg-accent hover:bg-accent/90" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} />
            <span>Nouvelle tâche</span>
          </Button>
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
          <h2 className="text-white font-bold text-2xl shadow-text">Maintenance du {equipment.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <BlurryCard className="lg:col-span-2 overflow-hidden">
          <div className="relative h-48 md:h-64">
            <img 
              src={equipment.image} 
              alt={equipment.name}
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{equipment.name}</h3>
                <Badge className="bg-green-500 text-white">
                  {equipment.status === "operational" ? "Opérationnel" : 
                   equipment.status === "maintenance_required" ? "Maintenance requise" : "Hors service"}
                </Badge>
              </div>
              <p className="text-white/80 text-sm">Emplacement: {equipment.location}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Prochaine maintenance</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {new Date(equipment.nextMaintenance).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Dernière maintenance</h3>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>
                    {new Date(equipment.lastMaintenance).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">État actuel</h3>
                <div className="flex items-center gap-2 mt-2">
                  {equipment.status === "operational" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : equipment.status === "maintenance_required" ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  <span>
                    {equipment.status === "operational" ? "Opérationnel" : 
                     equipment.status === "maintenance_required" ? "Maintenance requise" : "Hors service"}
                  </span>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div>{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurryCard>
        
        <BlurryCard className="p-6">
          <h3 className="text-lg font-medium mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start gap-2" onClick={() => setIsTaskModalOpen(true)}>
              <Plus size={16} />
              <span>Nouvelle tâche</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link to="/maintenance-calendar">
                <Calendar size={16} />
                <span>Voir le calendrier</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start gap-2">
              <BarChart2 size={16} />
              <span>Analyse de fiabilité</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link to="/missions/new">
                <Wrench size={16} />
                <span>Créer un ordre de mission</span>
              </Link>
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-lg font-medium mb-4">Personnel compétent</h3>
          <div className="space-y-2">
            {["Thomas D.", "Julie M.", "Alex B."].map((name, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <span>{name}</span>
                </div>
                <Badge variant="outline">Expert</Badge>
              </div>
            ))}
          </div>
        </BlurryCard>
      </div>

      <BlurryCard className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Historique de maintenance</h3>
          <Tabs defaultValue="all" className="w-fit">
            <TabsList>
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="preventive">Préventif</TabsTrigger>
              <TabsTrigger value="corrective">Correctif</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          {maintenanceTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge className={
                      task.type === "preventive" ? "bg-[#0EA5E9] text-white" : 
                      task.type === "corrective" ? "bg-[#F97316] text-white" : 
                      "bg-[#8B5CF6] text-white"
                    }>
                      {task.type === "preventive" ? "Préventif" : 
                       task.type === "corrective" ? "Correctif" : "Amélioratif"}
                    </Badge>
                    <Badge className={
                      task.status === "completed" ? "bg-green-500 text-white" : 
                      "bg-primary text-white"
                    }>
                      {task.status === "completed" ? "Terminé" : "Planifié"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                
                <div className="flex flex-col items-end justify-center min-w-24">
                  <div className="text-sm">
                    {new Date(task.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {task.duration} minutes
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <User size={14} className="text-muted-foreground" />
                    <span>{task.assignedTo.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BlurryCard>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
      
      <MaintenanceTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        equipmentId={equipmentId}
        equipmentName={equipment.name}
      />
    </div>
  );
};

export default EquipmentMaintenance;
