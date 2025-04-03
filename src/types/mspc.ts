
// Types pour les compétences du référentiel Bac Pro MSPC
export type CompetenceCode = 
  | "C1.1" | "C1.2" | "C1.3" | "C1.4" 
  | "C2.1" | "C2.2" | "C2.3" | "C2.4" 
  | "C3.1" | "C3.2" | "C3.3" | "C3.4" 
  | "C4.1" | "C4.2" | "C4.3" 
  | "C5.1" | "C5.2" | "C5.3";

export type NiveauFormation = "2PMIA" | "1MSPC" | "TMSPC";

export type TypeMaintenance = "correctif" | "preventif_systematique" | "preventif_conditionnel" | "amelioratif";

export interface Competence {
  code: CompetenceCode;
  libelle: string;
  description: string;
  niveau: NiveauFormation[];
}

// Liste des compétences du référentiel
export const COMPETENCES_MSPC: Competence[] = [
  {
    code: "C1.1",
    libelle: "Analyser le fonctionnement et l'organisation d'un système",
    description: "Observer et analyser le fonctionnement d'un système pour comprendre sa structure et son organisation.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C1.2",
    libelle: "Analyser les solutions mécaniques réalisant les fonctions techniques",
    description: "Étudier les mécanismes et composants mécaniques pour comprendre leur rôle et fonctionnement.",
    niveau: ["1MSPC", "TMSPC"]
  },
  {
    code: "C1.3",
    libelle: "Analyser les solutions de gestion, de distribution, de conversion des énergies pneumatique, hydraulique et électrique",
    description: "Comprendre les systèmes de distribution d'énergie et leur fonctionnement.",
    niveau: ["1MSPC", "TMSPC"]
  },
  {
    code: "C1.4",
    libelle: "Analyser les solutions de traitement des informations",
    description: "Étudier les systèmes d'acquisition, traitement et transmission des informations.",
    niveau: ["TMSPC"]
  },
  {
    code: "C2.1",
    libelle: "Préparer son intervention",
    description: "Rassembler les informations, outils et pièces nécessaires avant d'intervenir.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C2.2",
    libelle: "Émettre des hypothèses, rechercher et identifier la ou les causes d'un dysfonctionnement",
    description: "Analyser les symptômes et chercher l'origine d'une panne.",
    niveau: ["1MSPC", "TMSPC"]
  },
  {
    code: "C2.3",
    libelle: "Organiser son intervention en toute sécurité",
    description: "Planifier les étapes d'intervention en respectant les consignes de sécurité.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C2.4",
    libelle: "Proposer et justifier une solution d'amélioration",
    description: "Suggérer des modifications pour optimiser le système.",
    niveau: ["TMSPC"]
  },
  {
    code: "C3.1",
    libelle: "Réaliser des opérations de surveillance et d'inspection",
    description: "Effectuer des relevés, mesures et observations régulières sur un équipement.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C3.2",
    libelle: "Réaliser des opérations de maintenance préventive",
    description: "Effectuer les tâches d'entretien planifiées selon un calendrier établi.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C3.3",
    libelle: "Réaliser des opérations de maintenance corrective",
    description: "Réparer un équipement suite à une panne ou dysfonctionnement.",
    niveau: ["1MSPC", "TMSPC"]
  },
  {
    code: "C3.4",
    libelle: "Réaliser des opérations d'adaptation et d'amélioration",
    description: "Mettre en œuvre des modifications pour optimiser un système.",
    niveau: ["TMSPC"]
  },
  {
    code: "C4.1",
    libelle: "Réaliser les contrôles et mesures liés à l'intervention",
    description: "Vérifier le bon fonctionnement après intervention.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C4.2",
    libelle: "Analyser les résultats des mesures et des contrôles",
    description: "Interpréter les données mesurées pour évaluer l'état du système.",
    niveau: ["1MSPC", "TMSPC"]
  },
  {
    code: "C4.3",
    libelle: "Valider le bon fonctionnement du système",
    description: "Confirmer que le système fonctionne correctement après intervention.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C5.1",
    libelle: "Signaler, communiquer, rendre compte",
    description: "Transmettre les informations pertinentes suite à une intervention.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C5.2",
    libelle: "Renseigner les documents de maintenance",
    description: "Compléter les fiches d'intervention et autres documents de suivi.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"]
  },
  {
    code: "C5.3",
    libelle: "Actualiser les documents techniques",
    description: "Mettre à jour les schémas et documentations suite à des modifications.",
    niveau: ["TMSPC"]
  }
];

// Types pour les ordres de travail MSPC
export interface OrdreTravail {
  id: string;
  numero: string;
  equipementId: string;
  typeMaintenance: TypeMaintenance;
  description: string;
  priorite: "basse" | "normale" | "haute" | "urgente";
  dateCreation: Date | string;
  dateSouhaitee: Date | string;
  technicienAssigne?: string;
  statut: "cree" | "assigne" | "en_cours" | "attente_pieces" | "realise" | "cloture" | "valide";
  rapport?: RapportIntervention;
  competencesRequises: CompetenceCode[];
  niveau: NiveauFormation;
}

export interface RapportIntervention {
  dateDebut: Date | string;
  dateFin: Date | string;
  diagnostic?: string;
  actionsRealisees: string[];
  piecesUtilisees: string[];
  tempsPasse: number; // en minutes
  observations?: string;
  competencesMobilisees: CompetenceCode[];
  valide: boolean;
  validePar?: string;
}

// Structure pour le suivi des élèves
export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  classe: NiveauFormation;
  competencesAcquises: CompetenceAcquise[];
  ordresTravauxRealises: string[]; // IDs des ordres de travail complétés
}

export interface CompetenceAcquise {
  code: CompetenceCode;
  dateValidation: Date | string;
  niveau: "découverte" | "application" | "maîtrise";
  contexte: string; // Description brève du contexte dans lequel la compétence a été validée
  valideePar: string; // ID ou nom de l'enseignant ayant validé
  ordresTravaux: string[]; // IDs des ordres de travail liés à cette compétence
}
