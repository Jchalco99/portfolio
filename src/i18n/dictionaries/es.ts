import type { Dictionary } from "../types";

export const esDictionary = {
  localeLabel: "ES",
  meta: {
    title: "Portfolio Fullstack | C# (.NET) y TypeScript / React",
    description:
      "Portfolio profesional de desarrollo Fullstack equilibrado entre backend en C# y .NET e interfaces web con JavaScript, TypeScript y React.",
    projectNotFoundTitle: "Proyecto no encontrado",
  },
  nav: {
    stack: "Stack",
    projects: "Proyectos",
    methodology: "Enfoque",
    contact: "Contacto",
    primaryNavLabel: "Navegación principal",
    skipToContent: "Saltar al contenido principal",
    menuLabel: "Menú",
    closeLabel: "Cerrar",
    homeAriaLabel: "Ir al inicio",
    languageSwitcherLabel: "Selector de idioma",
    menuOpenLabel: "Abrir menú de navegación",
    menuCloseLabel: "Cerrar menú de navegación",
  },
  cv: {
    ctaShort: "Descargar CV",
    downloadEs: "Descargar CV en Español (PDF)",
    downloadEn: "Download CV in English (PDF)",
    formatNote: "Formato PDF listo para descarga directa.",
  },
  hero: {
    greetingBadge: "Hola, soy",
    rolePrefix: "Especialista en Backend C# (.NET) y Frontend JavaScript, TypeScript & React",
    headline: "Ingeniería Fullstack equilibrada entre C# (.NET) y React con TypeScript.",
    subheadline:
      "Construyo sistemas completos desde el modelado de datos y reglas de negocio hasta interfaces web accesibles, tipadas y mantenibles.",
    primaryCta: "Ver proyectos",
    secondaryCta: "Descargar CV (ES)",
    downloadCvCta: "Descargar CV",
    viewProjectsCta: "Ver Proyectos",
    imageAlt: "Retrato profesional",
    imagePlaceholderTitle: "Espacio reservado para imagen",
    imagePlaceholderPath: "public/images/hero-portrait.jpg",
    imagePlaceholderHint: "Asigna la ruta en src/content/profile.ts (PROFILE.heroImage)",
    scrollDownLabel: "Desplazarse a la sección de stack técnico",
    diagramTitle: "Arquitectura por capas",
    diagramHint: "Selecciona una capa para ver responsabilidades.",
    layerActiveLabel: "Capa activa",
    boundaryHeading: "Frontera de datos",
    responsibilitiesHeading: "Enfoque técnico",
    stepCounterLabel: "Capa",
    layers: {
      ui: {
        label: "Interfaz Web",
        tech: "React / TypeScript / CSS",
        scope: "Frontend",
        boundary: "UI React -> Contrato HTTP/JSON",
        summary:
          "Componentes reutilizables, manejo de estados de carga y error, y navegación accesible.",
        highlights: [
          "Componentes tipados con estados de carga, vacío y error",
          "Accesibilidad por teclado y diseño responsivo",
        ],
      },
      api: {
        label: "Contrato API",
        tech: "HTTP / REST / Validación",
        scope: "Fullstack",
        boundary: "Cliente React <-> Servicios .NET",
        summary:
          "Esquemas de entrada y salida consistentes entre el cliente web y los servicios backend.",
        highlights: [
          "DTOs alineados entre respuestas .NET y tipos TypeScript",
          "Validación de entrada y códigos HTTP consistentes",
        ],
      },
      domain: {
        label: "Lógica de Negocio",
        tech: "C# / .NET / Arquitectura Limpia",
        scope: "Backend",
        boundary: "Contrato API <-> Persistencia",
        summary:
          "Casos de uso desacoplados de la infraestructura, reglas del dominio y pruebas unitarias.",
        highlights: [
          "Casos de uso y reglas de dominio aislados en C#/.NET",
          "Pruebas unitarias desacopladas de la infraestructura",
        ],
      },
      data: {
        label: "Persistencia",
        tech: "SQL / Bases de Datos Relacionales",
        scope: "Backend",
        boundary: "Dominio .NET -> Motor SQL",
        summary:
          "Diseño de esquemas normalizados, integridad referencial y consultas eficientes.",
        highlights: [
          "Esquemas relacionales normalizados e integridad referencial",
          "Consultas SQL eficientes y migraciones controladas",
        ],
      },
    },
  },
  stack: {
    title: "Stack Tecnológico",
    subtitle:
      "Tecnologías, herramientas y modelos con los que desarrollo interfaces modernas, servicios backend en .NET, bases de datos relacionales y flujos asistidos por IA.",
    backendTag: "Backend / C# y .NET",
    frontendTag: "Frontend / JS, TS y React",
    integrationTag: "Integración Fullstack",
    capabilitiesLabel: "Capacidades clave",
    technologiesLabel: "Tecnologías",
  },
  projects: {
    title: "Proyectos",
    subtitle:
      "Casos técnicos organizados por arquitectura, decisiones en C# y soluciones en React/TypeScript.",
    filters: {
      all: "Todos",
      fullstack: "Fullstack",
      backend: "Backend C#",
      frontend: "Frontend React/TS",
    },
    emptyStatusBadge: "Registro activo · 0 proyectos publicados",
    emptyTitle: "Próximos proyectos en preparación",
    emptyDescription:
      "Esta sección está preparada para publicar los próximos proyectos reales con su arquitectura, tecnologías usadas, enlace desplegado y repositorio en GitHub.",
    emptyStructureTitle: "Qué incluirá cada caso técnico",
    emptyContactCta: "Consultar sobre proyectos",
    emptyHint: "Ruta del registro: src/content/projects/index.ts",
    emptyTemplateHint: "Plantilla tipada: src/content/projects/_template.ts",
    filterGroupLabel: "Filtrar proyectos por enfoque",
    featuredLabel: "Destacado",
    moreDecisionsHint: "más en el caso técnico",
    noFilterMatches: "No hay proyectos publicados en esta categoría.",
    resetFilter: "Ver todos",
    backendTab: "Decisiones C# / .NET",
    frontendTab: "Decisiones JS / TS / React",
    viewCaseStudy: "Ver caso técnico",
    liveDemo: "Demo en vivo",
    sourceCode: "Repositorio",
    backToProjects: "Volver a proyectos",
    architectureTitle: "Arquitectura del sistema",
    architectureNodesHint:
      "Selecciona un nodo para inspeccionar su responsabilidad.",
    architectureLayers: {
      client: "Cliente",
      api: "API",
      domain: "Dominio",
      data: "Datos",
      infra: "Infraestructura",
    },
    decisionsTitle: "Decisiones técnicas por capa",
    decisionContextLabel: "Contexto",
    decisionChoiceLabel: "Decisión",
    decisionTradeoffLabel: "Compromiso",
    problemTitle: "Contexto y problema",
    stackTitle: "Stack utilizado",
    stackGroups: {
      backend: "Backend",
      frontend: "Frontend",
      database: "Base de datos",
      infrastructure: "Infraestructura",
    },
  },
  methodology: {
    title: "Cómo diseño y construyo software",
    subtitle:
      "Decisiones orientadas a mantener claridad entre el dominio, los contratos y la interfaz.",
  },
  contact: {
    title: "Contacto y CV",
    subtitle:
      "Descarga mi currículum en español o inglés, o envíame un mensaje directo.",
    cvPanelTitle: "Currículum Vitae",
    cvPanelDescription:
      "Versiones configuradas en PDF para lectura rápida y procesos técnicos.",
    directTitle: "Canales directos",
    emailNotConfigured:
      "Correo de contacto directo pendiente de configurar en src/content/profile.ts.",
    copyEmail: {
      idle: "Copiar correo",
      copied: "Correo copiado",
    },
    form: {
      title: "Enviar mensaje",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      subjectLabel: "Asunto",
      subjectPlaceholder: "Motivo del contacto",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame sobre el proyecto, vacante o consulta técnica...",
      submitIdle: "Preparar mensaje en Gmail",
      submitPending: "Preparando borrador...",
      simulationNote:
        "Al enviar, se abrirá un borrador en Gmail con tu asunto y mensaje listos para remitir.",
      resetAction: "Enviar otro mensaje",
    },
    validation: {
      name_too_short: "El nombre debe tener al menos 2 caracteres.",
      name_too_long: "El nombre no puede superar los 100 caracteres.",
      email_invalid: "Introduce un correo electrónico válido.",
      subject_too_short: "El asunto debe tener al menos 3 caracteres.",
      subject_too_long: "El asunto no puede superar los 140 caracteres.",
      message_too_short: "El mensaje debe tener al menos 15 caracteres.",
      message_too_long: "El mensaje no puede superar los 3000 caracteres.",
    },
    api: {
      invalidJson: "El cuerpo de la solicitud no es un JSON válido.",
      validationFailed: "Revisa los campos marcados antes de reenviar.",
      rateLimited: "Demasiados intentos seguidos. Espera un minuto antes de volver a intentarlo.",
      simulatedSuccess:
        "Borrador preparado en Gmail con tu mensaje listo para enviar a josejavierchalco2006@gmail.com.",
      serverError: "No se pudo procesar la solicitud en este momento.",
    },
  },
  footer: {
    tagline:
      "Desarrollo Fullstack equilibrado entre backend en C# / .NET e interfaces web con JavaScript, TypeScript y React.",
    navigationTitle: "Navegación",
    channelsTitle: "Canales y CV",
    rightsReserved: "Todos los derechos reservados.",
    cvEsShort: "CV Español (PDF)",
    cvEnShort: "CV English (PDF)",
    builtWith: "Construido con Next.js, TypeScript y Tailwind CSS.",
    backToTop: "Volver arriba",
  },
  notFound: {
    code: "404",
    title: "Ruta no encontrada",
    description: "El recurso o proyecto solicitado no existe en esta dirección.",
    backHome: "Volver al inicio",
  },
  foundation: {
    badge: "Paso 2 / Base técnica operativa",
    heading: "Base del portfolio configurada",
    description:
      "La estructura en Next.js 16, el sistema visual Grafito Arquitectónico, el enrutamiento bilingüe ES/EN, el registro tipado de proyectos y el endpoint de contacto ya están activos para construir las secciones en el Paso 3.",
    tokensTitle: "Paleta Dark Mode verificada",
    typographyTitle: "Escala tipográfica (Oswald / Plus Jakarta Sans / IBM Plex Mono)",
    statusTitle: "Estado actual de módulos",
    localeItem: "Idioma activo",
    cvPathsItem: "Rutas de CV configuradas",
    projectsCountItem: "Proyectos registrados",
    contactApiItem: "Endpoint de contacto",
    nextStepNote:
      "Paso siguiente: construir SiteHeader, Hero Interactivo, Stack equilibrado, Vitrina de Proyectos, Metodología y Contacto + CV.",
    pendingSectionNote:
      "Sección preparada para los siguientes pasos de implementación.",
  },
} satisfies Dictionary;
