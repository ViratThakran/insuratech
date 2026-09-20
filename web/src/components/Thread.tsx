import type { CSSProperties } from "react";
import { c, micro } from "../theme";
import { map, useStageProgress } from "../lib/scroll";

/* ==========================================================================
   THE THREAD — Aurevia's red thread.
   One cobalt line runs the length of the site with a job in every scene:
   it finds information, extracts it, connects differences, becomes a signal,
   becomes a voice, and finally resolves into one point.
   ========================================================================== */

export type ThreadRole =
  | "find"      /* hero — sweeps across information */
  | "extract"   /* document — enters and lifts a clause */
  | "enter"     /* product — descends into the interface */
  | "connect"   /* comparison — links what moved */
  | "signal"    /* risk — becomes a monitored line */
  | "voice"     /* voice — becomes a waveform */
  | "converge"  /* platform — draws inward */
  | "resolve";  /* outro — settles into a single point */

const label: Record<ThreadRole, string> = {
  find: "finding",
  extract: "extracting",
  enter: "entering",
  connect: "connecting",
  signal: "signal",
  voice: "conversation",
  converge: "converging",
  resolve: "resolved",
};

/**
 * A single hairline, always cobalt, always 1px, always entering from the left
 * edge of the page. Its path is what changes.
 */
export function Thread({
  role,
  tone = "dark",
  annotate = false,
  height = 120,
  style,
}: {
  role: ThreadRole;
  tone?: "dark" | "light";
  annotate?: boolean;
  height?: number;
  style?: CSSProperties;
}) {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.25 });
  const k = map(p, 0.05, 0.85, 0, 1);

  const paths: Record<ThreadRole, string> = {
    find: "M0 34 C 180 34, 300 10, 520 22 C 700 32, 820 60, 1000 52",
    extract: "M0 56 C 220 56, 300 56, 430 56 C 470 56, 480 18, 560 18 L 1000 18",
    enter: "M0 20 C 260 20, 380 20, 520 52 C 640 80, 800 96, 1000 96",
    connect: "M0 30 L 380 30 C 440 30, 440 74, 520 74 L 1000 74",
    signal: "M0 52 L 210 52 L 250 30 L 290 62 L 330 40 L 380 46 L 430 18 L 500 60 L 560 34 L 1000 34",
    voice: "M0 52 L 300 52 L 316 30 L 332 70 L 348 24 L 364 74 L 380 34 L 396 62 L 412 44 L 440 52 L 1000 52",
    converge: "M0 16 C 300 16, 420 52, 620 52 L 1000 52",
    resolve: "M0 52 L 700 52",
  };

  const t = tone === "dark";
  const hair = t ? c.hairDark : c.hairLight;
  const dim = t ? c.onDarkFaint : c.onLightFaint;

  return (
    <div ref={ref} aria-hidden style={{ position: "relative", height, ...style }}>
      <svg
        viewBox="0 0 1000 110"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* the path it will take, barely there */}
        <path d={paths[role]} fill="none" stroke={hair} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {/* the thread itself, drawing along that path */}
        <path
          d={paths[role]}
          fill="none"
          stroke={c.blue}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: 1400 - 1400 * k,
            transition: "stroke-dashoffset 0.12s linear",
          }}
        />
        {role === "resolve" && (
          <circle cx={700} cy={52} r={3.2} fill={c.blue} opacity={map(k, 0.85, 1, 0, 1)} />
        )}
      </svg>

      {annotate && (
        <span
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            ...micro,
            fontSize: 8.5,
            color: k > 0.8 ? c.blue : dim,
            transition: "color 0.6s linear",
          }}
        >
          {label[role]}
        </span>
      )}
    </div>
  );
}
