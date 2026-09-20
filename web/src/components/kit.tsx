import type { CSSProperties, ReactNode } from "react";
import { annotation, c, explain, font, micro, shell, gutter, statement, surface, text } from "../theme";
import { useEnter } from "../lib/scroll";

export type Tone = "dark" | "light" | "paper";

/* ------------------------------------------------------------------ */
/* SCENE — a full stage, not a section. Carries its own tone, grain,  */
/* identifier and composition. Declares itself to the navigation.      */
/* ------------------------------------------------------------------ */
export function Scene({
  id,
  index,
  label,
  tone = "light",
  children,
  grid = false,
  pad = "clamp(110px, 13vw, 200px)",
  style,
  bleed,
}: {
  id: string;
  index?: string;
  label?: string;
  tone?: Tone;
  children: ReactNode;
  grid?: boolean;
  pad?: string;
  style?: CSSProperties;
  bleed?: ReactNode;
}) {
  const t = text(tone);
  return (
    <section
      id={id}
      data-scene
      data-tone={tone}
      data-label={label}
      data-index={index}
      className={`grain${grid ? " hairgrid" : ""}`}
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

/** Scene identifier integrated into the composition, never a UI chip. */
export function SceneMark({
  index,
  total = "11",
  label,
  tone = "light",
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
      <span style={{ ...micro, color: t.faint }}>
        {index} / {total}
      </span>
      <span aria-hidden style={{ width: 40, height: 1, background: t.hair }} />
      <span style={{ ...annotation, fontSize: 10.5, color: t.muted }}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TYPOGRAPHY — statements are objects: masked, cropped, weighted.     */
/* ------------------------------------------------------------------ */
export function Statement({
  lines,
  min = 2.1,
  max = 5.6,
  tone = "light",
  accent,
  style,
  as = "h2",
}: {
  lines: (string | { t: string; accent?: boolean | string; serif?: boolean; indent?: number })[];
  min?: number;
  max?: number;
  tone?: Tone;
  accent?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as as any;
  const t = text(tone);
  const accentColor = accent ?? (tone === "dark" ? c.blueLift : c.blue);

  return (
    <Tag style={{ ...statement(min, max), color: t.fg, ...style }}>
      {lines.map((l, i) => {
        const line = typeof l === "string" ? { t: l } : l;
        return (
          <span className="mask" key={line.t + i}>
            <span
              style={{
                transitionDelay: `${i * 95}ms`,
                color:
                  typeof line.accent === "string" ? line.accent : line.accent ? accentColor : undefined,
                fontFamily: line.serif ? font.serif : undefined,
                fontStyle: line.serif ? "italic" : undefined,
                fontWeight: line.serif ? 400 : undefined,
                letterSpacing: line.serif ? "-0.02em" : undefined,
                paddingLeft: line.indent ? `${line.indent}em` : undefined,
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

export function Explain({
  children,
  tone = "light",
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
      style={{ ...explain, color: t.muted, maxWidth: "54ch", transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </p>
  );
}

export function Annotate({
  children,
  tone = "light",
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
  tone = "light",
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
  tone = "light",
  lead,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  lead?: boolean;
}) {
  return (
    <a
      href={href}
      className={`act${lead ? " lead" : ""} ${tone === "dark" ? "accent-dark" : "accent"}`}
      style={{ color: text(tone).fg }}
    >
      <span>{children}</span>
      <span className="arw" aria-hidden>
        →
      </span>
    </a>
  );
}

export function Actions({ tone = "light", children }: { tone?: Tone; children?: ReactNode }) {
  return (
    <div
      className="fade"
      style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 4vw, 56px)", transitionDelay: "260ms" }}
    >
      {children ?? (
        <>
          <Act href="#talk" tone={tone} lead>
            Talk to Aurevia
          </Act>
          <Act href="#solutions" tone={tone}>
            Explore solutions
          </Act>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STATE — honest availability marker                                  */
/* ------------------------------------------------------------------ */
export function State({
  state,
  tone = "light",
}: {
  state: "live" | "building" | "next";
  tone?: Tone;
}) {
  const map = {
    live: { label: "Available now", color: tone === "dark" ? c.blueLift : c.blue },
    building: { label: "In development", color: tone === "dark" ? c.amberLift : c.amber },
    next: { label: "Coming next", color: tone === "dark" ? c.amberLift : c.amber },
  } as const;
  const { label, color } = map[state];
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

/* ------------------------------------------------------------------ */
/* Hairline rules                                                      */
/* ------------------------------------------------------------------ */
export function Hair({ tone = "light", draw = true, style }: { tone?: Tone; draw?: boolean; style?: CSSProperties }) {
  return (
    <div
      className={draw ? "rule-draw" : undefined}
      style={{ height: 1, width: "100%", background: text(tone).hair, ...style }}
    />
  );
}

/** Wrapper that triggers every `.mask` / `.fade` inside it once on entry. */
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
