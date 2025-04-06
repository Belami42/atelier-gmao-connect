
import React from "react";
import { CheckIcon, FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { standardLocations } from "@/hooks/useEquipmentData";

export interface EquipmentFiltersProps {
  locations: string[];
  onLocationChange?: (location: string) => void;
  onStatusChange?: (status: string) => void;
  selectedLocation?: string;
  selectedStatus?: string;
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
  locations,
  onLocationChange,
  onStatusChange,
  selectedLocation,
  selectedStatus
}) => {
  const statuses = ["Tous", "En service", "En panne", "En maintenance", "Hors service"];
  
  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1 border-dashed">
            <FilterIcon className="h-3.5 w-3.5" />
            <span>Localisation</span>
            {selectedLocation && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                {selectedLocation}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>Aucune localisation trouvée.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => onLocationChange && onLocationChange("Tous")}
                  className="flex items-center gap-2"
                >
                  <span>Tous</span>
                  {selectedLocation === "Tous" && (
                    <CheckIcon className="h-4 w-4 ml-auto" />
                  )}
                </CommandItem>
                <Separator />
                
                {/* Ajout des emplacements standard en premier */}
                {standardLocations.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => onLocationChange && onLocationChange(location)}
                    className="flex items-center gap-2"
                  >
                    <span>{location}</span>
                    {selectedLocation === location && (
                      <CheckIcon className="h-4 w-4 ml-auto" />
                    )}
                  </CommandItem>
                ))}
                
                {/* Ajout des emplacements personnalisés qui ne font pas partie des standardLocations */}
                <Separator />
                {locations
                  .filter(loc => !standardLocations.includes(loc))
                  .map((location) => (
                    <CommandItem
                      key={location}
                      onSelect={() => onLocationChange && onLocationChange(location)}
                      className="flex items-center gap-2"
                    >
                      <span>{location}</span>
                      {selectedLocation === location && (
                        <CheckIcon className="h-4 w-4 ml-auto" />
                      )}
                    </CommandItem>
                  ))
                }
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1 border-dashed">
            <FilterIcon className="h-3.5 w-3.5" />
            <span>État</span>
            {selectedStatus && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                {selectedStatus}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>Aucun état trouvé.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status}
                    onSelect={() => onStatusChange && onStatusChange(status)}
                    className="flex items-center gap-2"
                  >
                    <span>{status}</span>
                    {selectedStatus === status && (
                      <CheckIcon className="h-4 w-4 ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EquipmentFilters;
