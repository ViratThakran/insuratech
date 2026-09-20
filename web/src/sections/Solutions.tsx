import type { ReactNode } from "react";
import { c, display, eyebrow, font } from "../theme";
import {
  Button,
  Display,
  Eyebrow,
  Lede,
  Reveal,
  Section,
  StatusTag,
} from "../components/primitives";
import { BranchSignal, DocumentGlyph, RiskGlyph, VoiceGlyph } from "../components/visuals";

type Solution = {
  n: string;
  name: string;
  headline: string[];
  body: string;
  points: string[];
  status: "available" | "development" | "next";
  glyph: ReactNode;
  accent: string;
  href: string;
  cta?: string;
  note?: string;
};

const solutions: Solution[] = [
  {
    n: "01",
    name: "Document AI",
    headline: ["MAKE COMPLEX DOCUMENTS", "EASIER TO WORK WITH."],
    body: "Process, understand and compare insurance documents with AI-powered document intelligence.",
    points: [
      "Document processing",
      "Extraction",
      "Classification",
      "Structured information",
      "Policy comparison",
      "Identifying differences",
    ],
    status: "available",
    glyph: <DocumentGlyph />,
    accent: c.blue,
    href: "#document-ai",
    cta: "Explore Document AI",
  },
  {
    n: "02",
    name: "Risk Intelligence",
    headline: ["SEE RISK", "DIFFERENTLY."],
    body: "Turn business and insurance information into structured risk insights.",
    points: [
      "Risk assessment",
      "Exposure analysis",
      "Risk monitoring",
      "Risk reporting",
      "Decision support",
    ],
    status: "development",
    glyph: <RiskGlyph />,
    accent: c.blue,
    href: "#risk",
    note: "Capability areas we are building toward.",
  },
  {
    n: "03",
    name: "Voice AI",
    headline: ["LET AI HANDLE", "THE CONVERSATION."],
    body: "AI-powered voice solutions designed for insurance communication and workflow automation.",
    points: [
      "Customer communication",
      "Lead qualification",
      "Renewal follow-up",
      "Appointment scheduling",
      "Document collection",
      "Workflow support",
    ],
    status: "next",
    glyph: <VoiceGlyph />,
    accent: c.amber,
    href: "#voice",
    note: "Designed use cases, currently in development.",
  },
];

export function Solutions() {
  return (
    <Section id="solutions">
      <Reveal>
        <Eyebrow>04 — Solutions</Eyebrow>
      </Reveal>
      <Reveal delay={80} style={{ marginTop: 28 }}>
        <Display lines={["ONE INTELLIGENCE PLATFORM.", "MULTIPLE SOLUTIONS."]} min={2.2} max={4.6} />
      </Reveal>

      <Reveal delay={160} style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
        <BranchSignal />
      </Reveal>

      <div style={{ marginTop: "clamp(48px, 7vw, 96px)", display: "flex", flexDirection: "column" }}>
        {solutions.map((s, i) => (
          <article
            key={s.name}
            style={{
              borderTop: `1px solid ${c.line}`,
              padding: "clamp(44px, 6vw, 84px) 0",
            }}
          >
            <div
              className="solution-row"
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
                gap: "clamp(32px, 5vw, 64px)",
                alignItems: "center",
              }}
            >
              <Reveal style={{ order: i % 2 ? 2 : 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <span style={{ ...eyebrow, color: c.body }}>{s.n}</span>
                    <span
                      style={{
                        ...eyebrow,
                        color: s.accent,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                      }}
                    >
                      {s.name}
                    </span>
                    <StatusTag status={s.status} />
                  </div>

                  <h3 style={{ ...display(1.7, 3.1) }}>
                    {s.headline.map((l) => (
                      <span key={l} style={{ display: "block" }}>
                        {l}
                      </span>
                    ))}
                  </h3>

                  <Lede style={{ maxWidth: "46ch" }}>{s.body}</Lede>

                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                      gap: "8px 24px",
                    }}
                  >
                    {s.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          fontFamily: font.mono,
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: c.body,
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <span aria-hidden style={{ width: 10, height: 1, background: s.accent }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {s.note && (
                    <p style={{ ...eyebrow, fontSize: 10, color: c.amber }}>{s.note}</p>
                  )}

                  <div>
                    <Button href={s.href} variant={s.cta ? "primary" : "ghost"}>
                      {s.cta ?? `See ${s.name} direction`}
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140} style={{ order: i % 2 ? 1 : 2 }}>
                <div
                  style={{
                    background: i % 2 ? c.ivoryDeep : "#FFFDF9",
                    border: `1px solid ${c.line}`,
                    padding: "clamp(20px, 3vw, 40px)",
                  }}
                >
                  {s.glyph}
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
