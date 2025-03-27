
import React from "react";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import type { Equipment } from "@/components/equipment/EquipmentCard";

interface EquipmentListProps {
  equipments: Equipment[];
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipments }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipments.map((equipment, index) => (
        <div key={equipment.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
          <EquipmentCard equipment={equipment} />
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;
