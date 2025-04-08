
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Calendar, Award, ClipboardList, BookOpen, ArrowRight } from "lucide-react";
import { COMPETENCES_MSPC, CompetenceCode, Eleve, CompetenceAcquise } from "@/types/mspc";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface StudentCompetenciesTrackerProps {
  students: Eleve[];
  selectedStudentId?: string;
  onStudentSelect?: (studentId: string) => void;
}

const StudentCompetenciesTracker: React.FC<StudentCompetenciesTrackerProps> = ({
  students,
  selectedStudentId,
  onStudentSelect
}) => {
  const [filterLevel, setFilterLevel] = useState<string | "all">("all");
  
  const selectedStudent = selectedStudentId ? students.find(s => s.id === selectedStudentId) : null;
  
  // Regrouper les compétences par famille (C1, C2, etc.)
  const getCompetencesByFamily = () => {
    return COMPETENCES_MSPC.reduce((acc, comp) => {
      // Ne montrer que les compétences du niveau filtré
      if (filterLevel !== "all" && !comp.niveau.includes(filterLevel as any)) {
        return acc;
      }
      
      const family = comp.code.substring(0, 2);
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push(comp);
      return acc;
    }, {} as Record<string, typeof COMPETENCES_MSPC>);
  };
  
  const competencesByFamily = getCompetencesByFamily();
  
  // Vérifier si une compétence est acquise par l'élève
  const isCompetenceAcquired = (code: CompetenceCode): CompetenceAcquise | undefined => {
    return selectedStudent?.competencesAcquises.find(c => c.code === code);
  };
  
  // Calculer le pourcentage d'acquisition des compétences par famille
  const getAcquisitionRate = (family: string): number => {
    if (!selectedStudent) return 0;
    
    const compsInFamily = competencesByFamily[family] || [];
    if (compsInFamily.length === 0) return 0;
    
    const acquiredCount = compsInFamily.filter(comp => 
      selectedStudent.competencesAcquises.some(c => c.code === comp.code)
    ).length;
    
    return Math.round((acquiredCount / compsInFamily.length) * 100);
  };
  
  // Formatter les dates
  const formatDate = (date: Date | string): string => {
    return format(new Date(date), "d MMMM yyyy", { locale: fr });
  };
  
  // Définir les titres des familles de compétences
  const familyTitles: Record<string, string> = {
    "C1": "Analyser",
    "C2": "Organiser et préparer",
    "C3": "Réaliser et mettre en œuvre",
    "C4": "Contrôler et valider",
    "C5": "Communiquer et rendre compte"
  };
  
  // Style de badge selon le niveau d'acquisition
  const getNiveauBadgeStyle = (niveau: string) => {
    switch (niveau) {
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
  
  // Style de badge selon le niveau de classe
  const getClassBadgeStyle = (classe: string) => {
    switch (classe) {
      case "2PMIA":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "1MSPC":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "TMSPC":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100";
    }
  };
  
  // Calculer le pourcentage global d'acquisition
  const getGlobalAcquisitionRate = (): number => {
    if (!selectedStudent) return 0;
    
    const allRelevantCompetences = Object.values(competencesByFamily).flat();
    if (allRelevantCompetences.length === 0) return 0;
    
    const acquiredCount = allRelevantCompetences.filter(comp => 
      selectedStudent.competencesAcquises.some(c => c.code === comp.code)
    ).length;
    
    return Math.round((acquiredCount / allRelevantCompetences.length) * 100);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Élèves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map(student => (
                <Button 
                  key={student.id}
                  variant={selectedStudentId === student.id ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => onStudentSelect && onStudentSelect(student.id)}
                >
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    {student.prenom} {student.nom}
                  </span>
                  <Badge className={`${getClassBadgeStyle(student.classe)}`}>
                    {student.classe}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {selectedStudent && (
          <Card className="flex-[2]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Profil de {selectedStudent.prenom} {selectedStudent.nom}
                <Badge className={`ml-2 ${getClassBadgeStyle(selectedStudent.classe)}`}>
                  {selectedStudent.classe}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={(value) => setFilterLevel(value)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="2PMIA">2nde PMIA</TabsTrigger>
                  <TabsTrigger value="1MSPC">1ère MSPC</TabsTrigger>
                  <TabsTrigger value="TMSPC">Term. MSPC</TabsTrigger>
                </TabsList>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Progression globale</h3>
                    <div className="flex items-center gap-3">
                      <Progress value={getGlobalAcquisitionRate()} className="flex-1" />
                      <span className="text-sm font-medium">{getGlobalAcquisitionRate()}%</span>
                    </div>
                  </div>
                  
                  <Accordion type="multiple" className="w-full">
                    {Object.keys(competencesByFamily).sort().map(family => (
                      <AccordionItem key={family} value={family}>
                        <AccordionTrigger className="text-md font-semibold hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{family} - {familyTitles[family]}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={getAcquisitionRate(family)} className="w-24" />
                              <span className="text-sm font-medium">{getAcquisitionRate(family)}%</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-2">
                            {competencesByFamily[family].map(comp => {
                              const acquired = isCompetenceAcquired(comp.code);
                              return (
                                <div 
                                  key={comp.code}
                                  className={`p-3 rounded-md ${acquired ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{comp.code}</span>
                                        <span>{comp.libelle}</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                                    </div>
                                    {acquired ? (
                                      <Badge variant="outline" className={getNiveauBadgeStyle(acquired.niveau)}>
                                        {acquired.niveau}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="bg-gray-100">
                                        Non acquise
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {acquired && (
                                    <div className="mt-3 pt-3 border-t border-green-200 text-sm">
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>Validée le {formatDate(acquired.dateValidation)}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <ClipboardList className="h-3.5 w-3.5" />
                                        <span>Contexte: {acquired.contexte}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        <span>Validée par: {acquired.valideePar}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
      
      {selectedStudent && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-green-600" />
              Activités réalisées
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStudent.ordresTravauxRealises.length > 0 ? (
              <div className="space-y-4">
                {/* Ici, nous montrerions les activités réalisées par l'élève */}
                <p className="text-muted-foreground text-sm">
                  L'élève a réalisé {selectedStudent.ordresTravauxRealises.length} ordre(s) de travail.
                </p>
                
                <Button className="w-full gap-2" variant="outline">
                  <span>Voir toutes les activités</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Aucune activité enregistrée pour cet élève</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentCompetenciesTracker;
