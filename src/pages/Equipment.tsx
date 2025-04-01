
import React, { useState, useEffect } from "react";
import EquipmentHeader from "@/components/equipment/EquipmentHeader";
import EquipmentList from "@/components/equipment/EquipmentList";
import EquipmentFilters from "@/components/equipment/EquipmentFilters";
import MobileFilterSheet from "@/components/equipment/MobileFilterSheet";
import EquipmentEmptyState from "@/components/equipment/EquipmentEmptyState";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useMobile } from "@/hooks/use-mobile";

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

  const isMobile = useMobile();
  
  // Auto-close filter panel when switching to desktop
  useEffect(() => {
    if (!isMobile && isFilterOpen) {
      setIsFilterOpen(false);
    }
  }, [isMobile, isFilterOpen, setIsFilterOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 pb-16">
      <EquipmentHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        hasActiveFilters={hasActiveFilters}
        resetSearch={resetSearch}
        openFilters={() => setIsFilterOpen(true)}
        isMobile={isMobile}
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {!isMobile && (
          <aside className="lg:col-span-1">
            <EquipmentFilters 
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              locations={locations}
              resetFilters={resetFilters}
            />
          </aside>
        )}
        
        <main className="lg:col-span-3">
          {filteredEquipments.length > 0 ? (
            <EquipmentList equipments={filteredEquipments} onDelete={deleteEquipment} />
          ) : (
            <EquipmentEmptyState searchQuery={searchQuery} hasActiveFilters={hasActiveFilters} />
          )}
        </main>
      </div>
      
      {isMobile && (
        <MobileFilterSheet 
          isOpen={isFilterOpen} 
          setIsOpen={setIsFilterOpen}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          locations={locations}
          resetFilters={resetFilters}
        />
      )}
    </div>
  );
};

export default Equipment;
