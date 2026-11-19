// Sample data for the in-browser demos. The rules mirror the Custom Metadata
// records shipped in the two repositories; owners and cases are made up.

export const LEAD_INDUSTRIES = ["Technology", "Finance", "Healthcare", "Retail"];
export const LEAD_COUNTRIES = ["France", "Morocco", "Germany"];

// Lead_Assignment_Rule__mdt, evaluated by ascending priority (most specific first)
export const LEAD_RULES = [
  { name: "Tech_France", industry: "Technology", country: "France", priority: 10, owner: "Tech France owner" },
  { name: "Finance_Any", industry: "Finance", country: null, priority: 20, owner: "Finance owner" },
  { name: "Default_Catchall", industry: null, country: null, priority: 999, owner: "Catch-all owner" },
];

export const matchLeadRule = (industry, country) =>
  LEAD_RULES.findIndex((r) => (!r.industry || r.industry === industry) && (!r.country || r.country === country));

// Case_Escalation_Rule__mdt
export const CASE_RULES = {
  Medium: { to: "High", hours: 48 },
  High: { to: "Critical", hours: 24 },
};

export const SAMPLE_CASES = [
  { id: "00001042", subject: { en: "Login page error", fr: "Erreur page de connexion" }, priority: "Medium", age: 52 },
  { id: "00001043", subject: { en: "Invoice not generated", fr: "Facture non générée" }, priority: "High", age: 30 },
  {
    id: "00001044",
    subject: { en: "Password reset", fr: "Réinitialisation mot de passe" },
    priority: "Medium",
    age: 12,
  },
  { id: "00001045", subject: { en: "Data export stuck", fr: "Export de données bloqué" }, priority: "High", age: 6 },
  { id: "00001046", subject: { en: "API timeout", fr: "Timeout API" }, priority: "Low", age: 90 },
];
