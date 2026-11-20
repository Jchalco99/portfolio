"use client";

import { useEffect, useRef } from "react";

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAccent: boolean;
}

const MAX_LINK_DISTANCE = 135;
const POINTER_RADIUS = 150;

function getNodeCount(width: number): number {
  if (width >= 1024) return 36;
  if (width >= 640) return 30;
  return 24;
}

function createSeededRng(initialSeed: number): () => number {
  let state = initialSeed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createNodes(width: number, height: number): ConstellationNode[] {
  const count = getNodeCount(width);
  const nextRandom = createSeededRng(20261120);
  const nodes: ConstellationNode[] = [];

  for (let i = 0; i < count; i += 1) {
    nodes.push({
      x: nextRandom() * width,
      y: nextRandom() * height,
      vx: (nextRandom() - 0.5) * 0.34,
      vy: (nextRandom() - 0.5) * 0.34,
      radius: 1.2 + nextRandom() * 1.0,
      isAccent: i % 3 === 0,
    });
  }

  return nodes;
}

/**
 * Lightweight 3-layer Hero backdrop combining a controlled cyan radial glow,
 * a masked architectural dot matrix, and a 2D canvas constellation that reacts
 * gently to pointer motion while honoring prefers-reduced-motion.
 */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let nodes: ConstellationNode[] = [];

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0 || Math.abs(nextWidth - width) > 120) {
        nodes = createNodes(nextWidth, nextHeight);
      } else {
        for (const node of nodes) {
          node.x = Math.min(Math.max(node.x, 0), nextWidth);
          node.y = Math.min(Math.max(node.y, 0), nextHeight);
        }
      }

      width = nextWidth;
      height = nextHeight;
    };

    const drawFrame = (animateStep: boolean) => {
      ctx.clearRect(0, 0, width, height);

      if (animateStep) {
        for (const node of nodes) {
          if (pointer.active) {
            const dx = node.x - pointer.x;
            const dy = node.y - pointer.y;
            const distSq = dx * dx + dy * dy;

            if (distSq > 1 && distSq < POINTER_RADIUS * POINTER_RADIUS) {
              const dist = Math.sqrt(distSq);
              const strength = (1 - dist / POINTER_RADIUS) * 0.016;
              node.vx += (dx / dist) * strength;
              node.vy += (dy / dist) * strength;
            }
          }

          // Gently clamp velocity to keep ambient drift calm
          const speed = Math.hypot(node.vx, node.vy);
          if (speed > 0.55) {
            node.vx = (node.vx / speed) * 0.55;
            node.vy = (node.vy / speed) * 0.55;
          }

          node.x += node.vx;
          node.y += node.vy;

          if (node.x <= 0 || node.x >= width) {
            node.vx *= -1;
            node.x = Math.min(Math.max(node.x, 0), width);
          }

          if (node.y <= 0 || node.y >= height) {
            node.vy *= -1;
            node.y = Math.min(Math.max(node.y, 0), height);
          }
        }
      }

      ctx.lineWidth = 0.75;

      // Node-to-node links
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_LINK_DISTANCE) {
            const alpha = (1 - dist / MAX_LINK_DISTANCE) * 0.28;
            ctx.strokeStyle =
              a.isAccent || b.isAccent
                ? `rgba(6, 182, 212, ${(alpha * 0.85).toFixed(3)})`
                : `rgba(51, 65, 85, ${(alpha * 1.15).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Pointer-to-node links
      if (pointer.active && animateStep) {
        for (const node of nodes) {
          const dist = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (dist < POINTER_RADIUS) {
            const alpha = (1 - dist / POINTER_RADIUS) * 0.35;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }
      }

      // Constellation nodes
      for (const node of nodes) {
        ctx.fillStyle = node.isAccent
          ? "rgba(6, 182, 212, 0.48)"
          : "rgba(148, 163, 184, 0.28)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      drawFrame(true);
      rafId = window.requestAnimationFrame(tick);
    };

    const startOrRenderStatic = () => {
      window.cancelAnimationFrame(rafId);
      rafId = 0;

      if (reduceMotion) {
        drawFrame(false);
      } else {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotion) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleResize = () => {
      syncCanvasSize();
      if (reduceMotion) {
        drawFrame(false);
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      startOrRenderStatic();
    };

    syncCanvasSize();
    startOrRenderStatic();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Layer 1: Controlled atmospheric glow behind the portrait column */}
      <div
        className="absolute -right-16 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full lg:right-[6%] lg:h-[540px] lg:w-[540px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, rgba(14, 116, 144, 0.04) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Layer 2: Architectural dot grid with radial edge fade */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 55% 48%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 55% 48%, #000 20%, transparent 100%)",
        }}
      />

      {/* Layer 3: Interactive 2D canvas constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
