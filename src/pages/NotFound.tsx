
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";

const NotFound = () => {
  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
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
          <h2 className="text-white font-bold text-2xl shadow-text">Page Non Trouvée</h2>
        </div>
      </div>

      <BlurryCard className="p-8 md:p-12 max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
            <AlertTriangle size={48} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tech-gradient bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Veuillez vérifier l'URL ou retourner à la page d'accueil.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="gap-2 w-full sm:w-auto">
            <Link to="/">
              <Home size={16} />
              <span>Retour à l'accueil</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              <span>Page précédente</span>
            </Link>
          </Button>
        </div>
      </BlurryCard>
      
      <div className="mt-8 flex justify-center">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default NotFound;
