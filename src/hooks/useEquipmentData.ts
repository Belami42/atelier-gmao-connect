import { useState, useMemo, useEffect } from "react";
import type { Equipment, MaintenanceTask } from "@/components/equipment/EquipmentCard";
import { NiveauFormationType } from "@/types/niveauFormation";
import { toast } from "sonner";

// Key for localStorage
const STORAGE_KEY = "smart-workshop-equipment";

// Demo equipment data avec aspects pédagogiques MSPC
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
        completed: false,
        niveau: "TMSPC",
        competences: ["C2.1", "C3.2", "C4.1", "C5.2"]
      }
    ],
    niveau: "TMSPC",
    documentation: [
      {
        nom: "Manuel utilisateur",
        url: "#",
        type: "pdf"
      },
      {
        nom: "Schéma électrique",
        url: "#",
        type: "pdf"
      }
    ]
  },
  {
    id: "line1",
    tag: "LIGNE-01",
    name: "Ligne d'embouteillage Festo",
    location: "Zone Fabrication",
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
        completed: false,
        niveau: "1MSPC",
        competences: ["C1.3", "C2.2", "C3.3", "C5.1"]
      }
    ],
    niveau: "1MSPC",
    documentation: [
      {
        nom: "Guide maintenance",
        url: "#",
        type: "pdf"
      }
    ]
  },
  {
    id: "cnc1",
    tag: "CNC-01",
    name: "Machine CNC Haas",
    location: "Zone Système",
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
        completed: false,
        niveau: "1MSPC",
        competences: ["C1.2", "C2.2", "C3.3", "C4.1", "C5.2"]
      }
    ],
    niveau: "1MSPC",
    documentation: [
      {
        nom: "Manuel technique",
        url: "#",
        type: "pdf"
      }
    ]
  },
  {
    id: "pump1",
    tag: "HYDRAU-01",
    name: "Système hydraulique",
    location: "Zone Expérimentation",
    image: "https://images.unsplash.com/photo-1624028302737-bee3682be1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Bosch Rexroth",
    model: "HLP-500",
    status: "operational",
    maintenanceSchedule: [],
    niveau: "2PMIA",
    documentation: [
      {
        nom: "Fiche technique",
        url: "#",
        type: "pdf"
      }
    ]
  },
  {
    id: "conveyor1",
    tag: "CONV-01",
    name: "Convoyeur à bande",
    location: "Zone Démontage",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Interroll",
    model: "CB-200",
    status: "operational",
    maintenanceSchedule: [
      {
        id: "maint-conveyor1-1",
        title: "Graissage des rouleaux",
        date: new Date(new Date().setDate(new Date().getDate() + 14)),
        type: "preventive",
        completed: false,
        niveau: "2PMIA",
        competences: ["C2.1", "C3.2", "C5.2"]
      }
    ],
    niveau: "2PMIA",
    documentation: [
      {
        nom: "Guide d'entretien",
        url: "#",
        type: "pdf"
      }
    ]
  },
  {
    id: "plc1",
    tag: "PLC-01",
    name: "Automate Siemens S7",
    location: "Magasin",
    image: "https://images.unsplash.com/photo-1620283085861-47d9bb7b0308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    brand: "Siemens",
    model: "S7-1500",
    status: "operational",
    maintenanceSchedule: [
      {
        id: "maint-plc1-1",
        title: "Mise à jour firmware",
        date: new Date(new Date().setDate(new Date().getDate() + 21)),
        type: "improvement",
        completed: false,
        niveau: "TMSPC",
        competences: ["C1.4", "C2.1", "C3.4", "C4.3", "C5.3"]
      }
    ],
    niveau: "TMSPC",
    documentation: [
      {
        nom: "Manuel programmation",
        url: "#",
        type: "pdf"
      },
      {
        nom: "Schéma d'architecture",
        url: "#",
        type: "pdf"
      }
    ]
  }
];

// Standard locations list to use across the application
export const standardLocations = [
  "Zone système",
  "Zone expérimentation",
  "Zone fabrication",
  "Zone démontage",
  "Magasin",
  "Zone de stockage",
  "Zone stockage petits composants"
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
  const [selectedNiveau, setSelectedNiveau] = useState<NiveauFormationType | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique locations for filter options
  const locations = useMemo(() => 
    [...new Set(equipmentData.map(eq => eq.location))],
    [equipmentData]
  );
  
  // Extract unique niveaux for filter options
  const niveaux = useMemo(() => 
    [...new Set(equipmentData.map(eq => eq.niveau).filter(Boolean))] as NiveauFormationType[],
    [equipmentData]
  );
  
  // Apply filters to equipment data
  const filteredEquipments = useMemo(() => {
    return equipmentData.filter(equipment => {
      const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            equipment.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !selectedLocation || equipment.location === selectedLocation;
      
      const matchesStatus = !selectedStatus || equipment.status === selectedStatus;
      
      const matchesNiveau = !selectedNiveau || equipment.niveau === selectedNiveau;
      
      return matchesSearch && matchesLocation && matchesStatus && matchesNiveau;
    });
  }, [searchQuery, selectedLocation, selectedStatus, selectedNiveau, equipmentData]);
  
  // Check if any filters are applied
  const hasActiveFilters = selectedLocation || selectedStatus || selectedNiveau;
  
  // Reset all filters function
  const resetFilters = () => {
    setSelectedLocation(null);
    setSelectedStatus(null);
    setSelectedNiveau(null);
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
    selectedNiveau,
    setSelectedNiveau,
    isFilterOpen,
    setIsFilterOpen,
    locations,
    niveaux,
    hasActiveFilters,
    resetFilters,
    resetSearch,
    deleteEquipment,
    addMaintenanceTask,
    deleteMaintenanceTask,
    updateMaintenanceTask,
    standardLocations
  };
};
