"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PROFILE } from "@/content/profile";
import {
  hasIntroPlayedInSession,
  markIntroPlayedInSession,
} from "@/lib/intro-state";
import { EASE_PRECISE } from "@/lib/motion";

type LoaderPhase = "drawing" | "splitting" | "done";

const GATE_EASE: readonly [number, number, number, number] = [0.76, 0, 0.24, 1];

const CORE_IGNITION_NODES = [
  { label: "C#", color: "#A855F7" },
  { label: ".NET", color: "#8B5CF6" },
  { label: "REACT", color: "#61DAFB" },
  { label: "TYPESCRIPT", color: "#3178C6" },
  { label: "JAVASCRIPT", color: "#F7DF1E" },
] as const;

/**
 * Full-screen architectural intro sequence that runs once per initial browser load:
 * traces the JC emblem, reveals JOSE CHALCO with sequential core-stack ignition,
 * and parts two cyan-rimmed horizontal gates to unveil the Hero section.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<LoaderPhase>(() =>
    hasIntroPlayedInSession() ? "done" : "drawing"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === "done") {
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const rafSkip = window.requestAnimationFrame(() => {
        markIntroPlayedInSession();
        setPhase("done");
      });
      return () => window.cancelAnimationFrame(rafSkip);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const durationMs = 920;
    const startTime = performance.now();
    let rafId = 0;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    rafId = window.requestAnimationFrame(updateProgress);

    const splitTimer = window.setTimeout(() => {
      markIntroPlayedInSession();
      document.body.style.overflow = previousOverflow;
      setPhase("splitting");
    }, 1000);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, 1580);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(splitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
    // Run only on initial mount when phase starts in "drawing"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") {
    return null;
  }

  const isSplitting = phase === "splitting";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 overflow-hidden select-none ${
        isSplitting ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Top Gate */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isSplitting ? "-100%" : "0%" }}
        transition={{ duration: 0.56, ease: GATE_EASE }}
        className="fixed inset-x-0 top-0 h-1/2 overflow-hidden border-b border-[#22D3EE]/50 bg-[#08090B] shadow-[0_8px_32px_rgba(6,182,212,0.18)]"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute left-1/2 top-full h-[360px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Bottom Gate */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isSplitting ? "100%" : "0%" }}
        transition={{ duration: 0.56, ease: GATE_EASE }}
        className="fixed inset-x-0 bottom-0 h-1/2 overflow-hidden border-t border-[#22D3EE]/50 bg-[#08090B] shadow-[0_-8px_32px_rgba(6,182,212,0.18)]"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[360px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Center Architectural Emblem, Name Reveal, Stack Ignition & Laser Seam */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isSplitting ? 0 : 1,
          scale: isSplitting ? 0.96 : 1,
        }}
        transition={{ duration: 0.22, ease: EASE_PRECISE }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
      >
        {/* Horizontal Cyan Laser Seam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0.4 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.85, ease: EASE_PRECISE }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-px w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent shadow-[0_0_16px_rgba(34,211,238,0.85)]"
        />

        <div className="relative flex flex-col items-center gap-6 bg-[#08090B]/90 px-8 py-6">
          {/* Animated Architectural SVG Frame around Monogram */}
          <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              className="absolute inset-0 h-full w-full"
            >
              <motion.polygon
                points="20,6 100,6 114,20 114,100 100,114 20,114 6,100 6,20"
                stroke="#2A3441"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.72, ease: EASE_PRECISE }}
              />
              <motion.path
                d="M6 34 V20 L20 6 H34 M86 6 H100 L114 20 V34 M114 86 V100 L100 114 H86 M34 114 H20 L6 100 V86"
                stroke="#22D3EE"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: EASE_PRECISE }}
              />
            </svg>

            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.38, delay: 0.14, ease: EASE_PRECISE }}
              className="font-display text-3xl font-bold tracking-widest text-[#F8FAFC] sm:text-4xl"
            >
              {PROFILE.monogram}
            </motion.span>
          </div>

          {/* Masked Name Reveal */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.48, delay: 0.22, ease: EASE_PRECISE }}
              className="text-center font-display text-3xl font-bold uppercase tracking-[0.2em] text-[#F8FAFC] sm:text-5xl"
            >
              {PROFILE.name}
            </motion.p>
          </div>

          {/* Sequential Core Stack Ignition */}
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {CORE_IGNITION_NODES.map((node, index) => (
              <motion.li
                key={node.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.36 + index * 0.09,
                  ease: EASE_PRECISE,
                }}
                className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider text-[#CBD5E1]"
              >
                <span
                  style={{
                    backgroundColor: node.color,
                    boxShadow: `0 0 10px ${node.color}`,
                  }}
                  className="h-1.5 w-1.5 rounded-full"
                />
                <span>{node.label}</span>
              </motion.li>
            ))}
          </ul>

          {/* Monospace Progress Readout */}
          <span className="font-mono text-xs font-semibold tabular-nums tracking-[0.25em] text-[#22D3EE]">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>
      </motion.div>
    </div>
  );
}
