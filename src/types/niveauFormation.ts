
export enum NiveauFormation {
  SECONDE = "SECONDE",
  PREMIERE = "PREMIERE",
  TERMINALE = "TERMINALE",
}

export type NiveauFormationType = NiveauFormation | null;

export const getDisplayFromNiveauFormation = (niveau: NiveauFormation): string => {
  switch (niveau) {
    case NiveauFormation.SECONDE:
      return "2nde PMIA";
    case NiveauFormation.PREMIERE:
      return "1ère MSPC";
    case NiveauFormation.TERMINALE:
      return "Term. MSPC";
    default:
      return "Non défini";
  }
};
