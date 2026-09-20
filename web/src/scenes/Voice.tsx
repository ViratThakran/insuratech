import { c, font, micro } from "../theme";
import { Annotate, Enter, Explain, Micro, Scene, Statement, State } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

const turns: { who: "customer" | "aurevia"; text: string }[] = [
  { who: "customer", text: "I need to renew our policy." },
  { who: "aurevia", text: "Let's review the current coverage and renewal details." },
  { who: "customer", text: "The limit should go up — we've added a second site." },
  { who: "aurevia", text: "Noted. I'll request the updated schedule and flag the limit for your broker." },
];

const outcomes = ["Renewal review scheduled", "Schedule of assets requested", "Limit change flagged for broker"];

function Wave({ level, warm }: { level: number; warm: boolean }) {
  const n = 56;
  return (
    <svg viewBox="0 0 420 60" width="100%" aria-hidden style={{ display: "block" }}>
      {Array.from({ length: n }, (_, i) => {
        const env = Math.sin((i / (n - 1)) * Math.PI);
        const h = 2 + Math.abs(Math.sin(i * 0.7 + 1.3)) * 42 * level * env;
        return (
          <rect
            key={i}
            x={i * 7.5 + 1}
            y={30 - h / 2}
            width="2.4"
            height={h}
            fill={warm && i % 8 === 0 ? c.amber : c.hairLight}
          />
        );
      })}
      <line x1="0" y1="30" x2="420" y2="30" stroke={c.hairLight} opacity="0.5" />
    </svg>
  );
}

export function Voice() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.2 });
  const run = map(p, 0.08, 0.86, 0, 1) * turns.length;
  const activeIdx = Math.min(turns.length - 1, Math.floor(run));
  const active = turns[activeIdx];
  const speaking = run % 1 < 0.72;
  const level = speaking ? (active.who === "aurevia" ? 1 : 0.32) : 0.1;

  return (
    <Scene id="voice" index="10" label="Voice AI" tone="light">
      <div ref={ref} className="cols c-5-7" style={{ alignItems: "start" }}>
        <Enter style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Micro>10 / 11 — Voice AI</Micro>
          <Statement
            min={1.7}
            max={2.9}
            lines={[{ t: "LET AI HANDLE" }, { t: "THE CONVERSATION.", accent: c.amber }]}
          />
          <div className="fade" style={{ transitionDelay: "120ms" }}>
            <State state="next" />
          </div>
          <Explain delay={160} style={{ maxWidth: "40ch" }}>
            Voice AI can take the repetitive part of insurance communication — the chasing,
            scheduling and collecting — and hand the judgement back to a person.
          </Explain>
          <Annotate color={c.amber} delay={200} style={{ fontSize: 10, maxWidth: "36ch" }}>
            In development. Calls are always identified as automated; anything that needs judgement
            is passed to a person.
          </Annotate>
        </Enter>

        {/* --- the call --- */}
        <div
          style={{
            border: `1px solid ${c.hairLight}`,
            background: c.sheet,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: "11px 16px",
              borderBottom: `1px solid ${c.hairLight}`,
              background: c.paperRaised,
            }}
          >
            <span style={{ ...micro, color: c.onLight, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                aria-hidden
                className={speaking ? "breathe" : undefined}
                style={{ width: 5, height: 5, borderRadius: "50%", background: c.amber }}
              />
              Automated renewal call
            </span>
            <span style={{ ...micro, color: c.onLightFaint }}>
              {String(Math.floor(run * 0.4)).padStart(2, "0")}:
              {String(Math.floor((run * 23) % 60)).padStart(2, "0")}
            </span>
          </div>

          <div style={{ padding: "clamp(18px, 2.4vw, 30px)", display: "flex", flexDirection: "column", gap: 20 }}>
            {turns.map((t, i) => {
              const o = map(run, i, i + 0.45, 0, 1);
              const isActive = i === activeIdx;
              return (
                <div
                  key={t.text}
                  style={{
                    opacity: o,
                    transform: `translateY(${(1 - o) * 10}px)`,
                    paddingLeft: t.who === "aurevia" ? "clamp(16px, 4vw, 56px)" : 0,
                    borderLeft: t.who === "aurevia" ? `1px solid ${isActive ? c.amber : c.hairLight}` : "none",
                  }}
                >
                  <div
                    style={{
                      ...micro,
                      color: t.who === "aurevia" ? c.amber : c.onLightFaint,
                      marginBottom: 6,
                    }}
                  >
                    {t.who === "aurevia" ? "Aurevia Voice" : "Customer"}
                  </div>
                  <div
                    style={{
                      fontFamily: font.serif,
                      fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                      lineHeight: 1.5,
                      color: isActive ? c.onLight : c.onLightMuted,
                    }}
                  >
                    {t.text}
                    {isActive && speaking && (
                      <span className="caret" style={{ color: c.amber }}>
                        {" "}
                        |
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "0 clamp(18px, 2.4vw, 30px) 14px" }}>
            <Wave level={level} warm={active.who === "aurevia"} />
          </div>

          <div
            style={{
              borderTop: `1px solid ${c.hairLight}`,
              padding: "14px clamp(18px, 2.4vw, 30px)",
              background: c.paperRaised,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ ...micro, color: c.onLightFaint }}>Workflow written back</span>
            {outcomes.map((o, i) => {
              const on = run > turns.length - 1 + i * 0.12;
              return (
                <span
                  key={o}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 12.5,
                    color: on ? c.onLight : c.onLightFaint,
                    opacity: on ? 1 : 0.4,
                    transition: "color 0.5s linear, opacity 0.5s linear",
                  }}
                >
                  <span aria-hidden style={{ width: 16, height: 1, background: on ? c.amber : c.hairLight }} />
                  {o}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Scene>
  );
}
