
// This type represents the different education levels in the MSPC program
export type NiveauFormation = "2PMIA" | "1MSPC" | "TMSPC";

// Helper function to convert from the display format to the enum value
export const getNiveauFormationFromDisplay = (display: string): NiveauFormation => {
  switch (display) {
    case "2nde":
    case "2nde PMIA":
      return "2PMIA";
    case "1ère":
    case "1ère MSPC":
      return "1MSPC";
    case "Terminale":
    case "Term. MSPC":
    case "Terminale MSPC":
      return "TMSPC";
    default:
      // Default to first year if unknown
      return "2PMIA";
  }
};

// Helper function to convert from enum value to display format
export const getDisplayFromNiveauFormation = (niveau: NiveauFormation): string => {
  switch (niveau) {
    case "2PMIA":
      return "2nde PMIA";
    case "1MSPC":
      return "1ère MSPC";
    case "TMSPC":
      return "Term. MSPC";
    default:
      return niveau;
  }
};
