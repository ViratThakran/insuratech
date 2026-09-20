import { c, font, micro, statement } from "../theme";
import { Enter, Explain, Micro, Scene, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

const lines: { field: string; before: string; after: string; changed: boolean; note?: string }[] = [
  { field: "Property limit", before: "₹50,00,00,000", after: "₹65,00,00,000", changed: true, note: "increased" },
  { field: "Deductible", before: "₹2,50,000", after: "₹5,00,000", changed: true, note: "doubled" },
  { field: "Policy period", before: "2025 — 2026", after: "2026 — 2027", changed: false },
  { field: "Endorsements", before: "02 attached", after: "03 attached", changed: true, note: "flood sub-limit added" },
  { field: "Exclusion wording", before: "CL-114", after: "CL-118", changed: true, note: "wording differs" },
  { field: "Coverage basis", before: "Reinstatement", after: "Reinstatement", changed: false },
];

export function Comparison() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.2 });

  return (
    <Scene id="comparison" index="07" label="Comparison" tone="light" pad="clamp(92px, 10vw, 140px)">
      <Enter>
        <div className="cols c-6-6" style={{ alignItems: "end", marginBottom: "clamp(40px, 6vw, 82px)" }}>
          <div>
            <Micro>07 / 11 — Comparison</Micro>
            <Statement
              min={2.4}
              max={6}
              style={{ marginTop: 22 }}
              lines={[{ t: "SEE WHAT" }, { t: "CHANGED." }]}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Explain delay={120} style={{ maxWidth: "38ch" }}>
              Bring policy differences into view. Aurevia lines the two documents up, surfaces what
              moved, and leaves the judgement to you.
            </Explain>
            <div className="fade" style={{ display: "flex", gap: 24, transitionDelay: "200ms" }}>
              <Micro color={c.onLightMuted}>— unchanged</Micro>
              <Micro color={c.amber}>— difference to review</Micro>
            </div>
          </div>
        </div>
      </Enter>

      {/* --- the ledger --- */}
      <div ref={ref}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 3.2fr) minmax(0, 4.4fr) minmax(0, 4.4fr)",
            gap: "clamp(12px, 2vw, 34px)",
            paddingBottom: 14,
            borderBottom: `1px solid ${c.onLight}`,
          }}
          className="scroll-x"
        >
          <Micro>Field</Micro>
          <Micro>Existing policy</Micro>
          <Micro color={c.blue}>Renewal offer</Micro>
        </div>

        {lines.map((l, i) => {
          const o = map(p, 0.05 + i * 0.07, 0.35 + i * 0.07, 0, 1);
          const flag = map(p, 0.3 + i * 0.07, 0.6 + i * 0.07, 0, 1);
          return (
            <div
              key={l.field}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 3.2fr) minmax(0, 4.4fr) minmax(0, 4.4fr)",
                gap: "clamp(12px, 2vw, 34px)",
                alignItems: "baseline",
                padding: "clamp(16px, 2.2vw, 28px) 0",
                borderBottom: `1px solid ${c.hairLightSoft}`,
                opacity: 0.3 + o * 0.7,
              }}
            >
              <span style={{ ...micro, color: c.onLightMuted, paddingTop: 8 }}>{l.field}</span>

              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.35rem)",
                  color: l.changed ? c.onLightFaint : c.onLight,
                  textDecoration: l.changed && flag > 0.6 ? "line-through" : "none",
                  textDecorationColor: c.onLightFaint,
                }}
              >
                {l.before}
              </span>

              <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: "clamp(1.05rem, 1.9vw, 1.7rem)",
                    fontWeight: l.changed ? 700 : 400,
                    color: l.changed ? (flag > 0.4 ? c.amber : c.onLight) : c.onLight,
                    transition: "color 0.5s linear",
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  {l.changed && (
                    <span
                      aria-hidden
                      style={{
                        width: 22,
                        height: 1,
                        background: c.amber,
                        transform: `scaleX(${flag})`,
                        transformOrigin: "left",
                        alignSelf: "center",
                      }}
                    />
                  )}
                  {l.after}
                </span>
                {l.note && (
                  <span style={{ ...micro, color: c.amber, opacity: flag }}>{l.note}</span>
                )}
              </span>
            </div>
          );
        })}

        {/* summary statement, the emotional payoff of the scene */}
        <Enter
          style={{
            marginTop: "clamp(30px, 4vw, 52px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(18px, 4vw, 60px)",
            alignItems: "baseline",
          }}
        >
          <h3 style={{ ...statement(1.4, 2.8), maxWidth: "18ch" }}>
            <span className="mask">
              <span>MAKE POLICY DIFFERENCES</span>
            </span>
            <span className="mask">
              <span style={{ transitionDelay: "90ms", color: c.amber }}>EASIER TO SEE.</span>
            </span>
          </h3>
          <span style={{ ...micro, color: c.onLightFaint, marginLeft: "auto", maxWidth: "26ch", lineHeight: 1.8 }}>
            Example comparison · fictional values · every difference is reviewed by a person
          </span>
        </Enter>
      </div>
    </Scene>
  );
}
