import type { ProjectEntry } from "./schema";

/**
 * Central project registry populated with verified projects from
 * https://github.com/Jchalco99.
 */
export const PROJECTS: readonly ProjectEntry[] = [
  {
    slug: "reto-fullstack-minero",
    status: "published",
    featured: true,
    order: 1,
    focus: "fullstack",
    title: {
      es: "Reto Fullstack Minero",
      en: "Mining Fleet & Maintenance Platform",
    },
    summary: {
      es: "Aplicación web fullstack para el registro de equipos mineros, control de horómetro y gestión de mantenimientos preventivos. API REST con Clean Architecture, autenticación JWT con roles y despliegue automatizado.",
      en: "Fullstack web application for mining equipment registration, hour-meter tracking, and preventive maintenance management. Clean Architecture REST API, role-based JWT auth, and automated deployment.",
    },
    problem: {
      es: "Controlar el ciclo de mantenimiento preventivo de maquinaria minera según el avance del horómetro, aislando los registros por usuario y ofreciendo supervisión global para administradores.",
      en: "Track preventive maintenance cycles for mining machinery based on hour-meter usage, isolating equipment per user while giving administrators global oversight.",
    },
    stack: {
      backend: ["Node.js", "Express", "TypeScript", "Prisma", "JWT"],
      frontend: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router"],
      database: ["PostgreSQL"],
      infrastructure: ["Docker", "Vercel", "Fly.io"],
    },
    architecture: {
      overview: {
        es: "Cliente SPA en React bajo Feature-Sliced Design conectado a una API REST en Clean Architecture con Prisma y PostgreSQL.",
        en: "React SPA structured with Feature-Sliced Design connected to a Clean Architecture REST API backed by Prisma and PostgreSQL.",
      },
      nodes: [
        {
          id: "mining-client",
          layer: "client",
          label: { es: "Frontend SPA", en: "SPA Frontend" },
          technology: "React 19 + TypeScript",
          responsibility: {
            es: "Vistas organizadas con Feature-Sliced Design, rutas protegidas y gestión de horómetros.",
            en: "Feature-Sliced Design views, protected routes, and equipment hour-meter management.",
          },
        },
        {
          id: "mining-api",
          layer: "api",
          label: { es: "API REST + Auth", en: "REST API + Auth" },
          technology: "Express 5 + JWT",
          responsibility: {
            es: "Endpoints REST, validación de acceso con tokens Bearer y control de roles USER/ADMIN.",
            en: "REST endpoints, Bearer token verification, and USER/ADMIN role enforcement.",
          },
        },
        {
          id: "mining-domain",
          layer: "domain",
          label: { es: "Dominio y Casos de Uso", en: "Domain & Use Cases" },
          technology: "Clean Architecture",
          responsibility: {
            es: "Reglas de cálculo y reinicio de ciclos de mantenimiento preventivo desacopladas de infraestructura.",
            en: "Preventive maintenance calculation and reset rules decoupled from infrastructure.",
          },
        },
        {
          id: "mining-db",
          layer: "data",
          label: { es: "Persistencia", en: "Persistence" },
          technology: "Prisma + PostgreSQL",
          responsibility: {
            es: "Esquema relacional y migraciones automatizadas sobre PostgreSQL en la nube.",
            en: "Relational schema and automated migrations over cloud PostgreSQL.",
          },
        },
      ],
    },
    decisions: {
      backend: [
        {
          title: {
            es: "Clean Architecture + Prisma Adapter PG",
            en: "Clean Architecture + Prisma PG Adapter",
          },
          context: {
            es: "Separar la lógica de cálculo de mantenimiento preventivo del framework HTTP y del acceso a base de datos.",
            en: "Keep preventive maintenance rules decoupled from the HTTP framework and database driver.",
          },
          decision: {
            es: "Estructurar domain, application, infrastructure y presentation en TypeScript con contratos explícitos de repositorio.",
            en: "Organize domain, application, infrastructure, and presentation layers in TypeScript behind explicit repository interfaces.",
          },
          tradeoff: {
            es: "Mayor número de archivos iniciales a cambio de reglas de dominio claras y fáciles de mantener.",
            en: "More initial boilerplate in exchange for clear, maintainable domain boundaries.",
          },
        },
      ],
      frontend: [
        {
          title: {
            es: "Feature-Sliced Design (FSD) en React 19",
            en: "Feature-Sliced Design (FSD) in React 19",
          },
          context: {
            es: "Escalar módulos de autenticación, listado de equipos y registro de mantenimientos sin acoplar vistas.",
            en: "Scale authentication, equipment tracking, and maintenance features without tightly coupled views.",
          },
          decision: {
            es: "Dividir la UI en app, pages, widgets, features, entities y shared con TailwindCSS v4 y componentes Radix.",
            en: "Split the UI into app, pages, widgets, features, entities, and shared slices using TailwindCSS v4 and Radix UI.",
          },
          tradeoff: {
            es: "Disciplina estricta de importaciones entre capas para mantener el código ordenado.",
            en: "Strict cross-layer import discipline required to keep boundaries clean.",
          },
        },
      ],
    },
    links: {
      liveUrl: "https://reto-mineros-frontend.vercel.app",
      repoUrl: "https://github.com/Jchalco99/prueba_tecnica",
    },
  },
  {
    slug: "tesis-app",
    status: "published",
    featured: true,
    order: 2,
    focus: "frontend",
    title: {
      es: "Tesis App — Interfaz de Chatbot Académico",
      en: "Tesis App — Academic Search Chatbot UI",
    },
    summary: {
      es: "Interfaz web de un chatbot para la búsqueda de tesis y pretesis, con integración de APIs REST, formularios validados con React Hook Form + Zod y componentes accesibles.",
      en: "Web UI for a thesis and pre-thesis search chatbot featuring REST API integration, React Hook Form + Zod validation, and accessible UI components.",
    },
    problem: {
      es: "Facilitar la consulta y exploración de tesis y pretesis mediante una interfaz conversacional intuitiva, responsiva y con manejo claro de formularios y estados.",
      en: "Make thesis and proposal discovery easier through an intuitive conversational interface with clear form validation and responsive state handling.",
    },
    stack: {
      backend: [],
      frontend: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
        "REST APIs",
      ],
      database: [],
      infrastructure: [],
    },
    architecture: {
      overview: {
        es: "Aplicación frontend en Next.js y TypeScript enfocada en experiencia conversacional, validación de formularios y consumo ordenado de APIs REST.",
        en: "Next.js and TypeScript frontend focused on conversational search UX, schema-validated forms, and structured REST API consumption.",
      },
      nodes: [
        {
          id: "tesis-ui",
          layer: "client",
          label: { es: "UI Conversacional", en: "Conversational UI" },
          technology: "Next.js + React + Radix UI",
          responsibility: {
            es: "Interfaz de chat, comandos rápidos y componentes accesibles estilizados con Tailwind CSS.",
            en: "Chat interface, command palette, and accessible Radix-based components styled with Tailwind CSS.",
          },
        },
        {
          id: "tesis-forms",
          layer: "domain",
          label: { es: "Validación y Formularios", en: "Forms & Validation" },
          technology: "React Hook Form + Zod",
          responsibility: {
            es: "Validación tipada de parámetros de búsqueda antes de consultar el servicio.",
            en: "Type-safe validation of search inputs prior to dispatching API requests.",
          },
        },
        {
          id: "tesis-api",
          layer: "api",
          label: { es: "Consumo REST", en: "REST Integration" },
          technology: "HTTP / JSON",
          responsibility: {
            es: "Integración de respuestas del servicio de búsqueda con manejo de estados de carga y error.",
            en: "Integration with search backend endpoints including loading and error states.",
          },
        },
      ],
    },
    decisions: {
      backend: [],
      frontend: [
        {
          title: {
            es: "Validación declarativa con React Hook Form y Zod",
            en: "Declarative validation with React Hook Form and Zod",
          },
          context: {
            es: "Evitar envíos inconsistentes en consultas y filtros académicos desde la interfaz del chatbot.",
            en: "Prevent malformed search queries and filter submissions from the chatbot UI.",
          },
          decision: {
            es: "Centralizar los esquemas de entrada con Zod conectados mediante @hookform/resolvers y primitivas Radix UI.",
            en: "Centralize input schemas with Zod wired via @hookform/resolvers and accessible Radix UI primitives.",
          },
          tradeoff: {
            es: "Requiere mantener sincronizados los esquemas cliente con los contratos del backend.",
            en: "Requires keeping client schemas aligned with backend contract changes.",
          },
        },
      ],
    },
    links: {
      repoUrl: "https://github.com/Jchalco99/tesis-app",
    },
  },
  {
    slug: "recetas-app",
    status: "published",
    featured: true,
    order: 3,
    focus: "fullstack",
    title: {
      es: "Recetas App",
      en: "Recipes Fullstack App",
    },
    summary: {
      es: "Aplicación web fullstack de recetas culinarias con frontend en Next.js y backend REST en Express con autenticación JWT, carga de imágenes y persistencia en PostgreSQL con Sequelize.",
      en: "Fullstack culinary recipes web application with a Next.js frontend and an Express REST backend featuring JWT authentication, image uploads, and PostgreSQL persistence via Sequelize.",
    },
    problem: {
      es: "Permitir a los usuarios registrarse, publicar recetas con imágenes y consultar catálogos de recetas de forma segura mediante sesiones JWT.",
      en: "Enable users to register, publish recipes with image uploads, and browse recipe catalogs securely over JWT-authenticated endpoints.",
    },
    stack: {
      backend: ["JavaScript", "Express", "Sequelize", "JWT", "REST APIs"],
      frontend: ["React", "Next.js", "TypeScript"],
      database: ["PostgreSQL"],
      infrastructure: [],
    },
    architecture: {
      overview: {
        es: "Frontend desacoplado en Next.js + TypeScript consumiendo una API REST en Express con Sequelize, Multer y PostgreSQL.",
        en: "Decoupled Next.js + TypeScript frontend consuming an Express REST API with Sequelize, Multer, and PostgreSQL.",
      },
      nodes: [
        {
          id: "recetas-client",
          layer: "client",
          label: { es: "Cliente Web", en: "Web Client" },
          technology: "Next.js + React + TypeScript",
          responsibility: {
            es: "Navegación de recetas, vistas de detalle y formularios de publicación.",
            en: "Recipe browsing, detail views, and publishing forms.",
          },
        },
        {
          id: "recetas-api",
          layer: "api",
          label: { es: "API REST + Uploads", en: "REST API + Uploads" },
          technology: "Express 5 + JWT + Multer",
          responsibility: {
            es: "Validación de rutas con express-validator, autenticación JWT y gestión de imágenes.",
            en: "Request validation with express-validator, JWT authentication, and image upload handling.",
          },
        },
        {
          id: "recetas-db",
          layer: "data",
          label: { es: "Base de Datos", en: "Database" },
          technology: "Sequelize + PostgreSQL",
          responsibility: {
            es: "Modelado relacional de usuarios y recetas con soporte de semillas iniciales.",
            en: "Relational modeling of users and recipes with database seeding.",
          },
        },
      ],
    },
    decisions: {
      backend: [
        {
          title: {
            es: "API REST desacoplada con Express, Sequelize y Multer",
            en: "Decoupled REST API with Express, Sequelize, and Multer",
          },
          context: {
            es: "Soportar autenticación de usuarios y carga de archivos multimedia en recetas desde un cliente separado.",
            en: "Support user authentication and recipe media uploads from a separate frontend client.",
          },
          decision: {
            es: "Separar el servidor en Express con validación mediante express-validator, JWT y ORM Sequelize sobre PostgreSQL.",
            en: "Expose a dedicated Express server using express-validator, JWT tokens, and Sequelize ORM over PostgreSQL.",
          },
          tradeoff: {
            es: "Dos repositorios independientes (frontend y backend) que requieren coordinación de CORS y variables de entorno.",
            en: "Two separate repositories (frontend and backend) requiring CORS and environment coordination.",
          },
        },
      ],
      frontend: [
        {
          title: {
            es: "Interfaz en Next.js con React 19 y TypeScript",
            en: "Next.js interface with React 19 and TypeScript",
          },
          context: {
            es: "Construir una interfaz tipada para explorar y administrar recetas consumiendo endpoints REST externos.",
            en: "Build a strongly typed UI to explore and manage recipes against external REST endpoints.",
          },
          decision: {
            es: "Utilizar App Router en Next.js 15 con TypeScript para tipar respuestas y formularios.",
            en: "Use Next.js 15 App Router with TypeScript for response and form typing.",
          },
          tradeoff: {
            es: "Requiere manejo explícito de tokens y estados en el cliente frente a rutas SSR monolíticas.",
            en: "Requires explicit client-side token and state handling compared to monolithic SSR.",
          },
        },
      ],
    },
    links: {
      repoUrl: "https://github.com/Jchalco99/recetas-app-frontend",
    },
  },
];
