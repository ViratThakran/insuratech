import { c, display, font } from "../theme";
import { Display, Eyebrow, Lede, Reveal, Section } from "../components/primitives";
import { InfoStream } from "../components/visuals";

const words = ["DOCUMENTS.", "DATA.", "RISK.", "PEOPLE.", "DECISIONS."];

export function Industry() {
  return (
    <Section id="industry" tone="dark">
      <Reveal>
        <Eyebrow tone="dark">02 — The industry</Eyebrow>
      </Reveal>

      <Reveal delay={80} style={{ marginTop: 28 }}>
        <Display lines={["INSURANCE RUNS", "ON INFORMATION."]} tone="dark" min={2.4} max={5.6} />
      </Reveal>

      <div
        style={{
          marginTop: "clamp(48px, 7vw, 96px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 0.6fr)",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
        className="grid-2"
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {words.map((w, i) => (
            <Reveal as="li" key={w} delay={i * 110}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(16px, 3vw, 40px)",
                  borderBottom: `1px solid ${c.lineDark}`,
                  padding: "clamp(12px, 1.6vw, 20px) 0",
                }}
              >
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: c.blueSoft,
                    flex: "0 0 auto",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    ...display(1.9, 4.2),
                    color: i === 2 ? c.blueSoft : c.ivory,
                  }}
                >
                  {w}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <InfoStream />
      </div>

      <Reveal delay={120} style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
        <Lede tone="dark" style={{ maxWidth: "46ch", color: c.ivory }}>
          Every insurance workflow depends on understanding information.
        </Lede>
      </Reveal>
    </Section>
  );
}
