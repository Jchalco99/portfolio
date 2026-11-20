"use client";

import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowsLeftRight,
  Browsers,
  CaretRight,
  Cpu,
  Database,
  type IconProps,
} from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { EASE_PRECISE, SPRING_SNAPPY } from "@/lib/motion";

type LayerId = keyof Dictionary["hero"]["layers"];
type LayerAccent = "frontend" | "bridge" | "backend";

interface LayerMeta {
  id: LayerId;
  step: string;
  accent: LayerAccent;
  connectorLabel: string | null;
  Icon: ComponentType<IconProps>;
}

const LAYER_ORDER: readonly LayerMeta[] = [
  {
    id: "ui",
    step: "01",
    accent: "frontend",
    connectorLabel: "HTTP / JSON",
    Icon: Browsers,
  },
  {
    id: "api",
    step: "02",
    accent: "bridge",
    connectorLabel: "Use Cases / DTOs",
    Icon: ArrowsLeftRight,
  },
  {
    id: "domain",
    step: "03",
    accent: "backend",
    connectorLabel: "EF Core / SQL",
    Icon: Cpu,
  },
  {
    id: "data",
    step: "04",
    accent: "backend",
    connectorLabel: null,
    Icon: Database,
  },
];

const ACTIVE_BORDER_BY_ACCENT: Record<LayerAccent, string> = {
  frontend: "border-frontend",
  bridge: "border-text-secondary",
  backend: "border-accent",
};

const ACTIVE_TEXT_BY_ACCENT: Record<LayerAccent, string> = {
  frontend: "text-frontend",
  bridge: "text-text-primary",
  backend: "text-accent",
};

const SCOPE_BADGE_BY_ACCENT: Record<LayerAccent, string> = {
  frontend: "bg-frontend-soft text-frontend",
  bridge: "border border-border-strong bg-elevated text-text-primary",
  backend: "bg-accent-soft text-accent",
};

interface ArchitectureMapProps {
  hero: Pick<
    Dictionary["hero"],
    | "diagramTitle"
    | "diagramHint"
    | "layerActiveLabel"
    | "boundaryHeading"
    | "responsibilitiesHeading"
    | "stepCounterLabel"
    | "layers"
  >;
}

/**
 * Interactive 4-layer Fullstack architecture explorer using WAI-ARIA vertical tabs.
 * Maps Frontend React/TS, API Contract, C#/.NET Domain, and SQL Persistence.
 */
export function ArchitectureMap({ hero }: ArchitectureMapProps) {
  const [activeLayer, setActiveLayer] = useState<LayerId>("ui");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = LAYER_ORDER.findIndex((layer) => layer.id === activeLayer);
  const activeMeta = LAYER_ORDER[activeIndex] ?? LAYER_ORDER[0];
  const activeCopy = hero.layers[activeMeta.id];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % LAYER_ORDER.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + LAYER_ORDER.length) % LAYER_ORDER.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = LAYER_ORDER.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextLayer = LAYER_ORDER[nextIndex];
    setActiveLayer(nextLayer.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const getConnectorLineClass = (index: number): string => {
    const isAdjacentActive = activeIndex === index || activeIndex === index + 1;
    if (!isAdjacentActive) {
      return "bg-border-subtle";
    }
    if (index === 0) {
      return "bg-frontend";
    }
    if (index === 2) {
      return "bg-accent";
    }
    return "bg-text-secondary";
  };

  return (
    <div className="surface-card p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold text-text-primary">
            {hero.diagramTitle}
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">{hero.diagramHint}</p>
        </div>
        <span className="shrink-0 font-mono text-xs tabular-nums text-text-secondary">
          {hero.stepCounterLabel} {activeMeta.step}/04
        </span>
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={hero.diagramTitle}
        className="mt-4"
      >
        {LAYER_ORDER.map((layer, index) => {
          const isActive = layer.id === activeLayer;
          const layerCopy = hero.layers[layer.id];
          const Icon = layer.Icon;

          return (
            <div key={layer.id}>
              <button
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`arch-tab-${layer.id}`}
                aria-selected={isActive}
                aria-controls={`arch-panel-${layer.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveLayer(layer.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  "relative w-full min-h-[58px] rounded-[8px] border px-3.5 py-3 text-left transition-[background-color,border-color] duration-150",
                  isActive
                    ? "border-transparent bg-transparent"
                    : "border-border-subtle bg-inset/75 hover:border-border-strong hover:bg-elevated/60"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="hero-active-layer"
                    transition={SPRING_SNAPPY}
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-[8px] border bg-elevated",
                      ACTIVE_BORDER_BY_ACCENT[layer.accent]
                    )}
                  />
                )}

                <span className="relative z-10 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        isActive
                          ? ACTIVE_TEXT_BY_ACCENT[layer.accent]
                          : "text-text-muted"
                      )}
                    >
                      {layer.step}
                    </span>
                    <Icon
                      size={18}
                      weight={isActive ? "fill" : "regular"}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0",
                        isActive
                          ? ACTIVE_TEXT_BY_ACCENT[layer.accent]
                          : "text-text-secondary"
                      )}
                    />
                    <span
                      className={cn(
                        "truncate font-display text-sm font-semibold",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {layerCopy.label}
                    </span>
                  </span>

                  <span className="flex items-center justify-between gap-2 pl-7 sm:justify-end sm:pl-0">
                    <span
                      className={cn(
                        "font-mono text-xs",
                        isActive ? "text-text-secondary" : "text-text-muted"
                      )}
                    >
                      {layerCopy.tech}
                    </span>
                    <CaretRight
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 transition-transform duration-150",
                        isActive
                          ? cn("translate-x-0.5", ACTIVE_TEXT_BY_ACCENT[layer.accent])
                          : "text-text-muted opacity-50"
                      )}
                    />
                  </span>
                </span>
              </button>

              {layer.connectorLabel && (
                <div
                  aria-hidden="true"
                  className="flex h-5 items-center gap-3 pl-5"
                >
                  <span
                    className={cn(
                      "h-full w-px transition-colors duration-150",
                      getConnectorLineClass(index)
                    )}
                  />
                  <span className="font-mono text-[11px] text-text-muted">
                    {layer.connectorLabel}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`arch-panel-${activeLayer}`}
        aria-labelledby={`arch-tab-${activeLayer}`}
        tabIndex={0}
        className="surface-inset mt-5 min-h-[196px] p-4 sm:p-5"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE_PRECISE }}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-text-muted">
                  {hero.layerActiveLabel}: {activeCopy.tech}
                </p>
                <h3 className="mt-0.5 font-display text-base font-semibold text-text-primary">
                  {activeCopy.label}
                </h3>
              </div>

              <span
                className={cn(
                  "shrink-0 rounded-[6px] px-2.5 py-0.5 font-mono text-[11px] font-medium",
                  SCOPE_BADGE_BY_ACCENT[activeMeta.accent]
                )}
              >
                {activeCopy.scope}
              </span>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-text-secondary text-pretty">
              {activeCopy.summary}
            </p>

            <div className="mt-4 grid gap-3 border-t border-border-subtle pt-3.5 sm:grid-cols-12">
              <div className="sm:col-span-5">
                <p className="font-mono text-[11px] text-text-muted">
                  {hero.boundaryHeading}
                </p>
                <p className="mt-1 font-mono text-xs text-text-primary">
                  {activeCopy.boundary}
                </p>
              </div>

              <div className="sm:col-span-7">
                <p className="font-mono text-[11px] text-text-muted">
                  {hero.responsibilitiesHeading}
                </p>
                <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-text-secondary">
                  {activeCopy.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[1px]",
                          activeMeta.accent === "frontend"
                            ? "bg-frontend"
                            : activeMeta.accent === "backend"
                              ? "bg-accent"
                              : "bg-text-secondary"
                        )}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
