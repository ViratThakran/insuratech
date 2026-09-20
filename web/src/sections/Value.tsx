import { c, display, eyebrow, font } from "../theme";
import { Eyebrow, Lede, Reveal, Section } from "../components/primitives";

const audiences = [
  ["BROKERS", "Renewal reviews, client-ready comparisons, submission prep."],
  ["INSURERS", "Document intake, structured information, internal workflows."],
  ["RISK TEAMS", "Exposure information in a form teams can actually work with."],
  ["ENTERPRISES", "Insight into the policies and risk sitting across the business."],
];

export function Value() {
  return (
    <Section id="value" tone="dark">
      <Reveal>
        <Eyebrow tone="dark">08 — Value</Eyebrow>
      </Reveal>

      <Reveal delay={80} style={{ marginTop: 28 }}>
        <h2 style={{ ...display(2.1, 4.8), color: c.ivory }}>
          <span style={{ display: "block" }}>LESS MANUAL REVIEW.</span>
          <span style={{ display: "block" }}>MORE TIME FOR THE WORK</span>
          <span
            style={{
              display: "block",
              fontFamily: font.serif,
              fontStyle: "italic",
              fontWeight: 400,
              color: c.blueSoft,
            }}
          >
            that matters.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={160} style={{ marginTop: 34, maxWidth: "62ch" }}>
        <Lede tone="dark">
          Aurevia is designed to reduce repetitive document work and help insurance professionals
          focus more time on clients, risk discussions and decisions. People stay in control of
          every decision — Aurevia handles the groundwork.
        </Lede>
      </Reveal>

      <div
        style={{
          marginTop: "clamp(48px, 7vw, 88px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 0,
          borderTop: `1px solid ${c.lineDark}`,
        }}
      >
        {audiences.map(([name, note], i) => (
          <Reveal key={name} delay={i * 110}>
            <div
              style={{
                borderRight: `1px solid ${c.lineDark}`,
                borderBottom: `1px solid ${c.lineDark}`,
                padding: "clamp(24px, 3vw, 36px) clamp(18px, 2.4vw, 30px)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <span style={{ ...eyebrow, color: c.blueSoft }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ ...display(1.15, 1.6), color: c.ivory }}>{name}</span>
              <p
                style={{
                  margin: 0,
                  fontFamily: font.serif,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: c.bodyDark,
                }}
              >
                {note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
