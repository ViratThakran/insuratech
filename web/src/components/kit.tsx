import type { CSSProperties, ReactNode } from "react";
import {
  annotation,
  body,
  c,
  editorial,
  font,
  gutter,
  meaning,
  micro,
  shell,
  statement,
  surface,
  text,
  type Tone,
} from "../theme";
import { map, useEnter, useStageProgress } from "../lib/scroll";

export type { Tone };

/* ------------------------------------------------------------------ */
/* SCENE — a stage with its own material, grid density and rhythm.     */
/* ------------------------------------------------------------------ */
export function Scene({
  id,
  index,
  label,
  tone = "bone",
  children,
  grid,
  pad = "clamp(110px, 13vw, 200px)",
  style,
  bleed,
}: {
  id: string;
  index?: string;
  label?: string;
  tone?: Tone;
  children: ReactNode;
  /** structure appears only where the concept needs it */
  grid?: "none" | "rules" | "rules-dense" | "ledger";
  pad?: string;
  style?: CSSProperties;
  bleed?: ReactNode;
}) {
  const t = text(tone);
  const gridClass =
    grid === "rules" ? " rules" : grid === "rules-dense" ? " rules dense" : grid === "ledger" ? " ledger" : "";

  return (
    <section
      id={id}
      data-scene
      data-tone={tone}
      data-label={label}
      data-index={index}
      className={`mat${gridClass}`}
      style={{
        position: "relative",
        background: surface(tone),
        color: t.fg,
        padding: `${pad} 0`,
        overflow: "hidden",
        ...style,
      }}
    >
      {bleed}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: shell,
          margin: "0 auto",
          padding: `0 ${gutter}`,
        }}
      >
        {children}
      </div>
    </section>
  );
}

/** Scene identifier, part of the composition. */
export function SceneMark({
  index,
  total = "11",
  label,
  tone = "bone",
  align = "left",
}: {
  index: string;
  total?: string;
  label: string;
  tone?: Tone;
  align?: "left" | "right";
}) {
  const t = text(tone);
  return (
    <div
      className="fade"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      <span style={{ ...micro, color: t.faint }}>{index}</span>
      <span aria-hidden style={{ width: 28, height: 1, background: t.hair }} />
      <span style={{ ...annotation, fontSize: 10.5, color: t.muted }}>{label}</span>
    </div>
  );
}

/** A live system status word — used sparingly, always truthful to the scene. */
export function Ticker({
  state,
  tone = "bone",
  color,
  active,
}: {
  state: string;
  tone?: Tone;
  color?: string;
  active?: boolean;
}) {
  const t = text(tone);
  return (
    <span
      style={{
        ...micro,
        color: color ?? (active ? t.accent : t.faint),
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.5s linear",
      }}
    >
      <span
        aria-hidden
        className={active ? "breathe" : undefined}
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: color ?? (active ? t.accent : t.faint),
        }}
      />
      {state}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* TYPOGRAPHY                                                          */
/* ------------------------------------------------------------------ */
type Line = string | { t: string; accent?: boolean | string; serif?: boolean; indent?: number };

export function Statement({
  lines,
  min = 2.1,
  max = 5.6,
  tone = "bone",
  accent,
  style,
  as = "h2",
}: {
  lines: Line[];
  min?: number;
  max?: number;
  tone?: Tone;
  accent?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as as any;
  const t = text(tone);
  const accentColor = accent ?? t.accent;

  return (
    <Tag style={{ ...statement(min, max), color: t.fg, ...style }}>
      {lines.map((l, i) => {
        const line = typeof l === "string" ? { t: l } : l;
        const serif = line.serif
          ? {
              fontFamily: font.serif,
              fontStyle: "italic" as const,
              fontWeight: 400 as const,
              letterSpacing: "-0.02em",
            }
          : {};
        return (
          <span className="mask" key={line.t + i}>
            <span
              style={{
                transitionDelay: `${i * 95}ms`,
                color:
                  typeof line.accent === "string" ? line.accent : line.accent ? accentColor : undefined,
                paddingLeft: line.indent ? `${line.indent}em` : undefined,
                ...serif,
              }}
            >
              {line.t}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}

/** The serif voice on its own, for one-line editorial moments. */
export function Editorial({
  children,
  min = 1.6,
  max = 3.2,
  tone = "bone",
  color,
  style,
}: {
  children: ReactNode;
  min?: number;
  max?: number;
  tone?: Tone;
  color?: string;
  style?: CSSProperties;
}) {
  const t = text(tone);
  return (
    <span className="mask" style={{ display: "block" }}>
      <span style={{ ...editorial(min, max), color: color ?? t.accent, ...style }}>{children}</span>
    </span>
  );
}

export function Explain({
  children,
  tone = "bone",
  style,
  delay = 0,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
  delay?: number;
}) {
  const t = text(tone);
  return (
    <p
      className="fade"
      style={{ ...body, color: t.muted, maxWidth: "54ch", transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </p>
  );
}

export function Annotate({
  children,
  tone = "bone",
  color,
  style,
  delay = 0,
}: {
  children: ReactNode;
  tone?: Tone;
  color?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const t = text(tone);
  return (
    <p
      className="fade"
      style={{ ...annotation, color: color ?? t.faint, transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </p>
  );
}

export function Micro({
  children,
  tone = "bone",
  color,
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  color?: string;
  style?: CSSProperties;
}) {
  const t = text(tone);
  return <span style={{ ...micro, color: color ?? t.faint, ...style }}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* ACTIONS                                                             */
/* ------------------------------------------------------------------ */
export function Act({
  href,
  children,
  tone = "bone",
  variant = "blue",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  variant?: "blue" | "brass";
}) {
  const t = text(tone);
  return (
    <a
      href={href}
      className={`act${t.dark ? " on-dark" : ""}${variant === "brass" ? " brass" : ""}`}
      style={{ color: t.fg }}
    >
      <span>{children}</span>
      <span className="arw" aria-hidden>
        →
      </span>
    </a>
  );
}

/** Reserved for the single primary action of the page. */
export function ActFill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="act-fill">
      <span>{children}</span>
      <span className="arw" aria-hidden>
        →
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* STATE — honest availability marker                                  */
/* ------------------------------------------------------------------ */
export function State({ state, tone = "bone" }: { state: "live" | "building" | "next"; tone?: Tone }) {
  const dark = text(tone).dark;
  const map_ = {
    live: { label: "Available now", color: dark ? meaning.stableOnDark : meaning.stable },
    building: { label: "In development", color: dark ? meaning.changeOnDark : meaning.change },
    next: { label: "Coming next", color: dark ? meaning.changeOnDark : meaning.change },
  } as const;
  const { label, color } = map_[state];
  return (
    <span style={{ ...micro, color, display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden
        className={state === "live" ? "breathe" : undefined}
        style={{ width: 5, height: 5, background: color, borderRadius: "50%" }}
      />
      {label}
    </span>
  );
}

export function Hair({
  tone = "bone",
  draw = true,
  color,
  style,
}: {
  tone?: Tone;
  draw?: boolean;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={draw ? "rule-draw" : undefined}
      style={{ height: 1, width: "100%", background: color ?? text(tone).hair, ...style }}
    />
  );
}

export function Enter({
  children,
  style,
  className = "",
  threshold,
  as = "div",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  threshold?: number;
  as?: "div" | "li" | "article" | "header" | "footer";
}) {
  const [ref, entered] = useEnter<HTMLDivElement>(threshold);
  const Tag = as as any;
  return (
    <Tag ref={ref} className={`${entered ? "in " : ""}${className}`} style={style}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* BRIDGE — the connective tissue between scenes.                      */
/* One family of marks morphs: document rules → data grid → risk       */
/* signal → voice waveform → the single Aurevia point.                 */
/* ------------------------------------------------------------------ */
export type Phase = "doc-grid" | "grid-signal" | "signal-wave" | "wave-point";

export function Bridge({
  phase,
  label,
  tone = "bone",
  from,
  to,
}: {
  phase: Phase;
  label: string;
  tone?: Tone;
  /** surfaces either side, so the band reads as a true handover */
  from?: Tone;
  to?: Tone;
}) {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.92, end: 0.35 });
  const t = text(tone);
  const k = map(p, 0.12, 0.88, 0, 1);
  const n = 30;

  /* a crisp editorial seam — the marks cross it, the surfaces do not blur */
  const top = surface(from ?? tone);
  const bottom = surface(to ?? tone);

  return (
    <div
      className="mat"
      data-tone={tone}
      style={{ position: "relative", background: bottom, overflow: "hidden" }}
    >
      <div aria-hidden style={{ position: "absolute", inset: "0 0 50% 0", background: top }} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          background: text(tone).hairSoft,
          opacity: 0.8,
        }}
      />
      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: shell,
          margin: "0 auto",
          padding: `clamp(40px, 6vw, 84px) ${gutter}`,
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 9fr)",
          gap: "clamp(14px, 3vw, 40px)",
          alignItems: "center",
        }}
        className="cols"
      >
        <Micro tone={tone}>{label}</Micro>

        <svg viewBox="0 0 600 64" width="100%" aria-hidden style={{ display: "block" }}>
          {Array.from({ length: n }, (_, i) => {
            const x = 10 + (i * 580) / (n - 1);
            const wobble = Math.sin(i * 1.15) * 15;
            const mid = 32;

            if (phase === "doc-grid") {
              /* text rules resolve into a measured data grid */
              const w = 16 * (1 - k) + 9 * k;
              const y = mid + (i % 3 === 1 ? -9 : i % 3 === 2 ? 9 : 0) * k;
              return (
                <g key={i}>
                  <rect x={x - w / 2} y={y - 0.5} width={w} height="1" fill={t.hair} opacity={0.9 - k * 0.2} />
                  {k > 0.55 && (
                    <rect
                      x={x - 4.5}
                      y={y - 4.5}
                      width="9"
                      height="9"
                      fill="none"
                      stroke={i % 5 === 0 ? t.accent : t.hair}
                      strokeWidth="0.75"
                      opacity={map(k, 0.55, 1, 0, 0.9)}
                    />
                  )}
                </g>
              );
            }

            if (phase === "grid-signal") {
              /* the grid loosens into a moving signal */
              const y = mid + wobble * k;
              const r = 1 + k * 1.4;
              return (
                <g key={i}>
                  {i > 0 && k > 0.4 && (
                    <line
                      x1={x - 580 / (n - 1)}
                      y1={mid + Math.sin((i - 1) * 1.15) * 15 * k}
                      x2={x}
                      y2={y}
                      stroke={t.hair}
                      strokeWidth="0.75"
                      opacity={map(k, 0.4, 1, 0, 0.8)}
                    />
                  )}
                  <circle cx={x} cy={y} r={r} fill={i % 6 === 0 ? t.accent : t.hair} opacity={0.55 + k * 0.4} />
                </g>
              );
            }

            if (phase === "signal-wave") {
              /* the signal becomes voice */
              const h = 3 * (1 - k) + (8 + Math.abs(Math.sin(i * 0.75)) * 34) * k;
              const y = mid + wobble * (1 - k);
              return (
                <rect
                  key={i}
                  x={x - 1.4}
                  y={y - h / 2}
                  width="2.8"
                  height={h}
                  rx="1.4"
                  fill={i % 7 === 0 ? meaning.voiceOnDark : t.hair}
                  opacity={0.5 + k * 0.45}
                />
              );
            }

            /* wave-point: everything collapses toward one signal */
            const collapse = map(k, (i / n) * 0.5, 0.6 + (i / n) * 0.4, 0, 1);
            const h = (8 + Math.abs(Math.sin(i * 0.75)) * 30) * (1 - collapse) + 2;
            const xx = x + (300 - x) * collapse;
            return (
              <rect
                key={i}
                x={xx - 1.4}
                y={mid - h / 2}
                width="2.8"
                height={h}
                rx="1.4"
                fill={collapse > 0.85 ? t.accent : t.hair}
                opacity={collapse > 0.95 ? 0 : 0.5 + k * 0.4}
              />
            );
          })}

          {phase === "wave-point" && (
            <circle cx="300" cy="32" r={2 + k * 4} fill={t.accent} opacity={map(k, 0.55, 1, 0, 1)} />
          )}
        </svg>
      </div>
    </div>
  );
}
