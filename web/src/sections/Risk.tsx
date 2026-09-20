import { c, display, eyebrow, font } from "../theme";
import { Display, Eyebrow, Lede, Reveal, Section, StatusTag } from "../components/primitives";
import { RiskGlyph } from "../components/visuals";

const chain = ["BUSINESS INFORMATION", "RISK SIGNALS", "AUREVIA", "RISK INTELLIGENCE", "INSIGHT"];

const areas = [
  ["Risk assessment", "Structuring what is known about an exposure."],
  ["Exposure analysis", "Bringing scattered information into one view."],
  ["Monitoring", "Noticing when the risk picture changes."],
  ["Reporting", "Turning analysis into something shareable."],
  ["Decision support", "Context for the people making the call."],
];

export function Risk() {
  return (
    <Section id="risk" tone="deep">
      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "clamp(36px, 5vw, 76px)",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Reveal>
            <Eyebrow>09 — Risk Intelligence</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Display lines={["SEE RISK", "DIFFERENTLY."]} min={2.4} max={5} />
          </Reveal>
          <Reveal delay={140}>
            <StatusTag status="development" />
          </Reveal>
          <Reveal delay={200}>
            <Lede>
              Aurevia is building intelligence solutions that help organizations understand, assess
              and work with changing risk. The capability areas below describe the direction of this
              work rather than features available today.
            </Lede>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div style={{ border: `1px solid ${c.line}`, background: "#FFFDF9", padding: "clamp(20px, 3vw, 36px)" }}>
            <RiskGlyph />
          </div>
        </Reveal>
      </div>

      {/* signal chain */}
      <div
        style={{
          marginTop: "clamp(48px, 7vw, 88px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "14px 18px",
        }}
      >
        {chain.map((s, i) => (
          <Reveal key={s} delay={i * 110}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
              <span
                style={{
                  ...eyebrow,
                  padding: "10px 16px",
                  border: `1px solid ${s === "AUREVIA" ? c.blue : c.line}`,
                  background: s === "AUREVIA" ? c.ink : "transparent",
                  color: s === "AUREVIA" ? c.ivory : c.body,
                }}
              >
                {s}
              </span>
              {i < chain.length - 1 && <span aria-hidden style={{ color: c.blue }}>→</span>}
            </span>
          </Reveal>
        ))}
      </div>

      <div
        style={{
          marginTop: "clamp(40px, 6vw, 72px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 0,
          borderTop: `1px solid ${c.line}`,
        }}
      >
        {areas.map(([name, note], i) => (
          <Reveal key={name} delay={i * 90}>
            <div
              style={{
                borderRight: `1px solid ${c.line}`,
                borderBottom: `1px solid ${c.line}`,
                padding: "clamp(20px, 2.6vw, 30px) clamp(16px, 2vw, 26px)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span style={{ ...eyebrow, fontSize: 10, color: c.amber }}>Building toward</span>
              <span style={{ ...display(1.05, 1.3) }}>{name}</span>
              <p style={{ margin: 0, fontFamily: font.serif, fontSize: 14.5, lineHeight: 1.5, color: c.body }}>
                {note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
