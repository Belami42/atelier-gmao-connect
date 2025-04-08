import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Users, Filter, FileUp, Printer, PieChart, Check, FileSpreadsheet, FileUp as FilePdf, BookOpen, Calendar, CheckCircle2, XCircle, ChevronDown, List, Activity } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import StudentCompetenciesTracker from "@/components/students/StudentCompetenciesTracker";
import { Eleve, NiveauFormation, NiveauFormationType, Activity as ActivityType, CompetenceCode } from "@/types/mspc";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import StudentSkillsChart from "@/components/students/StudentSkillsChart";
import NewStudentForm from "@/components/students/NewStudentForm";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDisplayFromNiveauFormation } from "@/types/niveauFormation";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const StudentProgress = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"competencies" | "activities" | "summary">("summary");
  const [exportOpen, setExportOpen] = useState(false);
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [filterClass, setFilterClass] = useState<NiveauFormationType | "all">("all");
  const [filterTeacher, setFilterTeacher] = useState<string | "all">("all");
  
  const [students, setStudents] = useState<Eleve[]>([
    {
      id: "1",
      nom: "Dupont",
      prenom: "Thomas",
      classe: NiveauFormation.SECONDE,
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
      ordresTravauxRealises: ["ot-123", "ot-124", "ot-125"],
      referent: "1" // M. Martin
    },
    {
      id: "2",
      nom: "Martin",
      prenom: "Julie",
      classe: NiveauFormation.PREMIERE,
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
      ordresTravauxRealises: ["ot-223", "ot-224", "ot-225", "ot-226"],
      referent: "3" // M. Dubois
    },
    {
      id: "3",
      nom: "Dubois",
      prenom: "Lucas",
      classe: NiveauFormation.TERMINALE,
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
      ordresTravauxRealises: ["ot-323", "ot-324", "ot-325", "ot-326", "ot-327", "ot-328"],
      referent: "2" // Mme Robert
    }
  ]);

  const teachers = [
    { id: "1", name: "M. Martin" },
    { id: "2", name: "Mme Robert" },
    { id: "3", name: "M. Dubois" },
    { id: "4", name: "Mme Bernard" }
  ];
  
  const activities = [
    {
      id: "ot-123",
      title: "Maintenance préventive ventilation",
      date: "2023-10-12",
      type: "preventive",
      equipment: "Système de ventilation",
      status: "completed",
      competences: ["C1.1" as CompetenceCode],
      student: "1",
      result: "success"
    },
    {
      id: "ot-124",
      title: "Préparation intervention",
      date: "2023-11-01",
      type: "preparation",
      equipment: "Convoyeur",
      status: "completed",
      competences: ["C2.1" as CompetenceCode],
      student: "1",
      result: "success"
    },
    {
      id: "ot-125",
      title: "Surveillance équipement",
      date: "2023-12-03",
      type: "monitoring",
      equipment: "Pompe hydraulique",
      status: "completed",
      competences: ["C3.1" as CompetenceCode],
      student: "1",
      result: "success"
    },
    {
      id: "ot-223",
      title: "Analyse fonctionnelle",
      date: "2023-09-18",
      type: "analysis",
      equipment: "Système automatisé",
      status: "completed",
      competences: ["C1.1" as CompetenceCode],
      student: "2",
      result: "success"
    },
    {
      id: "ot-224",
      title: "Étude mécanique",
      date: "2023-10-10",
      type: "study",
      equipment: "Système de convoyage",
      status: "completed",
      competences: ["C1.2" as CompetenceCode],
      student: "2",
      result: "success"
    },
    {
      id: "ot-225",
      title: "Maintenance corrective",
      date: "2023-11-08",
      type: "corrective",
      equipment: "Moteur électrique",
      status: "completed",
      competences: ["C2.1" as CompetenceCode],
      student: "2",
      result: "success"
    },
    {
      id: "ot-226",
      title: "Maintenance préventive moteur",
      date: "2023-11-30",
      type: "preventive",
      equipment: "Moteur",
      status: "completed",
      competences: ["C3.2" as CompetenceCode],
      student: "2",
      result: "success"
    },
    {
      id: "ot-325",
      title: "Diagnostic de panne",
      date: "2023-10-12",
      type: "diagnostic",
      equipment: "Automate programmable",
      status: "completed",
      competences: ["C2.2" as CompetenceCode],
      student: "3",
      result: "success"
    },
    {
      id: "ot-326",
      title: "Réparation système",
      date: "2023-11-03",
      type: "corrective",
      equipment: "Système automatisé",
      status: "completed",
      competences: ["C3.3" as CompetenceCode],
      student: "3",
      result: "success"
    },
    {
      id: "ot-400",
      title: "Test de performance",
      date: "2024-01-15",
      type: "testing",
      equipment: "Banc d'essai",
      status: "completed",
      competences: ["C4.3" as CompetenceCode],
      student: "3",
      result: "failed"
    }
  ];
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = (
      student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesClassFilter = filterClass === "all" || student.classe === filterClass;
    const matchesTeacherFilter = filterTeacher === "all" || student.referent === filterTeacher;
    
    return matchesSearch && matchesClassFilter && matchesTeacherFilter;
  });
  
  const selectedStudent = selectedStudentId ? students.find(s => s.id === selectedStudentId) : undefined;
  
  const getStudentActivities = (studentId: string) => {
    if (!studentId) return [];
    return activities.filter(act => act.student === studentId);
  };
  
  const getCompetenceStats = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return { total: 0, acquired: 0, discovery: 0, application: 0, mastery: 0, failed: 0 };
    
    const totalCompetences = 18;
    const acquired = student.competencesAcquises
      .filter(c => c.niveau === "maîtrise").length;
    const discovery = student.competencesAcquises
      .filter(c => c.niveau === "découverte").length;
    const application = student.competencesAcquises
      .filter(c => c.niveau === "application").length;
    
    const failed = activities
      .filter(a => a.student === studentId && a.result === "failed")
      .length;
    
    return { 
      total: totalCompetences, 
      acquired,
      discovery, 
      application, 
      mastery: acquired, 
      failed
    };
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

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : "Non défini";
  };
  
  const countStudentsByClass = (classe: NiveauFormation) => {
    return students.filter(s => s.classe === classe).length;
  };
  
  const handleAddStudent = (newStudent: Eleve) => {
    setStudents([...students, newStudent]);
    setSelectedStudentId(newStudent.id);
    setViewMode("summary");
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
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setNewStudentModalOpen(true)}>
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
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un élève..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <Select value={filterClass as string} onValueChange={(value) => setFilterClass(value === "all" ? "all" : value as NiveauFormation)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                <SelectItem value={NiveauFormation.TERMINALE}>Term. MSPC</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterTeacher} onValueChange={setFilterTeacher}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Enseignant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les enseignants</SelectItem>
                {teachers.map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Dialog open={exportOpen} onOpenChange={setExportOpen}>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 whitespace-nowrap" 
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
          </div>
        </div>
      </BlurryCard>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <BlurryCard className="h-fit">
          <div className="p-4 border-b">
            <h3 className="font-medium">Élèves</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground">
                {filteredStudents.length} élève(s)
              </div>
              <div className="text-xs">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 mr-2">
                  2nde: {countStudentsByClass(NiveauFormation.SECONDE)}/30
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 mr-2">
                  1ère: {countStudentsByClass(NiveauFormation.PREMIERE)}/30
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Term: {countStudentsByClass(NiveauFormation.TERMINALE)}/30
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="p-4 space-y-2">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
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
                    <Badge className={`
                      ${student.classe === NiveauFormation.SECONDE ? "bg-blue-100 text-blue-800 border-blue-200" : 
                        student.classe === NiveauFormation.PREMIERE ? "bg-purple-100 text-purple-800 border-purple-200" : 
                        "bg-green-100 text-green-800 border-green-200"}
                    `}>
                      {getDisplayFromNiveauFormation(student.classe as NiveauFormation)}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                    <span>
                      {getCompetenceStats(student.id).acquired} compétences acquises
                    </span>
                    <span>
                      {getTeacherName(student.referent || "")}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun élève ne correspond aux critères de recherche
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t">
              <Button 
                className="w-full gap-2" 
                variant="outline"
                onClick={() => setNewStudentModalOpen(true)}
              >
                <Plus size={16} />
                <span>Nouvel élève</span>
              </Button>
            </div>
          </div>
        </BlurryCard>

        {selectedStudent ? (
          <div className="space-y-6">
            <BlurryCard>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-medium">{selectedStudent.prenom} {selectedStudent.nom}</h2>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Badge className={`
                        ${selectedStudent.classe === NiveauFormation.SECONDE ? "bg-blue-100 text-blue-800 border-blue-200" : 
                          selectedStudent.classe === NiveauFormation.PREMIERE ? "bg-purple-100 text-purple-800 border-purple-200" : 
                          "bg-green-100 text-green-800 border-green-200"}
                      `}>
                        {getDisplayFromNiveauFormation(selectedStudent.classe as NiveauFormation)}
                      </Badge>
                      <span>•</span>
                      <span>Référent: {getTeacherName(selectedStudent.referent || "")}</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Activity size={16} />
                        <span>Activités</span>
                        <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[350px]">
                      <DropdownMenuLabel>Activités de l'élève</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {getStudentActivities(selectedStudent.id).length > 0 ? (
                        getStudentActivities(selectedStudent.id).map((activity) => (
                          <DropdownMenuItem key={activity.id} className="py-2 px-3 cursor-pointer">
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{activity.title}</span>
                                {activity.result === "success" ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700">Réussie</Badge>
                                ) : activity.result === "failed" ? (
                                  <Badge variant="outline" className="bg-red-50 text-red-700">Échouée</Badge>
                                ) : null}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                <Calendar size={12} /> 
                                <span>{activity.date}</span>
                                <span className="px-1">•</span>
                                <span>{activity.equipment}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {activity.competences.map(code => (
                                  <Badge key={code} variant="outline" className="text-xs px-1 py-0 h-5 bg-blue-50">{code}</Badge>
                                ))}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="text-center py-4 px-2 text-muted-foreground text-sm">
                          Aucune activité enregistrée pour cet élève
                        </div>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer justify-center" 
                        onClick={() => setViewMode("activities")}
                      >
                        <span className="text-primary font-medium">Voir toutes les activités</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex gap-2">
                    <Button variant={viewMode === "summary" ? "default" : "outline"} size="sm" className="gap-2" onClick={() => setViewMode("summary")}>
                      <PieChart size={16} />
                      <span>Synthèse</span>
                    </Button>
                    <Button variant={viewMode === "competencies" ? "default" : "outline"} size="sm" className="gap-2" onClick={() => setViewMode("competencies")}>
                      <Check size={16} />
                      <span>Compétences</span>
                    </Button>
                    <Button variant={viewMode === "activities" ? "default" : "outline"} size="sm" className="gap-2" onClick={() => setViewMode("activities")}>
                      <FileText size={16} />
                      <span>Activités</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {viewMode === "summary" && (
                <div className="p-6">
                  <StudentSkillsChart student={selectedStudent} />
                  
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

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Activités récentes</h3>
                    <div className="space-y-2">
                      {getStudentActivities(selectedStudent.id).slice(0, 3).map((activity) => (
                        <div key={activity.id} className="p-3 border rounded-lg flex justify-between items-center">
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">{activity.date}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {activity.competences.map(code => (
                              <Badge key={code} variant="outline" className="bg-blue-50">{code}</Badge>
                            ))}
                            {activity.result === "success" ? (
                              <CheckCircle2 size={18} className="text-green-500" />
                            ) : activity.result === "failed" ? (
                              <XCircle size={18} className="text-red-500" />
                            ) : null}
                          </div>
                        </div>
                      ))}
                      {getStudentActivities(selectedStudent.id).length > 3 && (
                        <Button variant="outline" className="w-full gap-2 mt-2" onClick={() => setViewMode("activities")}>
                          <FileText size={16} />
                          <span>Voir toutes les activités ({getStudentActivities(selectedStudent.id).length})</span>
                        </Button>
                      )}
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
                      getStudentActivities(selectedStudent.id).map((activity) => (
                        <div key={activity.id} className={`border rounded-lg p-4 hover:bg-accent/5 ${
                          activity.result === "failed" ? "border-red-200 bg-red-50" : ""
                        }`}>
                          <div className="flex justify-between">
                            <h4 className="font-medium">{activity.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">{activity.date}</span>
                              {activity.result === "success" ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">Réussie</Badge>
                              ) : activity.result === "failed" ? (
                                <Badge className="bg-red-100 text-red-800 border-red-200">Échouée</Badge>
                              ) : null}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Équipement: {activity.equipment}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {activity.competences.map(comp => {
                              const competence = selectedStudent.competencesAcquises.find(c => c.code === comp);
                              return competence ? (
                                <div key={comp} className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(competence.niveau)}`}>
                                  {comp} - {getStatus(competence.niveau)}
                                </div>
                              ) : (
                                <div key={comp} className="text-xs px-2 py-1 rounded-full border bg-gray-100">
                                  {comp} - Non évaluée
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-3 pt-3 border-t flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs">
                              <Calendar size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground">{activity.date}</span>
                            </div>
                            <div className="text-xs">
                              Validé par: <span className="font-medium">
                                {selectedStudent.competencesAcquises.find(c => 
                                  activity.competences.includes(c.code)
                                )?.valideePar || "Non spécifié"}
                              </span>
                            </div>
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
            <Button 
              className="mt-6 gap-2" 
              variant="outline"
              onClick={() => setNewStudentModalOpen(true)}
            >
              <Plus size={16} />
              <span>Ajouter un nouvel élève</span>
            </Button>
          </BlurryCard>
        )}
      </div>
      
      <NewStudentForm 
        open={newStudentModalOpen}
        onOpenChange={setNewStudentModalOpen}
        onStudentCreated={handleAddStudent}
        existingStudents={students}
      />
    </div>
  );
};

export default StudentProgress;
