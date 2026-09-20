/**
 * PLACEHOLDER PRODUCT VISUAL — Aurevia Document AI workspace.
 *
 * Rendered as markup so it stays sharp at any scale and is trivial to
 * replace with the real interface later: swap this one component.
 * Every name, document and number below is fictional and illustrative —
 * not customer data, and not a performance claim.
 */
import { c, font, micro } from "../theme";

const mono = (size = 10) => ({
  fontFamily: font.mono,
  fontSize: size,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
});

const rail = [
  ["Inbox", "12"],
  ["Documents", "128"],
  ["Comparisons", "12"],
  ["Risk register", "7"],
  ["Archive", ""],
];

const rows = [
  {
    name: "Example Industries — Property Wording 2026.pdf",
    type: "Wording",
    pages: 62,
    state: "Structured",
    risk: "Review",
  },
  {
    name: "Northgate Example Ltd — Renewal Quote.pdf",
    type: "Quote",
    pages: 18,
    state: "Structured",
    risk: "Clear",
  },
  {
    name: "Example Logistics — Schedule of Assets.xlsx",
    type: "Schedule",
    pages: 7,
    state: "Processing",
    risk: "—",
  },
  {
    name: "Harbour Example Mutual — Liability Wording.pdf",
    type: "Wording",
    pages: 44,
    state: "Queued",
    risk: "—",
  },
  {
    name: "Example Industries — Endorsement 03.pdf",
    type: "Endorsement",
    pages: 3,
    state: "Structured",
    risk: "Changed",
  },
  {
    name: "Example Industries — Claims Summary 2023-25.pdf",
    type: "Claims",
    pages: 11,
    state: "Structured",
    risk: "Clear",
  },
  {
    name: "Westline Example — Proposal Form.pdf",
    type: "Proposal",
    pages: 9,
    state: "Structured",
    risk: "Review",
  },
  {
    name: "Example Logistics — Fleet Schedule 2026.xlsx",
    type: "Schedule",
    pages: 5,
    state: "Processing",
    risk: "—",
  },
  {
    name: "Harbour Example Mutual — Endorsement 01.pdf",
    type: "Endorsement",
    pages: 2,
    state: "Queued",
    risk: "—",
  },
];

const stateColor: Record<string, string> = {
  Structured: c.blue,
  Processing: c.amber,
  Queued: c.onLightFaint,
};

const riskColor: Record<string, string> = {
  Review: c.amber,
  Changed: c.amber,
  Clear: c.onLightMuted,
  "—": c.onLightFaint,
};

export function Workspace() {
  return (
    <div
      style={{
        background: c.sheet,
        color: c.onLight,
        border: `1px solid ${c.hairLight}`,
        display: "flex",
        flexDirection: "column",
        fontFamily: font.sans,
        height: "100%",
        minHeight: 420,
        overflow: "hidden",
      }}
    >
      {/* application chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "10px 14px",
          borderBottom: `1px solid ${c.hairLight}`,
          background: c.paperRaised,
        }}
      >
        <span style={{ ...mono(10), fontWeight: 700 }}>AUREVIA</span>
        <span style={{ ...mono(9), color: c.onLightMuted }}>Document AI</span>

        <div
          style={{
            marginLeft: 12,
            flex: 1,
            maxWidth: 300,
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: `1px solid ${c.hairLight}`,
            background: "#fff",
            padding: "5px 9px",
          }}
          className="hide-sm"
        >
          <span aria-hidden style={{ ...mono(9), color: c.onLightFaint }}>
            ⌕
          </span>
          <span style={{ fontSize: 11, color: c.onLightFaint }}>Search documents, clauses, fields</span>
        </div>

        <span style={{ ...mono(9), color: c.onLightFaint, marginLeft: "auto" }} className="hide-sm">
          Aurevia User · Example Workspace
        </span>
      </div>

      {/* tabs + filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "0 14px",
          borderBottom: `1px solid ${c.hairLight}`,
          background: "#fff",
        }}
      >
        {["Documents", "Comparisons", "Fields", "Activity"].map((t, i) => (
          <span
            key={t}
            style={{
              ...mono(9.5),
              padding: "11px 0",
              color: i === 0 ? c.onLight : c.onLightFaint,
              borderBottom: `2px solid ${i === 0 ? c.blue : "transparent"}`,
            }}
          >
            {t}
          </span>
        ))}
        <span style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="hide-sm">
          {["All types", "Last 30 days", "Structured"].map((f) => (
            <span
              key={f}
              style={{
                ...mono(9),
                color: c.onLightMuted,
                border: `1px solid ${c.hairLight}`,
                padding: "4px 8px",
              }}
            >
              {f}
            </span>
          ))}
        </span>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* left rail */}
        <div
          className="hide-md"
          style={{
            width: 168,
            flex: "0 0 168px",
            borderRight: `1px solid ${c.hairLight}`,
            padding: "14px 0",
            background: c.paperRaised,
          }}
        >
          {rail.map(([label, count], i) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 14px",
                background: i === 1 ? "#fff" : "transparent",
                borderLeft: `2px solid ${i === 1 ? c.blue : "transparent"}`,
              }}
            >
              <span style={{ fontSize: 11.5, color: i === 1 ? c.onLight : c.onLightMuted }}>{label}</span>
              <span style={{ ...mono(9), color: c.onLightFaint }}>{count}</span>
            </div>
          ))}
          <div style={{ padding: "16px 14px 0" }}>
            <div style={{ ...mono(8.5), color: c.onLightFaint, marginBottom: 8 }}>Field coverage</div>
            {[
              ["Limits", 92],
              ["Deductibles", 86],
              ["Periods", 98],
            ].map(([k, v]) => (
              <div key={k as string} style={{ marginBottom: 7 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ ...mono(8.5), color: c.onLightMuted }}>{k}</span>
                  <span style={{ ...mono(8.5), color: c.onLightFaint }}>{v}%</span>
                </div>
                <div style={{ height: 2, background: c.hairLightSoft, marginTop: 3 }}>
                  <div style={{ width: `${v}%`, height: 2, background: c.blue, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* table */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 88px 52px 96px 84px",
              gap: 8,
              padding: "9px 14px",
              borderBottom: `1px solid ${c.hairLight}`,
              background: c.paperRaised,
            }}
          >
            {["Document", "Type", "Pages", "State", "Flags"].map((h, i) => (
              <span
                key={h}
                style={{ ...mono(8.5), color: c.onLightFaint, textAlign: i > 1 ? "right" : "left" }}
              >
                {h}
              </span>
            ))}
          </div>

          {rows.map((r, i) => (
            <div
              key={r.name}
              className="rowlift"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) 88px 52px 96px 84px",
                gap: 8,
                padding: "11px 14px",
                borderBottom: `1px solid ${c.hairLightSoft}`,
                alignItems: "center",
                background: i === 0 ? "rgba(28,60,214,0.035)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 11.5,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <span
                  aria-hidden
                  style={{ width: 9, height: 12, border: `1px solid ${c.onLightFaint}`, flex: "0 0 auto" }}
                />
                {r.name}
              </span>
              <span style={{ ...mono(8.5), color: c.onLightMuted }}>{r.type}</span>
              <span style={{ ...mono(8.5), color: c.onLightFaint, textAlign: "right" }}>{r.pages}</span>
              <span
                style={{
                  ...mono(8.5),
                  color: stateColor[r.state],
                  textAlign: "right",
                  display: "inline-flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span aria-hidden style={{ width: 4, height: 4, borderRadius: "50%", background: stateColor[r.state] }} />
                {r.state}
              </span>
              <span style={{ ...mono(8.5), color: riskColor[r.risk], textAlign: "right" }}>{r.risk}</span>
            </div>
          ))}

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 14px",
              borderTop: `1px solid ${c.hairLight}`,
              background: c.paperRaised,
            }}
          >
            <span style={{ ...mono(8.5), color: c.onLightFaint }}>9 of 128 documents</span>
            <span style={{ ...mono(8.5), color: c.onLightFaint }}>Illustrative interface · example data</span>
          </div>
        </div>

        {/* right inspector */}
        <div
          className="hide-md"
          style={{
            width: 216,
            flex: "0 0 216px",
            borderLeft: `1px solid ${c.hairLight}`,
            background: c.paperRaised,
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <div style={{ ...mono(8.5), color: c.onLightFaint, marginBottom: 9 }}>Selected · comparison</div>
            {[
              ["Property limit", "₹50,00,00,000", "₹65,00,00,000", true],
              ["Deductible", "₹2,50,000", "₹5,00,000", true],
              ["Policy period", "2025 — 2026", "2026 — 2027", false],
              ["Endorsements", "2", "3", true],
            ].map(([k, a, b, changed]) => (
              <div key={k as string} style={{ padding: "7px 0", borderBottom: `1px solid ${c.hairLightSoft}` }}>
                <div style={{ ...mono(8.5), color: c.onLightFaint }}>{k}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 9.5, color: c.onLightFaint, textDecoration: changed ? "line-through" : "none" }}>
                    {a}
                  </span>
                  <span aria-hidden style={{ ...mono(8), color: c.onLightFaint }}>
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: font.mono,
                      fontSize: 10,
                      color: changed ? c.amber : c.onLight,
                      fontWeight: changed ? 700 : 400,
                    }}
                  >
                    {b}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ ...mono(8.5), color: c.onLightFaint, marginBottom: 8 }}>Awaiting review</div>
            {["Flood sub-limit added", "Wording CL-114 → CL-118"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span aria-hidden style={{ width: 14, height: 1, background: c.amber }} />
                <span style={{ fontSize: 10.5, color: c.onLightMuted }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", ...micro, color: c.onLightFaint }}>Fictional example data</div>
        </div>
      </div>
    </div>
  );
}
