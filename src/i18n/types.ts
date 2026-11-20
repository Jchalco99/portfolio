import type { Locale } from "./config";

export type LocalizedText = Record<Locale, string>;

export type ContactErrorCode =
  | "name_too_short"
  | "name_too_long"
  | "email_invalid"
  | "subject_too_short"
  | "subject_too_long"
  | "message_too_short"
  | "message_too_long";

export interface HeroLayerCopy {
  label: string;
  tech: string;
  scope: string;
  boundary: string;
  summary: string;
  highlights: readonly [string, string];
}

export interface Dictionary {
  localeLabel: string;
  meta: {
    title: string;
    description: string;
    projectNotFoundTitle: string;
  };
  nav: {
    stack: string;
    projects: string;
    methodology: string;
    contact: string;
    primaryNavLabel: string;
    skipToContent: string;
    menuLabel: string;
    closeLabel: string;
    homeAriaLabel: string;
    languageSwitcherLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
  };
  cv: {
    ctaShort: string;
    downloadEs: string;
    downloadEn: string;
    formatNote: string;
  };
  hero: {
    greetingBadge: string;
    rolePrefix: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    downloadCvCta: string;
    viewProjectsCta: string;
    imageAlt: string;
    imagePlaceholderTitle: string;
    imagePlaceholderPath: string;
    imagePlaceholderHint: string;
    scrollDownLabel: string;
    diagramTitle: string;
    diagramHint: string;
    layerActiveLabel: string;
    boundaryHeading: string;
    responsibilitiesHeading: string;
    stepCounterLabel: string;
    layers: {
      ui: HeroLayerCopy;
      api: HeroLayerCopy;
      domain: HeroLayerCopy;
      data: HeroLayerCopy;
    };
  };
  stack: {
    title: string;
    subtitle: string;
    backendTag: string;
    frontendTag: string;
    integrationTag: string;
    capabilitiesLabel: string;
    technologiesLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      fullstack: string;
      backend: string;
      frontend: string;
    };
    emptyStatusBadge: string;
    emptyTitle: string;
    emptyDescription: string;
    emptyStructureTitle: string;
    emptyContactCta: string;
    emptyHint: string;
    emptyTemplateHint: string;
    filterGroupLabel: string;
    featuredLabel: string;
    moreDecisionsHint: string;
    noFilterMatches: string;
    resetFilter: string;
    backendTab: string;
    frontendTab: string;
    viewCaseStudy: string;
    liveDemo: string;
    sourceCode: string;
    backToProjects: string;
    architectureTitle: string;
    architectureNodesHint: string;
    architectureLayers: {
      client: string;
      api: string;
      domain: string;
      data: string;
      infra: string;
    };
    decisionsTitle: string;
    decisionContextLabel: string;
    decisionChoiceLabel: string;
    decisionTradeoffLabel: string;
    problemTitle: string;
    stackTitle: string;
    stackGroups: {
      backend: string;
      frontend: string;
      database: string;
      infrastructure: string;
    };
  };
  methodology: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cvPanelTitle: string;
    cvPanelDescription: string;
    directTitle: string;
    emailNotConfigured: string;
    copyEmail: {
      idle: string;
      copied: string;
    };
    form: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitIdle: string;
      submitPending: string;
      simulationNote: string;
      resetAction: string;
    };
    validation: Record<ContactErrorCode, string>;
    api: {
      invalidJson: string;
      validationFailed: string;
      rateLimited: string;
      simulatedSuccess: string;
      serverError: string;
    };
  };
  footer: {
    tagline: string;
    navigationTitle: string;
    channelsTitle: string;
    rightsReserved: string;
    cvEsShort: string;
    cvEnShort: string;
    builtWith: string;
    backToTop: string;
  };
  notFound: {
    code: string;
    title: string;
    description: string;
    backHome: string;
  };
  foundation: {
    badge: string;
    heading: string;
    description: string;
    tokensTitle: string;
    typographyTitle: string;
    statusTitle: string;
    localeItem: string;
    cvPathsItem: string;
    projectsCountItem: string;
    contactApiItem: string;
    nextStepNote: string;
    pendingSectionNote: string;
  };
}
