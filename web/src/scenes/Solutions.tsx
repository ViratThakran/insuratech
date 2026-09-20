import { c, font, gutter, micro, shell, statement } from "../theme";
import { Act, Annotate, Enter, Explain, Hair, Micro, Statement, State } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ */
/* One strip of geometry that MORPHS between the three visual worlds:  */
/* document lines → risk nodes → voice bars. Driven by scroll.         */
/* ------------------------------------------------------------------ */
function Morph({ p, phase, dark }: { p: number; phase: "doc-risk" | "risk-voice"; dark?: boolean }) {
  const n = 26;
  const t = map(p, 0.15, 0.85, 0, 1);
  const hair = dark ? c.onDarkFaint : c.hairLight;
  const accent = dark ? c.blueLift : c.blue;
  const warm = dark ? c.amberLift : c.amber;
  return (
    <svg viewBox="0 0 520 56" width="100%" aria-hidden style={{ display: "block" }}>
      {Array.from({ length: n }, (_, i) => {
        const x = 8 + (i * 504) / (n - 1);
        const wobble = Math.sin(i * 1.3) * 14;

        if (phase === "doc-risk") {
          /* line → node */
          const w = 14 * (1 - t) + 3 * t;
          const y = 28 + wobble * t;
          const h = 1 * (1 - t) + 3 * t;
          return (
            <rect
              key={i}
              x={x - w / 2}
              y={y - h / 2}
              width={w}
              height={h}
              rx={h / 2}
              fill={i % 5 === 0 ? accent : hair}
              opacity={0.45 + t * 0.35}
            />
          );
        }
        /* node → bar */
        const h = 3 * (1 - t) + (10 + Math.abs(Math.sin(i * 0.8)) * 30) * t;
        const y = 28 + wobble * (1 - t);
        return (
          <rect
            key={i}
            x={x - 1.5}
            y={y - h / 2}
            width={3}
            height={h}
            rx={1.5}
            fill={i % 7 === 0 ? warm : hair}
            opacity={0.45 + t * 0.35}
          />
        );
      })}
    </svg>
  );
}

function Transition({
  phase,
  label,
  dark,
}: {
  phase: "doc-risk" | "risk-voice";
  label: string;
  dark?: boolean;
}) {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.9, end: 0.4 });
  return (
    <div
      className="grain"
      data-tone={dark ? "dark" : "light"}
      style={{ position: "relative", background: dark ? c.ink : c.paper }}
    >
    <div
      ref={ref}
      style={{
        maxWidth: shell,
        margin: "0 auto",
        padding: `clamp(40px, 6vw, 82px) ${gutter}`,
        display: "grid",
        gridTemplateColumns: "minmax(0, 3fr) minmax(0, 9fr)",
        gap: "clamp(16px, 3vw, 40px)",
        alignItems: "center",
      }}
      className="cols"
    >
      <Micro tone={dark ? "dark" : "light"}>{label}</Micro>
      <Morph p={p} phase={phase} dark={dark} />
    </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-world visuals — each world has its own physics                  */
/* ------------------------------------------------------------------ */
function DocWorld({ p }: { p: number }) {
  const pull = map(p, 0.2, 0.7, 0, 1);
  return (
    <div aria-hidden style={{ position: "relative", minHeight: 250 }}>
      <div
        style={{
          position: "absolute",
          inset: "0 34% 0 0",
          background: c.sheet,
          border: `1px solid ${c.hairLight}`,
          padding: 18,
          transform: `translateY(${(1 - pull) * 10}px)`,
        }}
      >
        {[
          "SECTION 4 — LIMITS OF LIABILITY",
          "The Company shall indemnify the Insured",
          "in respect of Property Damage up to a",
          "limit of ₹65,00,00,000 any one occurrence,",
          "subject to a deductible of ₹5,00,000.",
        ].map((l, i) => (
          <div
            key={l}
            style={{
              fontFamily: i === 0 ? font.mono : font.serif,
              fontSize: i === 0 ? 9 : 12.5,
              letterSpacing: i === 0 ? "0.16em" : undefined,
              color: i === 0 ? c.onLightFaint : c.onLightMuted,
              marginBottom: i === 0 ? 14 : 6,
              background:
                i === 3 && pull > 0.4 ? "rgba(28,60,214,0.12)" : "transparent",
              transition: "background-color 0.6s linear",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "22%",
          width: "40%",
          border: `1px solid ${c.blue}`,
          background: "#fff",
          padding: "14px 16px",
          opacity: pull,
          transform: `translateX(${(1 - pull) * 24}px)`,
        }}
      >
        <div style={{ ...micro, color: c.blue }}>Limit</div>
        <div style={{ fontFamily: font.mono, fontSize: 15, marginTop: 6, color: c.onLight }}>
          ₹65,00,00,000
        </div>
        <div style={{ ...micro, color: c.onLightFaint, marginTop: 10 }}>Deductible</div>
        <div style={{ fontFamily: font.mono, fontSize: 13, marginTop: 4, color: c.onLightMuted }}>
          ₹5,00,000
        </div>
      </div>
    </div>
  );
}

function RiskWorld({ p }: { p: number }) {
  const nodes = [
    [14, 26],
    [34, 12],
    [52, 36],
    [26, 58],
    [66, 20],
    [80, 54],
    [46, 76],
    [92, 30],
    [8, 82],
    [70, 88],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      aria-hidden
      style={{ display: "block", maxWidth: 440, marginLeft: "auto" }}
    >
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => {
          const dist = Math.hypot(x - x2, y - y2);
          if (dist > 34) return null;
          const on = p > 0.12 + i * 0.08;
          return (
            <line
              key={`${i}-${j}`}
              x1={x}
              y1={y}
              x2={x2}
              y2={y2}
              stroke={c.onDarkFaint}
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
              opacity={on ? 0.75 : 0.18}
              style={{ transition: "opacity 0.6s linear" }}
            />
          );
        })
      )}
      {nodes.map(([x, y], i) => {
        const hot = i === 2 && p > 0.45;
        const gone = i === 5 && p > 0.7;
        return (
          <g key={i} opacity={gone ? 0.18 : 1} style={{ transition: "opacity 0.6s linear" }}>
            <circle
              cx={x}
              cy={y}
              r={hot ? 1.5 : 0.9}
              fill={hot ? c.blueLift : c.onDarkMuted}
              style={{ transition: "fill 0.5s linear" }}
            />
            {hot && (
              <circle
                cx={x}
                cy={y}
                r="3.4"
                fill="none"
                stroke={c.blueLift}
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        );
      })}
      <text x="56" y="33" style={{ ...micro, fontSize: 2.6 }} fill={c.blueLift} opacity={p > 0.45 ? 1 : 0}>
        EXPOSURE ↑
      </text>
    </svg>
  );
}

function VoiceWorld({ p }: { p: number }) {
  const active = map(p, 0.2, 0.8, 0, 1);
  return (
    <div aria-hidden style={{ minHeight: 250, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
      {[
        ["CUSTOMER", "I need to renew our policy."],
        ["AUREVIA VOICE", "Let's review the current coverage and renewal details."],
      ].map(([who, said], i) => {
        const o = map(active, i * 0.4, 0.45 + i * 0.4, 0, 1);
        return (
          <div key={who} style={{ opacity: o, transform: `translateY(${(1 - o) * 8}px)` }}>
            <div style={{ ...micro, color: i ? c.amber : c.onLightFaint, marginBottom: 5 }}>{who}</div>
            <div style={{ fontFamily: font.serif, fontSize: 15, color: c.onLight }}>{said}</div>
          </div>
        );
      })}
      <svg viewBox="0 0 400 44" width="100%" style={{ display: "block", marginTop: 4 }}>
        {Array.from({ length: 48 }, (_, i) => {
          const local = map(active, 0.45, 1, 0, 1);
          const h = (6 + Math.abs(Math.sin(i * 0.55 + 1)) * 30) * local + 2;
          return (
            <rect
              key={i}
              x={i * 8.3}
              y={22 - h / 2}
              width="2.4"
              height={h}
              fill={i % 9 === 0 ? c.amber : c.hairLight}
            />
          );
        })}
      </svg>
      <div style={{ ...micro, color: c.onLightFaint }}>
        Outcome — renewal review scheduled · documents requested · handed to broker
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
type World = {
  n: string;
  name: string;
  head: string[];
  body: string;
  caps: string[];
  state: "live" | "building" | "next";
  tone: "light" | "dark" | "paper";
  href: string;
  cta: string;
  note?: string;
  visual: (props: { p: number }) => JSX.Element;
  flip?: boolean;
};

const worlds: World[] = [
  {
    n: "01",
    name: "Document AI",
    head: ["MAKE COMPLEX", "DOCUMENTS EASIER", "TO WORK WITH."],
    body: "Process, understand and compare insurance documents with AI-powered document intelligence.",
    caps: ["Processing", "Extraction", "Classification", "Structured fields", "Comparison", "Difference review"],
    state: "live",
    tone: "paper",
    href: "#document-ai",
    cta: "Explore Document AI",
    visual: DocWorld,
  },
  {
    n: "02",
    name: "Risk Intelligence",
    head: ["SEE RISK", "DIFFERENTLY."],
    body: "Turn business and insurance information into structured risk insight.",
    caps: ["Assessment", "Exposure analysis", "Monitoring", "Reporting", "Decision support"],
    state: "building",
    tone: "dark",
    href: "#risk",
    cta: "See the direction",
    note: "Capability areas we are building toward — not features available today.",
    visual: RiskWorld,
    flip: true,
  },
  {
    n: "03",
    name: "Voice AI",
    head: ["LET AI HANDLE", "THE CONVERSATION."],
    body: "AI-powered voice solutions designed for insurance communication and workflow automation.",
    caps: ["Follow-up", "Renewal calls", "Qualification", "Scheduling", "Document collection"],
    state: "next",
    tone: "light",
    href: "#voice",
    cta: "See the direction",
    note: "In development. Calls are always identified as automated.",
    visual: VoiceWorld,
  },
];

function WorldBlock({ w }: { w: World }) {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.3 });
  const dark = w.tone === "dark";
  const bg = dark ? c.ink : w.tone === "paper" ? c.paperRaised : c.paper;
  const fg = dark ? c.onDark : c.onLight;
  const muted = dark ? c.onDarkMuted : c.onLightMuted;
  const faint = dark ? c.onDarkFaint : c.onLightFaint;
  const hair = dark ? c.onDarkFaint : c.hairLight;

  return (
    <div
      ref={ref}
      className="grain"
      data-tone={dark ? "dark" : "light"}
      style={{ position: "relative", background: bg, color: fg, overflow: "hidden" }}
    >
      {/* oversized world numeral, cropped by the edge */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          [w.flip ? "left" : "right"]: "-2.5vw",
          top: "-4vw",
          fontFamily: font.sans,
          fontSize: "clamp(9rem, 22vw, 20rem)",
          fontWeight: 600,
          letterSpacing: "-0.06em",
          color: fg,
          opacity: dark ? 0.045 : 0.05,
          lineHeight: 0.8,
          pointerEvents: "none",
        }}
      >
        {w.n}
      </span>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: shell,
          margin: "0 auto",
          padding: `clamp(64px, 9vw, 130px) ${gutter}`,
        }}
      >
        <div
          className={`cols ${w.flip ? "c-6-6 flip-order" : "c-6-6"}`}
          style={{ alignItems: "center" }}
        >
          <Enter style={{ display: "flex", flexDirection: "column", gap: 22, order: w.flip ? 2 : 1 }}>
            <div className="fade" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ ...micro, color: faint }}>{w.n}</span>
              <span aria-hidden style={{ width: 26, height: 1, background: hair }} />
              <span style={{ ...micro, color: fg }}>{w.name}</span>
              <State state={w.state} tone={dark ? "dark" : "light"} />
            </div>

            <h3 style={{ ...statement(1.6, 3.1), color: fg }}>
              {w.head.map((l, i) => (
                <span className="mask" key={l}>
                  <span style={{ transitionDelay: `${i * 90}ms` }}>{l}</span>
                </span>
              ))}
            </h3>

            <Explain tone={dark ? "dark" : "light"} delay={120} style={{ maxWidth: "42ch" }}>
              {w.body}
            </Explain>

            <div
              className="fade"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 22px",
                maxWidth: 460,
                transitionDelay: "180ms",
              }}
            >
              {w.caps.map((cap) => (
                <span key={cap} style={{ ...micro, color: muted, display: "inline-flex", gap: 8 }}>
                  <span aria-hidden style={{ width: 8, height: 1, background: hair, alignSelf: "center" }} />
                  {cap}
                </span>
              ))}
            </div>

            {w.note && (
              <Annotate
                tone={dark ? "dark" : "light"}
                color={dark ? c.amberLift : c.amber}
                delay={200}
                style={{ fontSize: 10 }}
              >
                {w.note}
              </Annotate>
            )}

            <div className="fade" style={{ transitionDelay: "240ms" }}>
              <Act href={w.href} tone={dark ? "dark" : "light"}>
                {w.cta}
              </Act>
            </div>
          </Enter>

          <div style={{ order: w.flip ? 1 : 2 }}>
            <w.visual p={p} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Solutions() {
  return (
    <section
      id="solutions"
      data-scene
      data-tone="light"
      data-label="Solutions"
      data-index="04"
      style={{ position: "relative", background: c.paper, color: c.onLight }}
    >
      <div
        className="grain"
        data-tone="light"
        style={{ position: "relative", maxWidth: shell, margin: "0 auto", padding: `clamp(100px, 12vw, 170px) ${gutter} 0` }}
      >
        <Enter>
          <div className="cols c-7-5" style={{ alignItems: "end" }}>
            <div>
              <Micro>04 / 11 — Solutions</Micro>
              <Statement
                min={1.9}
                max={4}
                style={{ marginTop: 24 }}
                lines={[{ t: "ONE INTELLIGENCE" }, { t: "PLATFORM." }, { t: "MULTIPLE SOLUTIONS.", accent: true }]}
              />
            </div>
            <Explain delay={140} style={{ maxWidth: "36ch" }}>
              Three solution areas, one intelligence layer underneath. Document AI is the product
              you can use today.
            </Explain>
          </div>
          <Hair style={{ marginTop: "clamp(40px, 6vw, 78px)" }} />
        </Enter>
      </div>

      <WorldBlock w={worlds[0]} />
      <Transition phase="doc-risk" label="Documents become signals" dark />
      <WorldBlock w={worlds[1]} />
      <Transition phase="risk-voice" label="Signals become conversation" />
      <WorldBlock w={worlds[2]} />
    </section>
  );
}
