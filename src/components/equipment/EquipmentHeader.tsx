
import React from "react";
import { Link } from "react-router-dom";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EquipmentHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hasFilters: boolean;
  onResetSearch: () => void;
  onOpenFilters: () => void;
  isMobile: boolean;
}

const EquipmentHeader: React.FC<EquipmentHeaderProps> = ({
  searchQuery,
  onSearchChange,
  hasFilters,
  onResetSearch,
  onOpenFilters,
  isMobile
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Équipements</h1>
        <p className="text-muted-foreground mt-1">
          Gestion du parc machines de l'atelier
        </p>
      </div>
      
      <div className="flex gap-2 w-full md:w-auto">
        {isMobile && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un équipement..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={onResetSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
        
        {isMobile && hasFilters && (
          <Button variant="outline" onClick={onResetSearch}>
            Réinitialiser
          </Button>
        )}
        
        {isMobile && (
          <Button variant="outline" onClick={onOpenFilters}>
            Filtres
          </Button>
        )}
        
        <Button className="gap-2" asChild>
          <Link to="/equipment/new">
            <Plus size={16} />
            <span>Nouvel équipement</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EquipmentHeader;
