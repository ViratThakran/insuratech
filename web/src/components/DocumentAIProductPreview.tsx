/**
 * ============================================================================
 * DocumentAIProductPreview — THE PRODUCT VISUAL BOUNDARY
 * ============================================================================
 * This component is the single seam between the marketing site and the
 * Aurevia Document AI product. To ship the real interface, replace the body
 * of this file (an <img>, an iframe, or a live embed) and keep the props:
 *
 *   focus: "overview" | "documents" | "comparison" | "fields" | "insights"
 *
 * The scene around it drives `focus` as the visitor scrolls; nothing else in
 * the page reaches inside this component.
 *
 * Everything below is an ILLUSTRATIVE placeholder. Names, documents, counts
 * and values are fictional — not customer data, not performance claims.
 * ============================================================================
 */
import { c, font, meaning, micro } from "../theme";

export type ProductFocus = "overview" | "documents" | "comparison" | "fields" | "insights";

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
  { name: "Example Industries — Property Wording 2026.pdf", type: "Wording", pages: 62, state: "Structured", flag: "Review" },
  { name: "Northgate Example Ltd — Renewal Quote.pdf", type: "Quote", pages: 18, state: "Structured", flag: "Clear" },
  { name: "Example Logistics — Schedule of Assets.xlsx", type: "Schedule", pages: 7, state: "Processing", flag: "—" },
  { name: "Harbour Example Mutual — Liability Wording.pdf", type: "Wording", pages: 44, state: "Queued", flag: "—" },
  { name: "Example Industries — Endorsement 03.pdf", type: "Endorsement", pages: 3, state: "Structured", flag: "Changed" },
  { name: "Example Industries — Claims Summary 2023-25.pdf", type: "Claims", pages: 11, state: "Structured", flag: "Clear" },
  { name: "Westline Example — Proposal Form.pdf", type: "Proposal", pages: 9, state: "Structured", flag: "Review" },
  { name: "Example Logistics — Fleet Schedule 2026.xlsx", type: "Schedule", pages: 5, state: "Processing", flag: "—" },
  { name: "Harbour Example Mutual — Endorsement 01.pdf", type: "Endorsement", pages: 2, state: "Queued", flag: "—" },
];

const stateColor: Record<string, string> = {
  Structured: meaning.stable,
  Processing: c.brass,
  Queued: c.onLightFaint,
};

const flagColor: Record<string, string> = {
  Review: c.brass,
  Changed: c.brass,
  Clear: c.onLightMuted,
  "—": c.onLightFaint,
};

/** Panels dim when they are not the focus of the scene. */
function panel(active: boolean, focus: ProductFocus) {
  const neutral = focus === "overview";
  return {
    opacity: neutral ? 1 : active ? 1 : 0.42,
    filter: neutral || active ? "none" : "saturate(0.6)",
    transition: "opacity 0.6s cubic-bezier(0.32,0.72,0.24,1), filter 0.6s linear",
  } as const;
}

export function DocumentAIProductPreview({ focus = "overview" }: { focus?: ProductFocus }) {
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
          background: c.bone,
        }}
      >
        <span style={{ ...mono(10), fontWeight: 700 }}>AUREVIA</span>
        <span style={{ ...mono(9), color: c.onLightMuted }}>Document AI</span>

        <div
          className="hide-sm"
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
        >
          <span aria-hidden style={{ ...mono(9), color: c.onLightFaint }}>
            ⌕
          </span>
          <span style={{ fontSize: 11, color: c.onLightFaint }}>Search documents, clauses, fields</span>
        </div>

        <span className="hide-sm" style={{ ...mono(9), color: c.onLightFaint, marginLeft: "auto" }}>
          Aurevia User · Example Workspace
        </span>
      </div>

      {/* tabs + filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: `0 14px`,
          borderBottom: `1px solid ${c.hairLight}`,
          background: "#fff",
        }}
      >
        {(["Documents", "Comparisons", "Fields", "Activity"] as const).map((t) => {
          const active =
            (focus === "comparison" && t === "Comparisons") ||
            (focus === "fields" && t === "Fields") ||
            ((focus === "documents" || focus === "overview" || focus === "insights") && t === "Documents");
          return (
            <span
              key={t}
              style={{
                ...mono(9.5),
                padding: "11px 0",
                color: active ? c.onLight : c.onLightFaint,
                borderBottom: `2px solid ${active ? c.blue : "transparent"}`,
                transition: "color 0.4s linear, border-color 0.4s linear",
              }}
            >
              {t}
            </span>
          );
        })}
        <span className="hide-sm" style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["All types", "Last 30 days", "Structured"].map((f) => (
            <span
              key={f}
              style={{ ...mono(9), color: c.onLightMuted, border: `1px solid ${c.hairLight}`, padding: "4px 8px" }}
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
            background: c.bone,
            ...panel(focus === "documents", focus),
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

          <div style={{ padding: "16px 14px 0", ...panel(focus === "fields", focus) }}>
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
                  <div style={{ width: `${v}%`, height: 2, background: c.blue, opacity: 0.75 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* documents table */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            ...panel(focus === "documents" || focus === "insights", focus),
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 88px 52px 96px 84px",
              gap: 8,
              padding: "9px 14px",
              borderBottom: `1px solid ${c.hairLight}`,
              background: c.bone,
            }}
          >
            {["Document", "Type", "Pages", "State", "Flags"].map((h, i) => (
              <span key={h} style={{ ...mono(8.5), color: c.onLightFaint, textAlign: i > 1 ? "right" : "left" }}>
                {h}
              </span>
            ))}
          </div>

          {rows.map((r, i) => {
            const spotlight = focus === "insights" && (r.flag === "Review" || r.flag === "Changed");
            return (
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
                  background: spotlight
                    ? "rgba(156,106,58,0.07)"
                    : i === 0 && focus === "documents"
                    ? "rgba(79,99,255,0.04)"
                    : "transparent",
                  transition: "background-color 0.5s linear",
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
                  <span aria-hidden style={{ width: 9, height: 12, border: `1px solid ${c.onLightFaint}`, flex: "0 0 auto" }} />
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
                <span style={{ ...mono(8.5), color: flagColor[r.flag], textAlign: "right" }}>{r.flag}</span>
              </div>
            );
          })}

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 14px",
              borderTop: `1px solid ${c.hairLight}`,
              background: c.bone,
            }}
          >
            <span style={{ ...mono(8.5), color: c.onLightFaint }}>9 of 128 documents</span>
            <span style={{ ...mono(8.5), color: c.onLightFaint }}>Illustrative interface · example data</span>
          </div>
        </div>

        {/* inspector */}
        <div
          className="hide-md"
          style={{
            width: 216,
            flex: "0 0 216px",
            borderLeft: `1px solid ${c.hairLight}`,
            background: c.bone,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            ...panel(focus === "comparison" || focus === "insights", focus),
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
                  <span
                    style={{
                      fontFamily: font.mono,
                      fontSize: 9.5,
                      color: c.onLightFaint,
                      textDecoration: changed ? "line-through" : "none",
                    }}
                  >
                    {a}
                  </span>
                  <span aria-hidden style={{ ...mono(8), color: c.onLightFaint }}>
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: font.mono,
                      fontSize: 10,
                      color: changed ? c.brass : c.onLight,
                      fontWeight: changed ? 700 : 400,
                    }}
                  >
                    {b}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={panel(focus === "insights", focus)}>
            <div style={{ ...mono(8.5), color: c.onLightFaint, marginBottom: 8 }}>Awaiting review</div>
            {["Flood sub-limit added", "Wording CL-114 → CL-118"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span aria-hidden style={{ width: 14, height: 1, background: c.brass }} />
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
