import type { LocalizedText } from "@/i18n/types";

export type StackCategoryId =
  | "frontend"
  | "backend"
  | "databases"
  | "apisTooling"
  | "ai";

export type StackTechTier = "core" | "primary" | "supporting";

export type StackTechId =
  | "react"
  | "typescript"
  | "javascript"
  | "html5"
  | "css3"
  | "tailwind"
  | "csharp"
  | "dotnet"
  | "aspnet"
  | "ef"
  | "sqlserver"
  | "sql"
  | "mysql"
  | "rest"
  | "postman"
  | "swagger"
  | "git"
  | "github"
  | "scrum"
  | "chatbots"
  | "genai"
  | "claude"
  | "gemini"
  | "codex";

export interface StackTechItem {
  id: StackTechId;
  name: string;
  tier: StackTechTier;
  brandColor: string;
}

export interface StackCategory {
  id: StackCategoryId;
  featured: boolean;
  title: LocalizedText;
  items: readonly StackTechItem[];
}

export const STACK_CATEGORIES: readonly StackCategory[] = [
  {
    id: "frontend",
    featured: true,
    title: {
      es: "Frontend",
      en: "Frontend",
    },
    items: [
      { id: "react", name: "React", tier: "core", brandColor: "#61DAFB" },
      { id: "typescript", name: "TypeScript", tier: "core", brandColor: "#3178C6" },
      { id: "javascript", name: "JavaScript", tier: "core", brandColor: "#F7DF1E" },
      { id: "html5", name: "HTML5", tier: "supporting", brandColor: "#E34F26" },
      { id: "css3", name: "CSS3", tier: "supporting", brandColor: "#38BDF8" },
      { id: "tailwind", name: "Tailwind CSS", tier: "supporting", brandColor: "#38BDF8" },
    ],
  },
  {
    id: "backend",
    featured: true,
    title: {
      es: "Backend",
      en: "Backend",
    },
    items: [
      { id: "csharp", name: "C#", tier: "core", brandColor: "#A855F7" },
      { id: "dotnet", name: ".NET", tier: "core", brandColor: "#8B5CF6" },
      { id: "aspnet", name: "ASP.NET", tier: "supporting", brandColor: "#60A5FA" },
      { id: "ef", name: "Entity Framework", tier: "supporting", brandColor: "#A78BFA" },
    ],
  },
  {
    id: "databases",
    featured: false,
    title: {
      es: "Bases de datos",
      en: "Databases",
    },
    items: [
      { id: "sqlserver", name: "SQL Server", tier: "primary", brandColor: "#F87171" },
      { id: "sql", name: "SQL", tier: "supporting", brandColor: "#38BDF8" },
      { id: "mysql", name: "MySQL", tier: "supporting", brandColor: "#F59E0B" },
    ],
  },
  {
    id: "apisTooling",
    featured: false,
    title: {
      es: "APIs y Herramientas",
      en: "APIs & Tooling",
    },
    items: [
      { id: "rest", name: "REST APIs", tier: "primary", brandColor: "#22D3EE" },
      { id: "git", name: "Git", tier: "primary", brandColor: "#F05032" },
      { id: "postman", name: "Postman", tier: "supporting", brandColor: "#FF6C37" },
      { id: "swagger", name: "Swagger", tier: "supporting", brandColor: "#85EA2D" },
      { id: "github", name: "GitHub", tier: "supporting", brandColor: "#E2E8F0" },
      { id: "scrum", name: "Scrum", tier: "supporting", brandColor: "#38BDF8" },
    ],
  },
  {
    id: "ai",
    featured: false,
    title: {
      es: "IA",
      en: "AI",
    },
    items: [
      { id: "chatbots", name: "Chatbots", tier: "supporting", brandColor: "#22D3EE" },
      { id: "genai", name: "Generative AI", tier: "supporting", brandColor: "#C084FC" },
      { id: "claude", name: "Claude", tier: "supporting", brandColor: "#D97757" },
      { id: "gemini", name: "Gemini", tier: "supporting", brandColor: "#60A5FA" },
      { id: "codex", name: "Codex", tier: "supporting", brandColor: "#34D399" },
    ],
  },
];
