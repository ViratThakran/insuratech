import { c, display, font } from "../theme";
import { Display, Eyebrow, Lede, Reveal, Section } from "../components/primitives";
import { Convergence } from "../components/visuals";

export function Platform() {
  return (
    <Section id="platform" tone="dark" style={{ borderTop: `1px solid ${c.lineDark}` }}>
      <Reveal>
        <Eyebrow tone="dark">11 — The Aurevia platform</Eyebrow>
      </Reveal>

      <Reveal delay={80} style={{ marginTop: 28 }}>
        <Display lines={["ONE INTELLIGENCE LAYER.", "MANY INSURANCE WORKFLOWS."]} tone="dark" min={2} max={4.3} />
      </Reveal>

      <Reveal delay={160} style={{ marginTop: "clamp(44px, 6vw, 80px)" }}>
        <Convergence />
      </Reveal>

      <div
        className="grid-2"
        style={{
          marginTop: "clamp(44px, 6vw, 80px)",
          display: "grid",
          gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)",
          gap: "clamp(28px, 4vw, 64px)",
          alignItems: "start",
          borderTop: `1px solid ${c.lineDark}`,
          paddingTop: 40,
        }}
      >
        <Reveal>
          <h3
            style={{
              ...display(1.8, 3.2),
              color: c.ivory,
            }}
          >
            BUILT TO{" "}
            <span style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: c.blueSoft }}>
              evolve
            </span>
            .
          </h3>
        </Reveal>
        <Reveal delay={120}>
          <Lede tone="dark">
            Aurevia is designed as a growing intelligence platform for the insurance ecosystem,
            allowing new AI-powered solutions to be added as insurance workflows evolve. Document AI
            is available today; Risk Intelligence and Voice AI are in active development.
          </Lede>
        </Reveal>
      </div>
    </Section>
  );
}
