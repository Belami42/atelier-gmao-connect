
import { Mission } from "@/components/mission/MissionCard";
import { toast } from "sonner";

const STORAGE_KEY = "mspc_missions";

// Function to get all missions from local storage
export const getAllMissions = (): Mission[] => {
  try {
    const storedMissions = localStorage.getItem(STORAGE_KEY);
    return storedMissions ? JSON.parse(storedMissions) : [];
  } catch (error) {
    console.error("Error fetching missions from storage:", error);
    return [];
  }
};

// Function to get a single mission by ID
export const getMissionById = (id: string): Mission | undefined => {
  const missions = getAllMissions();
  return missions.find(mission => mission.id === id);
};

// Function to save a new mission
export const saveMission = (mission: Omit<Mission, "id" | "createdAt" | "updatedAt">): Mission => {
  try {
    const missions = getAllMissions();
    
    // Generate a new mission with ID and timestamps
    const newMission: Mission = {
      ...mission,
      id: `mission-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add the new mission to the array
    const updatedMissions = [...missions, newMission];
    
    // Save the updated array back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMissions));
    
    toast.success("Mission enregistrée avec succès!");
    return newMission;
  } catch (error) {
    console.error("Error saving mission:", error);
    toast.error("Erreur lors de l'enregistrement de la mission");
    throw error;
  }
};

// Function to update an existing mission
export const updateMission = (updatedMission: Mission): Mission => {
  try {
    const missions = getAllMissions();
    
    // Find the index of the mission to update
    const index = missions.findIndex(m => m.id === updatedMission.id);
    
    if (index === -1) {
      throw new Error(`Mission with ID ${updatedMission.id} not found`);
    }
    
    // Update the mission with new data and updated timestamp
    const missionToUpdate = {
      ...updatedMission,
      updatedAt: new Date().toISOString()
    };
    
    // Update the mission in the array
    missions[index] = missionToUpdate;
    
    // Save the updated array back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
    
    toast.success("Mission mise à jour avec succès!");
    return missionToUpdate;
  } catch (error) {
    console.error("Error updating mission:", error);
    toast.error("Erreur lors de la mise à jour de la mission");
    throw error;
  }
};

// Function to delete a mission
export const deleteMission = (id: string): boolean => {
  try {
    const missions = getAllMissions();
    
    // Filter out the mission with the given ID
    const updatedMissions = missions.filter(m => m.id !== id);
    
    // If the length didn't change, the mission wasn't found
    if (updatedMissions.length === missions.length) {
      return false;
    }
    
    // Save the updated array back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMissions));
    
    toast.success("Mission supprimée avec succès!");
    return true;
  } catch (error) {
    console.error("Error deleting mission:", error);
    toast.error("Erreur lors de la suppression de la mission");
    return false;
  }
};
