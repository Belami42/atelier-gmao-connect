
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart2, Wrench, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SchoolLogo from "@/components/shared/SchoolLogo";
import BlurryCard from "@/components/ui/BlurryCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Équipements",
      value: "24",
      change: "+2",
      icon: <Wrench className="h-8 w-8 text-primary" />,
      link: "/equipment",
    },
    {
      title: "Missions actives",
      value: "12",
      change: "+3",
      icon: <Activity className="h-8 w-8 text-secondary" />,
      link: "/missions",
    },
    {
      title: "Utilisateurs",
      value: "48",
      change: "+5",
      icon: <Users className="h-8 w-8 text-accent" />,
      link: "/users",
    },
  ];

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
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-1">
            Aperçu des activités de maintenance
          </p>
        </div>
        
        <SchoolLogo className="hidden md:block" />
      </div>

      <div className="relative mb-8 overflow-hidden rounded-xl h-40 vibrant-gradient">
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
          <h2 className="text-white font-bold text-2xl shadow-text">Suivi des Activités</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <BlurryCard key={index} className="p-6 fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm font-medium text-green-500 mt-1">{stat.change} ce mois</p>
              </div>
              <div>{stat.icon}</div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start" asChild>
              <Link to={stat.link}>Voir détails</Link>
            </Button>
          </BlurryCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BlurryCard className="p-6">
          <h3 className="text-lg font-medium mb-4">État des missions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
                <span>À assigner</span>
              </div>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#F97316] mr-2"></div>
                <span>En cours</span>
              </div>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#D946EF] mr-2"></div>
                <span>À valider</span>
              </div>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                <span>Terminées</span>
              </div>
              <span className="font-medium">8</span>
            </div>
          </div>
          <Button className="w-full mt-6 gap-2" asChild>
            <Link to="/missions">
              <BarChart2 size={16} />
              <span>Voir toutes les missions</span>
            </Link>
          </Button>
        </BlurryCard>

        <BlurryCard className="p-6">
          <h3 className="text-lg font-medium mb-4">État des équipements</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle2 size={18} className="text-green-500 mr-2" />
                <span>Opérationnels</span>
              </div>
              <span className="font-medium">18</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-amber-500 mr-2" />
                <span>Maintenance requise</span>
              </div>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Hors service</span>
              </div>
              <span className="font-medium">2</span>
            </div>
          </div>
          <Button className="w-full mt-6 gap-2" asChild>
            <Link to="/equipment">
              <Wrench size={16} />
              <span>Voir tous les équipements</span>
            </Link>
          </Button>
        </BlurryCard>
      </div>

      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default Dashboard;
