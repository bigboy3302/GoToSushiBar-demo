"use client";

import { useEffect, useRef } from "react";

type Blob = { x: number; y: number; r: number; color: string; speed: number; phase: number };

const BLOBS: Blob[] = [
  { x: 0.78, y: 0.28, r: 0.32, color: "214,173,102", speed: 0.00022, phase: 0 },
  { x: 0.18, y: 0.65, r: 0.3, color: "31,77,52", speed: 0.00016, phase: 2 },
  { x: 0.55, y: 0.85, r: 0.24, color: "75,135,96", speed: 0.00019, phase: 4 },
];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      BLOBS.forEach((b) => {
        const dx = Math.sin(t * b.speed + b.phase) * 0.06;
        const dy = Math.cos(t * b.speed * 0.8 + b.phase) * 0.05;
        const cx = (b.x + dx) * w;
        const cy = (b.y + dy) * h;
        const r = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${b.color},0.30)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    };

    let raf = 0;
    if (reduceMotion) {
      draw(0);
    } else {
      const animate = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
