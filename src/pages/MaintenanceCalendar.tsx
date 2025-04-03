
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, GraduationCap, BookOpen } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MaintenanceTaskModal from "@/components/maintenance/MaintenanceTaskModal";
import TaskDetailsModal from "@/components/maintenance/TaskDetailsModal";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { NiveauFormation } from "@/types/mspc";
import { toast } from "sonner";

const MaintenanceCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [selectedNiveau, setSelectedNiveau] = useState<NiveauFormation | null>(null);

  const { 
    equipmentData, 
    addMaintenanceTask, 
    deleteMaintenanceTask, 
    updateMaintenanceTask
  } = useEquipmentData();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

  // All maintenance tasks from all equipment, filtered by niveau if selected
  const allTasks = equipmentData?.flatMap(equipment => 
    (equipment.maintenanceSchedule || [])
      .filter(task => !selectedNiveau || task.niveau === selectedNiveau)
      .map(task => ({
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
                className={`w-full justify-start text-xs p-1 flex gap-1 items-center ${
                  task.completed ? "text-green-600" : 
                  task.type === "corrective" ? "text-red-600" :
                  task.type === "improvement" ? "text-purple-600" :
                  "text-blue-600"
                }`}
                onClick={() => handleTaskClick(task)}
              >
                {task.niveau && (
                  <Badge variant="outline" className="text-[10px] h-4 px-1 py-0">
                    {task.niveau === "2nde" ? "2" : task.niveau === "1ère" ? "1" : "T"}
                  </Badge>
                )}
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
            Planification des activités de maintenance MSPC
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" size="large" variant="mspc" />
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} />
            <span>Nouvelle tâche</span>
          </Button>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
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
          <div className="text-center">
            <h2 className="text-white font-bold text-2xl shadow-text">MSPC-GMAO Edu</h2>
            <p className="text-white/90 mt-1">Formation à la maintenance industrielle</p>
          </div>
        </div>
      </div>

      <BlurryCard className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50">
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
          <BlurryCard className="p-4 bg-gradient-to-b from-gray-50 to-blue-50">
            <div className="mb-4">
              <SchoolLogo size="xlarge" variant="mspc" className="mx-auto" />
            </div>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="rounded-md"
            />
            
            <div className="mt-6">
              <h3 className="font-medium mb-3 flex gap-2 items-center">
                <Graduation className="h-4 w-4" />
                Filtrer par niveau
              </h3>
              <div className="space-y-2">
                <Button 
                  variant={selectedNiveau === null ? "default" : "outline"} 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setSelectedNiveau(null)}
                >
                  Tous les niveaux
                </Button>
                
                <Button 
                  variant={selectedNiveau === "2nde" ? "default" : "outline"} 
                  size="sm" 
                  className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200"
                  onClick={() => setSelectedNiveau("2nde")}
                >
                  2nde PMIA
                </Button>
                
                <Button 
                  variant={selectedNiveau === "1ère" ? "default" : "outline"} 
                  size="sm" 
                  className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200"
                  onClick={() => setSelectedNiveau("1ère")}
                >
                  1ère MSPC
                </Button>
                
                <Button 
                  variant={selectedNiveau === "Terminale" ? "default" : "outline"} 
                  size="sm" 
                  className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-800 border-green-200"
                  onClick={() => setSelectedNiveau("Terminale")}
                >
                  Terminale MSPC
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Légende</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className="bg-blue-600">Préventive</Badge>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-red-600">Corrective</Badge>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-purple-600">Améliorative</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
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
            
            <div className="mt-6">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Documentation MSPC
              </h3>
              <div className="text-sm space-y-1">
                <p>Consultez les référentiels du Bac Pro MSPC pour associer les compétences aux tâches de maintenance.</p>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Référentiels MSPC
                </Button>
              </div>
            </div>
          </BlurryCard>
        </div>
        
        <div className="md:col-span-2">
          <BlurryCard className="p-4 bg-gradient-to-b from-white to-blue-50">
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
        <SchoolLogo size="large" variant="mspc" />
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
