
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  X,
  Tag,
  Map,
  CheckCircle,
  AlertTriangle
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
import EquipmentCard from "@/components/equipment/EquipmentCard";
import type { Equipment } from "@/components/equipment/EquipmentCard";

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Données de démo
  const equipments: Equipment[] = [
    {
      id: "robot1",
      tag: "ROBOT-01",
      name: "Robot FANUC LR Mate 200iD",
      location: "Zone Robotique",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2474&q=80",
      brand: "FANUC",
      model: "LR Mate 200iD",
      status: "operational"
    },
    {
      id: "line1",
      tag: "LIGNE-01",
      name: "Ligne d'embouteillage Festo",
      location: "Ilot Production",
      image: "https://images.unsplash.com/photo-1601055283742-8b27e81b5553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      brand: "Festo",
      model: "LP-2020",
      status: "maintenance"
    },
    {
      id: "cnc1",
      tag: "CNC-01",
      name: "Machine CNC Haas",
      location: "Atelier Usinage",
      image: "https://images.unsplash.com/photo-1565087918595-611722c7c6e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      brand: "Haas",
      model: "VF-2",
      status: "faulty"
    },
    {
      id: "pump1",
      tag: "HYDRAU-01",
      name: "Système hydraulique",
      location: "Zone Énergies",
      image: "https://images.unsplash.com/photo-1624028302737-bee3682be1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      brand: "Bosch Rexroth",
      model: "HLP-500",
      status: "operational"
    },
    {
      id: "conveyor1",
      tag: "CONV-01",
      name: "Convoyeur à bande",
      location: "Ilot Production",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      brand: "Interroll",
      model: "CB-200",
      status: "operational"
    },
    {
      id: "plc1",
      tag: "PLC-01",
      name: "Automate Siemens S7",
      location: "Zone Contrôle",
      image: "https://images.unsplash.com/photo-1620283085861-47d9bb7b0308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      brand: "Siemens",
      model: "S7-1500",
      status: "operational"
    }
  ];
  
  // Extraire les valeurs uniques de location pour les filtres
  const locations = [...new Set(equipments.map(eq => eq.location))];
  
  // Filtrage des équipements
  const filteredEquipments = equipments.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          equipment.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !selectedLocation || equipment.location === selectedLocation;
    
    const matchesStatus = !selectedStatus || equipment.status === selectedStatus;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });
  
  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedLocation(null);
    setSelectedStatus(null);
  };
  
  // Vérifier si des filtres sont appliqués
  const hasActiveFilters = selectedLocation || selectedStatus;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Équipements</h1>
          <p className="text-muted-foreground mt-1">
            Gestion du parc machines de l'atelier
          </p>
        </div>
        
        <Button className="gap-2" asChild>
          <Link to="/equipment/new">
            <Plus size={16} />
            <span>Nouvel équipement</span>
          </Link>
        </Button>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-4 mb-8 smooth-transition shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un équipement..."
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
            {/* Filtres sur desktop */}
            <div className="hidden md:flex gap-2">
              <Select value={selectedLocation || ""} onValueChange={(value) => setSelectedLocation(value || null)}>
                <SelectTrigger className="w-40 gap-2">
                  <Map size={14} />
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les localisations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                <SelectTrigger className="w-40 gap-2">
                  <CheckCircle size={14} />
                  <SelectValue placeholder="État" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les états</SelectItem>
                  <SelectItem value="operational">Opérationnel</SelectItem>
                  <SelectItem value="maintenance">En maintenance</SelectItem>
                  <SelectItem value="faulty">En panne</SelectItem>
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
                  <SlidersHorizontal size={16} />
                  <span>Filtres</span>
                  {hasActiveFilters && (
                    <Badge className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                      {(selectedLocation ? 1 : 0) + (selectedStatus ? 1 : 0)}
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
                    <label className="text-sm font-medium">Localisation</label>
                    <Select value={selectedLocation || ""} onValueChange={(value) => setSelectedLocation(value || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Toutes les localisations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les localisations</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">État</label>
                    <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous les états" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les états</SelectItem>
                        <SelectItem value="operational">Opérationnel</SelectItem>
                        <SelectItem value="maintenance">En maintenance</SelectItem>
                        <SelectItem value="faulty">En panne</SelectItem>
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
            {selectedLocation && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <Map size={12} />
                <span>{selectedLocation}</span>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {selectedStatus && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                {selectedStatus === "operational" ? (
                  <CheckCircle size={12} />
                ) : selectedStatus === "faulty" ? (
                  <AlertTriangle size={12} />
                ) : (
                  <Wrench size={12} />
                )}
                <span>
                  {selectedStatus === "operational" ? "Opérationnel" : 
                   selectedStatus === "maintenance" ? "En maintenance" : "En panne"}
                </span>
                <button 
                  onClick={() => setSelectedStatus(null)}
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
      
      {/* Message si aucun résultat */}
      {filteredEquipments.length === 0 && (
        <div className="text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
          <div className="flex justify-center mb-4 text-muted-foreground">
            <Search size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium">Aucun équipement trouvé</h3>
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
      )}
      
      {/* Grille d'équipements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipments.map((equipment, index) => (
          <div key={equipment.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <EquipmentCard equipment={equipment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
