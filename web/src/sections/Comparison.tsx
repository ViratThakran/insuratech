import { c, display, eyebrow, font } from "../theme";
import { Display, Eyebrow, Lede, Reveal, Section } from "../components/primitives";

const rows: { field: string; existing: string; renewal: string; changed: boolean }[] = [
  { field: "Coverage", existing: "Commercial Property", renewal: "Commercial Property", changed: false },
  { field: "Limit", existing: "USD 1,500,000", renewal: "USD 2,000,000", changed: true },
  { field: "Deductible", existing: "USD 10,000", renewal: "USD 25,000", changed: true },
  { field: "Policy period", existing: "12 months", renewal: "12 months", changed: false },
  { field: "Endorsements", existing: "2 attached", renewal: "3 attached", changed: true },
  { field: "Exclusions", existing: "Wording CL-114", renewal: "Wording CL-118", changed: true },
];

const cell: React.CSSProperties = {
  padding: "16px clamp(12px, 1.6vw, 22px)",
  fontSize: 14.5,
  borderTop: `1px solid ${c.line}`,
  verticalAlign: "top",
};

export function Comparison() {
  return (
    <Section id="comparison">
      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)",
          gap: "clamp(36px, 5vw, 72px)",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Reveal>
            <Eyebrow>07 — Policy comparison</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Display lines={["SEE WHAT", "CHANGED."]} min={2.4} max={5} />
          </Reveal>
          <Reveal delay={140}>
            <Lede>Bring differences between insurance documents into view.</Lede>
          </Reveal>
          <Reveal delay={200}>
            <h3 style={{ ...display(1.1, 1.7), maxWidth: "20ch" }}>
              MAKE POLICY DIFFERENCES EASIER TO SEE.
            </h3>
          </Reveal>
          <Reveal delay={260}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Unchanged", c.body],
                ["Difference to review", c.amber],
              ].map(([label, color]) => (
                <span
                  key={label as string}
                  style={{ ...eyebrow, display: "inline-flex", alignItems: "center", gap: 10, color: color as string }}
                >
                  <span aria-hidden style={{ width: 22, height: 2, background: color as string }} />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div style={{ border: `1px solid ${c.line}`, background: "#FFFDF9", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
              <thead>
                <tr>
                  {["Field", "Existing policy", "New policy"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        ...eyebrow,
                        textAlign: "left",
                        padding: "14px clamp(12px, 1.6vw, 22px)",
                        color: i === 2 ? c.blue : c.body,
                        background: c.ivoryDeep,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.field} className="row-hover">
                    <td style={{ ...cell, fontFamily: font.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: c.body }}>
                      {r.field}
                    </td>
                    <td style={{ ...cell, color: r.changed ? c.body : c.ink }}>{r.existing}</td>
                    <td
                      style={{
                        ...cell,
                        fontWeight: r.changed ? 600 : 400,
                        color: r.changed ? c.amber : c.ink,
                        borderLeft: r.changed ? `2px solid ${c.amber}` : `1px solid ${c.line}`,
                        background: r.changed ? "rgba(181,112,28,0.06)" : "transparent",
                      }}
                    >
                      {r.renewal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                ...eyebrow,
                fontSize: 10,
                color: c.body,
                margin: 0,
                padding: "12px clamp(12px, 1.6vw, 22px)",
                borderTop: `1px solid ${c.line}`,
                background: c.ivoryDeep,
              }}
            >
              Example comparison · illustrative values · reviewed by a person
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
