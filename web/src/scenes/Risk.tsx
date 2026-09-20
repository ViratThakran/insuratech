import { c, font, meaning, micro, statement } from "../theme";
import { Act, Annotate, Enter, Explain, Micro, Scene, Statement, State, Ticker } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 09 — RISK INTELLIGENCE                                        *
 * A warmer, more serious room. Brass leads; blue is almost absent.     *
 * Five distinct signal behaviours, so no two panels read the same.     *
 * ------------------------------------------------------------------ */

type Behaviour = "stable" | "moving" | "threshold" | "elevated" | "silent";

const monitors: { id: string; label: string; seed: number; behaviour: Behaviour }[] = [
  { id: "EXP-01", label: "Property values", seed: 1.2, behaviour: "stable" },
  { id: "EXP-02", label: "Business interruption", seed: 2.4, behaviour: "moving" },
  { id: "EXP-03", label: "Flood exposure", seed: 0.7, behaviour: "threshold" },
  { id: "EXP-04", label: "Fleet count", seed: 3.1, behaviour: "stable" },
  { id: "EXP-05", label: "Claims frequency", seed: 1.9, behaviour: "elevated" },
  { id: "EXP-06", label: "Supplier concentration", seed: 2.8, behaviour: "silent" },
  { id: "EXP-07", label: "Liability limits", seed: 0.4, behaviour: "stable" },
  { id: "EXP-08", label: "Site additions", seed: 3.6, behaviour: "threshold" },
];

const stateLabel: Record<Behaviour, string> = {
  stable: "STABLE",
  moving: "MOVING",
  threshold: "ABOVE THRESHOLD",
  elevated: "ELEVATED",
  silent: "NO SIGNAL",
};

function stateColor(b: Behaviour, hot: boolean) {
  if (b === "silent") return c.onDarkFaint;
  if (b === "elevated" && hot) return meaning.elevatedOnDark;
  if (b === "threshold" && hot) return c.brassLift;
  if (b === "stable") return meaning.stableOnDark;
  return c.onDarkMuted;
}

function Spark({ seed, p, behaviour }: { seed: number; p: number; behaviour: Behaviour }) {
  const n = 26;
  const hot = p > 0.42;
  const amp = behaviour === "stable" ? 3.5 : behaviour === "silent" ? 1.2 : behaviour === "moving" ? 8 : 11;
  const drift = behaviour === "stable" ? 0.05 : behaviour === "silent" ? 0.02 : behaviour === "moving" ? 0.7 : 0.5;

  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const rise = behaviour === "elevated" ? t * 9 * map(p, 0.2, 0.9, 0, 1) : 0;
    const spike = behaviour === "threshold" && t > 0.62 ? (t - 0.62) * 26 * map(p, 0.25, 0.85, 0, 1) : 0;
    const wave = Math.sin(t * 7 + seed) * 0.6 + Math.sin(t * 15 + seed * 2) * 0.25 + Math.sin(p * 4 + seed) * drift;
    return 22 - wave * amp - rise - spike;
  });

  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * 120) / (n - 1)} ${v}`).join(" ");
  const stroke =
    behaviour === "silent"
      ? c.hairDark
      : behaviour === "elevated" && hot
      ? meaning.elevatedOnDark
      : behaviour === "threshold" && hot
      ? c.brassLift
      : behaviour === "stable"
      ? c.onDarkMuted
      : c.onDark;

  return (
    <svg viewBox="0 0 120 42" width="100%" aria-hidden style={{ display: "block", overflow: "visible" }}>
      {/* the threshold only exists where it means something */}
      {(behaviour === "threshold" || behaviour === "elevated") && (
        <line
          x1="0"
          y1="8"
          x2="120"
          y2="8"
          stroke={c.brass}
          strokeOpacity={hot ? 0.85 : 0.35}
          strokeDasharray="2 5"
        />
      )}
      {behaviour === "silent" && (
        <line x1="0" y1="22" x2="120" y2="22" stroke={c.hairDark} strokeDasharray="1 7" />
      )}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={behaviour === "silent" ? 0.6 : 1}
        opacity={behaviour === "silent" ? 0.35 : 1}
        style={{ transition: "stroke 0.6s linear" }}
      />
      {behaviour === "threshold" && hot && <circle cx="112" cy={pts[24]} r="2.4" fill={c.brassLift} />}
      {behaviour === "elevated" && hot && <circle cx="112" cy={pts[24]} r="2.4" fill={meaning.elevatedOnDark} />}
    </svg>
  );
}

const chain = ["BUSINESS", "SIGNALS", "RISK", "INTELLIGENCE"];

export function Risk() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.95, end: 0.1 });
  const attention = monitors.filter(
    (m) => (m.behaviour === "threshold" || m.behaviour === "elevated") && p > 0.42
  ).length;

  return (
    <Scene id="risk" index="09" label="Risk" tone="charcoal" grid="rules-dense">
      <div ref={ref}>
        <Enter>
          <div className="cols c-4-8" style={{ alignItems: "end", marginBottom: "clamp(34px, 5vw, 62px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Micro tone="charcoal">09 / 11 — Risk Intelligence</Micro>
              <div className="fade" style={{ transitionDelay: "80ms" }}>
                <State state="building" tone="charcoal" />
              </div>
              <div className="fade" style={{ transitionDelay: "140ms" }}>
                <Ticker
                  tone="charcoal"
                  state={attention ? `${attention} signals need attention` : "observing"}
                  color={attention ? c.brassLift : c.onDarkFaint}
                  active={!!attention}
                />
              </div>
            </div>
            <Statement
              tone="charcoal"
              min={2.2}
              max={5.2}
              lines={[{ t: "SEE RISK" }, { t: "DIFFERENTLY." }]}
              style={{ textAlign: "right" }}
            />
          </div>
        </Enter>

        {/* the observation wall */}
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
            const hot = p > 0.42;
            return (
              <div
                key={m.id}
                style={{
                  background: c.ink,
                  padding: "16px 16px 13px",
                  opacity: on ? 1 : 0.25,
                  transition: "opacity 0.6s linear",
                  borderTop: `1px solid ${
                    hot && m.behaviour === "elevated"
                      ? meaning.elevated
                      : hot && m.behaviour === "threshold"
                      ? c.brass
                      : "transparent"
                  }`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
                  <span style={{ ...micro, color: c.onDarkMuted }}>{m.id}</span>
                  <span
                    style={{
                      ...micro,
                      fontSize: 8.5,
                      color: stateColor(m.behaviour, hot),
                      transition: "color 0.6s linear",
                    }}
                  >
                    {stateLabel[m.behaviour]}
                  </span>
                </div>
                <Spark seed={m.seed} p={p} behaviour={m.behaviour} />
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: font.serif,
                    fontSize: 13,
                    color: hot && (m.behaviour === "threshold" || m.behaviour === "elevated") ? c.onDark : c.onDarkMuted,
                    transition: "color 0.6s linear",
                  }}
                >
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* the chain */}
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
                    color: on ? (i === 3 ? c.blueLift : i === 2 ? c.brassLift : c.onDark) : c.onDarkFaint,
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
          <Explain tone="charcoal" style={{ maxWidth: "46ch" }}>
            Aurevia is building intelligence that helps organizations understand, assess and work
            with risk as it changes between renewals. Risk is not danger everywhere — it is
            information that needs attention.
          </Explain>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Annotate tone="charcoal" color={c.brassLift} style={{ fontSize: 10 }}>
              Building toward — assessment · exposure analysis · monitoring · reporting · decision
              support. Not features available today.
            </Annotate>
            <Act href="#talk" tone="charcoal" variant="brass">
              Talk to us about risk
            </Act>
          </div>
        </Enter>
      </div>
    </Scene>
  );
}
