import { c, font, micro } from "../theme";
import { Enter, Explain, Micro, Scene, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* The three visual languages travel into one node. */
type Item = { kind: "line" | "node" | "bar"; x: number; y: number; i: number };

const items: Item[] = [
  ...Array.from({ length: 9 }, (_, i) => ({ kind: "line" as const, x: 6, y: 14 + i * 3.4, i })),
  ...Array.from({ length: 9 }, (_, i) => ({ kind: "node" as const, x: 14 + (i % 3) * 7, y: 52 + Math.floor(i / 3) * 9, i })),
  ...Array.from({ length: 9 }, (_, i) => ({ kind: "bar" as const, x: 8 + i * 4, y: 88, i })),
];

const groups = [
  { label: "DOCUMENT AI", note: "available now", accent: c.blueLift },
  { label: "RISK INTELLIGENCE", note: "in development", accent: c.blueLift },
  { label: "VOICE AI", note: "in development", accent: c.amberLift },
  { label: "FUTURE SOLUTIONS", note: "as workflows evolve", accent: c.onDarkFaint },
];

export function Platform() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.8, end: 0.12 });
  const pull = map(p, 0.08, 0.7, 0, 1);
  const bloom = map(p, 0.35, 0.8, 0, 1);

  return (
    <Scene id="platform" index="11" label="The platform" tone="dark">
      <Enter>
        <div className="cols c-6-6" style={{ alignItems: "end", marginBottom: "clamp(40px, 6vw, 84px)" }}>
          <div>
            <Micro tone="dark">11 / 11 — The platform</Micro>
            <Statement
              tone="dark"
              min={1.6}
              max={3}
              style={{ marginTop: 22 }}
              lines={[{ t: "ONE INTELLIGENCE LAYER." }, { t: "MANY WORKFLOWS.", accent: true }]}
            />
          </div>
          <Explain tone="dark" delay={120} style={{ maxWidth: "40ch" }}>
            Aurevia is designed as a growing intelligence platform for the insurance ecosystem —
            new solutions attach to the same layer as insurance workflows change.
          </Explain>
        </div>
      </Enter>

      <div
        ref={ref}
        className="cols c-8-4"
        style={{ alignItems: "center", gap: "clamp(28px, 4vw, 70px)" }}
      >
        {/* convergence field */}
        <div style={{ position: "relative" }}>
          <svg viewBox="0 0 100 100" width="100%" aria-hidden style={{ display: "block", minHeight: 260 }}>
            {items.map((it, k) => {
              const tx = 78;
              const ty = 50;
              /* continuous, scroll-linked flow: items are always in transit */
              const t = ((pull * 1.15 + (k % 9) * 0.1 + Math.floor(k / 9) * 0.05) % 1 + 1) % 1;
              const x = it.x + (tx - it.x) * t;
              const y = it.y + (ty - it.y) * t;
              const fade = Math.sin(t * Math.PI) * 0.9 + 0.1;

              if (it.kind === "line")
                return (
                  <rect key={k} x={x} y={y} width={10 - t * 8} height="0.5" fill={c.hairDark} opacity={fade} />
                );
              if (it.kind === "node")
                return <circle key={k} cx={x} cy={y} r={0.9 - t * 0.4} fill={c.blueLift} opacity={fade * 0.9} />;
              return (
                <rect
                  key={k}
                  x={x}
                  y={y - (5 - t * 4)}
                  width="0.6"
                  height={5 - t * 4}
                  fill={c.amberLift}
                  opacity={fade * 0.9}
                />
              );
            })}

            {/* the layer */}
            <circle cx="78" cy="50" r={2 + bloom * 1.4} fill={c.blue} opacity={0.35 + bloom * 0.65} />
            <circle
              cx="78"
              cy="50"
              r={7 + bloom * 4}
              fill="none"
              stroke={c.blueLift}
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
              opacity={bloom * 0.6}
            />
            <line
              x1="80"
              y1="50"
              x2="100"
              y2="50"
              stroke={c.blueLift}
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              opacity={bloom}
              className={bloom > 0.7 ? "travel" : undefined}
            />
          </svg>
          <span
            style={{
              position: "absolute",
              right: "6%",
              top: "36%",
              ...micro,
              color: c.blueLift,
              opacity: bloom,
            }}
          >
            Aurevia
          </span>
        </div>

        {/* the roster */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {groups.map((g, i) => {
            const on = pull > 0.1 + i * 0.16;
            return (
              <div
                key={g.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "14px 0",
                  borderTop: `1px solid ${c.hairDark}`,
                  opacity: on ? 1 : 0.3,
                  transition: "opacity 0.6s linear",
                }}
              >
                <span style={{ ...micro, color: on ? c.onDark : c.onDarkFaint }}>{g.label}</span>
                <span style={{ ...micro, fontSize: 8.5, color: g.accent }}>{g.note}</span>
              </div>
            );
          })}

          <h3
            style={{
              fontFamily: font.sans,
              fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              margin: "clamp(28px, 4vw, 44px) 0 0",
              color: c.onDark,
            }}
          >
            BUILT TO{" "}
            <span style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: c.blueLift }}>
              evolve
            </span>
            .
          </h3>
        </div>
      </div>
    </Scene>
  );
}
