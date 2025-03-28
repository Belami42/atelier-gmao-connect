
import { useState, useMemo, useEffect } from "react";
import type { Equipment, MaintenanceTask } from "@/components/equipment/EquipmentCard";
import { toast } from "sonner";

// Key for localStorage
const STORAGE_KEY = "smart-workshop-equipment";

// Demo equipment data
const initialEquipmentData: Equipment[] = [
  {
    id: "robot1",
    tag: "ROBOT-01",
    name: "Robot FANUC LR Mate 200iD",
    location: "Zone Robotique",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2474&q=80",
    brand: "FANUC",
    model: "LR Mate 200iD",
    status: "operational",
    maintenanceSchedule: [
      {
        id: "maint-robot1-1",
        title: "Maintenance préventive trimestrielle",
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        type: "preventive",
        completed: false
      }
    ]
  },
  {
    id: "line1",
    tag: "LIGNE-01",
    name: "Ligne d'embouteillage Festo",
    location: "Ilot Production",
    image: "https://images.unsplash.com/photo-1601055283742-8b27e81b5553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Festo",
    model: "LP-2020",
    status: "maintenance",
    maintenanceSchedule: [
      {
        id: "maint-line1-1",
        title: "Vérification des capteurs",
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        type: "corrective",
        completed: false
      }
    ]
  },
  {
    id: "cnc1",
    tag: "CNC-01",
    name: "Machine CNC Haas",
    location: "Atelier Usinage",
    image: "https://images.unsplash.com/photo-1565087918595-611722c7c6e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Haas",
    model: "VF-2",
    status: "faulty",
    maintenanceSchedule: [
      {
        id: "maint-cnc1-1",
        title: "Réparation du système hydraulique",
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        type: "corrective",
        completed: false
      }
    ]
  },
  {
    id: "pump1",
    tag: "HYDRAU-01",
    name: "Système hydraulique",
    location: "Zone Énergies",
    image: "https://images.unsplash.com/photo-1624028302737-bee3682be1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Bosch Rexroth",
    model: "HLP-500",
    status: "operational",
    maintenanceSchedule: []
  },
  {
    id: "conveyor1",
    tag: "CONV-01",
    name: "Convoyeur à bande",
    location: "Ilot Production",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Interroll",
    model: "CB-200",
    status: "operational",
    maintenanceSchedule: []
  },
  {
    id: "plc1",
    tag: "PLC-01",
    name: "Automate Siemens S7",
    location: "Zone Contrôle",
    image: "https://images.unsplash.com/photo-1620283085861-47d9bb7b0308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Siemens",
    model: "S7-1500",
    status: "operational",
    maintenanceSchedule: []
  }
];

export const useEquipmentData = () => {
  // Load equipment data from localStorage or use initial data
  const [equipmentData, setEquipmentData] = useState<Equipment[]>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialEquipmentData;
  });
  
  // Save equipment data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipmentData));
  }, [equipmentData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique locations for filter options
  const locations = useMemo(() => 
    [...new Set(equipmentData.map(eq => eq.location))],
    [equipmentData]
  );
  
  // Apply filters to equipment data
  const filteredEquipments = useMemo(() => {
    return equipmentData.filter(equipment => {
      const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            equipment.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !selectedLocation || equipment.location === selectedLocation;
      
      const matchesStatus = !selectedStatus || equipment.status === selectedStatus;
      
      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [searchQuery, selectedLocation, selectedStatus, equipmentData]);
  
  // Check if any filters are applied
  const hasActiveFilters = selectedLocation || selectedStatus;
  
  // Reset all filters function
  const resetFilters = () => {
    setSelectedLocation(null);
    setSelectedStatus(null);
  };
  
  // Function to reset search and filters
  const resetSearch = () => {
    setSearchQuery("");
    resetFilters();
  };
  
  // Delete equipment
  const deleteEquipment = (id: string) => {
    setEquipmentData(prevEquipment => {
      const newEquipment = prevEquipment.filter(eq => eq.id !== id);
      toast.success("Équipement supprimé avec succès");
      return newEquipment;
    });
  };

  // Add maintenance task to equipment
  const addMaintenanceTask = (equipmentId: string, task: MaintenanceTask) => {
    setEquipmentData(prevEquipment => {
      return prevEquipment.map(eq => {
        if (eq.id === equipmentId) {
          const maintenanceSchedule = [...(eq.maintenanceSchedule || []), task];
          return { ...eq, maintenanceSchedule };
        }
        return eq;
      });
    });
    toast.success("Tâche de maintenance ajoutée");
  };
  
  // Delete maintenance task
  const deleteMaintenanceTask = (equipmentId: string, taskId: string) => {
    setEquipmentData(prevEquipment => {
      return prevEquipment.map(eq => {
        if (eq.id === equipmentId && eq.maintenanceSchedule) {
          const maintenanceSchedule = eq.maintenanceSchedule.filter(task => task.id !== taskId);
          return { ...eq, maintenanceSchedule };
        }
        return eq;
      });
    });
    toast.success("Tâche de maintenance supprimée");
  };
  
  // Update maintenance task
  const updateMaintenanceTask = (equipmentId: string, taskId: string, updates: Partial<MaintenanceTask>) => {
    setEquipmentData(prevEquipment => {
      return prevEquipment.map(eq => {
        if (eq.id === equipmentId && eq.maintenanceSchedule) {
          const maintenanceSchedule = eq.maintenanceSchedule.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          );
          return { ...eq, maintenanceSchedule };
        }
        return eq;
      });
    });
    toast.success("Tâche de maintenance mise à jour");
  };
  
  return {
    equipmentData,
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
    deleteEquipment,
    addMaintenanceTask,
    deleteMaintenanceTask,
    updateMaintenanceTask
  };
};
