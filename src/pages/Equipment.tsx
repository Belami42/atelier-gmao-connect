
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EquipmentHeader from "@/components/equipment/EquipmentHeader";
import EquipmentList from "@/components/equipment/EquipmentList";
import EquipmentFilters from "@/components/equipment/EquipmentFilters";
import MobileFilterSheet from "@/components/equipment/MobileFilterSheet";
import EquipmentEmptyState from "@/components/equipment/EquipmentEmptyState";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useMobile } from "@/hooks/use-mobile";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { Button } from "@/components/ui/button";
import { QrCode, Plus } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";

const Equipment = () => {
  const isMobile = useMobile();
  const [searchValue, setSearchValue] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const equipmentData = useEquipmentData();
  const equipment = equipmentData.equipmentData || [];
  const isLoading = equipmentData.isLoading;
  const error = equipmentData.error;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Équipements
          </h1>
          <SchoolLogo showDescription={false} className="hidden md:block" />
        </div>
        <BlurryCard className="p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-primary/20 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto"></div>
          </div>
        </BlurryCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Équipements
          </h1>
          <SchoolLogo showDescription={false} className="hidden md:block" />
        </div>
        <BlurryCard className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-500">Erreur lors du chargement des équipements</h2>
          <p className="mt-2 text-muted-foreground">Veuillez réessayer plus tard</p>
        </BlurryCard>
      </div>
    );
  }

  if (!equipment || equipment.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Équipements
          </h1>
          <SchoolLogo showDescription={false} className="hidden md:block" />
        </div>
        <EquipmentEmptyState resetSearch={() => setSearchValue("")} />
      </div>
    );
  }

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesLocation = !selectedLocation || item.location === selectedLocation;
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Équipements
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestion du parc d'équipements
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Button variant="secondary" className="gap-2" onClick={() => setShowQrCode(!showQrCode)}>
            <QrCode size={16} />
            <span>{showQrCode ? "Masquer QR" : "Afficher QR"}</span>
          </Button>
          <Button className="gap-2 bg-accent hover:bg-accent/90" asChild>
            <Link to="/equipment/new">
              <Plus size={16} />
              <span>Nouvel équipement</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 vibrant-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4 px-4">
            {maintenanceImages.map((img, idx) => (
              <div key={idx} className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img 
                  src={img} 
                  alt={`Maintenance ${idx + 1}`}
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white font-bold text-2xl shadow-text">Équipements Techniques</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-64 space-y-6">
          {!isMobile ? (
            <EquipmentFilters
              categories={equipmentData.categories || []}
              locations={equipmentData.locations || []}
              statuses={equipmentData.statuses || []}
              onCategoryChange={setSelectedCategory}
              onLocationChange={setSelectedLocation}
              onStatusChange={setSelectedStatus}
              selectedCategoryId={selectedCategory}
              selectedLocationId={selectedLocation}
              selectedStatusId={selectedStatus}
            />
          ) : (
            <MobileFilterSheet
              isOpen={isFilterOpen}
              onToggle={setIsFilterOpen}
              categories={equipmentData.categories || []}
              locations={equipmentData.locations || []}
              statuses={equipmentData.statuses || []}
              onCategoryChange={setSelectedCategory}
              onLocationChange={setSelectedLocation}
              onStatusChange={setSelectedStatus}
              selectedCategoryId={selectedCategory}
              selectedLocationId={selectedLocation}
              selectedStatusId={selectedStatus}
            />
          )}
        </div>

        <div className="flex-1">
          <EquipmentHeader
            onSearch={setSearchValue}
            searchQuery={searchValue}
            onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
            showFilter={isMobile}
            equipmentCount={filteredEquipment.length}
            totalCount={equipment.length}
          />

          <EquipmentList equipments={filteredEquipment} showQr={showQrCode} />
        </div>
      </div>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default Equipment;
