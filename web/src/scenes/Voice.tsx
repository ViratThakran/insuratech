import { c, font, meaning, micro } from "../theme";
import { Annotate, Enter, Explain, Micro, Scene, Statement, State, Ticker } from "../components/kit";
import { Thread } from "../components/Thread";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 10 — VOICE AI                                                 *
 * A call, not a visualiser. The waveform has four states and a         *
 * whisper of violet keeps this room distinct from Document AI.         *
 * ------------------------------------------------------------------ */

type Turn = { who: "customer" | "aurevia"; text: string };

const turns: Turn[] = [
  { who: "customer", text: "We need to renew our policy." },
  { who: "aurevia", text: "Let's review the current coverage and renewal details." },
  { who: "customer", text: "The limit should go up — we've added a second site." },
  { who: "aurevia", text: "Noted. I'll request the updated schedule and flag the limit for your broker." },
];

const outcomes = ["Renewal review scheduled", "Schedule of assets requested", "Limit change flagged for broker"];

type VState = "listening" | "thinking" | "speaking" | "idle";

/** Amplitude, density and colour all carry the state. */
function Wave({ state }: { state: VState }) {
  const n = 64;
  const conf =
    state === "speaking"
      ? { amp: 1, tint: meaning.voice, density: 1 }
      : state === "listening"
      ? { amp: 0.42, tint: c.onLightMuted, density: 0.8 }
      : state === "thinking"
      ? { amp: 0.14, tint: c.blue, density: 0.35 }
      : { amp: 0.07, tint: c.onLightFaint, density: 0.5 };

  return (
    <svg viewBox="0 0 480 64" width="100%" aria-hidden style={{ display: "block" }}>
      <line x1="0" y1="32" x2="480" y2="32" stroke={c.hairLight} opacity="0.55" />
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const env = Math.sin(t * Math.PI);
        const carrier =
          state === "thinking"
            ? Math.abs(Math.sin(i * 0.35)) * (i % 5 === 0 ? 1 : 0.15)
            : Math.abs(Math.sin(i * 0.72 + 1.3)) * 0.7 + Math.abs(Math.sin(i * 1.9)) * 0.3;
        const h = 2 + carrier * 46 * conf.amp * env;
        const lit = i % Math.max(2, Math.round(9 / conf.density)) === 0;
        return (
          <rect
            key={i}
            x={i * 7.4 + 1}
            y={32 - h / 2}
            width="2.4"
            height={h}
            rx="1.2"
            fill={lit ? conf.tint : c.hairLight}
            opacity={lit ? 0.95 : 0.7}
            style={{ transition: "fill 0.5s linear" }}
          />
        );
      })}
    </svg>
  );
}

export function Voice() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.2 });
  const run = map(p, 0.08, 0.86, 0, 1) * turns.length;
  const idx = Math.min(turns.length - 1, Math.floor(run));
  const phase = run % 1;
  const active = turns[idx];

  /* listening → thinking → speaking, within each turn */
  const state: VState =
    run <= 0
      ? "idle"
      : active.who === "customer"
      ? phase < 0.75
        ? "listening"
        : "thinking"
      : phase < 0.8
      ? "speaking"
      : "thinking";

  const stateWord = state === "idle" ? "ready" : state;

  return (
    <Scene id="voice" index="10" label="Voice" tone="bone">
      <Thread role="voice" tone="light" height={58} style={{ marginBottom: "clamp(20px, 3vw, 40px)" }} />

      <div ref={ref} className="cols c-5-7" style={{ alignItems: "start" }}>
        <Enter style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Micro>10 — Voice AI</Micro>
          <Statement
            min={1.7}
            max={2.9}
            lines={[{ t: "LET AI HANDLE" }, { t: "THE CONVERSATION.", accent: meaning.voice }]}
          />
          <div className="fade" style={{ transitionDelay: "120ms" }}>
            <State state="next" />
          </div>
          <Explain delay={160} style={{ maxWidth: "40ch" }}>
            Voice AI can take the repetitive part of insurance communication — the chasing,
            scheduling and collecting — and hand the judgement back to a person.
          </Explain>
          <Annotate color={c.brass} delay={200} style={{ fontSize: 10, maxWidth: "36ch" }}>
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
            boxShadow: "0 34px 70px -56px rgba(10,11,13,0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 16px",
              borderBottom: `1px solid ${c.hairLight}`,
              background: c.bone,
            }}
          >
            <Ticker state="Automated renewal call" color={meaning.voice} active={state === "speaking"} />
            <span style={{ ...micro, color: c.onLightFaint }}>
              00:{String(Math.min(59, Math.floor(run * 14))).padStart(2, "0")}
            </span>
          </div>

          <div style={{ padding: "clamp(18px, 2.4vw, 30px)", display: "flex", flexDirection: "column", gap: 20 }}>
            {turns.map((t, i) => {
              const o = map(run, i, i + 0.45, 0, 1);
              const isActive = i === idx;
              const isAurevia = t.who === "aurevia";
              return (
                <div
                  key={t.text}
                  style={{
                    opacity: o,
                    transform: `translateY(${(1 - o) * 10}px)`,
                    paddingLeft: isAurevia ? "clamp(16px, 4vw, 56px)" : 0,
                    borderLeft: isAurevia
                      ? `1px solid ${isActive ? meaning.voice : c.hairLight}`
                      : "none",
                    transition: "border-color 0.5s linear",
                  }}
                >
                  <div style={{ ...micro, color: isAurevia ? meaning.voice : c.onLightFaint, marginBottom: 6 }}>
                    {isAurevia ? "Aurevia Voice" : "Customer"}
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
                    {isActive && state === "speaking" && (
                      <span className="caret" style={{ color: meaning.voice }}>
                        {" "}
                        |
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "0 clamp(18px, 2.4vw, 30px) 10px" }}>
            <Wave state={state} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <Micro color={state === "speaking" ? meaning.voice : c.onLightFaint}>{stateWord}</Micro>
              <Micro>fictional demonstration</Micro>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${c.hairLight}`,
              padding: "14px clamp(18px, 2.4vw, 30px)",
              background: c.bone,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Micro>Workflow written back</Micro>
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
                  <span aria-hidden style={{ width: 16, height: 1, background: on ? meaning.stable : c.hairLight }} />
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
