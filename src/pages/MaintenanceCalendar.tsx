
import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isSameDay, addYears, subYears } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Wrench, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MaintenanceTaskModal from "@/components/maintenance/MaintenanceTaskModal";
import TaskDetailsModal from "@/components/maintenance/TaskDetailsModal";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useNavigate } from "react-router-dom";
import { MaintenanceTask } from "@/components/equipment/EquipmentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ViewMode = {
  MONTH: "month",
  YEAR: "year"
} as const;

type ViewModeType = typeof ViewMode[keyof typeof ViewMode];

const MaintenanceCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.MONTH);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  
  const { equipmentData, addMaintenanceTask, updateMaintenanceTask, deleteMaintenanceTask } = useEquipmentData();

  // Fonction pour naviguer dans le calendrier
  const navigateCalendar = (direction: "prev" | "next") => {
    if (viewMode === ViewMode.MONTH) {
      setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    } else {
      setCurrentDate(direction === "prev" ? subYears(currentDate, 1) : addYears(currentDate, 1));
    }
  };

  // Générer les jours du mois actuel
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  // Calculer les jours vides au début du mois (pour l'alignement)
  const startDay = getDay(startOfMonth(currentDate));
  
  // Fonction pour obtenir les tâches de maintenance pour une date donnée
  const getTasksForDate = (date: Date) => {
    return equipmentData.flatMap(equipment => 
      (equipment.maintenanceSchedule || [])
        .filter(task => {
          // Convertir la date de la tâche en objet Date si elle est stockée sous forme de chaîne
          const taskDate = task.date instanceof Date ? task.date : new Date(task.date);
          return isSameDay(taskDate, date);
        })
        .map(task => ({ ...task, equipmentId: equipment.id, equipmentName: equipment.name }))
    );
  };

  // Générer tous les mois de l'année
  const monthsInYear = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentDate.getFullYear(), i, 1);
    return {
      date,
      label: format(date, "MMMM", { locale: fr }),
      tasks: equipmentData.flatMap(equipment => 
        (equipment.maintenanceSchedule || [])
          .filter(task => {
            const taskDate = task.date instanceof Date ? task.date : new Date(task.date);
            return taskDate.getMonth() === i && taskDate.getFullYear() === currentDate.getFullYear();
          })
          .map(task => ({ ...task, equipmentId: equipment.id, equipmentName: equipment.name }))
      )
    };
  });

  // Gérer l'ouverture du modal d'ajout de tâche
  const handleAddTask = (date: Date) => {
    setSelectedDate(date);
    setIsAddTaskModalOpen(true);
  };

  // Gérer la sélection d'une tâche existante
  const handleSelectTask = (task: MaintenanceTask & { equipmentId: string, equipmentName: string }) => {
    setSelectedTask({
      ...task,
      date: task.date instanceof Date ? task.date : new Date(task.date)
    });
  };

  // Gérer la création d'un ordre de mission à partir d'une tâche
  const handleCreateMission = (task: MaintenanceTask, equipmentId: string) => {
    const params = new URLSearchParams();
    params.append('equipment', equipmentId);
    params.append('taskId', task.id);
    params.append('title', task.title);
    params.append('type', task.type);
    
    navigate(`/missions/new?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-8 w-8" />
            Calendrier de maintenance
          </h1>
          <p className="text-muted-foreground mt-1">
            Planifiez et gérez les tâches de maintenance préventive
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(value) => setViewMode(value as ViewModeType)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Vue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ViewMode.MONTH}>Vue mensuelle</SelectItem>
              <SelectItem value={ViewMode.YEAR}>Vue annuelle</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedEquipmentId || "all"} 
            onValueChange={(value) => setSelectedEquipmentId(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tous les équipements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les équipements</SelectItem>
              {equipmentData.map(equipment => (
                <SelectItem key={equipment.id} value={equipment.id}>
                  {equipment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => navigateCalendar("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold px-2">
              {viewMode === ViewMode.MONTH 
                ? format(currentDate, "MMMM yyyy", { locale: fr }) 
                : format(currentDate, "yyyy")}
            </h2>
            <Button variant="outline" size="icon" onClick={() => navigateCalendar("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={() => {
            setSelectedDate(new Date());
            setIsAddTaskModalOpen(true);
          }} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une tâche
          </Button>
        </div>
        
        {viewMode === ViewMode.MONTH ? (
          <div>
            <div className="grid grid-cols-7 mb-2">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => (
                <div key={i} className="h-10 flex items-center justify-center font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Jours vides du début du mois (pour l'alignement) */}
              {Array.from({ length: startDay }).map((_, index) => (
                <div key={`empty-start-${index}`} className="h-28 p-1 bg-gray-50 rounded-md"></div>
              ))}
              
              {/* Jours du mois */}
              {daysInMonth.map((day, index) => {
                const dayTasks = getTasksForDate(day).filter(task => {
                  if (!selectedEquipmentId) return true;
                  return task.equipmentId === selectedEquipmentId;
                });
                
                return (
                  <div 
                    key={index} 
                    className={`h-28 p-1 border rounded-md overflow-hidden ${
                      isSameMonth(day, currentDate) 
                        ? "bg-white" 
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{format(day, "d")}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5"
                        onClick={() => handleAddTask(day)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
                      {dayTasks.length > 0 ? (
                        dayTasks.map((task) => (
                          <div 
                            key={task.id} 
                            className={`text-xs p-1 rounded cursor-pointer truncate ${
                              task.type === "preventive" 
                                ? "bg-blue-100 text-blue-800" 
                                : task.type === "corrective" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-green-100 text-green-800"
                            } ${task.completed ? "line-through opacity-70" : ""}`}
                            onClick={() => handleSelectTask(task)}
                          >
                            <div className="flex items-center gap-1">
                              <Wrench className="h-2 w-2 flex-shrink-0" />
                              <span className="truncate">{task.title}</span>
                            </div>
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthsInYear.map((month, index) => {
              const filteredTasks = selectedEquipmentId 
                ? month.tasks.filter(task => task.equipmentId === selectedEquipmentId)
                : month.tasks;
                
              return (
                <div key={index} className="border rounded-md p-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium capitalize">{month.label}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => {
                        setCurrentDate(month.date);
                        setViewMode(ViewMode.MONTH);
                      }}
                    >
                      Voir le mois
                    </Button>
                  </div>
                  
                  {filteredTasks.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {filteredTasks.map((task) => (
                        <div 
                          key={task.id} 
                          className={`text-xs p-2 rounded flex justify-between items-center cursor-pointer ${
                            task.type === "preventive" 
                              ? "bg-blue-50 text-blue-800 border-blue-200" 
                              : task.type === "corrective" 
                              ? "bg-red-50 text-red-800 border-red-200" 
                              : "bg-green-50 text-green-800 border-green-200"
                          } border ${task.completed ? "line-through opacity-70" : ""}`}
                          onClick={() => handleSelectTask(task)}
                        >
                          <div className="flex items-center gap-1 truncate pr-2">
                            <span className="whitespace-nowrap">{format(new Date(task.date), "dd/MM")}</span>
                            <span className="truncate">- {task.title}</span>
                          </div>
                          <Badge variant="outline" className="shrink-0 text-[10px] h-4">
                            {task.equipmentName.split(' ')[0]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-20 flex items-center justify-center text-sm text-muted-foreground">
                      Aucune tâche planifiée
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Modal pour ajouter une nouvelle tâche */}
      <MaintenanceTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        selectedDate={selectedDate}
        equipmentOptions={equipmentData}
        onSave={(equipmentId, task) => {
          addMaintenanceTask(equipmentId, task);
          setIsAddTaskModalOpen(false);
        }}
      />
      
      {/* Modal pour voir les détails d'une tâche */}
      {selectedTask && (
        <TaskDetailsModal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          equipmentId={(selectedTask as any).equipmentId}
          equipmentName={(selectedTask as any).equipmentName}
          onUpdate={(updates) => {
            updateMaintenanceTask((selectedTask as any).equipmentId, selectedTask.id, updates);
            setSelectedTask(null);
          }}
          onDelete={() => {
            deleteMaintenanceTask((selectedTask as any).equipmentId, selectedTask.id);
            setSelectedTask(null);
          }}
          onCreateMission={() => {
            handleCreateMission(selectedTask, (selectedTask as any).equipmentId);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default MaintenanceCalendar;
