import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  GraduationCap, 
  Search, 
  Plus, 
  ChevronRight, 
  CheckCircle2,
  X,
  Edit,
  Trash2,
  ClipboardList
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { NiveauFormation, NiveauFormationType } from "@/types/niveauFormation";
import NewActivityModal from "@/components/mspc/NewActivityModal";
import { toast } from "sonner";

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const skills = [
    {
      id: "1",
      code: "MS1",
      name: "Analyser un système",
      description: "Étudier et comprendre le fonctionnement d'un système technique",
      category: "diagnostic",
      level: "2PMIA"
    },
    {
      id: "2",
      code: "MS2",
      name: "Préparer une intervention",
      description: "Organiser et planifier une intervention de maintenance",
      category: "preparation",
      level: "2PMIA"
    },
    {
      id: "3",
      code: "MS3",
      name: "Mettre en œuvre une intervention",
      description: "Réaliser une opération de maintenance sur un équipement",
      category: "intervention",
      level: "1MSPC"
    },
    {
      id: "4",
      code: "MS4",
      name: "Améliorer un système",
      description: "Proposer et implémenter des améliorations sur un système",
      category: "amelioration",
      level: "TMSPC"
    },
    {
      id: "5",
      code: "MS5",
      name: "Communiquer les informations",
      description: "Rédiger des rapports et présenter les résultats d'intervention",
      category: "communication",
      level: "TMSPC"
    }
  ];

  const mockStudents: { id: string; name: string; classe: NiveauFormationType }[] = [
    {
      id: "1",
      name: "Martin Dubois",
      classe: "2PMIA"
    },
    {
      id: "2",
      name: "Léa Bernard",
      classe: "1MSPC"
    },
    {
      id: "3",
      name: "Thomas Petit",
      classe: "TMSPC"
    }
  ];

  const studentSkills = [
    {
      id: "1",
      studentName: "Martin Dubois",
      studentClass: "2PMIA",
      skills: [
        { id: "1", status: "validated", date: "2023-10-15" },
        { id: "2", status: "in_progress", date: "2023-11-10" }
      ]
    },
    {
      id: "2",
      studentName: "Léa Bernard",
      studentClass: "1MSPC",
      skills: [
        { id: "1", status: "validated", date: "2023-10-18" },
        { id: "3", status: "validated", date: "2023-11-05" }
      ]
    },
    {
      id: "3",
      studentName: "Thomas Petit",
      studentClass: "TMSPC",
      skills: [
        { id: "4", status: "in_progress", date: "2023-11-12" },
        { id: "5", status: "validated", date: "2023-10-28" }
      ]
    }
  ];

  const activities = [
    {
      id: "act-1",
      title: "Maintenance préventive système hydraulique",
      date: "2024-04-02",
      student: {
        id: "1",
        name: "Martin Dubois",
        classe: "2PMIA",
      },
      equipment: "Banc de test hydraulique",
      maintenanceType: "preventif_systematique",
      description: "Vérification et remplacement des filtres du système hydraulique",
      competences: ["C3.2", "C4.1"],
      report: "L'intervention s'est déroulée conformément à la procédure. Remplacement des filtres effectué.",
      isValidated: true,
      validatedBy: "M. Durand",
      createdAt: "2024-04-02T10:30:00Z",
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || skill.level === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const maintenanceImages = [
    "/lovable-uploads/89799078-f0a6-43dc-a2f0-bcd0e8907332.png",
    "/lovable-uploads/552dcec9-49b8-4640-99f8-c6989b60b59a.png",
    "/lovable-uploads/61cdf18f-b447-4984-b172-082bc046ad1f.png",
  ];

  const levelLabels = {
    "2PMIA": "2nde PMIA",
    "1MSPC": "1ère MSPC",
    "TMSPC": "Term. MSPC"
  };

  const categoryColors = {
    "diagnostic": "bg-[#0EA5E9] text-white",
    "preparation": "bg-[#F97316] text-white",
    "intervention": "bg-[#8B5CF6] text-white",
    "amelioration": "bg-[#10B981] text-white",
    "communication": "bg-[#D946EF] text-white"
  };

  const categoryLabels = {
    "diagnostic": "Diagnostic",
    "preparation": "Préparation",
    "intervention": "Intervention",
    "amelioration": "Amélioration",
    "communication": "Communication"
  };

  const handleActivityCreated = (newActivity: any) => {
    setActivities([newActivity, ...activities]);
    toast.success(`Activité "${newActivity.title}" enregistrée`);
  };

  const getMaintenanceTypeLabel = (type: string) => {
    switch (type) {
      case 'correctif': return 'Maintenance corrective';
      case 'preventif_systematique': return 'Maintenance préventive systématique';
      case 'preventif_conditionnel': return 'Maintenance préventive conditionnelle';
      case 'amelioratif': return 'Maintenance améliorative';
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Compétences
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestion des compétences et suivi de progression
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Button className="gap-2 bg-accent hover:bg-accent/90" onClick={() => setActivityModalOpen(true)}>
            <Plus size={16} />
            <span>Nouvelle activité</span>
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
          <h2 className="text-white font-bold text-2xl shadow-text">Référentiel de Compétences</h2>
        </div>
      </div>

      <BlurryCard className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1">
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-muted w-full md:w-auto">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="2PMIA">2nde PMIA</TabsTrigger>
              <TabsTrigger value="1MSPC">1ère MSPC</TabsTrigger>
              <TabsTrigger value="TMSPC">Term. MSPC</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </BlurryCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="grid gap-6">
            <BlurryCard className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Activités récentes</h2>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setActivityModalOpen(true)}>
                  <Plus size={16} />
                  <span>Enregistrer</span>
                </Button>
              </div>
              
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-md p-4 hover:bg-accent/5 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {activity.student.name} • {levelLabels[activity.student.classe as keyof typeof levelLabels]}
                          </p>
                        </div>
                        <Badge className={
                          activity.isValidated 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }>
                          {activity.isValidated ? "Validé" : "En attente"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 my-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Date:</span> {activity.date}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Équipement:</span> {activity.equipment}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Type:</span> {getMaintenanceTypeLabel(activity.maintenanceType)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Validé par:</span> {activity.isValidated ? activity.validatedBy : "Non validé"}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Compétences validées:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {activity.competences.map((code: string) => (
                            <Badge key={code} variant="outline" className="bg-blue-50">
                              {code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {activity.report && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <ClipboardList size={14} />
                            <span>Compte-rendu:</span>
                          </div>
                          <p className="text-sm bg-muted/30 p-2 rounded">{activity.report}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                  <p className="mt-2 text-muted-foreground">Aucune activité enregistrée</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 gap-2" 
                    onClick={() => setActivityModalOpen(true)}
                  >
                    <Plus size={16} />
                    <span>Enregistrer une activité</span>
                  </Button>
                </div>
              )}
            </BlurryCard>
            
            <BlurryCard className="p-4">
              <h2 className="text-xl font-semibold mb-4">Liste des compétences</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead className="hidden md:table-cell">Niveau</TableHead>
                      <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill, index) => (
                        <TableRow key={skill.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                          <TableCell className="font-medium">{skill.code}</TableCell>
                          <TableCell>{skill.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{levelLabels[skill.level as keyof typeof levelLabels]}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={categoryColors[skill.category as keyof typeof categoryColors]}>
                              {categoryLabels[skill.category as keyof typeof categoryLabels]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <GraduationCap size={32} className="text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Aucune compétence trouvée</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </BlurryCard>
          </div>
        </div>
        
        <div>
          <BlurryCard className="p-4">
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Par niveau</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>2nde PMIA</span>
                    <Badge>{skills.filter(s => s.level === "2PMIA").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>1ère MSPC</span>
                    <Badge>{skills.filter(s => s.level === "1MSPC").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Term. MSPC</span>
                    <Badge>{skills.filter(s => s.level === "TMSPC").length}</Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Par catégorie</h3>
                <div className="space-y-2">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span>{label}</span>
                      <Badge className={categoryColors[key as keyof typeof categoryColors]}>
                        {skills.filter(s => s.category === key).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurryCard>
          
          <BlurryCard className="p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">Progression des élèves</h2>
            <div className="space-y-4">
              {studentSkills.map((student) => (
                <div key={student.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">{student.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{student.studentClass}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>Détails</span>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill) => {
                      const skillData = skills.find(s => s.id === skill.id);
                      return (
                        <Badge key={skill.id} variant="outline" className="gap-1 px-2 py-1">
                          {skill.status === "validated" ? (
                            <CheckCircle2 size={12} className="text-green-500" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                          <span>{skillData?.code}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </BlurryCard>
        </div>
      </div>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
      
      {/* Activity Modal */}
      <NewActivityModal 
        open={activityModalOpen} 
        onOpenChange={setActivityModalOpen}
        onActivityCreated={handleActivityCreated}
      />
    </div>
  );
};

export default Skills;
