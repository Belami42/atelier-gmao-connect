
import React from "react";
import { Search, X, Map, CheckCircle, AlertTriangle, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EquipmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  resetFilters: () => void;
  locations: string[];
  hasActiveFilters: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  resetFilters,
  locations,
  hasActiveFilters,
  isFilterOpen,
  setIsFilterOpen
}) => {
  return (
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
          
          {/* Mobile filter button (Sheet component will be used in the main Equipment component) */}
          <Button 
            variant="outline" 
            className="md:hidden gap-2"
            onClick={() => setIsFilterOpen(true)}
          >
            <Wrench size={16} />
            <span>Filtres</span>
            {hasActiveFilters && (
              <Badge className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                {(selectedLocation ? 1 : 0) + (selectedStatus ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      {/* Active filters display */}
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
  );
};

export default EquipmentFilters;
