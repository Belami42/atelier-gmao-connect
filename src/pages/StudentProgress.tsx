
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Users, Filter, FileUp, Printer, PieChart, Check, FileSpreadsheet, FileUp as FilePdf } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import StudentCompetenciesTracker from "@/components/students/StudentCompetenciesTracker";
import { Eleve, NiveauFormation } from "@/types/mspc";
import { Card } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { PieChart as PieChartComponent, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const StudentProgress = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"competencies" | "activities" | "summary">("competencies");
  const [exportOpen, setExportOpen] = useState(false);
  
  // Données fictives d'élèves pour la démonstration
  const mockStudents: Eleve[] = [
    {
      id: "1",
      nom: "Dupont",
      prenom: "Thomas",
      classe: "2PMIA",
      competencesAcquises: [
        {
          code: "C1.1",
          dateValidation: "2023-10-15",
          niveau: "découverte",
          contexte: "Analyse d'un système de ventilation",
          valideePar: "M. Martin",
          ordresTravaux: ["ot-123"]
        },
        {
          code: "C2.1",
          dateValidation: "2023-11-02",
          niveau: "découverte",
          contexte: "Préparation d'une intervention de maintenance préventive",
          valideePar: "Mme Robert",
          ordresTravaux: ["ot-124"]
        },
        {
          code: "C3.1",
          dateValidation: "2023-12-05",
          niveau: "découverte",
          contexte: "Surveillance d'un équipement en fonctionnement",
          valideePar: "M. Martin",
          ordresTravaux: ["ot-125"]
        }
      ],
      ordresTravauxRealises: ["ot-123", "ot-124", "ot-125"]
    },
    {
      id: "2",
      nom: "Martin",
      prenom: "Julie",
      classe: "1MSPC",
      competencesAcquises: [
        {
          code: "C1.1",
          dateValidation: "2023-09-20",
          niveau: "application",
          contexte: "Analyse fonctionnelle d'un système automatisé",
          valideePar: "M. Dubois",
          ordresTravaux: ["ot-223"]
        },
        {
          code: "C1.2",
          dateValidation: "2023-10-15",
          niveau: "découverte",
          contexte: "Étude des mécanismes d'un système de convoyage",
          valideePar: "Mme Robert",
          ordresTravaux: ["ot-224"]
        },
        {
          code: "C2.1",
          dateValidation: "2023-11-10",
          niveau: "application",
          contexte: "Organisation d'une intervention de maintenance corrective",
          valideePar: "M. Dubois",
          ordresTravaux: ["ot-225"]
        },
        {
          code: "C3.2",
          dateValidation: "2023-12-01",
          niveau: "application",
          contexte: "Réalisation d'une maintenance préventive sur un moteur",
          valideePar: "M. Dubois",
          ordresTravaux: ["ot-226"]
        }
      ],
      ordresTravauxRealises: ["ot-223", "ot-224", "ot-225", "ot-226"]
    },
    {
      id: "3",
      nom: "Dubois",
      prenom: "Lucas",
      classe: "TMSPC",
      competencesAcquises: [
        {
          code: "C1.1",
          dateValidation: "2023-09-05",
          niveau: "maîtrise",
          contexte: "Analyse d'un système complexe de production",
          valideePar: "M. Martin",
          ordresTravaux: ["ot-323"]
        },
        {
          code: "C1.3",
          dateValidation: "2023-09-25",
          niveau: "application",
          contexte: "Étude d'un système hydraulique",
          valideePar: "Mme Robert",
          ordresTravaux: ["ot-324"]
        },
        {
          code: "C2.2",
          dateValidation: "2023-10-15",
          niveau: "maîtrise",
          contexte: "Diagnostic d'une panne complexe",
          valideePar: "M. Martin",
          ordresTravaux: ["ot-325"]
        },
        {
          code: "C3.3",
          dateValidation: "2023-11-05",
          niveau: "application",
          contexte: "Réparation d'un système automatisé",
          valideePar: "Mme Robert",
          ordresTravaux: ["ot-326"]
        },
        {
          code: "C4.2",
          dateValidation: "2023-11-20",
          niveau: "application",
          contexte: "Analyse des résultats de mesures électriques",
          valideePar: "M. Martin",
          ordresTravaux: ["ot-327"]
        },
        {
          code: "C5.2",
          dateValidation: "2023-12-10",
          niveau: "maîtrise",
          contexte: "Rédaction d'un rapport d'intervention complet",
          valideePar: "Mme Robert",
          ordresTravaux: ["ot-328"]
        }
      ],
      ordresTravauxRealises: ["ot-323", "ot-324", "ot-325", "ot-326", "ot-327", "ot-328"]
    }
  ];
  
  // Activities data
  const activities = [
    {
      id: "ot-123",
      title: "Maintenance préventive ventilation",
      date: "2023-10-12",
      type: "preventive",
      equipment: "Système de ventilation",
      status: "completed",
      competences: ["C1.1"]
    },
    {
      id: "ot-124",
      title: "Préparation intervention",
      date: "2023-11-01",
      type: "preparation",
      equipment: "Convoyeur",
      status: "completed",
      competences: ["C2.1"]
    },
    {
      id: "ot-125",
      title: "Surveillance équipement",
      date: "2023-12-03",
      type: "monitoring",
      equipment: "Pompe hydraulique",
      status: "completed",
      competences: ["C3.1"]
    },
    {
      id: "ot-223",
      title: "Analyse fonctionnelle",
      date: "2023-09-18",
      type: "analysis",
      equipment: "Système automatisé",
      status: "completed",
      competences: ["C1.1"]
    },
    {
      id: "ot-224",
      title: "Étude mécanique",
      date: "2023-10-10",
      type: "study",
      equipment: "Système de convoyage",
      status: "completed",
      competences: ["C1.2"]
    },
    {
      id: "ot-225",
      title: "Maintenance corrective",
      date: "2023-11-08",
      type: "corrective",
      equipment: "Moteur électrique",
      status: "completed",
      competences: ["C2.1"]
    },
    {
      id: "ot-226",
      title: "Maintenance préventive moteur",
      date: "2023-11-30",
      type: "preventive",
      equipment: "Moteur",
      status: "completed",
      competences: ["C3.2"]
    }
  ];
  
  // Filtrer les élèves selon la recherche
  const filteredStudents = mockStudents.filter(student => 
    student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedStudent = selectedStudentId ? mockStudents.find(s => s.id === selectedStudentId) : undefined;
  
  // Get student's activities
  const getStudentActivities = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) return [];
    
    return activities.filter(act => student.ordresTravauxRealises.includes(act.id));
  };
  
  // Calculate competence stats for a student
  const getCompetenceStats = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) return { total: 0, acquired: 0, discovery: 0, application: 0, mastery: 0 };
    
    const totalCompetences = 15; // There would be a fixed total in the real app
    const acquired = student.competencesAcquises.length;
    const discovery = student.competencesAcquises.filter(c => c.niveau === "découverte").length;
    const application = student.competencesAcquises.filter(c => c.niveau === "application").length;
    const mastery = student.competencesAcquises.filter(c => c.niveau === "maîtrise").length;
    
    return { total: totalCompetences, acquired, discovery, application, mastery };
  };
  
  // Generate chart data
  const generateChartData = (studentId: string) => {
    const stats = getCompetenceStats(studentId);
    
    return [
      { name: "Acquises", value: stats.acquired, color: "#4ade80" },
      { name: "Non acquises", value: stats.total - stats.acquired, color: "#f87171" }
    ];
  };
  
  const generateLevelChartData = (studentId: string) => {
    const stats = getCompetenceStats(studentId);
    
    return [
      { name: "Découverte", value: stats.discovery, color: "#60a5fa" },
      { name: "Application", value: stats.application, color: "#818cf8" },
      { name: "Maîtrise", value: stats.mastery, color: "#34d399" }
    ];
  };

  const handlePrint = () => {
    window.print();
    toast.success("Impression lancée");
  };
  
  const handleExport = (format: string) => {
    toast.success(`Export au format ${format} lancé`);
    setExportOpen(false);
  };

  const getStatus = (niveau: string) => {
    switch(niveau) {
      case "découverte":
        return "En cours d'acquisition";
      case "application":
        return "Partiellement acquise";
      case "maîtrise":
        return "Acquise";
      default:
        return "Non évaluée";
    }
  };

  const getStatusColor = (niveau: string) => {
    switch(niveau) {
      case "découverte":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "application":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "maîtrise":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100";
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Suivi des compétences
          </h1>
          <p className="text-muted-foreground mt-1">
            Progression des élèves selon le référentiel Bac Pro MSPC
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" variant="mspc" />
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus size={16} />
            <span>Nouvel élève</span>
          </Button>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4 px-4">
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/89799078-f0a6-43dc-a2f0-bcd0e8907332.png" 
                alt="Élève en maintenance"
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/552dcec9-49b8-4640-99f8-c6989b60b59a.png" 
                alt="Formation maintenance"
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/61cdf18f-b447-4984-b172-082bc046ad1f.png" 
                alt="Travaux pratiques"
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h2 className="text-white font-bold text-2xl shadow-text">Bac Pro MSPC</h2>
            <p className="text-white/90 mt-1">Suivi des compétences du référentiel</p>
          </div>
        </div>
      </div>

      <BlurryCard className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-indigo-50">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un élève..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              <span>Filtres</span>
            </Button>
            <Dialog open={exportOpen} onOpenChange={setExportOpen}>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2" 
                disabled={!selectedStudentId}
                onClick={() => setExportOpen(true)}
              >
                <FileText size={16} />
                <span>Exporter</span>
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Exporter le suivi de compétences</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent && `Élève: ${selectedStudent.prenom} ${selectedStudent.nom} - ${selectedStudent.classe}`}
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full justify-start gap-3" variant="outline" onClick={() => handleExport('pdf')}>
                      <FilePdf className="text-red-500" size={18} />
                      <span>Exporter au format PDF</span>
                    </Button>
                    <Button className="w-full justify-start gap-3" variant="outline" onClick={() => handleExport('excel')}>
                      <FileSpreadsheet className="text-green-600" size={18} />
                      <span>Exporter au format Excel</span>
                    </Button>
                    <Button className="w-full justify-start gap-3" variant="outline" onClick={handlePrint}>
                      <Printer size={18} />
                      <span>Imprimer</span>
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setExportOpen(false)}>Annuler</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="gap-2">
              <Users size={16} />
              <span>Groupe</span>
            </Button>
          </div>
        </div>
      </BlurryCard>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <BlurryCard className="h-fit">
          <div className="p-4 border-b">
            <h3 className="font-medium">Élèves</h3>
          </div>
          <div className="p-4 space-y-2">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  selectedStudentId === student.id 
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedStudentId(student.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{student.prenom} {student.nom}</span>
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">{student.classe}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getCompetenceStats(student.id).acquired} compétences acquises sur {getCompetenceStats(student.id).total}
                </div>
              </button>
            ))}
          </div>
        </BlurryCard>

        {selectedStudent ? (
          <div className="space-y-6">
            <BlurryCard>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-medium">{selectedStudent.prenom} {selectedStudent.nom}</h2>
                    <p className="text-muted-foreground">{selectedStudent.classe}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setViewMode("summary")}>
                      <PieChart size={16} />
                      <span>Synthèse</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setViewMode("competencies")}>
                      <Check size={16} />
                      <span>Compétences</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setViewMode("activities")}>
                      <FileText size={16} />
                      <span>Activités</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {viewMode === "summary" && (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Progression globale</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChartComponent>
                            <Pie
                              data={generateChartData(selectedStudent.id)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {generateChartData(selectedStudent.id).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChartComponent>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Niveaux d'acquisition</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChartComponent>
                            <Pie
                              data={generateLevelChartData(selectedStudent.id)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({name, value}) => `${name}: ${value}`}
                            >
                              {generateLevelChartData(selectedStudent.id).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChartComponent>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Statistiques</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4">
                        <div className="text-sm text-muted-foreground">Total des compétences</div>
                        <div className="text-2xl font-bold">{getCompetenceStats(selectedStudent.id).total}</div>
                      </Card>
                      <Card className="p-4 bg-green-50">
                        <div className="text-sm text-green-700">Compétences acquises</div>
                        <div className="text-2xl font-bold text-green-700">
                          {getCompetenceStats(selectedStudent.id).acquired}
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-sm text-muted-foreground">Activités réalisées</div>
                        <div className="text-2xl font-bold">{selectedStudent.ordresTravauxRealises.length}</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-sm text-muted-foreground">Progression</div>
                        <div className="text-2xl font-bold">
                          {Math.round((getCompetenceStats(selectedStudent.id).acquired / getCompetenceStats(selectedStudent.id).total) * 100)}%
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button className="gap-2" onClick={() => setExportOpen(true)}>
                      <FileText size={16} />
                      <span>Exporter le bilan</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {viewMode === "competencies" && (
                <div className="p-6">
                  <StudentCompetenciesTracker 
                    students={[selectedStudent]}
                    selectedStudentId={selectedStudent.id}
                    onStudentSelect={() => {}}
                  />
                </div>
              )}
              
              {viewMode === "activities" && (
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Activités réalisées</h3>
                  
                  <div className="space-y-4">
                    {getStudentActivities(selectedStudent.id).length > 0 ? (
                      getStudentActivities(selectedStudent.id).map(activity => (
                        <div key={activity.id} className="border rounded-lg p-4 hover:bg-accent/5">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{activity.title}</h4>
                            <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">{activity.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Équipement: {activity.equipment}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {activity.competences.map(comp => {
                              const competence = selectedStudent.competencesAcquises.find(c => c.code === comp);
                              return competence ? (
                                <div key={comp} className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(competence.niveau)}`}>
                                  {comp} - {getStatus(competence.niveau)}
                                </div>
                              ) : null;
                            })}
                          </div>
                          
                          <div className="mt-3 text-xs text-right">
                            Validé par: <span className="font-medium">
                              {selectedStudent.competencesAcquises.find(c => 
                                activity.competences.includes(c.code)
                              )?.valideePar || "Non spécifié"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16 bg-muted/20 rounded-lg">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                        <p className="mt-2 text-muted-foreground">Aucune activité enregistrée pour cet élève</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </BlurryCard>
          </div>
        ) : (
          <BlurryCard className="p-12 text-center">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
            <h3 className="text-lg font-medium mt-4">Sélectionnez un élève</h3>
            <p className="text-muted-foreground mt-2">
              Cliquez sur un élève dans la liste pour afficher sa progression
            </p>
          </BlurryCard>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;
