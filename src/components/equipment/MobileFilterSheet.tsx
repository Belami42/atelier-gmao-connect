
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MobileFilterSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  resetFilters: () => void;
  locations: string[];
}

const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  setIsOpen,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  resetFilters,
  locations,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Localisation</label>
            <Select value={selectedLocation || ""} onValueChange={(value) => setSelectedLocation(value === "all" ? null : value)}>
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
            <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}>
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
            <Button onClick={() => setIsOpen(false)}>
              Appliquer
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
