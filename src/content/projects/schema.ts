import type { LocalizedText } from "@/i18n/types";

export type ProjectFocus = "fullstack" | "backend" | "frontend";

export type ProjectStatus = "published" | "draft";

export type ArchitectureLayerKind =
  | "client"
  | "api"
  | "domain"
  | "data"
  | "infra";

export interface ArchitectureNode {
  id: string;
  layer: ArchitectureLayerKind;
  label: LocalizedText;
  technology: string;
  responsibility: LocalizedText;
}

export interface ArchitectureSpec {
  diagramSrc?: string;
  diagramAlt?: LocalizedText;
  overview: LocalizedText;
  nodes: ArchitectureNode[];
}

export interface TechnicalDecision {
  title: LocalizedText;
  context: LocalizedText;
  decision: LocalizedText;
  tradeoff: LocalizedText;
}

export interface ProjectStack {
  backend: string[];
  frontend: string[];
  database: string[];
  infrastructure: string[];
}

export interface ProjectLinks {
  liveUrl?: string;
  repoUrl?: string;
}

export interface ProjectEntry {
  slug: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  focus: ProjectFocus;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  stack: ProjectStack;
  architecture: ArchitectureSpec;
  decisions: {
    backend: TechnicalDecision[];
    frontend: TechnicalDecision[];
  };
  links: ProjectLinks;
}
