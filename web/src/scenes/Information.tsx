import { c, font, micro, statement } from "../theme";
import { Enter, Explain, Scene, SceneMark, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* Each word behaves according to what it is. Nothing repeats. */

function PaperBehaviour({ p }: { p: number }) {
  return (
    <svg viewBox="0 0 220 90" width="100%" aria-hidden style={{ display: "block", maxWidth: 260 }}>
      {[0, 1, 2, 3].map((i) => {
        const o = map(p, 0.1 + i * 0.12, 0.5 + i * 0.12, 0, 1);
        return (
          <g key={i} transform={`translate(${i * 18} ${(3 - i) * 4})`} opacity={0.25 + o * 0.75}>
            <rect x="8" y="8" width="52" height="70" fill={c.sheet} stroke={c.hairLight} />
            {[18, 26, 34, 42, 50, 58].map((yy, k) => (
              <rect
                key={yy}
                x="15"
                y={yy}
                width={k === 2 ? 22 : k === 4 ? 30 : 38}
                height="2"
                fill={k === 2 && i === 3 ? c.blue : c.hairLight}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function DataBehaviour({ p }: { p: number }) {
  const cells = ["4021", "2026", "65.0", "0.50", "03", "114", "12M", "ASSD", "1.8", "R-2", "09", "AV"];
  return (
    <div
      aria-hidden
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        maxWidth: 260,
        border: `1px solid ${c.hairLight}`,
      }}
    >
      {cells.map((v, i) => {
        const o = map(p, 0.05 + (i % 6) * 0.06, 0.4 + (i % 6) * 0.06, 0, 1);
        return (
          <span
            key={v + i}
            style={{
              fontFamily: font.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              padding: "9px 6px",
              textAlign: "center",
              color: i === 6 ? c.blue : c.onLightMuted,
              borderRight: (i + 1) % 4 ? `1px solid ${c.hairLightSoft}` : undefined,
              borderBottom: i < 8 ? `1px solid ${c.hairLightSoft}` : undefined,
              opacity: o,
            }}
          >
            {v}
          </span>
        );
      })}
    </div>
  );
}

function RiskBehaviour({ p }: { p: number }) {
  const pts = [8, 26, 18, 40, 30, 58, 44, 36, 62, 70, 52, 78];
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * 240) / (pts.length - 1)} ${80 - v * 0.75}`)
    .join(" ");
  return (
    <svg viewBox="0 0 240 90" width="100%" aria-hidden style={{ display: "block", maxWidth: 270 }}>
      <line x1="0" y1="46" x2="240" y2="46" stroke={c.hairLight} strokeDasharray="2 6" />
      <path
        d={d}
        fill="none"
        stroke={c.onLight}
        strokeWidth="1.2"
        style={{
          strokeDasharray: 420,
          strokeDashoffset: 420 - 420 * map(p, 0.05, 0.75, 0, 1),
        }}
      />
      <circle
        cx={240 * map(p, 0.05, 0.75, 0, 1)}
        cy={80 - (pts[Math.min(pts.length - 1, Math.floor(map(p, 0.05, 0.75, 0, 1) * (pts.length - 1)))] ?? 0) * 0.75}
        r="4"
        fill={c.amber}
      />
      <text x="150" y="88" style={{ ...micro, fontSize: 8 }} fill={c.onLightFaint}>
        THRESHOLD
      </text>
    </svg>
  );
}

function PeopleBehaviour({ p }: { p: number }) {
  const show = map(p, 0.15, 0.6, 0, 1);
  return (
    <div aria-hidden style={{ maxWidth: 280, display: "flex", flexDirection: "column", gap: 8 }}>
      {[
        ["BROKER", "Checked wording against last year."],
        ["UNDERWRITER", "Limit increase approved."],
      ].map(([who, said], i) => (
        <div
          key={who}
          style={{
            border: `1px solid ${c.hairLight}`,
            background: c.sheet,
            padding: "10px 12px",
            opacity: map(show, i * 0.35, 0.5 + i * 0.35, 0, 1),
            transform: `translateY(${(1 - map(show, i * 0.35, 0.5 + i * 0.35, 0, 1)) * 8}px)`,
          }}
        >
          <div style={{ ...micro, color: c.onLightFaint, marginBottom: 4 }}>{who}</div>
          <div style={{ fontFamily: font.serif, fontSize: 13.5, color: c.onLight }}>
            {said}
            {i === 1 && show > 0.9 && (
              <span className="caret" style={{ color: c.blue }}>
                {" "}
                |
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function DecisionBehaviour({ p }: { p: number }) {
  const pick = map(p, 0.3, 0.7, 0, 1);
  const options = ["DECLINE", "REFER", "BIND"];
  return (
    <div aria-hidden style={{ maxWidth: 260, display: "flex", flexDirection: "column" }}>
      {options.map((o, i) => {
        const chosen = i === 2;
        return (
          <div
            key={o}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 14px",
              border: `1px solid ${chosen ? c.blue : c.hairLight}`,
              borderTop: i ? "none" : undefined,
              background: chosen ? "rgba(28,60,214,0.05)" : "transparent",
              opacity: chosen ? 1 : Math.max(0.28, 1 - pick),
              transition: "opacity 0.4s linear",
            }}
          >
            <span style={{ ...micro, color: chosen ? c.blue : c.onLightMuted }}>{o}</span>
            <span
              style={{
                width: chosen ? 26 : 10,
                height: 1,
                background: chosen ? c.blue : c.hairLight,
                transform: `scaleX(${chosen ? pick : 1})`,
                transformOrigin: "right",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

const rows = [
  { word: "DOCUMENTS.", note: "Wordings, schedules, endorsements, quotes.", B: PaperBehaviour },
  { word: "DATA.", note: "Fields, limits, periods, coordinates.", B: DataBehaviour },
  { word: "RISK.", note: "Exposure that moves between renewals.", B: RiskBehaviour },
  { word: "PEOPLE.", note: "Judgement that cannot be automated away.", B: PeopleBehaviour },
  { word: "DECISIONS.", note: "One outcome, carrying all of the above.", B: DecisionBehaviour },
];

function Row({
  word,
  note,
  B,
  i,
}: {
  word: string;
  note: string;
  B: (props: { p: number }) => JSX.Element;
  i: number;
}) {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.92, end: 0.35 });
  const slide = (1 - map(p, 0, 0.55, 0, 1)) * (i % 2 ? 7 : 11);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
        gap: "clamp(20px, 3vw, 56px)",
        alignItems: "center",
        borderTop: `1px solid ${c.hairLightSoft}`,
        padding: "clamp(30px, 4.4vw, 62px) 0",
      }}
      className="cols"
    >
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "clamp(12px, 2vw, 28px)",
            transform: `translateX(${-slide}%)`,
          }}
        >
          <span style={{ ...micro, color: c.onLightFaint, flex: "0 0 auto" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              ...statement(2, 5),
              color: p > 0.45 ? c.onLight : c.onLightFaint,
              transition: "color 0.7s linear",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </h3>
        </div>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: 14.5,
            color: c.onLightMuted,
            margin: "14px 0 0",
            maxWidth: "40ch",
            opacity: map(p, 0.2, 0.6, 0, 1),
          }}
        >
          {note}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <B p={p} />
      </div>
    </div>
  );
}

export function Information() {
  return (
    <Scene id="information" index="02" label="Information" tone="light" grid>
      <div
        className="cols c-7-5"
        style={{ alignItems: "end", marginBottom: "clamp(56px, 8vw, 110px)" }}
      >
        <Enter>
          <SceneMark index="02" label="Information" />
          <Statement
            min={2}
            max={4.6}
            style={{ marginTop: 26 }}
            lines={[{ t: "INSURANCE RUNS" }, { t: "ON INFORMATION." }]}
          />
        </Enter>
        <Enter>
          <Explain delay={140} style={{ maxWidth: "38ch" }}>
            Every insurance workflow depends on understanding information — and most of it arrives
            as unstructured language.
          </Explain>
        </Enter>
      </div>

      <div>
        {rows.map((r, i) => (
          <Row key={r.word} {...r} i={i} />
        ))}
      </div>
    </Scene>
  );
}
