/**
 * PLACEHOLDER PRODUCT VISUAL — Aurevia Document AI.
 *
 * This is an illustrative rendering of the Document AI workspace, built as
 * markup so it stays crisp, lightweight and easy to swap for the real
 * dashboard (replace this single component, nothing else references its
 * internals). All names, documents and values below are fictional examples
 * and are NOT Aurevia customer data or verified performance figures.
 */
import { c, font } from "../theme";

const panel: React.CSSProperties = {
  border: `1px solid ${c.line}`,
  background: "#FFFDF9",
};

const mono11 = { fontFamily: font.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" as const };

const documents = [
  { name: "Example Corporation — Property Policy.pdf", state: "Structured", pages: 42 },
  { name: "Example Insurance — Renewal Quote.pdf", state: "Structured", pages: 18 },
  { name: "Example Broker — Schedule of Assets.xlsx", state: "Processing", pages: 7 },
  { name: "Example Logistics — Liability Wording.pdf", state: "Queued", pages: 63 },
];

const stateColor: Record<string, string> = {
  Structured: c.blue,
  Processing: c.amber,
  Queued: c.body,
};

export function DocumentAIDashboard() {
  return (
    <div
      style={{
        ...panel,
        color: c.ink,
        boxShadow: "0 40px 80px -48px rgba(11,13,16,0.45)",
        overflow: "hidden",
      }}
    >
      {/* chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 16px",
          borderBottom: `1px solid ${c.line}`,
          background: c.ivoryDeep,
        }}
      >
        <span style={{ ...mono11, fontWeight: 700 }}>AUREVIA</span>
        <span style={{ ...mono11, color: c.body }}>Document AI</span>
        <span style={{ ...mono11, color: c.body, marginLeft: "auto" }} className="hide-sm">
          Aurevia User · Example Workspace
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 1,
          background: c.line,
        }}
        className="dash-grid"
      >
        {/* metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 1,
            background: c.line,
          }}
        >
          {[
            ["Documents in workspace", "128"],
            ["Structured this week", "34"],
            ["Comparisons run", "12"],
            ["Fields awaiting review", "9"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#FFFDF9", padding: "18px 20px" }}>
              <div style={{ ...mono11, color: c.body }}>{label}</div>
              <div
                style={{
                  fontFamily: font.sans,
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  marginTop: 6,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
            gap: 1,
            background: c.line,
          }}
          className="dash-body"
        >
          {/* recent documents */}
          <div style={{ background: "#FFFDF9", padding: "20px" }}>
            <div style={{ ...mono11, color: c.body, marginBottom: 14 }}>Recent documents</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {documents.map((d) => (
                <div
                  key={d.name}
                  className="row-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 6px",
                    borderTop: `1px solid ${c.line}`,
                    fontSize: 13,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 14,
                      height: 18,
                      border: `1px solid ${c.body}`,
                      flex: "0 0 auto",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.name}
                  </span>
                  <span style={{ ...mono11, color: c.body }} className="hide-sm">
                    {d.pages}p
                  </span>
                  <span style={{ ...mono11, color: stateColor[d.state] }}>{d.state}</span>
                </div>
              ))}
            </div>
          </div>

          {/* extraction + comparison */}
          <div style={{ background: "#FFFDF9", padding: "20px", display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <div style={{ ...mono11, color: c.body, marginBottom: 12 }}>Extracted fields</div>
              {[
                ["Insured", "Example Corporation"],
                ["Coverage", "Commercial Property"],
                ["Limit", "USD 2,000,000"],
                ["Deductible", "USD 25,000"],
                ["Policy period", "12 months"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: `1px solid ${c.line}`,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: c.body }}>{k}</span>
                  <span style={{ fontWeight: 500, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ ...mono11, color: c.body, marginBottom: 12 }}>Comparison summary</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Limit increased", c.blue],
                  ["Deductible changed", c.amber],
                  ["Endorsement added", c.blue],
                  ["Wording differs", c.amber],
                ].map(([label, color]) => (
                  <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span
                      aria-hidden
                      style={{ width: 22, height: 2, background: color as string, flex: "0 0 auto" }}
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...mono11,
          color: c.body,
          padding: "10px 16px",
          borderTop: `1px solid ${c.line}`,
          background: c.ivoryDeep,
        }}
      >
        Illustrative interface · example data
      </div>
    </div>
  );
}
