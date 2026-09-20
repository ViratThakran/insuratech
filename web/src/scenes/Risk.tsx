import { c, font, micro, statement } from "../theme";
import { Act, Annotate, Enter, Explain, Micro, Scene, Statement, State } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* A living monitor wall: signals hold, move, drop out, connect, cross a line. */
const monitors = [
  { id: "EXP-01", label: "Property values", seed: 1.2, behaviour: "stable" },
  { id: "EXP-02", label: "Business interruption", seed: 2.4, behaviour: "moving" },
  { id: "EXP-03", label: "Flood exposure", seed: 0.7, behaviour: "threshold" },
  { id: "EXP-04", label: "Fleet count", seed: 3.1, behaviour: "stable" },
  { id: "EXP-05", label: "Claims frequency", seed: 1.9, behaviour: "moving" },
  { id: "EXP-06", label: "Supplier concentration", seed: 2.8, behaviour: "drop" },
  { id: "EXP-07", label: "Liability limits", seed: 0.4, behaviour: "stable" },
  { id: "EXP-08", label: "Site additions", seed: 3.6, behaviour: "threshold" },
];

function Spark({ seed, p, behaviour }: { seed: number; p: number; behaviour: string }) {
  const n = 22;
  const drift = behaviour === "stable" ? 0.12 : behaviour === "drop" ? 0.5 : 0.75;
  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const wave =
      Math.sin(t * 6 + seed) * 0.5 + Math.sin(t * 13 + seed * 2) * 0.22 + Math.sin(p * 4 + seed) * drift;
    return 20 - wave * (behaviour === "threshold" ? 13 : 9);
  });
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * 120) / (n - 1)} ${v}`).join(" ");
  const crossed = behaviour === "threshold" && p > 0.42;
  const dropped = behaviour === "drop" && p > 0.62;

  return (
    <svg viewBox="0 0 120 40" width="100%" aria-hidden style={{ display: "block", opacity: dropped ? 0.2 : 1, transition: "opacity 0.7s linear" }}>
      <line x1="0" y1="9" x2="120" y2="9" stroke={crossed ? c.amberLift : c.hairDark} strokeDasharray="2 5" />
      <path d={d} fill="none" stroke={crossed ? c.amberLift : c.onDarkMuted} strokeWidth="1" />
      {crossed && <circle cx="96" cy={pts[18]} r="2.4" fill={c.amberLift} />}
    </svg>
  );
}

const chain = ["BUSINESS", "SIGNALS", "RISK", "INTELLIGENCE"];

export function Risk() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.1 });

  return (
    <Scene id="risk" index="09" label="Risk Intelligence" tone="dark" grid>
      {/* right-heavy composition: the system dominates, the words sit under it */}
      <div ref={ref}>
        <Enter>
          <div className="cols c-4-8" style={{ alignItems: "end", marginBottom: "clamp(34px, 5vw, 62px)" }}>
            <div>
              <Micro tone="dark">09 / 11 — Risk Intelligence</Micro>
              <div className="fade" style={{ marginTop: 14, transitionDelay: "80ms" }}>
                <State state="building" tone="dark" />
              </div>
            </div>
            <Statement
              tone="dark"
              min={2.2}
              max={5.2}
              lines={[{ t: "SEE RISK" }, { t: "DIFFERENTLY." }]}
              style={{ textAlign: "right" }}
            />
          </div>
        </Enter>

        {/* monitor wall */}
        <div
          className="monitor-grid"
          style={{
            display: "grid",
            gap: 1,
            background: c.hairDarkSoft,
            border: `1px solid ${c.hairDark}`,
          }}
        >
          {monitors.map((m, i) => {
            const on = p > 0.04 + i * 0.045;
            const crossed = m.behaviour === "threshold" && p > 0.42;
            const dropped = m.behaviour === "drop" && p > 0.62;
            return (
              <div
                key={m.id}
                style={{
                  background: c.ink,
                  padding: "16px 16px 12px",
                  opacity: on ? 1 : 0.25,
                  transition: "opacity 0.6s linear",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                  <span style={{ ...micro, color: c.onDarkMuted }}>{m.id}</span>
                  <span
                    style={{
                      ...micro,
                      fontSize: 8.5,
                      color: dropped ? c.onDarkFaint : crossed ? c.amberLift : c.onDarkFaint,
                    }}
                  >
                    {dropped ? "NO SIGNAL" : crossed ? "ABOVE THRESHOLD" : m.behaviour === "moving" ? "MOVING" : "STABLE"}
                  </span>
                </div>
                <Spark seed={m.seed} p={p} behaviour={m.behaviour} />
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: font.serif,
                    fontSize: 13,
                    color: crossed ? c.onDark : c.onDarkMuted,
                  }}
                >
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* the chain, drawn as one continuous rail */}
        <div
          style={{
            marginTop: "clamp(40px, 6vw, 80px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 2vw, 26px)",
            flexWrap: "wrap",
          }}
        >
          {chain.map((s, i) => {
            const on = p > 0.25 + i * 0.14;
            return (
              <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(10px, 2vw, 26px)" }}>
                <span
                  style={{
                    ...statement(1, 1.9),
                    color: on ? (i === 3 ? c.blueLift : c.onDark) : c.onDarkFaint,
                    transition: "color 0.6s linear",
                  }}
                >
                  {s}
                </span>
                {i < chain.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: "clamp(20px, 4vw, 64px)",
                      height: 1,
                      background: on ? c.hairDark : c.hairDarkSoft,
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>

        <Enter className="cols c-6-6" style={{ marginTop: "clamp(28px, 4vw, 50px)" }}>
          <Explain tone="dark" style={{ maxWidth: "46ch" }}>
            Aurevia is building intelligence that helps organizations understand, assess and work
            with risk as it changes between renewals.
          </Explain>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Annotate tone="dark" color={c.amberLift} style={{ fontSize: 10 }}>
              Building toward — assessment · exposure analysis · monitoring · reporting · decision
              support. Not features available today.
            </Annotate>
            <Act href="#talk" tone="dark">
              Talk to us about risk
            </Act>
          </div>
        </Enter>
      </div>
    </Scene>
  );
}
