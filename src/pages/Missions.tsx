
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  X,
  CheckCircle2,
  AlertCircle,
  Tool,
  Calendar,
  LayoutList,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import MissionCard, { Mission, MissionStatus, MissionType } from "@/components/mission/MissionCard";

const Missions = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MissionType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<MissionStatus | null>(
    statusParam as MissionStatus | null
  );
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Données de démo
  const missions: Mission[] = [
    {
      id: "1",
      type: "corrective",
      title: "Remplacement capteur proximité",
      description: "Le capteur de proximité en entrée de la ligne d'embouteillage ne répond plus.",
      equipmentId: "line1",
      equipmentName: "Ligne d'embouteillage Festo",
      status: "to_validate",
      priority: "high",
      assignedToNames: ["Thomas D.", "Julie M."],
      createdAt: "2023-11-15T10:23:00",
      updatedAt: "2023-11-16T14:30:00"
    },
    {
      id: "2",
      type: "preventive",
      title: "Maintenance mensuelle robot",
      description: "Contrôle visuel, nettoyage et graissage des articulations du robot.",
      equipmentId: "robot1",
      equipmentName: "Robot FANUC LR Mate 200iD",
      status: "in_progress",
      priority: "normal",
      assignedToNames: ["Alex B."],
      plannedDate: "2023-11-22T09:00:00",
      createdAt: "2023-11-10T08:15:00",
      updatedAt: "2023-11-15T16:45:00"
    },
    {
      id: "3",
      type: "improvement",
      title: "Installation capteur supplémentaire",
      description: "Ajouter un capteur de température sur le moteur principal pour améliorer le suivi.",
      equipmentId: "cnc1",
      equipmentName: "Machine CNC Haas",
      status: "assigned",
      priority: "low",
      assignedToNames: ["Marc L."],
      plannedDate: "2023-11-28T13:00:00",
      createdAt: "2023-11-14T11:20:00",
      updatedAt: "2023-11-14T16:30:00"
    },
    {
      id: "4",
      type: "preventive",
      title: "Vérification niveaux hydrauliques",
      description: "Contrôle des niveaux d'huile et de pression du système hydraulique.",
      equipmentId: "pump1",
      equipmentName: "Système hydraulique",
      status: "completed",
      priority: "normal",
      assignedToNames: ["Julie M."],
      plannedDate: "2023-11-12T10:00:00",
      createdAt: "2023-11-05T09:30:00",
      updatedAt: "2023-11-12T11:45:00"
    },
    {
      id: "5",
      type: "corrective",
      title: "Réparation convoyeur",
      description: "La bande du convoyeur présente des déchirures sur le bord droit.",
      equipmentId: "conveyor1",
      equipmentName: "Convoyeur à bande",
      status: "to_assign",
      priority: "high",
      createdAt: "2023-11-17T08:10:00",
      updatedAt: "2023-11-17T08:10:00"
    },
    {
      id: "6",
      type: "improvement",
      title: "Mise à jour programme automate",
      description: "Mise à jour du programme pour ajouter une séquence de nettoyage automatique.",
      equipmentId: "plc1",
      equipmentName: "Automate Siemens S7",
      status: "to_validate",
      priority: "normal",
      assignedToNames: ["Thomas D."],
      createdAt: "2023-11-08T14:25:00",
      updatedAt: "2023-11-16T17:20:00"
    }
  ];
  
  // Filtrage des missions
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mission.equipmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || mission.type === selectedType;
    
    const matchesStatus = !selectedStatus || mission.status === selectedStatus;
    
    const matchesPriority = !selectedPriority || mission.priority === selectedPriority;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });
  
  // Organiser les missions par statut pour l'affichage par onglets
  const missionsByStatus: Record<MissionStatus, Mission[]> = {
    to_assign: [],
    assigned: [],
    in_progress: [],
    to_validate: [],
    completed: [],
    cancelled: []
  };
  
  filteredMissions.forEach(mission => {
    missionsByStatus[mission.status].push(mission);
  });
  
  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedType(null);
    setSelectedStatus(null);
    setSelectedPriority(null);
  };
  
  // Vérifier si des filtres sont appliqués
  const hasActiveFilters = selectedType || selectedStatus || selectedPriority;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ordres de mission</h1>
          <p className="text-muted-foreground mt-1">
            Gestion des activités de maintenance
          </p>
        </div>
        
        <Button className="gap-2" asChild>
          <Link to="/missions/new">
            <Plus size={16} />
            <span>Nouvel OM</span>
          </Link>
        </Button>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-4 mb-6 smooth-transition shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un ordre de mission..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            {/* Vue liste/calendrier */}
            <div className="hidden md:flex border rounded-md p-1">
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm" 
                className="gap-1"
                onClick={() => setViewMode("list")}
              >
                <LayoutList size={16} />
                <span className="sr-only md:not-sr-only">Liste</span>
              </Button>
              <Button 
                variant={viewMode === "calendar" ? "default" : "ghost"} 
                size="sm" 
                className="gap-1"
                onClick={() => setViewMode("calendar")}
              >
                <Calendar size={16} />
                <span className="sr-only md:not-sr-only">Calendrier</span>
              </Button>
            </div>
            
            {/* Filtres sur desktop */}
            <div className="hidden md:flex gap-2">
              <Select value={selectedType || ""} onValueChange={(value) => setSelectedType(value as MissionType || null)}>
                <SelectTrigger className="w-40 gap-2">
                  <ClipboardList size={14} />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="preventive">Préventif</SelectItem>
                  <SelectItem value="corrective">Correctif</SelectItem>
                  <SelectItem value="improvement">Amélioratif</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value as MissionStatus || null)}>
                <SelectTrigger className="w-40 gap-2">
                  <CheckCircle2 size={14} />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="to_assign">À assigner</SelectItem>
                  <SelectItem value="assigned">Assigné</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="to_validate">À valider</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority || ""} onValueChange={(value) => setSelectedPriority(value || null)}>
                <SelectTrigger className="w-40 gap-2">
                  <AlertCircle size={14} />
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les priorités</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                  <SelectItem value="normal">Normale</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
              
              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={resetFilters} title="Réinitialiser les filtres">
                  <X size={16} />
                </Button>
              )}
            </div>
            
            {/* Bouton de filtre mobile */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden gap-2">
                  <Filter size={16} />
                  <span>Filtres</span>
                  {hasActiveFilters && (
                    <Badge className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                      {(selectedType ? 1 : 0) + (selectedStatus ? 1 : 0) + (selectedPriority ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select value={selectedType || ""} onValueChange={(value) => setSelectedType(value as MissionType || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les types</SelectItem>
                        <SelectItem value="preventive">Préventif</SelectItem>
                        <SelectItem value="corrective">Correctif</SelectItem>
                        <SelectItem value="improvement">Amélioratif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut</label>
                    <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value as MissionStatus || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous les statuts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les statuts</SelectItem>
                        <SelectItem value="to_assign">À assigner</SelectItem>
                        <SelectItem value="assigned">Assigné</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="to_validate">À valider</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priorité</label>
                    <Select value={selectedPriority || ""} onValueChange={(value) => setSelectedPriority(value || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Toutes les priorités" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les priorités</SelectItem>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetFilters}>
                      Réinitialiser
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>
                      Appliquer
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedType && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <ClipboardList size={12} />
                <span>
                  {selectedType === "preventive" ? "Préventif" : 
                   selectedType === "corrective" ? "Correctif" : "Amélioratif"}
                </span>
                <button 
                  onClick={() => setSelectedType(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {selectedStatus && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <CheckCircle2 size={12} />
                <span>
                  {selectedStatus === "to_assign" ? "À assigner" : 
                   selectedStatus === "assigned" ? "Assigné" : 
                   selectedStatus === "in_progress" ? "En cours" : 
                   selectedStatus === "to_validate" ? "À valider" : 
                   selectedStatus === "completed" ? "Terminé" : "Annulé"}
                </span>
                <button 
                  onClick={() => setSelectedStatus(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {selectedPriority && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <AlertCircle size={12} />
                <span>
                  {selectedPriority === "low" ? "Priorité basse" : 
                   selectedPriority === "normal" ? "Priorité normale" : "Priorité haute"}
                </span>
                <button 
                  onClick={() => setSelectedPriority(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters} 
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Effacer tous les filtres
            </Button>
          </div>
        )}
      </div>
      
      {/* Vue par onglets */}
      {viewMode === "list" && (
        <>
          {selectedStatus ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.length === 0 ? (
                <div className="col-span-full text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
                  <div className="flex justify-center mb-4 text-muted-foreground">
                    <Search size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium">Aucun ordre de mission trouvé</h3>
                  <p className="text-muted-foreground mt-1">
                    Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery("");
                    resetFilters();
                  }}>
                    Réinitialiser la recherche
                  </Button>
                </div>
              ) : (
                filteredMissions.map((mission, index) => (
                  <div key={mission.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <MissionCard mission={mission} />
                  </div>
                ))
              )}
            </div>
          ) : (
            <Tabs defaultValue="to_validate">
              <TabsList className="mb-6">
                <TabsTrigger value="to_validate" className="relative gap-2">
                  À valider
                  {missionsByStatus.to_validate.length > 0 && (
                    <Badge className="bg-primary">{missionsByStatus.to_validate.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="to_assign" className="relative gap-2">
                  À assigner
                  {missionsByStatus.to_assign.length > 0 && (
                    <Badge className="bg-primary">{missionsByStatus.to_assign.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="assigned" className="relative gap-2">
                  Assignés
                  {missionsByStatus.assigned.length > 0 && (
                    <Badge className="bg-primary">{missionsByStatus.assigned.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="in_progress" className="relative gap-2">
                  En cours
                  {missionsByStatus.in_progress.length > 0 && (
                    <Badge className="bg-primary">{missionsByStatus.in_progress.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="completed" className="relative gap-2">
                  Terminés
                  {missionsByStatus.completed.length > 0 && (
                    <Badge className="bg-primary">{missionsByStatus.completed.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              {(["to_validate", "to_assign", "assigned", "in_progress", "completed"] as MissionStatus[]).map((status) => (
                <TabsContent key={status} value={status}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {missionsByStatus[status].length === 0 ? (
                      <div className="col-span-full text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
                        <div className="flex justify-center mb-4 text-muted-foreground">
                          <ClipboardList size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-medium">Aucun ordre de mission</h3>
                        <p className="text-muted-foreground mt-1">
                          {status === "to_validate" ? "Il n'y a aucun ordre de mission à valider pour le moment." : 
                           status === "to_assign" ? "Il n'y a aucun ordre de mission à assigner pour le moment." :
                           status === "assigned" ? "Il n'y a aucun ordre de mission assigné pour le moment." :
                           status === "in_progress" ? "Il n'y a aucun ordre de mission en cours pour le moment." :
                           "Il n'y a aucun ordre de mission terminé pour le moment."}
                        </p>
                        <Button className="mt-4 gap-2" asChild>
                          <Link to="/missions/new">
                            <Plus size={16} />
                            <span>Créer un ordre de mission</span>
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      missionsByStatus[status].map((mission, index) => (
                        <div key={mission.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                          <MissionCard mission={mission} />
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </>
      )}
      
      {/* Vue calendrier (placeholder) */}
      {viewMode === "calendar" && (
        <div className="bg-white/70 backdrop-blur-md rounded-xl border p-10 text-center">
          <div className="flex justify-center mb-4 text-primary">
            <Calendar size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium">Calendrier des interventions</h3>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
            Cette fonctionnalité sera disponible prochainement. Elle permettra de visualiser les ordres de mission sur un calendrier pour une meilleure planification.
          </p>
          <Button variant="outline" onClick={() => setViewMode("list")}>
            Revenir à la vue liste
          </Button>
        </div>
      )}
    </div>
  );
};

export default Missions;
