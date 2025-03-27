
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-8 px-6 bg-background/50 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
              A
            </div>
            <span className="text-foreground/80 font-medium">
              AtelierGMAO
            </span>
          </div>
          
          <div className="text-sm text-foreground/60 text-center md:text-right">
            <p>© {currentYear} AtelierGMAO — Solution pédagogique GMAO pour MSPC</p>
            <p className="mt-1">Conçu avec précision pour l'apprentissage de la maintenance</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
