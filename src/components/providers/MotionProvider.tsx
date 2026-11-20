"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

interface MotionProviderProps {
  children: ReactNode;
}

/** Applies user reduced-motion preferences across all Motion primitives. */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
