import { c, font, gutter, maskLine, micro, shell, statement } from "../theme";
import { Plate } from "../components/Plate";
import { gsap, useScene } from "../lib/motion";

/* ==========================================================================
   05 — RISK
   ==========================================================================
   Not a dashboard. A dark field with three lines and a threshold. Time runs
   left to right. One line holds. One drifts. One crosses — and the room
   changes when it does.

   The curves, the threshold and the crossing all live in one viewBox, so they
   can never drift apart. Every label is HTML placed against the same
   percentages that viewBox uses — type inside the SVG would scale with the
   drawing and shrink to nothing on a phone.
   ========================================================================== */

const VB_W = 470;
/** the curves are authored in a 470x280 space because it is easy to reason
 *  about, then squashed into a wider box so the plot is never letterboxed by a
 *  height cap — letterboxing would slide the drawing away from the month axis */
const VB_H = 280;
const VB_RENDER_H = 170;
const SQUASH = VB_RENDER_H / VB_H;
const THRESHOLD = 78;

/** a y in viewBox units as a percentage of the plot, for placing real type */
const at = (y: number) => `${(y / VB_H) * 100}%`;

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];

const signals = [
  {
    id: "property",
    label: "Property values",
    state: "Holding",
    d: `M 0 190 C 100 188, 200 192, 300 189 C 380 187, 430 188, ${VB_W} 186`,
    endY: 186,
    colour: c.onDarkMuted,
    accent: false,
  },
  {
    id: "interruption",
    label: "Business interruption",
    state: "Drifting",
    d: `M 0 205 C 100 200, 200 210, 300 175 C 380 150, 430 140, ${VB_W} 128`,
    endY: 128,
    colour: c.onDark,
    accent: false,
  },
  {
    id: "flood",
    label: "Flood exposure",
    state: "Crossed the threshold",
    d: `M 0 215 C 110 212, 200 205, 300 160 C 370 120, 420 90, ${VB_W} 40`,
    endY: 44,
    colour: c.brassLift,
    accent: true,
  },
];

/* where the flood line passes the threshold */
const CROSS = { x: 431, y: THRESHOLD };

export function Risk() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    const wipes = signals.map((s) => `.r-wipe-${s.id}`);

    if (reduced) {
      gsap.set(root, { height: "100vh" });
      gsap.set(".r-ground", { opacity: 0.18 });
      gsap.set(wipes, { attr: { width: VB_W } });
      gsap.set(".r-threshold", { attr: { x2: VB_W } });
      gsap.set(".r-say > span", { y: 0, yPercent: 0 });
      gsap.set(".r-month, .r-label, .r-state-flood, .r-threshold-label", { opacity: 1 });
      gsap.set(".r-cross", { opacity: 1, scale: 1 });
      return;
    }

    /* rest state */
    gsap.set(wipes, { attr: { width: 0 } });
    gsap.set(".r-threshold", { attr: { x2: 0 } });
    gsap.set(".r-say > span", { y: 0, yPercent: 108 });
    gsap.set(".r-month, .r-label, .r-state-flood, .r-threshold-label", { opacity: 0 });
    gsap.set(".r-cross", { opacity: 0, scale: 0.4, transformOrigin: "center" });
    gsap.set(".r-ground", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });

    /* the place the risk actually sits in */
    tl.fromTo(".r-ground", { opacity: 0, scale: 1.06 }, { opacity: 0.2, scale: 1, duration: 1.6, ease: "none" }, 0)
      /* time appears */
      .to(".r-month", { opacity: 1, duration: 0.3, stagger: 0.1 }, 0.3)
      /* the threshold is drawn before anything is measured against it */
      .to(".r-threshold", { attr: { x2: VB_W }, duration: 0.9, ease: "power2.out" }, 0.9)
      .to(".r-threshold-label", { opacity: 1, duration: 0.4 }, 1.5);

    /* one signal at a time, wiped across the months */
    signals.forEach((s, i) => {
      const t = 1.2 + i * 0.7;
      tl.to(`.r-wipe-${s.id}`, { attr: { width: VB_W }, duration: 1.3, ease: "none" }, t).to(
        `.r-label-${s.id}`,
        { opacity: 1, duration: 0.4 },
        t + 0.9
      );
    });

    /* the crossing, and the room changing with it */
    const t = 1.2 + signals.length * 0.7 + 0.5;
    tl.to(".r-threshold", { stroke: c.brass, duration: 0.4 }, t)
      .to(".r-cross", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, t + 0.1)
      .to(".r-ground", { opacity: 0.09, duration: 0.8 }, t + 0.1)
      .to(".r-state-flood", { opacity: 1, duration: 0.4 }, t + 0.3)
      /* and only then, the line */
      .to(".r-say > span", { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, t + 0.7);
  });

  return (
    <section
      ref={ref}
      id="risk"
      data-scene
      data-tone="dark"
      className="mat"
      style={{ position: "relative", background: c.ink, height: "480vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div className="r-ground" style={{ position: "absolute", inset: 0, opacity: 0 }}>
          <Plate asset="industry" position="50% 55%" silent style={{ position: "absolute", inset: 0 }} />
        </div>

        <div
          style={{
            position: "relative",
            height: "100%",
            maxWidth: shell,
            margin: "0 auto",
            padding: `clamp(84px, 12vh, 130px) ${gutter} clamp(40px, 7vh, 80px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(14px, 2.4vh, 32px)",
          }}
        >
          {/* ---------------- the field ---------------- */}
          <div className="r-field">
            <div style={{ position: "relative" }}>
              <svg
                viewBox={`0 0 ${VB_W} ${VB_RENDER_H}`}
                width="100%"
                role="img"
                aria-label="Three illustrative exposure signals over six months. Flood exposure crosses the threshold."
                style={{ display: "block" }}
              >
                <defs>
                  {/* a clip rather than a mask: <mask> has a default region of
                      its own that quietly cuts the drawing short */}
                  {signals.map((s) => (
                    <clipPath key={s.id} id={`r-clip-${s.id}`} clipPathUnits="userSpaceOnUse">
                      <rect className={`r-wipe-${s.id}`} x="0" y="0" width="0" height={VB_H} />
                    </clipPath>
                  ))}
                </defs>

                <g transform={`scale(1 ${SQUASH})`}>
                  {/* the threshold, drawn in the same space as the curves */}
                  <line
                    className="r-threshold"
                    x1="0"
                    y1={THRESHOLD}
                    x2="0"
                    y2={THRESHOLD}
                    stroke={c.hairDark}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* the signals */}
                  {signals.map((s) => (
                    <g key={s.id} clipPath={`url(#r-clip-${s.id})`}>
                      <path
                        d={s.d}
                        fill="none"
                        stroke={s.colour}
                        strokeWidth="1.25"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ))}
                </g>

                {/* where the crossing happens — outside the squash so the dot
                    stays a circle rather than an ellipse */}
                <circle
                  className="r-cross"
                  cx={CROSS.x}
                  cy={CROSS.y * SQUASH}
                  r="4"
                  fill={c.brassLift}
                  opacity="0"
                />
              </svg>

              {/* the threshold names itself in real type, at the line's height */}
              <span
                className="r-threshold-label"
                style={{
                  position: "absolute",
                  left: 0,
                  top: at(THRESHOLD),
                  transform: "translateY(-150%)",
                  ...micro,
                  color: c.brassLift,
                  opacity: 0,
                }}
              >
                Threshold
              </span>
            </div>

            {/* each signal names itself at the height its line ended on */}
            <div className="r-legend">
              {signals.map((s) => (
                <div
                  key={s.id}
                  className={`r-label r-label-${s.id}`}
                  style={{ top: at(s.endY), transform: "translateY(-50%)", opacity: 0 }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: font.serif,
                      fontSize: "clamp(0.88rem, 1.05vw, 1rem)",
                      color: c.onDark,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    className={s.id === "flood" ? "r-state-flood" : undefined}
                    style={{
                      display: "block",
                      marginTop: 4,
                      ...micro,
                      color: s.accent ? c.brassLift : c.onDarkFaint,
                      opacity: s.accent ? 0 : 1,
                    }}
                  >
                    {s.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* time, under the plot and on the plot's own measure */}
          <div className="r-field" aria-hidden>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {months.map((m) => (
                <span key={m} className="r-month" style={{ ...micro, color: c.onDarkFaint, opacity: 0 }}>
                  {m}
                </span>
              ))}
            </div>
            <span />
          </div>

          <h2 style={{ ...statement(1.7, 3.4), color: c.onDark, margin: "clamp(6px, 1.4vh, 18px) 0 0" }}>
            <span className="r-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>SEE RISK</span>
            </span>
            <span className="r-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>DIFFERENTLY.</span>
            </span>
          </h2>

          <p style={{ ...micro, color: c.onDarkFaint, maxWidth: "48ch", lineHeight: 2 }}>
            Risk Intelligence is in development · illustrative signals
          </p>
        </div>
      </div>
    </section>
  );
}
