
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Tool, ClipboardList, Award, PanelRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurryCard from "@/components/ui/BlurryCard";

const Index = () => {
  const features = [
    {
      title: "Base Équipements",
      description: "Référencement du parc machines de l'atelier avec fiches détaillées.",
      icon: <Tool />,
      path: "/equipment"
    },
    {
      title: "Ordres de Mission",
      description: "Gestion complète du cycle de vie des interventions de maintenance.",
      icon: <ClipboardList />,
      path: "/missions"
    },
    {
      title: "Compétences MSPC",
      description: "Intégration du référentiel pour suivi des acquisitions.",
      icon: <Award />,
      path: "/skills"
    },
    {
      title: "Tableau de Bord",
      description: "Visualisation rapide de l'activité et des indicateurs clés.",
      icon: <LayoutDashboard />,
      path: "/dashboard"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
              <div className="relative bg-primary text-white h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                A
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-primary">Atelier</span>GMAO
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Solution pédagogique de Gestion de Maintenance Assistée par Ordinateur pour le Bac Pro MSPC, conçue pour intégrer la maintenance au cœur de l'apprentissage.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to="/dashboard">
                <LayoutDashboard size={18} />
                <span>Tableau de bord</span>
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/equipment">
                <Tool size={18} />
                <span>Voir les équipements</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Fonctionnalités principales
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Une solution complète pour l'apprentissage de la maintenance industrielle
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <BlurryCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="mt-2 text-foreground/70 flex-grow">
                      {feature.description}
                    </p>
                    <div className="mt-6">
                      <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
                        <Link to={feature.path}>
                          <span>Découvrir</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </BlurryCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Prêt à améliorer l'apprentissage<br />de la maintenance?
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Commencez dès maintenant avec AtelierGMAO et intégrez la GMAO dans votre enseignement MSPC.
          </motion.p>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to="/dashboard">
                <PanelRight size={18} />
                <span>Accéder à la plateforme</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
