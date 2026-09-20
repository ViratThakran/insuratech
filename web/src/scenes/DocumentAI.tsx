import { useEffect, useRef, useState } from "react";
import { c, font, gutter, micro, shell, statement } from "../theme";
import { Act, Enter, Explain, Micro, State, Statement } from "../components/kit";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * Fictional specimen document. No real policy, insurer or client.     *
 * ------------------------------------------------------------------ */
type Field = { key: string; value: string; accent?: boolean };

const fields: Field[] = [
  { key: "Policy number", value: "AV-PR-4021-A" },
  { key: "Insured", value: "Example Industries Ltd." },
  { key: "Policy period", value: "01 JAN 2026 → 01 JAN 2027" },
  { key: "Property limit", value: "₹65,00,00,000", accent: true },
  { key: "Deductible", value: "₹5,00,000" },
  { key: "Endorsement 03", value: "Flood sub-limit ₹15,00,00,000" },
];

/** Document body: tokens marked `h:n` get highlighted at extraction step n. */
const doc: { kind: "h1" | "h2" | "meta" | "p" | "clause"; parts: (string | { t: string; h: number })[] }[] = [
  { kind: "h1", parts: ["COMMERCIAL PROPERTY INSURANCE POLICY"] },
  { kind: "meta", parts: ["Policy No. ", { t: "AV-PR-4021-A", h: 0 }, "  ·  Issued 18 December 2025"] },
  { kind: "meta", parts: ["Insured: ", { t: "Example Industries Ltd.", h: 1 }, ", Pune, Maharashtra"] },
  {
    kind: "meta",
    parts: ["Policy Period: ", { t: "01 January 2026 to 01 January 2027", h: 2 }, ", both days inclusive"],
  },
  { kind: "h2", parts: ["SECTION 4 — LIMITS OF LIABILITY"] },
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
  { kind: "h2", parts: ["ENDORSEMENTS"] },
  {
    kind: "clause",
    parts: [
      "Endorsement 03 — Flood and inundation cover is provided within a sub-limit of ",
      { t: "₹15,00,00,000", h: 5 },
      ", applicable in the aggregate for the Policy Period.",
    ],
  },
  { kind: "h2", parts: ["EXCLUSIONS"] },
  { kind: "p", parts: ["Wording CL-114 applies. Consequential loss of any kind is excluded."] },
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

  /* extraction plays across the middle of the pinned range */
  const run = map(p, 0.14, 0.92, 0, 1);
  const step = run * STEPS;

  return (
    <section
      ref={ref}
      id="document-ai"
      data-scene
      data-tone="light"
      data-label="Document AI"
      data-index="05"
      className="grain"
      style={{
        position: "relative",
        background: c.paperRaised,
        color: c.onLight,
        height: "300vh",
      }}
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
        <div style={{ maxWidth: shell, width: "100%", margin: "0 auto", padding: `0 ${gutter}` }}>
          {/* --- title block, quiet and left-heavy --- */}
          <Enter style={{ marginBottom: "clamp(26px, 4vh, 52px)" }}>
            <div className="cols c-7-5" style={{ alignItems: "end", gap: "clamp(18px, 3vw, 52px)" }}>
              <div>
                <Micro>05 / 11 — Document AI</Micro>
                <Statement
                  min={1.9}
                  max={4}
                  style={{ marginTop: 18 }}
                  lines={[{ t: "MEET AUREVIA" }, { t: "DOCUMENT AI.", accent: true }]}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Explain delay={120} style={{ maxWidth: "40ch" }}>
                  Insurance documents carry the detail that matters. Finding, structuring and
                  comparing it shouldn't require repetitive manual work.
                </Explain>
                <div className="fade" style={{ transitionDelay: "200ms" }}>
                  <State state="live" />
                </div>
              </div>
            </div>
          </Enter>

          {/* --- the working surface --- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
              gap: "clamp(18px, 2.6vw, 44px)",
              alignItems: "stretch",
            }}
            className="cols"
          >
            {/* document */}
            <div
              style={{
                position: "relative",
                background: c.sheet,
                border: `1px solid ${c.hairLight}`,
                boxShadow: "0 30px 60px -46px rgba(10,11,13,0.5)",
                padding: "clamp(20px, 2.6vw, 38px)",
                maxHeight: "52vh",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  borderBottom: `1px solid ${c.hairLightSoft}`,
                  paddingBottom: 10,
                  marginBottom: 18,
                }}
              >
                <span style={{ ...micro, color: c.onLightFaint }}>Specimen · fictional document</span>
                <span style={{ ...micro, color: c.onLightFaint }}>
                  {step < STEPS ? "READING" : "READ"} · PAGE 04 / 62
                </span>
              </div>

              {/* reading line */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${18 + map(run, 0, 1, 0, 60)}%`,
                  height: 1,
                  background: c.blue,
                  opacity: run > 0 && run < 1 ? 0.5 : 0,
                }}
              />

              <div style={{ position: "relative" }}>
                {doc.map((block, bi) => {
                  const style: React.CSSProperties =
                    block.kind === "h1"
                      ? { ...micro, fontSize: 11, letterSpacing: "0.22em", marginBottom: 16, color: c.onLight }
                      : block.kind === "h2"
                      ? { ...micro, fontSize: 9.5, color: c.onLightFaint, margin: "20px 0 8px" }
                      : block.kind === "meta"
                      ? { fontFamily: font.mono, fontSize: 11.5, lineHeight: 1.9, color: c.onLightMuted }
                      : { fontFamily: font.serif, fontSize: 14, lineHeight: 1.72, color: c.onLight, margin: "0 0 4px" };

                  return (
                    <div key={bi} style={style}>
                      {block.parts.map((part, pi) => {
                        if (typeof part === "string") return <span key={pi}>{part}</span>;
                        const local = step - part.h;
                        const lit = local > 0;
                        const held = local > 0.9;
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
                                  ? "rgba(28,60,214,0.10)"
                                  : "rgba(28,60,214,0.22)"
                                : "transparent",
                              boxShadow: held ? `inset 0 -1px 0 ${c.blue}` : "none",
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

            {/* extracted record */}
            <div
              style={{
                border: `1px solid ${c.hairLight}`,
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "12px 16px",
                  borderBottom: `1px solid ${c.hairLightSoft}`,
                  background: c.paperRaised,
                }}
              >
                <span style={{ ...micro, color: c.onLight }}>Structured output</span>
                <span style={{ ...micro, color: c.blue }}>
                  {Math.min(STEPS, Math.floor(step))} / {STEPS} fields
                </span>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {fields.map((f, i) => {
                  const local = step - i;
                  const arrived = local > 0.55;
                  const o = map(local, 0.35, 0.9, 0, 1);
                  return (
                    <div
                      key={f.key}
                      className="rowlift"
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 14,
                        padding: "13px 16px",
                        borderBottom: `1px solid ${c.hairLightSoft}`,
                        opacity: 0.25 + o * 0.75,
                        transform: `translateX(${(1 - o) * 14}px)`,
                        transition: "transform 0.25s linear, opacity 0.25s linear",
                      }}
                    >
                      <span style={{ ...micro, color: arrived ? c.onLightMuted : c.onLightFaint }}>
                        {f.key}
                      </span>
                      <span
                        style={{
                          fontFamily: font.mono,
                          fontSize: 12,
                          textAlign: "right",
                          color: f.accent && arrived ? c.blue : c.onLight,
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

              <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span style={{ ...micro, color: c.onLightFaint }}>
                  {step >= STEPS ? "Ready for review" : "Extracting"}
                </span>
                <span
                  style={{
                    ...micro,
                    color: c.onLightFaint,
                    opacity: step >= STEPS ? 1 : 0.35,
                  }}
                >
                  reviewed by a person
                </span>
              </div>
            </div>
          </div>

          {/* --- the three verbs, as a quiet footer to the scene --- */}
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
              <Act href="#workspace">See the workspace</Act>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
