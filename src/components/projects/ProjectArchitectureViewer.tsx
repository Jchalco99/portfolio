"use client";

import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowsLeftRight,
  Browsers,
  Cloud,
  Cpu,
  Database,
  type IconProps,
} from "@phosphor-icons/react";
import type {
  ArchitectureLayerKind,
  ArchitectureSpec,
} from "@/content/projects/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { EASE_PRECISE } from "@/lib/motion";

interface LayerPresentation {
  Icon: ComponentType<IconProps>;
  activeBorderClass: string;
  activeTextClass: string;
  badgeClass: string;
}

const LAYER_PRESENTATION: Record<ArchitectureLayerKind, LayerPresentation> = {
  client: {
    Icon: Browsers,
    activeBorderClass: "border-frontend bg-elevated",
    activeTextClass: "text-frontend",
    badgeClass: "bg-frontend-soft text-frontend",
  },
  api: {
    Icon: ArrowsLeftRight,
    activeBorderClass: "border-text-secondary bg-elevated",
    activeTextClass: "text-text-primary",
    badgeClass: "border border-border-strong bg-elevated text-text-primary",
  },
  domain: {
    Icon: Cpu,
    activeBorderClass: "border-accent bg-elevated",
    activeTextClass: "text-accent",
    badgeClass: "bg-accent-soft text-accent",
  },
  data: {
    Icon: Database,
    activeBorderClass: "border-accent bg-elevated",
    activeTextClass: "text-accent",
    badgeClass: "bg-accent-soft text-accent",
  },
  infra: {
    Icon: Cloud,
    activeBorderClass: "border-text-secondary bg-elevated",
    activeTextClass: "text-text-primary",
    badgeClass: "border border-border-strong bg-elevated text-text-secondary",
  },
};

interface ProjectArchitectureViewerProps {
  locale: Locale;
  architecture: ArchitectureSpec;
  labels: {
    title: string;
    hint: string;
    layers: Dictionary["projects"]["architectureLayers"];
  };
}

/**
 * Interactive case-study architecture inspector supporting optional SVG/image
 * system diagrams and WAI-ARIA vertical node tabs.
 */
export function ProjectArchitectureViewer({
  locale,
  architecture,
  labels,
}: ProjectArchitectureViewerProps) {
  const nodes = architecture.nodes;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes[0]?.id ?? ""
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = Math.max(
    0,
    nodes.findIndex((node) => node.id === selectedNodeId)
  );
  const activeNode = nodes[activeIndex] ?? nodes[0];

  const handleNodeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    if (nodes.length <= 1) {
      return;
    }

    let nextIndex: number | null = null;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % nodes.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + nodes.length) % nodes.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = nodes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const targetNode = nodes[nextIndex];
    if (targetNode) {
      setSelectedNodeId(targetNode.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-text-secondary text-pretty">
        {architecture.overview[locale]}
      </p>

      {architecture.diagramSrc && (
        <figure className="surface-inset overflow-hidden p-3 sm:p-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- Supports static SVG architecture diagrams under public/projects/ without enabling SVG in next/image */}
          <img
            src={architecture.diagramSrc}
            alt={architecture.diagramAlt?.[locale] ?? labels.title}
            width={1200}
            height={675}
            className="h-auto w-full rounded-[6px] object-contain"
          />
        </figure>
      )}

      {nodes.length > 0 && activeNode && (
        <div className="space-y-4">
          <p className="font-mono text-xs text-text-muted">{labels.hint}</p>

          <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={labels.title}
              className="space-y-2 lg:col-span-6"
            >
              {nodes.map((node, index) => {
                const isSelected = node.id === activeNode.id;
                const presentation = LAYER_PRESENTATION[node.layer];
                const Icon = presentation.Icon;

                return (
                  <button
                    key={node.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`case-arch-tab-${node.id}`}
                    aria-selected={isSelected}
                    aria-controls={`case-arch-panel-${node.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedNodeId(node.id)}
                    onKeyDown={(event) => handleNodeKeyDown(event, index)}
                    className={cn(
                      "flex min-h-[54px] w-full items-center justify-between gap-3 rounded-[8px] border px-3.5 py-2.5 text-left transition-[background-color,border-color] duration-150",
                      isSelected
                        ? presentation.activeBorderClass
                        : "border-border-subtle bg-inset hover:border-border-strong hover:bg-elevated/60"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon
                        size={17}
                        weight={isSelected ? "fill" : "regular"}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0",
                          isSelected
                            ? presentation.activeTextClass
                            : "text-text-secondary"
                        )}
                      />
                      <span
                        className={cn(
                          "truncate font-display text-sm font-semibold",
                          isSelected
                            ? "text-text-primary"
                            : "text-text-secondary"
                        )}
                      >
                        {node.label[locale]}
                      </span>
                    </span>

                    <span className="shrink-0 font-mono text-xs text-text-muted">
                      {node.technology}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`case-arch-panel-${activeNode.id}`}
              aria-labelledby={`case-arch-tab-${activeNode.id}`}
              tabIndex={0}
              className="surface-inset min-h-[156px] p-4 sm:p-5 lg:col-span-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: EASE_PRECISE }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={cn(
                        "rounded-[6px] px-2.5 py-0.5 font-mono text-[11px] font-medium",
                        LAYER_PRESENTATION[activeNode.layer].badgeClass
                      )}
                    >
                      {labels.layers[activeNode.layer]}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {activeNode.technology}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-text-primary">
                    {activeNode.label[locale]}
                  </h3>

                  <p className="text-sm leading-relaxed text-text-secondary text-pretty">
                    {activeNode.responsibility[locale]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
