
import React, { useState } from "react";
import { 
  Award, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Users, 
  CheckCircle, 
  Info,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BlurryCard from "@/components/ui/BlurryCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  id: string;
  code: string;
  title: string;
  description?: string;
  category: string;
  subSkills?: Skill[];
  validated?: number;
  total?: number;
}

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["C1"]);
  
  // Données de démo pour les compétences MSPC
  const skillsData: Skill[] = [
    {
      id: "C1",
      code: "C1",
      title: "Analyser le fonctionnement et l'organisation d'un système",
      category: "Analyser",
      validated: 12,
      total: 25,
      subSkills: [
        {
          id: "C1.1",
          code: "C1.1",
          title: "Analyser le fonctionnement et l'organisation d'un système",
          description: "Observer et analyser le fonctionnement et l'organisation d'un système en vue de préparer une intervention de maintenance.",
          category: "Analyser"
        },
        {
          id: "C1.2",
          code: "C1.2",
          title: "Analyser les solutions constructives",
          description: "Identifier et caractériser les solutions constructives qui assurent les fonctions opératives.",
          category: "Analyser"
        }
      ]
    },
    {
      id: "C2",
      code: "C2",
      title: "Communiquer, rendre compte de son intervention",
      category: "Communiquer",
      validated: 8,
      total: 18,
      subSkills: [
        {
          id: "C2.1",
          code: "C2.1",
          title: "Signaler, transmettre des informations",
          description: "Transmettre à l'écrit ou à l'oral des informations, des données relatives au fonctionnement d'une installation.",
          category: "Communiquer"
        },
        {
          id: "C2.2",
          code: "C2.2",
          title: "Rédiger et argumenter des comptes rendus",
          description: "Rédiger tout ou partie d'un compte-rendu d'intervention de maintenance ou d'amélioration.",
          category: "Communiquer"
        }
      ]
    },
    {
      id: "C3",
      code: "C3",
      title: "Organiser et optimiser son activité",
      category: "Organiser",
      validated: 15,
      total: 20,
      subSkills: [
        {
          id: "C3.1",
          code: "C3.1",
          title: "Préparer son intervention",
          description: "Préparer et organiser son intervention en tenant compte des contraintes et des procédures.",
          category: "Organiser"
        },
        {
          id: "C3.2",
          code: "C3.2",
          title: "Optimiser son intervention",
          description: "Optimiser la planification et la réalisation des tâches assignées.",
          category: "Organiser"
        }
      ]
    },
    {
      id: "C4",
      code: "C4",
      title: "Conduire une opération de maintenance préventive",
      category: "Réaliser",
      validated: 22,
      total: 35,
      subSkills: [
        {
          id: "C4.1",
          code: "C4.1",
          title: "Exécuter des opérations de surveillance",
          description: "Effectuer des opérations de contrôle et de surveillance selon des procédures établies.",
          category: "Réaliser"
        },
        {
          id: "C4.2",
          code: "C4.2",
          title: "Réaliser des opérations de maintenance préventive",
          description: "Réaliser des opérations planifiées selon des procédures établies.",
          category: "Réaliser"
        },
        {
          id: "C4.3",
          code: "C4.3",
          title: "Participer à l'amélioration du système",
          description: "Proposer des solutions d'amélioration dans le cadre d'un groupe de travail.",
          category: "Réaliser"
        }
      ]
    },
    {
      id: "C5",
      code: "C5",
      title: "Conduire une opération de maintenance corrective",
      category: "Réparer",
      validated: 18,
      total: 30,
      subSkills: [
        {
          id: "C5.1",
          code: "C5.1",
          title: "Diagnostiquer une défaillance",
          description: "Localiser la zone de défaillance et identifier l'élément défectueux.",
          category: "Réparer"
        },
        {
          id: "C5.2",
          code: "C5.2",
          title: "Préparer la réparation, la mise en service",
          description: "Organiser la réparation et rassembler les moyens nécessaires.",
          category: "Réparer"
        },
        {
          id: "C5.3",
          code: "C5.3",
          title: "Réaliser une réparation, une adaptation, une amélioration",
          description: "Remplacer, modifier ou ajuster les éléments défectueux ou obsolètes.",
          category: "Réparer"
        },
        {
          id: "C5.4",
          code: "C5.4",
          title: "Mettre en service après une intervention",
          description: "Restituer le système en fonctionnement après intervention.",
          category: "Réparer"
        }
      ]
    }
  ];
  
  // Fonction pour basculer l'état d'ouverture d'une catégorie
  const toggleCategory = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter(id => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };
  
  // Fonction pour filtrer les compétences
  const filterSkills = (skills: Skill[]): Skill[] => {
    if (!searchQuery) return skills;
    
    return skills.map(skill => {
      // Vérifier si cette compétence correspond à la recherche
      const matchesSearch = 
        skill.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Si cette compétence a des sous-compétences, les filtrer également
      const filteredSubSkills = skill.subSkills ? filterSkills(skill.subSkills) : [];
      
      // Si cette compétence correspond OU une de ses sous-compétences correspond, l'inclure dans les résultats
      if (matchesSearch || (filteredSubSkills.length > 0)) {
        return {
          ...skill,
          subSkills: filteredSubSkills
        };
      }
      
      // Sinon, cette compétence ne correspond pas aux critères de recherche
      return null;
    }).filter(Boolean) as Skill[];
  };
  
  const filteredSkills = filterSkills(skillsData);
  
  // Fonction pour calculer le pourcentage de progression
  const calculateProgress = (validated?: number, total?: number) => {
    if (!validated || !total || total === 0) return 0;
    return (validated / total) * 100;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Référentiel de compétences</h1>
          <p className="text-muted-foreground mt-1">
            Suivi des compétences du Bac Pro MSPC
          </p>
        </div>
      </div>
      
      {/* Barre de recherche */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-4 mb-8 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher une compétence..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Message si aucun résultat */}
      {filteredSkills.length === 0 && (
        <div className="text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
          <div className="flex justify-center mb-4 text-muted-foreground">
            <BookOpen size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium">Aucune compétence trouvée</h3>
          <p className="text-muted-foreground mt-1">
            Essayez de modifier vos critères de recherche.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
            Réinitialiser la recherche
          </Button>
        </div>
      )}
      
      {/* Vue d'ensemble des compétences */}
      {filteredSkills.length > 0 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {skillsData.map((category, index) => (
            <BlurryCard key={category.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{category.code}</h3>
                    <p className="text-foreground/80 line-clamp-2">{category.title}</p>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Validées: {category.validated}/{category.total}
                      </span>
                    </div>
                    
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${calculateProgress(category.validated, category.total)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-center gap-1"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>Détails</span>
                  {openCategories.includes(category.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </Button>
              </div>
            </BlurryCard>
          ))}
        </div>
      )}
      
      {/* Liste détaillée des compétences */}
      <div className="space-y-4">
        {filteredSkills.map((category) => (
          <Collapsible 
            key={category.id} 
            open={openCategories.includes(category.id)} 
            onOpenChange={() => toggleCategory(category.id)}
            className="fade-up"
          >
            <BlurryCard>
              <CollapsibleTrigger className="w-full">
                <div className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2 text-primary">
                      <Award size={20} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{category.code}</h3>
                        <Badge variant="outline" className="bg-primary/5">
                          {category.category}
                        </Badge>
                      </div>
                      <p className="text-foreground/80">{category.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!searchQuery && category.validated !== undefined && category.total !== undefined && (
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-sm text-foreground/80">
                            {category.validated}/{category.total}
                          </span>
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${calculateProgress(category.validated, category.total)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-muted-foreground">
                      {openCategories.includes(category.id) ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <Separator />
                <div className="p-4 space-y-4">
                  {category.subSkills?.map((subSkill) => (
                    <div key={subSkill.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{subSkill.code}</h4>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info size={14} className="text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{subSkill.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p className="text-foreground/80 mt-1">{subSkill.title}</p>
                          
                          {subSkill.description && (
                            <p className="text-sm text-muted-foreground mt-2 md:hidden">
                              {subSkill.description}
                            </p>
                          )}
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className="bg-primary/5 flex items-center gap-1 whitespace-nowrap"
                        >
                          <CheckCircle size={12} className="text-green-500" />
                          <span>6 élèves</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </BlurryCard>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default Skills;
