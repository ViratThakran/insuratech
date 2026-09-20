import { c, font, meaning, micro, statement } from "../theme";
import { Enter, Explain, Micro, Scene, Statement, Ticker } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 07 — COMPARISON                                               *
 * Visual grammar: unchanged is quiet neutral, change is brass, the     *
 * value under review is the confident one. No code-editor diffing.     *
 * ------------------------------------------------------------------ */

const lines: { field: string; before: string; after: string; changed: boolean; note?: string }[] = [
  { field: "Property limit", before: "₹50,00,00,000", after: "₹65,00,00,000", changed: true, note: "increased" },
  { field: "Deductible", before: "₹2,50,000", after: "₹5,00,000", changed: true, note: "doubled" },
  { field: "Policy period", before: "2025 — 2026", after: "2026 — 2027", changed: false, note: "rolled forward" },
  { field: "Endorsements", before: "02 attached", after: "03 attached", changed: true, note: "flood sub-limit added" },
  { field: "Exclusion wording", before: "CL-114", after: "CL-118", changed: true, note: "wording differs" },
  { field: "Coverage basis", before: "Reinstatement", after: "Reinstatement", changed: false, note: "as before" },
];

const changedCount = lines.filter((l) => l.changed).length;

export function Comparison() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.2 });
  const found = Math.min(changedCount, Math.floor(map(p, 0.25, 0.8, 0, 1) * changedCount + 0.001));

  return (
    <Scene id="comparison" index="07" label="Comparison" tone="bone" pad="clamp(92px, 10vw, 140px)" grid="rules">
      <Enter>
        <div className="cols c-6-6" style={{ alignItems: "end", marginBottom: "clamp(40px, 6vw, 82px)" }}>
          <div>
            <Micro>07 / 11 — Comparison</Micro>
            <Statement min={2.4} max={6} style={{ marginTop: 22 }} lines={[{ t: "SEE WHAT" }, { t: "CHANGED." }]} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Explain delay={120} style={{ maxWidth: "38ch" }}>
              Bring policy differences into view. Aurevia lines the two documents up, surfaces what
              moved, and leaves the judgement to you.
            </Explain>
            <div className="fade" style={{ display: "flex", gap: 24, transitionDelay: "200ms", flexWrap: "wrap" }}>
              <Micro color={c.onLightMuted}>— unchanged</Micro>
              <Micro color={c.brass}>— change found</Micro>
              <Ticker state={`${found} of ${changedCount} changes`} active={found > 0} color={c.brass} />
            </div>
          </div>
        </div>
      </Enter>

      <div ref={ref}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 3.2fr) minmax(0, 4.4fr) minmax(0, 4.4fr)",
            gap: "clamp(12px, 2vw, 34px)",
            paddingBottom: 14,
            borderBottom: `1px solid ${c.onLight}`,
          }}
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
                position: "relative",
                display: "grid",
                gridTemplateColumns: "minmax(0, 3.2fr) minmax(0, 4.4fr) minmax(0, 4.4fr)",
                gap: "clamp(12px, 2vw, 34px)",
                alignItems: "baseline",
                padding: "clamp(16px, 2.2vw, 28px) 0",
                borderBottom: `1px solid ${c.hairLightSoft}`,
                opacity: 0.3 + o * 0.7,
              }}
            >
              {/* the brass marker: a thin rule, not a box */}
              {l.changed && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: c.brass,
                    transform: `scaleY(${flag})`,
                    transformOrigin: "top",
                  }}
                />
              )}

              <span style={{ ...micro, color: c.onLightMuted, paddingTop: 8, paddingLeft: l.changed ? 14 : 0 }}>
                {l.field}
              </span>

              {/* the old value recedes */}
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: "clamp(0.88rem, 1.3vw, 1.15rem)",
                  color: l.changed ? c.onLightFaint : c.onLightMuted,
                  textDecoration: l.changed && flag > 0.6 ? "line-through" : "none",
                  textDecorationColor: c.onLightFaint,
                  textDecorationThickness: "1px",
                }}
              >
                {l.before}
              </span>

              {/* the new value is the confident one */}
              <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
                    fontWeight: l.changed ? 600 : 400,
                    letterSpacing: "-0.01em",
                    color: l.changed ? (flag > 0.4 ? c.brass : c.onLight) : c.onLight,
                    transition: "color 0.5s linear",
                  }}
                >
                  {l.after}
                </span>
                {l.note && (
                  <span
                    style={{
                      ...micro,
                      color: l.changed ? c.brass : meaning.stable,
                      opacity: l.changed ? flag : o * 0.85,
                    }}
                  >
                    {l.note}
                  </span>
                )}
              </span>
            </div>
          );
        })}

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
              <span style={{ transitionDelay: "90ms", color: c.brass }}>EASIER TO SEE.</span>
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
