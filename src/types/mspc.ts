export enum NiveauFormation {
  SECONDE = "2PMIA",
  PREMIERE = "1MSPC",
  TERMINALE = "TMSPC"
}

export type NiveauFormationType = NiveauFormation;

export function getDisplayFromNiveauFormation(niveau: NiveauFormation): string {
  switch(niveau) {
    case NiveauFormation.SECONDE:
      return "2nde PMIA";
    case NiveauFormation.PREMIERE:
      return "1ère MSPC";
    case NiveauFormation.TERMINALE:
      return "Term. MSPC";
    default:
      return niveau;
  }
}

export type CompetenceCode =
  | "C1.1"
  | "C1.2"
  | "C1.3"
  | "C2.1"
  | "C2.2"
  | "C2.3"
  | "C3.1"
  | "C3.2"
  | "C3.3"
  | "C4.1"
  | "C4.2"
  | "C4.3"
  | "C5.1"
  | "C5.2"
  | "C5.3";

export interface Competence {
  code: CompetenceCode;
  libelle: string;
  description: string;
  niveau: ("2PMIA" | "1MSPC" | "TMSPC")[];
}

export const COMPETENCES_MSPC: Competence[] = [
  {
    code: "C1.1",
    libelle: "Analyser le fonctionnement d’un système",
    description:
      "Identifier les constituants et leurs liaisons, les entrées/sorties, les fonctions assurées.",
    niveau: ["2PMIA", "1MSPC", "TMSPC"],
  },
  {
    code: "C1.2",
    libelle: "Énoncer des hypothèses",
    description:
      "Proposer des causes possibles suite à un dysfonctionnement observé.",
    niveau: ["1MSPC", "TMSPC"],
  },
  {
    code: "C1.3",
    libelle: "Valider une solution technique",
    description:
      "Comparer les performances attendues et mesurées, contrôler la conformité par rapport au cahier des charges.",
    niveau: ["TMSPC"],
  },
  {
    code: "C2.1",
    libelle: "Organiser une intervention",
    description:
      "Préparer les outils, les équipements de contrôle, les pièces de rechange, les documents techniques.",
    niveau: ["2PMIA", "1MSPC"],
  },
  {
    code: "C2.2",
    libelle: "Planifier une activité",
    description:
      "Établir un planning des tâches à réaliser en tenant compte des contraintes de temps, de ressources et de sécurité.",
    niveau: ["1MSPC", "TMSPC"],
  },
  {
    code: "C2.3",
    libelle: "Gérer les priorités",
    description:
      "Identifier les actions urgentes et importantes, adapter l’organisation en fonction des aléas.",
    niveau: ["TMSPC"],
  },
  {
    code: "C3.1",
    libelle: "Réaliser une intervention suivant un protocole",
    description:
      "Appliquer les procédures de maintenance, utiliser les instruments de mesure, respecter les consignes de sécurité.",
    niveau: ["2PMIA", "1MSPC"],
  },
  {
    code: "C3.2",
    libelle: "Mettre en œuvre une amélioration",
    description:
      "Modifier un réglage, remplacer un composant, optimiser un paramètre pour améliorer les performances.",
    niveau: ["1MSPC", "TMSPC"],
  },
  {
    code: "C3.3",
    libelle: "Effectuer une remise en service",
    description:
      "Contrôler le bon fonctionnement après une intervention, réinitialiser les systèmes, vérifier les sécurités.",
    niveau: ["TMSPC"],
  },
  {
    code: "C4.1",
    libelle: "Contrôler la qualité d’une intervention",
    description:
      "Vérifier la conformité par rapport aux normes, aux spécifications constructeur, aux règles de l’art.",
    niveau: ["2PMIA", "1MSPC"],
  },
  {
    code: "C4.2",
    libelle: "Diagnostiquer un dysfonctionnement",
    description:
      "Identifier les causes possibles, localiser la panne, proposer des solutions de réparation.",
    niveau: ["1MSPC", "TMSPC"],
  },
  {
    code: "C4.3",
    libelle: "Valider le résultat d’un contrôle",
    description:
      "Interpréter les données mesurées, comparer avec les seuils d’acceptabilité, conclure sur la validité.",
    niveau: ["TMSPC"],
  },
  {
    code: "C5.1",
    libelle: "Communiquer oralement",
    description:
      "Décrire une situation, expliquer une démarche, argumenter un choix.",
    niveau: ["2PMIA", "1MSPC"],
  },
  {
    code: "C5.2",
    libelle: "Rédiger un compte rendu",
    description:
      "Décrire les opérations réalisées, les résultats obtenus, les problèmes rencontrés.",
    niveau: ["1MSPC", "TMSPC"],
  },
  {
    code: "C5.3",
    libelle: "Transmettre des informations",
    description:
      "Utiliser les outils numériques, les supports visuels, les schémas, les notices.",
    niveau: ["TMSPC"],
  },
];

export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  classe: NiveauFormationType;
  competencesAcquises: CompetenceAcquise[];
  ordresTravauxRealises: string[];
  referent: string;
}

export interface CompetenceAcquise {
  code: CompetenceCode;
  dateValidation: string;
  niveau: "découverte" | "application" | "maîtrise";
  contexte: string;
  valideePar: string;
  ordresTravaux: string[];
}

export type Activity = {
  id: string;
  title: string;
  date: string;
  type: string;
  equipment: string;
  status: string;
  competences: CompetenceCode[];
  student: string;
  result: "success" | "failed" | "pending";
};
