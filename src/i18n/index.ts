import { es } from "./es";
import { en } from "./en";
import { it } from "./it";
import { fr } from "./fr";

// Idiomas disponibles
export const LOCALES = ["es", "en", "it", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

// Mapa de traducciones
export const translations = { es, en, it, fr };

// Nombres legibles para el selector de idioma
export const LOCALE_LABELS: Record<Locale, string> = {
    es: "Español",
    en: "English",
    it: "Italiano",
    fr: "Français",
};

// Tipo inferido de las traducciones
export type Translations = typeof es;

// Función principal: recibe el idioma y devuelve las traducciones
export function useTranslations(locale: Locale) {
    return translations[locale] ?? translations[DEFAULT_LOCALE];
}

// Detecta el idioma guardado en localStorage (para el browser)
export function getLocaleFromStorage(): Locale {
    if (typeof localStorage === "undefined") return DEFAULT_LOCALE;
    const stored = localStorage.getItem("locale");
    if (stored && LOCALES.includes(stored as Locale)) {
        return stored as Locale;
    }
    return DEFAULT_LOCALE;
}

// Guarda el idioma elegido
export function setLocale(locale: Locale) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("locale", locale);
    }
}