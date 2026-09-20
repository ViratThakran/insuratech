import { c, font, meaning, micro } from "../theme";
import { Enter, Explain, Micro, Scene, Statement } from "../components/kit";
import { Thread } from "../components/Thread";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 11 — THE PLATFORM                                             *
 * Three streams enter a core; one intelligence output leaves it.       *
 * Each stream keeps its own visual language until the moment it is     *
 * absorbed — documents as rules, risk as nodes, voice as bars.         *
 * ------------------------------------------------------------------ */

const streams = [
  {
    key: "doc" as const,
    label: "DOCUMENT AI",
    note: "available now",
    y: 20,
    color: c.blueLift,
    state: meaning.stableOnDark,
  },
  {
    key: "risk" as const,
    label: "RISK INTELLIGENCE",
    note: "in development",
    y: 50,
    color: c.brassLift,
    state: c.brassLift,
  },
  {
    key: "voice" as const,
    label: "VOICE AI",
    note: "in development",
    y: 80,
    color: meaning.voiceOnDark,
    state: c.brassLift,
  },
];

const CORE_X = 64;
const CORE_Y = 50;

export function Platform() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.85, end: 0.12 });
  const flow = map(p, 0.06, 0.72, 0, 1);
  const bloom = map(p, 0.35, 0.85, 0, 1);
  const out = map(p, 0.55, 0.95, 0, 1);

  return (
    <Scene id="platform" index="11" label="Platform" tone="dark">
      <Enter>
        <div className="cols c-6-6" style={{ alignItems: "end", marginBottom: "clamp(40px, 6vw, 84px)" }}>
          <div>
            <Micro tone="dark">11 — The platform</Micro>
            <Statement
              tone="dark"
              min={1.5}
              max={2.4}
              style={{ marginTop: 22 }}
              lines={[{ t: "ONE INTELLIGENCE LAYER." }, { t: "MANY WORKFLOWS.", accent: true }]}
            />
          </div>
          <Explain tone="dark" delay={120} style={{ maxWidth: "40ch" }}>
            Aurevia is designed as a growing intelligence platform for the insurance ecosystem —
            new solutions attach to the same core as insurance workflows change.
          </Explain>
        </div>
      </Enter>

      <Thread role="converge" tone="dark" height={54} style={{ marginBottom: "clamp(10px, 2vw, 24px)" }} />

      <div ref={ref} style={{ position: "relative" }}>
        <svg viewBox="0 0 100 100" width="100%" aria-hidden style={{ display: "block", minHeight: "min(58vh, 460px)" }}>
          {/* stream paths */}
          {streams.map((s, si) => (
            <path
              key={s.key}
              d={`M 4 ${s.y} C ${CORE_X * 0.5} ${s.y}, ${CORE_X * 0.72} ${CORE_Y}, ${CORE_X - 2} ${CORE_Y}`}
              fill="none"
              stroke={s.color}
              strokeWidth="0.22"
              vectorEffect="non-scaling-stroke"
              opacity={0.15 + map(flow, si * 0.12, 0.5 + si * 0.12, 0, 0.5)}
            />
          ))}

          {/* the marks travelling each stream, each in its own language */}
          {streams.map((s, si) =>
            Array.from({ length: 9 }, (_, i) => {
              const t = ((flow * 1.05 + i * 0.111 + si * 0.04) % 1 + 1) % 1;
              /* cubic along the same curve */
              const x0 = 4,
                x1 = CORE_X * 0.5,
                x2 = CORE_X * 0.72,
                x3 = CORE_X - 2;
              const y0 = s.y,
                y1 = s.y,
                y2 = CORE_Y,
                y3 = CORE_Y;
              const mt = 1 - t;
              const x = mt ** 3 * x0 + 3 * mt ** 2 * t * x1 + 3 * mt * t ** 2 * x2 + t ** 3 * x3;
              const y = mt ** 3 * y0 + 3 * mt ** 2 * t * y1 + 3 * mt * t ** 2 * y2 + t ** 3 * y3;
              const fade = Math.sin(t * Math.PI) * 0.95 + 0.05;

              if (s.key === "doc")
                return (
                  <rect key={i} x={x - 2} y={y - 0.28} width={4 - t * 2.6} height="0.56" fill={s.color} opacity={fade} />
                );
              if (s.key === "risk")
                return <circle key={i} cx={x} cy={y} r={0.75 - t * 0.3} fill={s.color} opacity={fade} />;
              return (
                <rect
                  key={i}
                  x={x - 0.3}
                  y={y - (2.4 - t * 1.8) / 2}
                  width="0.6"
                  height={2.4 - t * 1.8}
                  fill={s.color}
                  opacity={fade}
                />
              );
            })
          )}

          {/* the core */}
          <circle
            cx={CORE_X}
            cy={CORE_Y}
            r={9 + bloom * 2.5}
            fill="none"
            stroke={c.hairDark}
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
            opacity={0.5 + bloom * 0.5}
          />
          <circle
            cx={CORE_X}
            cy={CORE_Y}
            r={4 + bloom * 1.2}
            fill="none"
            stroke={c.blueLift}
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
            opacity={0.25 + bloom * 0.6}
          />
          <circle cx={CORE_X} cy={CORE_Y} r={0.85 + bloom * 0.45} fill={c.blue} opacity={0.6 + bloom * 0.4} />

          {/* one output */}
          <line
            x1={CORE_X + 5}
            y1={CORE_Y}
            x2={97}
            y2={CORE_Y}
            stroke={c.blueLift}
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
            opacity={out}
            className={out > 0.7 ? "travel" : undefined}
          />
          <rect x="96" y={CORE_Y - 1.2} width="2.4" height="2.4" fill={c.blueLift} opacity={out} />
        </svg>

        {/* labels sit in the DOM, not the SVG, so they stay crisp and selectable */}
        {streams.map((s, si) => (
          <div
            key={s.key}
            style={{
              position: "absolute",
              left: 0,
              top: `${s.y}%`,
              transform: "translateY(-160%)",
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              opacity: 0.35 + map(flow, si * 0.1, 0.4 + si * 0.1, 0, 0.65),
            }}
          >
            <span style={{ ...micro, color: c.onDark }}>{s.label}</span>
            <span style={{ ...micro, fontSize: 8.5, color: s.state }}>{s.note}</span>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: `${CORE_X}%`,
            top: `${CORE_Y}%`,
            transform: "translate(-50%, 340%)",
            textAlign: "center",
            opacity: bloom,
          }}
        >
          <div style={{ ...micro, color: c.blueLift }}>Aurevia core</div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: `${CORE_Y}%`,
            transform: "translateY(-200%)",
            opacity: out,
          }}
        >
          <span style={{ ...micro, color: c.onDark }}>Intelligence</span>
        </div>
      </div>

      <Enter className="cols c-8-4" style={{ marginTop: "clamp(34px, 5vw, 64px)", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            ["DOCUMENT AI", "available now", meaning.stableOnDark],
            ["RISK INTELLIGENCE", "in development", c.brassLift],
            ["VOICE AI", "in development", c.brassLift],
            ["FUTURE SOLUTIONS", "as workflows evolve", c.onDarkFaint],
          ].map(([label, note, color], i) => (
            <div
              key={label as string}
              className="fade"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 14,
                padding: "13px 0",
                borderTop: `1px solid ${c.hairDark}`,
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <span style={{ ...micro, color: c.onDark }}>{label}</span>
              <span style={{ ...micro, fontSize: 8.5, color: color as string }}>{note}</span>
            </div>
          ))}
        </div>

        <h3
          style={{
            fontFamily: font.sans,
            fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            margin: 0,
            color: c.onDark,
          }}
        >
          BUILT TO{" "}
          <span style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: c.blueLift }}>
            evolve
          </span>
          .
        </h3>
      </Enter>
    </Scene>
  );
}
