
import React from "react";
import EquipmentHeader from "@/components/equipment/EquipmentHeader";
import EquipmentFilters from "@/components/equipment/EquipmentFilters";
import EquipmentList from "@/components/equipment/EquipmentList";
import EquipmentEmptyState from "@/components/equipment/EquipmentEmptyState";
import MobileFilterSheet from "@/components/equipment/MobileFilterSheet";
import { useEquipmentData } from "@/hooks/useEquipmentData";

const Equipment = () => {
  const {
    filteredEquipments,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedStatus,
    setSelectedStatus,
    isFilterOpen,
    setIsFilterOpen,
    locations,
    hasActiveFilters,
    resetFilters,
    resetSearch,
    deleteEquipment
  } = useEquipmentData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <EquipmentHeader />
      
      <EquipmentFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        resetFilters={resetFilters}
        locations={locations}
        hasActiveFilters={hasActiveFilters}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      
      {filteredEquipments.length === 0 ? (
        <EquipmentEmptyState resetSearch={resetSearch} />
      ) : (
        <EquipmentList 
          equipments={filteredEquipments} 
          onDeleteEquipment={deleteEquipment}
        />
      )}
      
      <MobileFilterSheet 
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        resetFilters={resetFilters}
        locations={locations}
      />
    </div>
  );
};

export default Equipment;
