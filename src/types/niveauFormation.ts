
// Define as constant enum values for use in comparisons
export enum NiveauFormation {
  SECONDE = "2PMIA",
  PREMIERE = "1MSPC",
  TERMINALE = "TMSPC"
}

export type NiveauFormationType = "2PMIA" | "1MSPC" | "TMSPC";

export const niveauDisplayNames: Record<NiveauFormationType, string> = {
  "2PMIA": "2nde PMIA",
  "1MSPC": "1ère MSPC",
  "TMSPC": "Term. MSPC"
};

// Helper function to get display name from enum
export const getDisplayFromNiveauFormation = (niveau: NiveauFormation | NiveauFormationType): string => {
  return niveauDisplayNames[niveau as NiveauFormationType];
};
