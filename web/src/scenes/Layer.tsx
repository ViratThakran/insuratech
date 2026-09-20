import { c, font, micro } from "../theme";
import { Enter, Explain, Micro, Scene, SceneMark, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

const inbound = [
  "Policy wording, 62 pages",
  "Renewal quote from insurer",
  "Schedule of insured assets",
  "Endorsement 03, mid-term",
  "Claims history, 3 years",
];

const outbound = [
  ["RENEWAL REVIEW", "differences surfaced"],
  ["SUBMISSION", "fields pre-filled"],
  ["RISK REGISTER", "exposure updated"],
  ["CLIENT REPORT", "ready to send"],
];

export function Layer() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.15 });

  /* packets only move while the visitor moves — information travelling through */
  const packets = Array.from({ length: 7 }, (_, i) => ((p * 1.35 + i * 0.145) % 1 + 1) % 1);

  return (
    <Scene id="layer" index="03" label="Intelligence" tone="dark" grid="rules">
      <div className="cols c-7-5" style={{ alignItems: "end", marginBottom: "clamp(52px, 7vw, 96px)" }}>
        <Enter>
          <SceneMark index="03" label="Intelligence" tone="dark" />
          <Statement
            tone="dark"
            min={1.9}
            max={3.8}
            style={{ marginTop: 26 }}
            lines={[{ t: "WE BUILD" }, { t: "THE INTELLIGENCE" }, { t: "LAYER." }]}
          />
        </Enter>
        <Enter>
          <Explain tone="dark" delay={120} style={{ maxWidth: "40ch" }}>
            Aurevia sits between the information insurance runs on and the workflows people
            actually work in. Everything below is a conceptual representation of that layer.
          </Explain>
        </Enter>
      </div>

      {/* --- the spatial system --- */}
      <div
        ref={ref}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(200px, 0.72fr) minmax(0, 1fr)",
          gap: "clamp(16px, 3vw, 44px)",
          alignItems: "stretch",
        }}
        className="cols"
      >
        {/* inbound — raw language */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Micro tone="dark">Business information</Micro>
          {inbound.map((t, i) => {
            const o = map(p, 0.02 + i * 0.05, 0.3 + i * 0.05, 0, 1);
            return (
              <div
                key={t}
                style={{
                  borderLeft: `1px solid ${c.hairDark}`,
                  paddingLeft: 14,
                  opacity: 0.25 + o * 0.75,
                  transform: `translateX(${(1 - o) * -10}px)`,
                }}
              >
                <span style={{ fontFamily: font.serif, fontSize: 14.5, color: c.onDarkMuted }}>{t}</span>
              </div>
            );
          })}
        </div>

        {/* the layer itself */}
        <div
          style={{
            position: "relative",
            border: `1px solid ${c.hairDark}`,
            background: c.charcoal,
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            padding: "clamp(18px, 2.4vw, 30px)",
            overflow: "hidden",
          }}
        >
          {/* travelling packets */}
          {packets.map((t, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                left: `${t * 100}%`,
                top: `${12 + ((i * 13) % 76)}%`,
                width: 18 + (i % 3) * 10,
                height: 1,
                background: i % 4 === 0 ? c.blueLift : c.hairDark,
                opacity: 0.2 + Math.sin(t * Math.PI) * 0.8,
              }}
            />
          ))}

          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                fontFamily: font.sans,
                fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              AUREVIA
            </div>
            <div style={{ ...micro, color: c.blueLift, marginTop: 8 }}>Intelligence layer</div>
            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 7,
              }}
            >
              {["CLASSIFY", "EXTRACT", "STRUCTURE", "COMPARE"].map((s, i) => {
                const active = p > 0.18 + i * 0.16;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: active ? c.blueLift : c.onDarkFaint,
                        transition: "background-color 0.5s linear",
                      }}
                    />
                    <span
                      style={{
                        ...micro,
                        color: active ? c.onDark : c.onDarkFaint,
                        transition: "color 0.5s linear",
                      }}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* outbound — structured work */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Micro tone="dark" style={{ textAlign: "right" }}>
            Insurance workflows
          </Micro>
          {outbound.map(([t, note], i) => {
            const o = map(p, 0.35 + i * 0.07, 0.62 + i * 0.07, 0, 1);
            return (
              <div
                key={t}
                style={{
                  border: `1px solid ${o > 0.6 ? c.hairDark : c.hairDarkSoft}`,
                  padding: "12px 14px",
                  opacity: 0.2 + o * 0.8,
                  transform: `translateX(${(1 - o) * 12}px)`,
                  background: o > 0.85 ? "rgba(110,138,245,0.04)" : "transparent",
                }}
              >
                <div style={{ ...micro, color: o > 0.85 ? c.blueLift : c.onDarkMuted }}>{t}</div>
                <div style={{ fontFamily: font.serif, fontSize: 13, color: c.onDarkFaint, marginTop: 4 }}>
                  {note}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
}
