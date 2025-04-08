
export enum NiveauFormation {
  SECONDE = "2PMIA",
  PREMIERE = "1MSPC",
  TERMINALE = "TMSPC"
}

// Use export type for re-exporting types when isolatedModules is enabled
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
