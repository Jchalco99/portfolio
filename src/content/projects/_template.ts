import type { ProjectEntry } from "./schema";

/**
 * Duplicate this file as `src/content/projects/<slug>.ts`, replace every field
 * with real project data, and import it into `src/content/projects/index.ts`.
 * Optional diagram assets can be stored under `public/projects/<slug>/`.
 */
export const projectTemplate = {
  slug: "project-slug-example",
  status: "draft",
  featured: false,
  order: 1,
  focus: "fullstack",
  title: {
    es: "Título real del proyecto",
    en: "Real project title",
  },
  summary: {
    es: "Resumen breve del sistema, su objetivo principal y el alcance cubierto.",
    en: "Short summary of the system, its main goal, and the implemented scope.",
  },
  problem: {
    es: "Descripción concreta del problema técnico o de negocio resuelto.",
    en: "Concrete description of the business or engineering problem solved.",
  },
  stack: {
    backend: ["C#", ".NET 8", "ASP.NET Core Web API"],
    frontend: ["TypeScript", "React", "Next.js"],
    database: ["PostgreSQL"],
    infrastructure: ["Docker"],
  },
  architecture: {
    diagramSrc: "/projects/project-slug-example/architecture.svg",
    diagramAlt: {
      es: "Diagrama de arquitectura por capas del proyecto",
      en: "Layered system architecture diagram of the project",
    },
    overview: {
      es: "Flujo principal entre cliente web, API REST, capa de aplicación y base de datos.",
      en: "Primary request flow across web client, REST API, application layer, and database.",
    },
    nodes: [
      {
        id: "web-client",
        layer: "client",
        label: {
          es: "Cliente Web",
          en: "Web Client",
        },
        technology: "React + TypeScript",
        responsibility: {
          es: "Vistas tipadas, validación de formularios y gestión de estado de interfaz.",
          en: "Typed views, form validation, and UI state management.",
        },
      },
      {
        id: "api-layer",
        layer: "api",
        label: {
          es: "API HTTP",
          en: "HTTP API",
        },
        technology: "ASP.NET Core",
        responsibility: {
          es: "Controladores mínimos, validación de entrada y serialización JSON.",
          en: "Thin endpoints, request validation, and JSON serialization.",
        },
      },
      {
        id: "domain-layer",
        layer: "domain",
        label: {
          es: "Dominio y Casos de Uso",
          en: "Domain & Use Cases",
        },
        technology: "C# / Clean Architecture",
        responsibility: {
          es: "Reglas de negocio aisladas de infraestructura y pruebas unitarias.",
          en: "Business rules isolated from infrastructure concerns with unit tests.",
        },
      },
      {
        id: "database-layer",
        layer: "data",
        label: {
          es: "Base de Datos",
          en: "Database",
        },
        technology: "SQL Relacional",
        responsibility: {
          es: "Esquema normalizado, migraciones e integridad referencial.",
          en: "Normalized schema, migrations, and referential integrity.",
        },
      },
    ],
  },
  decisions: {
    backend: [
      {
        title: {
          es: "Decisión de arquitectura en C# / .NET",
          en: "Architecture decision in C# / .NET",
        },
        context: {
          es: "Condición o restricción real encontrada en el servidor.",
          en: "Actual server-side constraint or requirement encountered.",
        },
        decision: {
          es: "Implementación concreta elegida en C# o SQL.",
          en: "Concrete implementation chosen in C# or SQL.",
        },
        tradeoff: {
          es: "Compromiso asumido frente a alternativas descartadas.",
          en: "Trade-off accepted compared to rejected alternatives.",
        },
      },
    ],
    frontend: [
      {
        title: {
          es: "Decisión técnica en JS / TS / React",
          en: "Technical decision in JS / TS / React",
        },
        context: {
          es: "Requisito de estado, rendimiento o experiencia de uso en cliente.",
          en: "Client state, performance, or usability requirement.",
        },
        decision: {
          es: "Solución implementada en TypeScript y React.",
          en: "Solution implemented with TypeScript and React.",
        },
        tradeoff: {
          es: "Compromiso asumido frente a otras opciones.",
          en: "Trade-off accepted compared to other approaches.",
        },
      },
    ],
  },
  links: {
    liveUrl: undefined,
    repoUrl: undefined,
  },
} satisfies ProjectEntry;
