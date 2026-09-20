import { useEffect, useRef, useState } from "react";
import { c, font, gutter, meaning, micro, shell, statement } from "../theme";
import { Act, Enter, Explain, Micro, State, Statement, Ticker } from "../components/kit";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 05 — DOCUMENT AI                                              *
 * A physically present specimen policy is read, clause by clause, and  *
 * becomes a structured record. Fictional document, fictional values.   *
 * ------------------------------------------------------------------ */

type Field = { key: string; value: string; tone?: "aurevia" | "change" };

const fields: Field[] = [
  { key: "Policy number", value: "AV-PR-4021-A" },
  { key: "Insured", value: "Example Industries Ltd." },
  { key: "Policy period", value: "01 JAN 2026 → 01 JAN 2027" },
  { key: "Property limit", value: "₹65,00,00,000", tone: "aurevia" },
  { key: "Deductible", value: "₹5,00,000" },
  { key: "Endorsement 03", value: "Flood sub-limit ₹15,00,00,000", tone: "change" },
];

const doc: {
  kind: "title" | "rule" | "meta" | "head" | "clause" | "note";
  parts: (string | { t: string; h: number })[];
}[] = [
  { kind: "title", parts: ["COMMERCIAL PROPERTY INSURANCE POLICY"] },
  { kind: "rule", parts: [""] },
  { kind: "meta", parts: ["Policy No. ", { t: "AV-PR-4021-A", h: 0 }, "   ·   Issued 18 December 2025"] },
  { kind: "meta", parts: ["Insured: ", { t: "Example Industries Ltd.", h: 1 }, ", Pune, Maharashtra"] },
  {
    kind: "meta",
    parts: ["Policy Period: ", { t: "01 January 2026 to 01 January 2027", h: 2 }, ", both days inclusive"],
  },
  { kind: "head", parts: ["Section 4 — Limits of liability"] },
  {
    kind: "clause",
    parts: [
      "The Company shall indemnify the Insured against physical loss of or damage to the Property Insured, up to a limit of ",
      { t: "₹65,00,00,000", h: 3 },
      " in respect of any one occurrence, subject to a deductible of ",
      { t: "₹5,00,000", h: 4 },
      " each and every claim.",
    ],
  },
  { kind: "head", parts: ["Endorsements"] },
  {
    kind: "clause",
    parts: [
      "Endorsement 03 — Flood and inundation cover is provided within a sub-limit of ",
      { t: "₹15,00,00,000", h: 5 },
      ", applicable in the aggregate for the Policy Period.",
    ],
  },
  { kind: "note", parts: ["Wording CL-114 applies. Consequential loss of any kind is excluded."] },
];

const STEPS = fields.length;

export function DocumentAI() {
  const ref = useRef<HTMLElement>(null);
  const y = useScrollY();
  const [box, setBox] = useState({ top: 0, height: 1 });

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setBox({ top: el.offsetTop, height: el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const travel = Math.max(1, box.height - vh);
  const p = reducedMotion() ? 1 : Math.min(1, Math.max(0, (y - box.top) / travel));

  const run = map(p, 0.14, 0.92, 0, 1);
  const step = run * STEPS;
  const done = step >= STEPS;

  return (
    <section
      ref={ref}
      id="document-ai"
      data-scene
      data-tone="paper"
      data-label="Document AI"
      data-index="05"
      className="mat"
      style={{ position: "relative", background: c.paper, color: c.onLight, height: "300vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          padding: "clamp(88px, 11vh, 120px) 0 clamp(28px, 5vh, 56px)",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: shell, width: "100%", margin: "0 auto", padding: `0 ${gutter}` }}>
          <Enter style={{ marginBottom: "clamp(26px, 4vh, 52px)" }}>
            <div className="cols c-7-5" style={{ alignItems: "end", gap: "clamp(18px, 3vw, 52px)" }}>
              <div>
                <Micro tone="paper">05 / 11 — Document AI</Micro>
                <Statement
                  tone="paper"
                  min={1.9}
                  max={4}
                  style={{ marginTop: 18 }}
                  lines={[{ t: "MEET AUREVIA" }, { t: "DOCUMENT AI.", accent: true }]}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Explain tone="paper" delay={120} style={{ maxWidth: "40ch" }}>
                  Insurance documents carry the detail that matters. Finding, structuring and
                  comparing it shouldn't require repetitive manual work.
                </Explain>
                <div className="fade" style={{ transitionDelay: "200ms" }}>
                  <State state="live" tone="paper" />
                </div>
              </div>
            </div>
          </Enter>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
              gap: "clamp(18px, 2.6vw, 48px)",
              alignItems: "stretch",
            }}
            className="cols"
          >
            {/* ---------- the document, as a physical object ---------- */}
            <div style={{ position: "relative" }}>
              {/* pages beneath */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "8px -10px -12px 14px",
                  background: "#F3F0E8",
                  border: `1px solid ${c.hairLight}`,
                  boxShadow: "0 18px 40px -34px rgba(10,11,13,0.5)",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "4px -5px -6px 7px",
                  background: "#F7F4EE",
                  border: `1px solid ${c.hairLight}`,
                }}
              />

              <div
                className="mat"
                data-tone="sheet"
                style={{
                  position: "relative",
                  background: c.sheet,
                  border: `1px solid ${c.hairLight}`,
                  boxShadow: "0 34px 70px -46px rgba(10,11,13,0.55), 0 2px 0 rgba(255,255,255,0.7) inset",
                  padding: "clamp(22px, 2.8vw, 40px)",
                  maxHeight: "52vh",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <Micro tone="paper">Specimen · fictional document</Micro>
                  <Micro tone="paper">Page 04 / 62</Micro>
                </div>

                {/* the reading pass — a quiet rule, not a sci-fi scanner */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${20 + map(run, 0, 1, 0, 58)}%`,
                    height: 26,
                    background: `linear-gradient(to bottom, rgba(65,85,232,0) 0%, rgba(65,85,232,0.05) 60%, rgba(65,85,232,0.14) 100%)`,
                    borderBottom: `1px solid ${c.blue}`,
                    opacity: run > 0 && run < 1 ? 0.75 : 0,
                    transition: "opacity 0.4s linear",
                  }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                  {doc.map((block, bi) => {
                    if (block.kind === "rule")
                      return (
                        <div
                          key={bi}
                          style={{ height: 1, background: c.hairLight, margin: "0 0 18px", opacity: 0.8 }}
                        />
                      );

                    const style: React.CSSProperties =
                      block.kind === "title"
                        ? {
                            fontFamily: font.sans,
                            fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            marginBottom: 12,
                          }
                        : block.kind === "head"
                        ? {
                            ...micro,
                            fontSize: 9.5,
                            color: c.onLightFaint,
                            margin: "20px 0 8px",
                            borderTop: `1px solid ${c.hairLightSoft}`,
                            paddingTop: 10,
                          }
                        : block.kind === "meta"
                        ? { fontFamily: font.mono, fontSize: 11.5, lineHeight: 1.95, color: c.onLightMuted }
                        : block.kind === "note"
                        ? { fontFamily: font.serif, fontSize: 12.5, lineHeight: 1.7, color: c.onLightFaint, marginTop: 14 }
                        : {
                            fontFamily: font.serif,
                            fontSize: "clamp(0.86rem, 1.05vw, 0.97rem)",
                            lineHeight: 1.78,
                            color: c.onLight,
                            margin: "0 0 4px",
                            textAlign: "justify" as const,
                          };

                    return (
                      <div key={bi} style={style}>
                        {block.parts.map((part, pi) => {
                          if (typeof part === "string") return <span key={pi}>{part}</span>;
                          const local = step - part.h;
                          const lit = local > 0;
                          const held = local > 0.9;
                          const f = fields[part.h];
                          const tint =
                            f?.tone === "change" ? c.brass : f?.tone === "aurevia" ? c.blue : c.blue;
                          return (
                            <span
                              key={pi}
                              style={{
                                position: "relative",
                                padding: "1px 3px",
                                margin: "0 -3px",
                                color: lit ? c.onLight : "inherit",
                                background: lit
                                  ? held
                                    ? f?.tone === "change"
                                      ? "rgba(169,124,51,0.11)"
                                      : "rgba(65,85,232,0.09)"
                                    : "rgba(65,85,232,0.2)"
                                  : "transparent",
                                boxShadow: held ? `inset 0 -1px 0 ${tint}` : "none",
                                transition: "background-color 0.35s linear, box-shadow 0.35s linear",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {part.t}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ---------- the structured record ---------- */}
            <div
              style={{
                border: `1px solid ${c.hairLight}`,
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 26px 60px -50px rgba(10,11,13,0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 16px",
                  borderBottom: `1px solid ${c.hairLightSoft}`,
                  background: c.bone,
                }}
              >
                <Micro tone="paper" color={c.onLight}>
                  Structured output
                </Micro>
                <span style={{ ...micro, color: done ? meaning.stable : c.blue }}>
                  {Math.min(STEPS, Math.floor(step))} / {STEPS} fields
                </span>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {fields.map((f, i) => {
                  const local = step - i;
                  const arrived = local > 0.55;
                  const o = map(local, 0.35, 0.9, 0, 1);
                  const valueColor =
                    f.tone === "change" ? c.brass : f.tone === "aurevia" ? c.blue : c.onLight;
                  return (
                    <div
                      key={f.key}
                      className="rowlift"
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 14,
                        padding: "14px 16px",
                        borderBottom: `1px solid ${c.hairLightSoft}`,
                        borderLeft: `2px solid ${arrived ? (f.tone === "change" ? c.brass : c.blue) : "transparent"}`,
                        opacity: 0.25 + o * 0.75,
                        transform: `translateX(${(1 - o) * 14}px)`,
                        transition: "transform 0.25s linear, opacity 0.25s linear, border-color 0.4s linear",
                      }}
                    >
                      <span style={{ ...micro, color: arrived ? c.onLightMuted : c.onLightFaint }}>{f.key}</span>
                      <span
                        style={{
                          fontFamily: font.mono,
                          fontSize: 12,
                          textAlign: "right",
                          color: arrived ? valueColor : c.onLight,
                          opacity: arrived ? 1 : 0,
                          transition: "opacity 0.3s linear",
                        }}
                      >
                        {f.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  padding: "13px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  background: c.bone,
                  borderTop: `1px solid ${c.hairLightSoft}`,
                }}
              >
                <Ticker
                  tone="paper"
                  active={!done}
                  color={done ? meaning.stable : c.blue}
                  state={done ? "structured" : "extracting"}
                />
                <Micro tone="paper">reviewed by a person</Micro>
              </div>
            </div>
          </div>

          {/* ---------- the three verbs ---------- */}
          <div
            style={{
              marginTop: "clamp(18px, 3vh, 36px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "clamp(14px, 3vw, 44px)",
            }}
          >
            {["UPLOAD.", "UNDERSTAND.", "COMPARE."].map((s, i) => {
              const on = run > i * 0.33;
              return (
                <span
                  key={s}
                  style={{
                    ...statement(1.1, 2),
                    color: on ? c.onLight : c.onLightFaint,
                    transition: "color 0.6s linear",
                  }}
                >
                  {s}
                </span>
              );
            })}
            <span style={{ marginLeft: "auto" }} className="hide-md">
              <Act href="#workspace" tone="paper">
                View the system
              </Act>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
