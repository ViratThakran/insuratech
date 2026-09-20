import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* One rAF-throttled scroll loop for the whole page.                   */
/* Subscribers get called at most once per frame, never during layout. */
/* ------------------------------------------------------------------ */

type Sub = () => void;
const subs = new Set<Sub>();
let ticking = false;
let bound = false;

function tick() {
  ticking = false;
  subs.forEach((s) => s());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(tick);
}

function bind() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function subscribe(fn: Sub) {
  bind();
  subs.add(fn);
  fn();
  return () => {
    subs.delete(fn);
  };
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Progress of an element through the viewport, 0 → 1.
 * 0 = element's top edge is at the bottom of the viewport.
 * 1 = element's bottom edge is at the top of the viewport.
 */
export function useSceneProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reducedMotion()) {
      setP(0.5);
      return;
    }
    return subscribe(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight;
      const raw = (window.innerHeight - r.top) / span;
      setP(Math.min(1, Math.max(0, raw)));
    });
  }, []);

  return [ref, p] as const;
}

/**
 * Progress while an element is pinned-ish in the middle of the viewport,
 * mapped so the interesting range happens while the scene is on screen.
 */
export function useStageProgress<T extends HTMLElement>(
  { start = 0.85, end = 0.25 }: { start?: number; end?: number } = {}
) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reducedMotion()) {
      setP(1);
      return;
    }
    return subscribe(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height * 0.35;
      const raw = (from - r.top) / Math.max(1, from - to);
      setP(Math.min(1, Math.max(0, raw)));
    });
  }, [start, end]);

  return [ref, p] as const;
}

/** Raw window scrollY, rAF-throttled. */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => subscribe(() => setY(window.scrollY)), []);
  return y;
}

export type Tone = "dark" | "light" | "paper";

/**
 * Tracks which [data-scene] block owns the top of the viewport so the
 * navigation can invert itself and mark the active scene.
 */
export function useActiveScene() {
  const [state, setState] = useState<{ tone: Tone; id: string; label: string; index: string }>({
    tone: "dark",
    id: "opening",
    label: "Opening",
    index: "01",
  });

  useEffect(() => {
    return subscribe(() => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-scene]");
      let current: HTMLElement | null = null;
      for (const n of Array.from(nodes)) {
        const r = n.getBoundingClientRect();
        if (r.top <= 90 && r.bottom > 90) current = n;
      }
      if (!current) current = nodes[0] ?? null;
      if (!current) return;
      const tone = (current.dataset.tone as Tone) || "light";
      const id = current.id || "";
      const label = current.dataset.label || "";
      const index = current.dataset.index || "";
      setState((prev) =>
        prev.tone === tone && prev.id === id ? prev : { tone, id, label, index }
      );
    });
  }, []);

  return state;
}

/** Adds `.in` once, when the element first enters the viewport. */
export function useEnter<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, entered] as const;
}

/** Linear interpolation helper for scroll-linked values. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Maps t from [i0,i1] into [o0,o1], clamped. */
export const map = (t: number, i0: number, i1: number, o0: number, o1: number) => {
  const k = Math.min(1, Math.max(0, (t - i0) / (i1 - i0)));
  return o0 + (o1 - o0) * k;
};
