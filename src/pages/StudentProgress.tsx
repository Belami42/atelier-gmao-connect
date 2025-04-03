
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Users, Filter } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import StudentCompetenciesTracker from "@/components/students/StudentCompetenciesTracker";
import { Eleve, NiveauFormation } from "@/types/mspc";

const StudentProgress = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);
  
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
  
  // Filtrer les élèves selon la recherche
  const filteredStudents = mockStudents.filter(student => 
    student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={16} />
            <span>Nouvel élève</span>
          </Button>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
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

      <BlurryCard className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
            <Button variant="outline" size="sm" className="gap-2">
              <FileText size={16} />
              <span>Exporter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Users size={16} />
              <span>Groupe</span>
            </Button>
          </div>
        </div>
      </BlurryCard>

      <BlurryCard className="p-6 bg-gradient-to-b from-white to-blue-50">
        <StudentCompetenciesTracker 
          students={filteredStudents}
          selectedStudentId={selectedStudentId}
          onStudentSelect={setSelectedStudentId}
        />
      </BlurryCard>
    </div>
  );
};

export default StudentProgress;
