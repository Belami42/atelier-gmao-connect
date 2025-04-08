
import React from "react";
import { Link } from "react-router-dom";
import { Plus, Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EquipmentHeaderProps {
  searchValue: string;
  onSearchChange: (query: string) => void;
  hasFilters?: boolean;
  onResetSearch?: () => void;
  onOpenFilters?: () => void;
  isMobile?: boolean;
}

const EquipmentHeader: React.FC<EquipmentHeaderProps> = ({
  searchValue,
  onSearchChange,
  hasFilters = false,
  onResetSearch = () => {},
  onOpenFilters = () => {},
  isMobile = false
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Rechercher un équipement..."
          className="pl-10 w-full"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchValue && (
          <button
            onClick={onResetSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        {hasFilters && (
          <Button variant="outline" onClick={onResetSearch}>
            Réinitialiser
          </Button>
        )}
        
        {isMobile && (
          <Button variant="outline" onClick={onOpenFilters}>
            <Filter size={16} className="mr-2" />
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
