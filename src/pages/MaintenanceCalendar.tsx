
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MaintenanceTaskModal from "@/components/maintenance/MaintenanceTaskModal";
import TaskDetailsModal from "@/components/maintenance/TaskDetailsModal";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { toast } from "sonner";

const MaintenanceCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const { equipmentData, addMaintenanceTask, deleteMaintenanceTask, updateMaintenanceTask } = useEquipmentData();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

  // All maintenance tasks from all equipment
  const allTasks = equipmentData?.flatMap(equipment => 
    (equipment.maintenanceSchedule || []).map(task => ({
      ...task,
      equipmentId: equipment.id,
      equipmentName: equipment.name
    }))
  ) || [];

  const handleSaveTask = (equipmentId: string, task: any) => {
    addMaintenanceTask(equipmentId, task);
    setIsTaskModalOpen(false);
    toast.success("Tâche de maintenance ajoutée");
  };

  const handleUpdateTask = (updates: any) => {
    if (selectedTask) {
      updateMaintenanceTask(selectedTask.equipmentId, selectedTask.id, updates);
      setSelectedTask(null);
      toast.success("Tâche mise à jour");
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteMaintenanceTask(selectedTask.equipmentId, selectedTask.id);
      setSelectedTask(null);
      toast.success("Tâche supprimée");
    }
  };

  const handleCreateMission = () => {
    // This would navigate to mission creation page with pre-filled data
    toast.info("Fonctionnalité à venir: Création d'ordre de mission");
    setSelectedTask(null);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderMonthView = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Adjust for Sunday as the first day of the week
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-50 p-2 min-h-[100px] rounded-md"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const tasksForDay = allTasks.filter(
        task => {
          const taskDate = task.date instanceof Date ? task.date : new Date(task.date);
          return taskDate.getDate() === day && 
                 taskDate.getMonth() === month && 
                 taskDate.getFullYear() === year;
        }
      );

      days.push(
        <div 
          key={`day-${day}`}
          className={`bg-white p-2 min-h-[100px] rounded-md border ${
            day === date.getDate() ? "ring-2 ring-primary/50" : ""
          }`}
        >
          <div className="font-medium">{day}</div>
          <div className="mt-1 space-y-1">
            {tasksForDay.map(task => (
              <Button 
                key={task.id}
                variant="ghost" 
                size="sm" 
                className={`w-full justify-start text-xs p-1 ${
                  task.completed ? "text-green-600" : "text-blue-600"
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <span className="truncate">{task.title}</span>
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
          <div key={day} className="font-medium text-center p-2">{day}</div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Calendrier de maintenance
          </h1>
          <p className="text-muted-foreground mt-1">
            Planification des opérations de maintenance préventive
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Button className="gap-2 bg-accent hover:bg-accent/90" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} />
            <span>Nouvelle tâche</span>
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
          <h2 className="text-white font-bold text-2xl shadow-text">Maintenance Préventive</h2>
        </div>
      </div>

      <BlurryCard className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 items-center">
            <Button variant="outline" size="icon" onClick={() => {
              const newDate = new Date(date);
              if (view === "month") {
                newDate.setMonth(date.getMonth() - 1);
              } else if (view === "week") {
                newDate.setDate(date.getDate() - 7);
              } else {
                newDate.setDate(date.getDate() - 1);
              }
              setDate(newDate);
            }}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-lg font-medium">
              {new Intl.DateTimeFormat('fr-FR', { 
                month: 'long', 
                year: 'numeric',
                ...(view === 'day' && { day: 'numeric' }) 
              }).format(date)}
            </div>
            
            <Button variant="outline" size="icon" onClick={() => {
              const newDate = new Date(date);
              if (view === "month") {
                newDate.setMonth(date.getMonth() + 1);
              } else if (view === "week") {
                newDate.setDate(date.getDate() + 7);
              } else {
                newDate.setDate(date.getDate() + 1);
              }
              setDate(newDate);
            }}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
              Aujourd'hui
            </Button>
          </div>
          
          <div className="flex gap-2 items-center">
            <Tabs 
              value={view} 
              onValueChange={(v) => setView(v as "month" | "week" | "day")}
              className="w-fit"
            >
              <TabsList>
                <TabsTrigger value="month">Mois</TabsTrigger>
                <TabsTrigger value="week">Semaine</TabsTrigger>
                <TabsTrigger value="day">Jour</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Sélectionner</span>
              </Button>
            </div>
          </div>
        </div>
      </BlurryCard>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="hidden md:block">
          <BlurryCard className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="rounded-md"
            />
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Légende</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className="bg-primary">Préventive</Badge>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-secondary">Corrective</Badge>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-accent">Améliorative</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Statistiques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total planifiées:</span>
                  <span className="font-medium">{allTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>En attente:</span>
                  <span className="font-medium">{allTasks.filter(t => !t.completed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Terminées:</span>
                  <span className="font-medium">{allTasks.filter(t => t.completed).length}</span>
                </div>
              </div>
            </div>
          </BlurryCard>
        </div>
        
        <div className="md:col-span-2">
          <BlurryCard className="p-4">
            {view === "month" && renderMonthView()}
            {view === "week" && (
              <div className="p-4 text-center">
                <p>Vue semaine à venir prochainement</p>
              </div>
            )}
            {view === "day" && (
              <div className="p-4 text-center">
                <p>Vue journalière à venir prochainement</p>
              </div>
            )}
          </BlurryCard>
        </div>
      </div>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
      
      <MaintenanceTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)}
        selectedDate={date}
        equipmentOptions={equipmentData || []}
        onSave={handleSaveTask}
      />
      
      {selectedTask && (
        <TaskDetailsModal 
          isOpen={!!selectedTask} 
          onClose={() => setSelectedTask(null)} 
          task={selectedTask}
          equipmentId={selectedTask.equipmentId}
          equipmentName={selectedTask.equipmentName}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onCreateMission={handleCreateMission}
        />
      )}
    </div>
  );
};

export default MaintenanceCalendar;
