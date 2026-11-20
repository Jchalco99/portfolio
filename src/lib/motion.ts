import type { Transition, ViewportOptions } from "motion/react";

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

export const EASE_PRECISE: readonly [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const REVEAL_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.2,
};
