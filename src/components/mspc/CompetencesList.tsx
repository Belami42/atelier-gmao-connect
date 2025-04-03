
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { COMPETENCES_MSPC, CompetenceCode, NiveauFormation } from "@/types/mspc";

interface CompetencesListProps {
  selectedCompetences?: CompetenceCode[];
  onSelectCompetence?: (code: CompetenceCode, selected: boolean) => void;
  niveau?: NiveauFormation;
  readOnly?: boolean;
}

const CompetencesList: React.FC<CompetencesListProps> = ({
  selectedCompetences = [],
  onSelectCompetence,
  niveau,
  readOnly = false
}) => {
  // Groupe les compétences par famille (C1, C2, etc.)
  const competencesByFamily = COMPETENCES_MSPC.reduce((acc, comp) => {
    const family = comp.code.substring(0, 2);
    if (!acc[family]) {
      acc[family] = [];
    }
    
    // Si un niveau est spécifié, ne montrer que les compétences de ce niveau
    if (niveau) {
      if (comp.niveau.includes(niveau)) {
        acc[family].push(comp);
      }
    } else {
      acc[family].push(comp);
    }
    
    return acc;
  }, {} as Record<string, typeof COMPETENCES_MSPC>);

  // Définir les titres des familles de compétences
  const familyTitles: Record<string, string> = {
    "C1": "Analyser",
    "C2": "Organiser et préparer",
    "C3": "Réaliser et mettre en œuvre",
    "C4": "Contrôler et valider",
    "C5": "Communiquer et rendre compte"
  };

  const getNiveauBadge = (niveaux: NiveauFormation[]) => {
    return (
      <div className="flex gap-1">
        {niveaux.includes("2nde") && (
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">2nde</Badge>
        )}
        {niveaux.includes("1ère") && (
          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">1ère</Badge>
        )}
        {niveaux.includes("Terminale") && (
          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Tle</Badge>
        )}
      </div>
    );
  };

  const handleCompetenceClick = (code: CompetenceCode) => {
    if (readOnly || !onSelectCompetence) return;
    
    const isSelected = selectedCompetences.includes(code);
    onSelectCompetence(code, !isSelected);
  };

  return (
    <Accordion type="multiple" className="w-full">
      {Object.keys(competencesByFamily).sort().map(family => (
        <AccordionItem key={family} value={family}>
          <AccordionTrigger className="text-md font-semibold hover:no-underline">
            {family} - {familyTitles[family]}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-2">
              {competencesByFamily[family].map(comp => (
                <div 
                  key={comp.code}
                  className={`
                    p-2 rounded-md flex items-start justify-between gap-2
                    ${!readOnly ? 'cursor-pointer hover:bg-blue-50' : ''}
                    ${selectedCompetences.includes(comp.code) ? 'bg-blue-100' : 'bg-gray-50'}
                  `}
                  onClick={() => handleCompetenceClick(comp.code)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comp.code}</span>
                      <span>{comp.libelle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {getNiveauBadge(comp.niveau)}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CompetencesList;
