import type { LocalizedText } from "@/i18n/types";

export interface MethodologyStep {
  index: string;
  layer: "backend" | "integration" | "frontend" | "architecture";
  title: LocalizedText;
  description: LocalizedText;
}

export const METHODOLOGY_PRINCIPLES: readonly MethodologyStep[] = [
  {
    index: "01",
    layer: "backend",
    title: {
      es: "Dominio y datos antes que detalles de vista",
      en: "Domain and data model before UI details",
    },
    description: {
      es: "Modelo primero las entidades, relaciones SQL e invariantes de negocio en C# para que la interfaz refleje reglas reales y no suposiciones.",
      en: "I define entities, SQL relationships, and business invariants in C# first so the interface reflects real domain rules rather than assumptions.",
    },
  },
  {
    index: "02",
    layer: "integration",
    title: {
      es: "Contratos explícitos entre API y cliente",
      en: "Explicit contracts between API and client",
    },
    description: {
      es: "Valido entradas en ambos extremos y mantengo esquemas de respuesta predecibles para que frontend y backend evolucionen sin romperse.",
      en: "I validate input at both boundaries and keep response shapes predictable so frontend and backend can evolve without silent breakage.",
    },
  },
  {
    index: "03",
    layer: "frontend",
    title: {
      es: "Interfaz tratada con criterio de ingeniería",
      en: "UI treated as engineering work",
    },
    description: {
      es: "Diseño flujos completos contemplando estado vacío, carga, errores de red, accesibilidad por teclado y rendimiento en móvil.",
      en: "I build complete interaction flows covering empty, loading, and network error states alongside keyboard accessibility and mobile performance.",
    },
  },
  {
    index: "04",
    layer: "architecture",
    title: {
      es: "Modularidad proporcional al problema",
      en: "Modularity proportional to the problem",
    },
    description: {
      es: "Separo capas para facilitar pruebas y mantenimiento sin añadir abstracciones innecesarias donde una solución directa es más clara.",
      en: "I separate layers to support testing and maintenance without introducing unnecessary abstractions where a direct design is clearer.",
    },
  },
];
