
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import MissionCard, { Mission } from "@/components/mission/MissionCard";
import { getAllMissions } from "@/services/missionService";

const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load missions from storage
    const loadMissions = () => {
      setIsLoading(true);
      try {
        const storedMissions = getAllMissions();
        setMissions(storedMissions);
      } catch (error) {
        console.error("Error loading missions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMissions();
  }, []);

  // Filter missions based on search query and filters
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = 
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.equipmentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || mission.type === typeFilter;
    const matchesStatus = statusFilter === "all" || mission.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sample data for empty state
  const sampleMissions: Mission[] = [
    {
      id: "sample-1",
      type: "corrective",
      title: "Remplacement capteur proximité",
      description: "Le capteur de proximité en entrée de la ligne d'embouteillage ne répond plus. Diagnostic requis.",
      equipmentId: "line1",
      equipmentName: "Ligne d'embouteillage Festo",
      status: "to_assign",
      priority: "high",
      createdAt: "2023-11-15T10:23:00",
      updatedAt: "2023-11-15T10:23:00",
    },
    {
      id: "sample-2",
      type: "preventive",
      title: "Maintenance semestrielle robot",
      description: "Maintenance préventive programmée du robot de soudure.",
      equipmentId: "robot1",
      equipmentName: "Robot FANUC LR Mate 200iD",
      status: "assigned",
      priority: "normal",
      assignedToNames: ["Thomas D."],
      plannedDate: "2023-11-25T09:00:00",
      createdAt: "2023-11-14T14:30:00",
      updatedAt: "2023-11-14T14:30:00",
    }
  ];

  // Combine real missions with sample data if no missions exist
  const displayMissions = missions.length > 0 ? filteredMissions : [...sampleMissions, ...filteredMissions];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Ordres de mission
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez et suivez les missions de maintenance
          </p>
        </div>
        
        <Button asChild>
          <Link to="/missions/new" className="gap-2">
            <Plus size={16} />
            <span>Nouvelle Mission</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une mission..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="preventive">Préventif</SelectItem>
              <SelectItem value="corrective">Correctif</SelectItem>
              <SelectItem value="improvement">Amélioratif</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="to_assign">À assigner</SelectItem>
              <SelectItem value="assigned">Assigné</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="to_validate">À valider</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-lg bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
          
          {displayMissions.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Filter className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucune mission trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Modifiez vos critères de recherche ou créez une nouvelle mission
              </p>
              <Button asChild>
                <Link to="/missions/new" className="gap-2">
                  <Plus size={16} />
                  <span>Nouvelle Mission</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Missions;
