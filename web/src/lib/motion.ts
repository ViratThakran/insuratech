import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* in dev, make the scroll machinery reachable from the console and from
   browser-driven checks — there is no other way to inspect a scrubbed timeline */
if (import.meta.env.DEV && typeof window !== "undefined") {
  Object.assign(window as unknown as Record<string, unknown>, { gsap, ScrollTrigger });
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * SMOOTH SCROLL — Lenis drives ScrollTrigger so scrubbed timelines    *
 * and the smoothed scroll position never disagree.                    *
 * ------------------------------------------------------------------ */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      /* Lenis takes over window.scrollTo, so it has to own hash links too —
         without this the nav and the skip link stop moving the page. */
      anchors: { offset: -72 },
    });

    lenis.on("scroll", ScrollTrigger.update);

    /* let anything outside React (and the tests) drive the real scroller */
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}

/**
 * Scoped GSAP context. Everything created inside is reverted on unmount,
 * so scenes can be added or removed without leaking triggers.
 */
export function useScene<T extends HTMLElement = HTMLDivElement>(
  build: (ctx: { root: T; q: (sel: string) => HTMLElement[]; reduced: boolean }) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      build({
        root,
        q: (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel)),
        reduced,
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Refresh triggers once fonts and images have settled. */
export function useRefreshOnLoad() {
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    window.addEventListener("load", r);
    const t = setTimeout(r, 800);
    return () => {
      window.removeEventListener("load", r);
      clearTimeout(t);
    };
  }, []);
}
