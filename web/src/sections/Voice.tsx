import { c, display, eyebrow, font } from "../theme";
import { Eyebrow, Lede, Reveal, Section, StatusTag } from "../components/primitives";
import { VoiceGlyph } from "../components/visuals";

const useCases = [
  "Customer follow-up",
  "Renewal communication",
  "Lead qualification",
  "Appointment scheduling",
  "Document collection",
  "Inbound assistance",
];

const turns = [
  ["AUREVIA VOICE", "Calling about the upcoming renewal for Example Corporation."],
  ["CONTACT", "We're still waiting on the updated schedule of assets."],
  ["WORKFLOW", "Document request logged · reminder scheduled · handed to broker."],
];

export function Voice() {
  return (
    <Section id="voice" tone="dark">
      <Reveal>
        <Eyebrow tone="dark" accent={c.amberSoft}>
          10 — Voice AI
        </Eyebrow>
      </Reveal>

      <div
        className="grid-2"
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "clamp(36px, 5vw, 76px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Reveal delay={80}>
            <h2 style={{ ...display(2.2, 4.4), color: c.ivory }}>
              <span style={{ display: "block" }}>LET AI HANDLE</span>
              <span style={{ display: "block", color: c.amberSoft }}>THE CONVERSATION.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <StatusTag status="next" tone="dark" />
          </Reveal>
          <Reveal delay={200}>
            <Lede tone="dark">
              Voice AI can help automate repetitive insurance communication and workflow tasks while
              keeping people in control. This solution is in development — calls are always
              identified as automated, and anything that needs judgement goes to a person.
            </Lede>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div
            style={{
              border: `1px solid ${c.lineDark}`,
              padding: "clamp(20px, 3vw, 34px)",
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            <VoiceGlyph />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {turns.map(([who, line], i) => (
                <div key={who} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      ...eyebrow,
                      fontSize: 10,
                      color: i === 2 ? c.amberSoft : c.blueSoft,
                    }}
                  >
                    {who}
                  </span>
                  <span style={{ fontFamily: font.serif, fontSize: 15, lineHeight: 1.5, color: c.ivory }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div
        style={{
          marginTop: "clamp(44px, 6vw, 80px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px 28px",
          borderTop: `1px solid ${c.lineDark}`,
          paddingTop: 26,
        }}
      >
        {useCases.map((u, i) => (
          <Reveal key={u} delay={i * 80}>
            <span
              style={{
                ...eyebrow,
                color: c.bodyDark,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span aria-hidden style={{ width: 14, height: 1, background: c.amberSoft }} />
              {u}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
