import { c, font } from "../theme";

const mono = { fontFamily: font.mono, fontSize: 9, letterSpacing: "0.18em" };

/* ------------------------------------------------------------------ */
/* 01 HERO — a single Aurevia signal travelling business → risk → intelligence */
/* ------------------------------------------------------------------ */
export function HeroSignal({ shift = 0 }: { shift?: number }) {
  return (
    <svg
      viewBox="0 0 520 420"
      width="100%"
      aria-hidden
      style={{ display: "block", overflow: "visible" }}
    >
      <g style={{ transform: `translateY(${shift}px)`, transition: "transform 120ms linear" }}>
        <circle cx="260" cy="210" r="168" fill="none" stroke={c.line} strokeWidth="1" />
        <circle cx="260" cy="210" r="112" fill="none" stroke={c.line} strokeWidth="1" />
        <circle cx="260" cy="210" r="56" fill="none" stroke={c.line} strokeWidth="1" />

        {/* signal path */}
        <path
          className="draw"
          d="M18 340 C 130 340, 150 240, 260 210 C 370 180, 400 96, 502 92"
          fill="none"
          stroke={c.blue}
          strokeWidth="1.6"
        />
        <path
          className="signal-dash"
          d="M18 340 C 130 340, 150 240, 260 210 C 370 180, 400 96, 502 92"
          fill="none"
          stroke={c.amber}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* nodes */}
        <g>
          <circle cx="18" cy="340" r="5" fill={c.ink} />
          <text x="30" y="366" style={mono} fill={c.body}>
            BUSINESS
          </text>
        </g>
        <g>
          <circle className="pulse" cx="260" cy="210" r="9" fill={c.blue} />
          <circle cx="260" cy="210" r="4" fill={c.blue} />
          <text x="286" y="184" style={mono} fill={c.body}>
            RISK
          </text>
        </g>
        <g>
          <rect x="494" y="84" width="16" height="16" fill={c.ink} />
          <text x="430" y="70" style={mono} fill={c.body}>
            INTELLIGENCE
          </text>
        </g>

        {/* data fragments */}
        {[
          [96, 148],
          [150, 96],
          [370, 296],
          [428, 246],
        ].map(([x, y], i) => (
          <rect
            key={i}
            className="drift"
            x={x}
            y={y}
            width={i % 2 ? 34 : 22}
            height="3"
            fill={c.line}
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 02 INDUSTRY — fragments of information moving through the page */
/* ------------------------------------------------------------------ */
export function InfoStream() {
  const rows = [
    "POLICY / 4021-A",
    "LIMIT  2,000,000",
    "DEDUCTIBLE 25,000",
    "ENDORSEMENT 03",
    "PERIOD 12 MONTHS",
    "EXCLUSION CL-114",
    "CLAIM  OPEN",
    "SCHEDULE OF ASSETS",
  ];
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        borderLeft: `1px solid ${c.lineDark}`,
        paddingLeft: 22,
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r}
          className="reveal"
          style={{
            transitionDelay: `${i * 70}ms`,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: font.mono,
            fontSize: 10,
            letterSpacing: "0.2em",
            color: i % 3 === 0 ? c.ivory : c.bodyDark,
          }}
        >
          <span
            style={{
              width: i % 3 === 0 ? 56 : 24,
              height: 1,
              background: i % 3 === 0 ? c.blue : c.lineDark,
            }}
          />
          {r}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 ROLE — information → Aurevia → intelligence → workflow */
/* ------------------------------------------------------------------ */
export function IntelligenceLayer() {
  const layers = [
    { label: "INSURANCE INFORMATION", note: "documents · data · risk · conversations" },
    { label: "AUREVIA", note: "AI models, structure and orchestration" },
    { label: "INTELLIGENCE", note: "extracted, structured, comparable" },
    { label: "WORKFLOW", note: "review, decisions, client work" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {layers.map((l, i) => {
        const isCore = l.label === "AUREVIA";
        return (
          <div
            key={l.label}
            className="reveal"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div
              style={{
                border: `1px solid ${isCore ? c.blue : c.line}`,
                background: isCore ? c.ink : "transparent",
                color: isCore ? c.ivory : c.ink,
                padding: "clamp(18px, 2.4vw, 28px) clamp(18px, 2.4vw, 30px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 16,
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: font.sans,
                  fontSize: isCore ? "clamp(1.4rem, 3vw, 2.2rem)" : "clamp(0.95rem, 1.6vw, 1.15rem)",
                  fontWeight: 600,
                  letterSpacing: isCore ? "-0.02em" : "0.04em",
                }}
              >
                {l.label}
              </span>
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: isCore ? c.blueSoft : c.body,
                }}
              >
                {l.note}
              </span>
            </div>
            {i < layers.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: 44,
                  marginLeft: "clamp(18px, 2.4vw, 30px)",
                  width: 1,
                  background: `linear-gradient(${c.line}, ${c.blue})`,
                }}
              />
            )}
          </div>
        );
      })}
      <p
        style={{
          ...mono,
          fontSize: 10,
          marginTop: 24,
          color: c.body,
          textTransform: "uppercase",
        }}
      >
        Conceptual representation of the Aurevia intelligence layer.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 SOLUTIONS — one signal branches into three capabilities */
/* ------------------------------------------------------------------ */
export function BranchSignal() {
  return (
    <svg viewBox="0 0 900 180" width="100%" aria-hidden style={{ display: "block" }}>
      <path
        className="draw"
        d="M0 90 H300"
        fill="none"
        stroke={c.blue}
        strokeWidth="1.4"
      />
      <path className="draw" d="M300 90 C 420 90, 440 22, 900 22" fill="none" stroke={c.blue} strokeWidth="1.2" />
      <path className="draw" d="M300 90 H900" fill="none" stroke={c.blue} strokeWidth="1.2" />
      <path className="draw" d="M300 90 C 420 90, 440 158, 900 158" fill="none" stroke={c.amber} strokeWidth="1.2" />
      <circle className="pulse" cx="300" cy="90" r="8" fill={c.blue} />
      <circle cx="300" cy="90" r="3.5" fill={c.blue} />
      {[22, 90, 158].map((y, i) => (
        <rect key={y} x="892" y={y - 4} width="8" height="8" fill={i === 2 ? c.amber : c.ink} />
      ))}
      <text x="700" y="14" style={mono} fill={c.body}>
        DOCUMENT AI
      </text>
      <text x="700" y="82" style={mono} fill={c.body}>
        RISK INTELLIGENCE
      </text>
      <text x="700" y="150" style={mono} fill={c.body}>
        VOICE AI
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Per-solution visual signatures */
/* ------------------------------------------------------------------ */
export function DocumentGlyph() {
  return (
    <svg viewBox="0 0 420 260" width="100%" aria-hidden style={{ display: "block" }}>
      <rect x="40" y="26" width="170" height="208" fill="none" stroke={c.line} />
      <rect x="64" y="46" width="170" height="208" fill={c.ivory} stroke={c.ink} />
      {[70, 92, 114, 136, 158, 180].map((y, i) => (
        <rect
          key={y}
          x="86"
          y={y}
          width={i === 2 ? 74 : i === 4 ? 96 : 126}
          height="4"
          fill={i === 2 ? c.blue : c.line}
        />
      ))}
      <path className="signal-dash" d="M234 150 H320" stroke={c.blue} strokeWidth="1.6" fill="none" />
      <g>
        {[
          ["FIELD", 40],
          ["VALUE", 76],
          ["FIELD", 112],
          ["VALUE", 148],
        ].map(([t, y], i) => (
          <g key={i}>
            <rect x="330" y={Number(y) + 40} width="70" height="20" fill="none" stroke={c.blue} />
            <text x="338" y={Number(y) + 54} style={mono} fill={c.blue}>
              {t as string}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function RiskGlyph() {
  const nodes = [
    [70, 60],
    [160, 30],
    [240, 96],
    [110, 150],
    [210, 196],
    [330, 60],
    [340, 170],
  ];
  return (
    <svg viewBox="0 0 420 260" width="100%" aria-hidden style={{ display: "block" }}>
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) =>
          Math.hypot(x - x2, y - y2) < 150 ? (
            <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={c.line} strokeWidth="1" />
          ) : null
        )
      )}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          className={i % 3 === 0 ? "pulse" : undefined}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 7 : 4}
          fill={i % 3 === 0 ? c.blue : c.ink}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {[220, 238].map((y) => (
        <line key={y} x1="40" y1={y} x2="380" y2={y} stroke={c.line} strokeDasharray="2 6" />
      ))}
    </svg>
  );
}

export function VoiceGlyph() {
  const bars = Array.from({ length: 34 }, (_, i) => i);
  return (
    <svg viewBox="0 0 420 260" width="100%" aria-hidden style={{ display: "block" }}>
      <g transform="translate(20,130)">
        {bars.map((i) => {
          const h = 16 + Math.abs(Math.sin(i * 0.6)) * 78;
          return (
            <rect
              key={i}
              className="wave-bar"
              x={i * 11}
              y={-h / 2}
              width="3"
              height={h}
              fill={i % 7 === 0 ? c.amber : c.line}
              style={{ animationDelay: `${(i % 9) * 0.12}s` }}
            />
          );
        })}
      </g>
      <line x1="0" y1="130" x2="420" y2="130" stroke={c.lineDark} strokeOpacity="0.2" />
      <text x="20" y="232" style={mono} fill={c.body}>
        CONVERSATION → WORKFLOW
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 11 PLATFORM — layers converge into one Aurevia signal */
/* ------------------------------------------------------------------ */
export function Convergence() {
  const inputs = ["DOCUMENT AI", "RISK INTELLIGENCE", "VOICE AI", "FUTURE SOLUTIONS"];
  return (
    <svg viewBox="0 0 900 340" width="100%" aria-hidden style={{ display: "block" }}>
      {inputs.map((label, i) => {
        const y = 40 + i * 74;
        return (
          <g key={label}>
            <rect x="0" y={y - 16} width="8" height="32" fill={i === 3 ? c.amber : c.blue} />
            <text x="24" y={y + 4} style={mono} fill={c.bodyDark}>
              {label}
            </text>
            <path
              className="draw"
              d={`M200 ${y} C 420 ${y}, 500 170, 690 170`}
              fill="none"
              stroke={i === 3 ? c.amber : c.blueSoft}
              strokeWidth="1"
              style={{ transitionDelay: `${i * 180}ms` }}
            />
          </g>
        );
      })}
      <circle className="pulse" cx="700" cy="170" r="14" fill={c.blue} />
      <circle cx="700" cy="170" r="5" fill={c.ivory} />
      <path className="signal-dash" d="M714 170 H880" stroke={c.ivory} strokeWidth="1.6" fill="none" />
      <text x="756" y="152" style={mono} fill={c.ivory}>
        AUREVIA
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 12 CLOSING — the system simplifies back to one signal */
/* ------------------------------------------------------------------ */
export function ClosingSignal() {
  return (
    <svg viewBox="0 0 900 120" width="100%" aria-hidden style={{ display: "block" }}>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          className="draw"
          d={`M0 ${16 + i * 29} C 300 ${16 + i * 29}, 380 60, 560 60`}
          fill="none"
          stroke={c.lineDark}
          strokeWidth="1"
          style={{ transitionDelay: `${i * 140}ms` }}
        />
      ))}
      <path className="signal-dash" d="M560 60 H900" stroke={c.blue} strokeWidth="2" fill="none" />
      <circle className="pulse" cx="560" cy="60" r="9" fill={c.blue} />
    </svg>
  );
}
