
// Define the NiveauFormation enum with the correct values
export enum NiveauFormation {
  SECONDE = "2PMIA",
  PREMIERE = "1MSPC",
  TERMINALE = "TMSPC",
}

// Export the type to be used throughout the application
export type NiveauFormationType = NiveauFormation;

// Helper function to convert from the display format to the enum value
export const getNiveauFormationFromDisplay = (display: string): NiveauFormation => {
  switch (display) {
    case "2nde":
    case "2nde PMIA":
      return NiveauFormation.SECONDE;
    case "1ère":
    case "1ère MSPC":
      return NiveauFormation.PREMIERE;
    case "Terminale":
    case "Term. MSPC":
    case "Terminale MSPC":
      return NiveauFormation.TERMINALE;
    default:
      // Default to first year if unknown
      return NiveauFormation.SECONDE;
  }
};

// Helper function to convert from enum value to display format
export const getDisplayFromNiveauFormation = (niveau: NiveauFormation): string => {
  switch (niveau) {
    case NiveauFormation.SECONDE:
      return "2nde PMIA";
    case NiveauFormation.PREMIERE:
      return "1ère MSPC";
    case NiveauFormation.TERMINALE:
      return "Term. MSPC";
    default:
      return String(niveau);
  }
};
