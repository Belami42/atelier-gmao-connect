
export enum NiveauFormation {
  SECONDE_PMIA = "2PMIA",
  PREMIERE_MSPC = "1MSPC",
  TERMINALE_MSPC = "TMSPC"
}

export type NiveauFormationType = "2PMIA" | "1MSPC" | "TMSPC";

export const getNiveauFormationLabel = (niveau: NiveauFormationType): string => {
  switch (niveau) {
    case "2PMIA":
      return "2nde PMIA";
    case "1MSPC":
      return "1ère MSPC";
    case "TMSPC":
      return "Terminale MSPC";
    default:
      return niveau;
  }
};

// Function to get display name from NiveauFormation enum or string
export const getDisplayFromNiveauFormation = (niveau: NiveauFormationType): string => {
  return getNiveauFormationLabel(niveau);
};
