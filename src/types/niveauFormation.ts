
export enum NiveauFormation {
  SECONDE = "2PMIA",
  PREMIERE = "1MSPC",
  TERMINALE = "TMSPC"
}

// Exporting NiveauFormationType as both a type and an enum reference
export type NiveauFormationType = NiveauFormation;

// French display strings that should be used for UI rendering
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

// String values sometimes used in the UI
export const NIVEAU_LABELS = {
  [NiveauFormation.SECONDE]: "2nde PMIA",
  [NiveauFormation.PREMIERE]: "1ère MSPC",
  [NiveauFormation.TERMINALE]: "Term. MSPC"
};
