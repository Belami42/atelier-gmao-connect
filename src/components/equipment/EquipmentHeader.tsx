
import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const EquipmentHeader: React.FC = () => {
  return (
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
  );
};

export default EquipmentHeader;
