import { Display, Eyebrow, Lede, Reveal, Section } from "../components/primitives";
import { IntelligenceLayer } from "../components/visuals";

export function Role() {
  return (
    <Section id="about" tone="deep">
      <div
        className="grid-2"
        style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(40px, 6vw, 88px)", alignItems: "start" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "sticky", top: 120 }}>
          <Reveal>
            <Eyebrow>03 — Aurevia's role</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Display lines={["WE BUILD", "THE INTELLIGENCE LAYER."]} min={2.2} max={4.4} />
          </Reveal>
          <Reveal delay={160}>
            <Lede>
              Aurevia connects information, AI and insurance workflows to help organizations work
              with complexity more efficiently.
            </Lede>
          </Reveal>
        </div>

        <IntelligenceLayer />
      </div>
    </Section>
  );
}
