
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EquipmentEmptyStateProps {
  resetSearch: () => void;
  hasFilters?: boolean;
}

const EquipmentEmptyState: React.FC<EquipmentEmptyStateProps> = ({ resetSearch, hasFilters }) => {
  return (
    <div className="text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
      <div className="flex justify-center mb-4 text-muted-foreground">
        <Search size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium">Aucun équipement trouvé</h3>
      <p className="text-muted-foreground mt-1">
        {hasFilters 
          ? "Essayez de modifier vos critères de recherche ou de réinitialiser les filtres."
          : "Aucun équipement n'est disponible. Essayez d'en ajouter un nouveau."}
      </p>
      <Button variant="outline" className="mt-4" onClick={resetSearch}>
        Réinitialiser la recherche
      </Button>
    </div>
  );
};

export default EquipmentEmptyState;
