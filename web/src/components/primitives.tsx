import type { CSSProperties, ReactNode } from "react";
import { c, display, eyebrow, font, lede, maxW } from "../theme";

type Tone = "light" | "dark" | "deep";

const toneBg: Record<Tone, string> = {
  light: c.ivory,
  dark: c.ink,
  deep: c.ivoryDeep,
};

export function Section({
  id,
  tone = "light",
  children,
  style,
  pad = "clamp(96px, 12vw, 180px)",
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  style?: CSSProperties;
  pad?: string;
}) {
  return (
    <section
      id={id}
      style={{
        background: toneBg[tone],
        color: tone === "dark" ? c.ivory : c.ink,
        padding: `${pad} 0`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  style,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  as?: "div" | "li" | "span";
}) {
  const Tag = as as any;
  return (
    <Tag className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  accent,
}: {
  children: ReactNode;
  tone?: Tone;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: accent ?? c.blue,
          flex: "0 0 auto",
        }}
      />
      <p style={{ ...eyebrow, color: tone === "dark" ? c.bodyDark : c.body }}>{children}</p>
    </div>
  );
}

export function Display({
  lines,
  min = 2.4,
  max = 6.4,
  tone = "light",
  accentLast,
  style,
}: {
  lines: string[];
  min?: number;
  max?: number;
  tone?: Tone;
  accentLast?: string;
  style?: CSSProperties;
}) {
  return (
    <h2 style={{ ...display(min, max), color: tone === "dark" ? c.ivory : c.ink, ...style }}>
      {lines.map((l, i) => (
        <span
          key={l}
          style={{
            display: "block",
            color:
              accentLast && i === lines.length - 1
                ? accentLast
                : tone === "dark"
                ? c.ivory
                : c.ink,
          }}
        >
          {l}
        </span>
      ))}
    </h2>
  );
}

export function Lede({
  children,
  tone = "light",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        ...lede,
        color: tone === "dark" ? c.bodyDark : c.body,
        maxWidth: "58ch",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  tone?: Tone;
}) {
  return (
    <a
      href={href}
      className={`btn btn-${variant}${tone === "dark" ? " on-dark" : ""}`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

export function CtaRow({ tone = "light" }: { tone?: Tone }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      <Button href="#talk" tone={tone}>
        Talk to Aurevia
      </Button>
      <Button href="#solutions" variant="ghost" tone={tone}>
        Explore solutions
      </Button>
    </div>
  );
}

/** Honest availability marker: current product vs. product direction. */
export function StatusTag({
  status,
  tone = "light",
}: {
  status: "available" | "development" | "next";
  tone?: Tone;
}) {
  const map = {
    available: { label: "Available now", color: c.blue },
    development: { label: "In development", color: c.amber },
    next: { label: "Coming next", color: c.amber },
  } as const;
  const { label, color } = map[status];
  return (
    <span
      style={{
        ...eyebrow,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        border: `1px solid ${tone === "dark" ? "rgba(244,240,232,0.24)" : "rgba(11,13,16,0.16)"}`,
        color,
        fontSize: 10,
      }}
    >
      <span
        aria-hidden
        style={{ width: 5, height: 5, borderRadius: "50%", background: color }}
      />
      {label}
    </span>
  );
}

export function Index({ n, tone = "light" }: { n: string; tone?: Tone }) {
  return (
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 11,
        letterSpacing: "0.2em",
        color: tone === "dark" ? c.bodyDark : c.body,
      }}
    >
      {n}
    </span>
  );
}

export function Rule({ tone = "light" }: { tone?: Tone }) {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: tone === "dark" ? c.lineDark : c.line,
      }}
    />
  );
}
