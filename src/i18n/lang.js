// returns the text in the current language
export const pick = (value, lang) => (value && typeof value === "object" && !Array.isArray(value) && "en" in value ? value[lang] : value);

export function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}
