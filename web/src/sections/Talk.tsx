import { c, display, eyebrow, font } from "../theme";
import { Button, Eyebrow, Lede, Reveal, Section } from "../components/primitives";
import { ClosingSignal } from "../components/visuals";

export function Talk() {
  return (
    <Section id="talk" tone="dark" pad="clamp(96px, 12vw, 170px)">
      <Reveal>
        <Eyebrow tone="dark">12 — Talk to us</Eyebrow>
      </Reveal>

      <Reveal delay={80} style={{ marginTop: 32 }}>
        <h2 style={{ ...display(2.4, 6), color: c.ivory }}>
          <span style={{ display: "block" }}>LET'S BUILD</span>
          <span style={{ display: "block" }}>THE FUTURE OF</span>
          <span
            style={{
              display: "block",
              fontFamily: font.serif,
              fontStyle: "italic",
              fontWeight: 400,
              color: c.blueSoft,
            }}
          >
            insurance.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={160} style={{ marginTop: 34 }}>
        <Lede tone="dark">
          Explore Aurevia's AI solutions for insurance, risk and workflow automation.
        </Lede>
      </Reveal>

      <Reveal delay={220} style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14 }}>
        <Button href="mailto:hello@aurevia.ai" tone="dark">
          Talk to Aurevia
        </Button>
        <Button href="#solutions" variant="ghost" tone="dark">
          Explore solutions
        </Button>
      </Reveal>

      <Reveal delay={280} style={{ marginTop: "clamp(56px, 8vw, 110px)" }}>
        <ClosingSignal />
      </Reveal>

      <Reveal delay={120} style={{ marginTop: 26 }}>
        <p style={{ ...eyebrow, color: c.bodyDark }}>
          Aurevia — We turn business risk into intelligence.
        </p>
      </Reveal>
    </Section>
  );
}
