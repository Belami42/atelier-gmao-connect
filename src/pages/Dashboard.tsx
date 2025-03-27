import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  ClipboardCheck, 
  ClipboardList, 
  Wrench, 
  AlertTriangle, 
  Clock, 
  Plus,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurryCard from "@/components/ui/BlurryCard";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import MissionCard, { Mission } from "@/components/mission/MissionCard";

const Dashboard = () => {
  // Données de démo pour le tableau de bord
  const stats = [
    { label: "Équipements", value: 12, icon: <Wrench />, path: "/equipment" },
    { label: "OM en cours", value: 5, icon: <ClipboardList />, path: "/missions?status=in_progress" },
    { label: "OM à valider", value: 3, icon: <ClipboardCheck />, path: "/missions?status=to_validate" },
    { label: "Équipements en panne", value: 2, icon: <AlertTriangle />, path: "/equipment?status=faulty" },
  ];
  
  const maintenanceTypeData = [
    { name: "Préventif", value: 28, fill: "#3b82f6" },
    { name: "Correctif", value: 15, fill: "#f59e0b" },
    { name: "Amélioratif", value: 8, fill: "#8b5cf6" },
  ];
  
  const weeklyActivityData = [
    { day: "Lun", missions: 4 },
    { day: "Mar", missions: 7 },
    { day: "Mer", missions: 3 },
    { day: "Jeu", missions: 5 },
    { day: "Ven", missions: 6 },
    { day: "Sam", missions: 1 },
    { day: "Dim", missions: 0 },
  ];
  
  const recentMissions: Mission[] = [
    {
      id: "1",
      type: "corrective",
      title: "Remplacement capteur proximité",
      description: "Le capteur de proximité en entrée de la ligne d'embouteillage ne répond plus.",
      equipmentId: "line1",
      equipmentName: "Ligne d'embouteillage Festo",
      status: "to_validate",
      priority: "high",
      assignedToNames: ["Thomas D.", "Julie M."],
      createdAt: "2023-11-15T10:23:00",
      updatedAt: "2023-11-16T14:30:00"
    },
    {
      id: "2",
      type: "preventive",
      title: "Maintenance mensuelle robot",
      description: "Contrôle visuel, nettoyage et graissage des articulations du robot.",
      equipmentId: "robot1",
      equipmentName: "Robot FANUC LR Mate 200iD",
      status: "in_progress",
      priority: "normal",
      assignedToNames: ["Alex B."],
      plannedDate: "2023-11-22T09:00:00",
      createdAt: "2023-11-10T08:15:00",
      updatedAt: "2023-11-15T16:45:00"
    }
  ];
  
  // Événements du calendrier (maintenances prévues)
  const upcomingEvents = [
    { 
      date: "2023-11-22", 
      title: "Maintenance Robot FANUC", 
      type: "preventive",
      assignedTo: "Alex B." 
    },
    { 
      date: "2023-11-24", 
      title: "Révision annuelle ligne d'assemblage", 
      type: "preventive",
      assignedTo: "Thomas D., Julie M." 
    },
    { 
      date: "2023-11-28", 
      title: "Installation capteur supplémentaire", 
      type: "improvement",
      assignedTo: "Marc L." 
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de l'activité de maintenance
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/equipment">
              <Wrench size={16} />
              <span>Équipements</span>
            </Link>
          </Button>
          
          <Button className="gap-2" asChild>
            <Link to="/missions/new">
              <Plus size={16} />
              <span>Nouvel OM</span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <BlurryCard key={index} className="scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <Link to={stat.path} className="block p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  {stat.icon}
                </div>
              </div>
            </Link>
          </BlurryCard>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Graphique des activités */}
        <Card className="lg:col-span-2 fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={18} />
              <span>Activité hebdomadaire</span>
            </CardTitle>
            <CardDescription>
              Nombre d'ordres de mission par jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px"
                    }} 
                  />
                  <Bar 
                    dataKey="missions" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    barSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Types de maintenance */}
        <Card className="fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList size={18} />
              <span>Types d'OM</span>
            </CardTitle>
            <CardDescription>
              Répartition par type de maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={maintenanceTypeData}
                  margin={{ top: 10, right: 10, left: 40, bottom: 20 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px"
                    }} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions récentes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ClipboardCheck size={20} />
              <span>Ordres de mission récents</span>
            </h2>
            
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/missions">
                <span>Voir tout</span>
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentMissions.map((mission, index) => (
              <div key={mission.id} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MissionCard mission={mission} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Calendrier des événements */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Calendar size={20} />
            <span>Prochaines maintenances</span>
          </h2>
          
          <BlurryCard className="fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="p-6">
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={index > 0 ? "pt-4" : ""}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 text-center">
                        <div className="bg-primary/10 rounded-md p-1 text-center">
                          <div className="text-xs text-primary font-medium">
                            {new Date(event.date).toLocaleDateString("fr-FR", {
                              month: "short"
                            })}
                          </div>
                          <div className="text-lg font-bold leading-none mt-1">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${event.type === "preventive" ? "bg-blue-500" : event.type === "improvement" ? "bg-violet-500" : "bg-amber-500"}`} />
                          <span className="text-xs text-muted-foreground capitalize">
                            {event.type === "preventive" ? "Préventif" : event.type === "improvement" ? "Amélioratif" : "Correctif"}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          <span>Assigné: {event.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                  <Link to="/missions?view=calendar">
                    <Calendar size={14} />
                    <span>Voir le calendrier complet</span>
                  </Link>
                </Button>
              </div>
            </div>
          </BlurryCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
