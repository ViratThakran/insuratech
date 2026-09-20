import { c, display, eyebrow, font } from "../theme";
import { Display, Eyebrow, Reveal, Section } from "../components/primitives";

/** Six frames of ONE document transformation — the glyph evolves, it does not repeat. */
function Frame({ i }: { i: number }) {
  const stroke = c.line;
  const page = (x: number, dim = false) => (
    <rect x={x} y="14" width="48" height="64" fill="#FFFDF9" stroke={dim ? stroke : c.ink} />
  );
  return (
    <svg viewBox="0 0 120 96" width="100%" aria-hidden style={{ display: "block", maxWidth: 190 }}>
      {/* 01 upload */}
      {i === 0 && (
        <>
          {page(36)}
          <path className="signal-dash" d="M60 96 V82" stroke={c.blue} strokeWidth="1.6" />
          {[24, 34, 44, 54, 64].map((y) => (
            <rect key={y} x="44" y={y} width="32" height="3" fill={stroke} />
          ))}
        </>
      )}
      {/* 02 extract */}
      {i === 1 && (
        <>
          {page(36)}
          {[24, 34, 44, 54, 64].map((y, k) => (
            <rect
              key={y}
              x="44"
              y={y}
              width={k % 2 ? 22 : 32}
              height="3"
              fill={k % 2 ? c.blue : stroke}
            />
          ))}
          <rect x="42" y="31" width="26" height="9" fill="none" stroke={c.blue} />
          <rect x="42" y="51" width="26" height="9" fill="none" stroke={c.blue} />
        </>
      )}
      {/* 03 understand — structured rows */}
      {i === 2 && (
        <>
          {page(14, true)}
          {[20, 34, 48, 62].map((y) => (
            <g key={y}>
              <rect x="70" y={y} width="20" height="9" fill="none" stroke={c.blue} />
              <rect x="94" y={y} width="20" height="9" fill={c.blue} fillOpacity="0.18" stroke={c.blue} />
            </g>
          ))}
          <path className="signal-dash" d="M62 48 H70" stroke={c.blue} strokeWidth="1.6" />
        </>
      )}
      {/* 04 compare — second document enters */}
      {i === 3 && (
        <>
          {page(8, true)}
          {page(60)}
          <path className="signal-dash" d="M56 46 H60" stroke={c.blue} strokeWidth="1.6" />
          {[24, 38, 52, 66].map((y) => (
            <g key={y}>
              <rect x="16" y={y} width="32" height="3" fill={stroke} />
              <rect x="68" y={y} width="32" height="3" fill={stroke} />
            </g>
          ))}
        </>
      )}
      {/* 05 identify — differences highlighted */}
      {i === 4 && (
        <>
          {page(8, true)}
          {page(60)}
          {[24, 38, 52, 66].map((y, k) => (
            <g key={y}>
              <rect x="16" y={y} width="32" height="3" fill={k === 1 ? c.amber : stroke} />
              <rect x="68" y={y} width={k === 1 ? 20 : 32} height="3" fill={k === 1 ? c.amber : stroke} />
              {k === 1 && <path d="M50 39 H66" stroke={c.amber} strokeWidth="1.2" />}
            </g>
          ))}
        </>
      )}
      {/* 06 review — insight */}
      {i === 5 && (
        <>
          <rect x="18" y="18" width="84" height="56" fill="#FFFDF9" stroke={c.ink} />
          {[28, 40, 52].map((y, k) => (
            <g key={y}>
              <rect x="28" y={y} width="42" height="4" fill={k === 0 ? c.blue : stroke} />
              <rect x="76" y={y} width="16" height="4" fill={k === 1 ? c.amber : stroke} />
            </g>
          ))}
          <circle className="pulse" cx="60" cy="68" r="5" fill={c.blue} />
        </>
      )}
    </svg>
  );
}

const stages = [
  ["01", "UPLOAD", "Documents enter the workspace."],
  ["02", "EXTRACT", "Relevant information is detected."],
  ["03", "UNDERSTAND", "Content becomes structured fields."],
  ["04", "COMPARE", "A second document is brought alongside."],
  ["05", "IDENTIFY", "Differences are surfaced for attention."],
  ["06", "REVIEW", "A person makes the final call."],
];

export function Workflow() {
  return (
    <Section id="workflow" tone="deep">
      <Reveal>
        <Eyebrow>06 — Document AI workflow</Eyebrow>
      </Reveal>
      <Reveal delay={80} style={{ marginTop: 28, marginBottom: "clamp(40px, 6vw, 72px)" }}>
        <Display lines={["FROM DOCUMENT", "TO INTELLIGENCE."]} min={2.2} max={4.6} />
      </Reveal>

      {/* one continuous rail */}
      <div style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 62,
            height: 1,
            background: `linear-gradient(90deg, ${c.line}, ${c.blue}, ${c.amber})`,
          }}
          className="hide-sm"
        />
        <div
          className="wf-grid"
          style={{ display: "grid", gap: "clamp(28px, 3vw, 40px)" }}
        >
          {stages.map(([n, title, note], i) => (
            <Reveal key={n} delay={i * 120}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ height: 110, display: "flex", alignItems: "center" }}>
                  <Frame i={i} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: i === 4 ? c.amber : c.blue,
                      outline: `4px solid ${c.ivoryDeep}`,
                    }}
                  />
                  <span style={{ ...eyebrow, color: c.body }}>{n}</span>
                </div>
                <h3 style={{ ...display(1.05, 1.35), letterSpacing: "-0.01em" }}>{title}</h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: font.serif,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    color: c.body,
                  }}
                >
                  {note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
