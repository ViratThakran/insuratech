import { c, font, gutter, maskLine, micro, shell, statement } from "../theme";
import { gsap, useScene } from "../lib/motion";

/* ==========================================================================
   06 — INTELLIGENCE
   ==========================================================================
   Three streams, each keeping the language of the scene it came from:
   structure from the document, signal from the risk field, conversation from
   a call. Three lines carry them inward, meet at one point, and leave as one.

   The convergence is drawn in a single viewBox rather than by moving the three
   blocks: percentage transforms are relative to each block's own size, so
   "move them to the middle" is the one thing they cannot reliably do.
   ========================================================================== */

const VB_W = 520;
const VB_H = 360;
const CORE = { x: 366, y: 180 };

/* each stream enters the drawing at the height of its own block */
const streams = [
  { id: "structure", label: "Structure", y: 44 },
  { id: "signal", label: "Signal", y: 180 },
  { id: "conversation", label: "Conversation", y: 312 },
];

const path = (y: number) => `M 0 ${y} C ${CORE.x * 0.5} ${y}, ${CORE.x * 0.7} ${CORE.y}, ${CORE.x} ${CORE.y}`;

/* the conversation is real product behaviour, not decoration */
const turns = [
  { who: "Customer", said: "We need to renew our policy." },
  { who: "Aurevia", said: "Let's review the current coverage and renewal details." },
];

export function Intelligence() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    const wipes = streams.map((s) => `.in-wipe-${s.id}`);

    if (reduced) {
      gsap.set(root, { height: "100vh" });
      gsap.set(".in-block, .in-turn", { opacity: 1, x: 0 });
      gsap.set(wipes, { attr: { width: CORE.x } });
      gsap.set(".in-core", { opacity: 1, scale: 1 });
      gsap.set(".in-out", { attr: { x2: VB_W } });
      gsap.set(".in-word > span", { y: 0, yPercent: 0 });
      gsap.set(".in-foot", { opacity: 1 });
      return;
    }

    gsap.set(".in-block", { opacity: 0, x: -24 });
    gsap.set(".in-turn", { opacity: 0 });
    gsap.set(wipes, { attr: { width: 0 } });
    gsap.set(".in-core", { opacity: 0, scale: 0.6, transformOrigin: "center" });
    gsap.set(".in-out", { attr: { x2: CORE.x } });
    gsap.set(".in-word > span", { y: 0, yPercent: 108 });
    gsap.set(".in-foot", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });

    /* each stream states itself in its own language */
    tl.to(".in-block", { opacity: 1, x: 0, duration: 0.7, stagger: 0.3, ease: "power2.out" }, 0)
      .to(".in-turn", { opacity: 1, duration: 0.35, stagger: 0.25 }, 1.0);

    /* then they travel inward */
    streams.forEach((s, i) => {
      tl.to(`.in-wipe-${s.id}`, { attr: { width: CORE.x }, duration: 1.1, ease: "power1.inOut" }, 2.0 + i * 0.18);
    });

    /* they meet */
    tl.to(".in-core", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 3.2)
      /* and leave as one */
      .to(".in-out", { attr: { x2: VB_W }, duration: 0.8, ease: "power2.out" }, 3.5)
      .to(".in-word > span", { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 3.8)
      .to(".in-foot", { opacity: 1, duration: 0.5 }, 4.4);
  });

  return (
    <section
      ref={ref}
      id="intelligence"
      data-scene
      data-tone="dark"
      className="mat"
      style={{ position: "relative", background: c.ink, height: "460vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
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
            gap: "clamp(18px, 3vh, 40px)",
          }}
        >
          <div
            className="cols"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr)",
              gap: "clamp(16px, 3vw, 48px)",
              alignItems: "center",
            }}
          >
            {/* ---------------- what arrives ---------------- */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px, 3.4vh, 40px)" }}>
              {/* structure, out of the document */}
              <div className="in-block" style={{ opacity: 0 }}>
                <span style={{ ...micro, color: c.onDarkMuted }}>Structure</span>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                  {["₹65,00,00,000", "01 JAN 2026 → 01 JAN 2027", "₹5,00,000"].map((v, i) => (
                    <span
                      key={v}
                      style={{
                        fontFamily: font.mono,
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        color: i === 0 ? c.blueLift : c.onDarkMuted,
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* signal, out of the risk field */}
              <div className="in-block" style={{ opacity: 0 }}>
                <span style={{ ...micro, color: c.onDarkMuted }}>Signal</span>
                <svg viewBox="0 0 260 40" width="100%" style={{ display: "block", marginTop: 8, maxWidth: 260 }} aria-hidden>
                  <line x1="0" y1="10" x2="260" y2="10" stroke={c.brass} strokeOpacity="0.5" strokeDasharray="2 5" />
                  <path
                    d="M 0 32 C 60 30, 110 34, 160 24 C 200 16, 230 8, 260 5"
                    fill="none"
                    stroke={c.brassLift}
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* conversation, out of a call */}
              <div className="in-block" style={{ opacity: 0 }}>
                <span style={{ ...micro, color: c.onDarkMuted }}>Conversation</span>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  {turns.map((t) => (
                    <div key={t.who} className="in-turn" style={{ opacity: 0 }}>
                      <span style={{ ...micro, fontSize: 8.5, color: t.who === "Aurevia" ? c.violetLift : c.onDarkFaint }}>
                        {t.who}
                      </span>
                      <p
                        style={{
                          fontFamily: font.serif,
                          fontSize: "clamp(0.82rem, 1vw, 0.96rem)",
                          lineHeight: 1.5,
                          color: c.onDark,
                          margin: "2px 0 0",
                        }}
                      >
                        {t.said}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- where it converges ---------------- */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              width="100%"
              aria-hidden
              style={{ display: "block", maxHeight: "44vh" }}
            >
              <defs>
                {streams.map((s) => (
                  <clipPath key={s.id} id={`in-clip-${s.id}`} clipPathUnits="userSpaceOnUse">
                    <rect className={`in-wipe-${s.id}`} x="0" y="0" width="0" height={VB_H} />
                  </clipPath>
                ))}
              </defs>

              {streams.map((s) => (
                <g key={s.id} clipPath={`url(#in-clip-${s.id})`}>
                  <path
                    d={path(s.y)}
                    fill="none"
                    stroke={c.onDarkFaint}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}

              {/* what leaves the meeting point */}
              <line
                className="in-out"
                x1={CORE.x}
                y1={CORE.y}
                x2={CORE.x}
                y2={CORE.y}
                stroke={c.blueLift}
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />

              <g className="in-core" opacity="0">
                <circle cx={CORE.x} cy={CORE.y} r="24" fill={c.blue} fillOpacity="0.06" />
                <circle cx={CORE.x} cy={CORE.y} r="11" fill={c.blue} fillOpacity="0.12" />
                <circle cx={CORE.x} cy={CORE.y} r="5" fill={c.blue} />
              </g>
            </svg>
          </div>

          <h2 style={{ ...statement(1.8, 4.2), color: c.onDark, margin: 0 }}>
            <span className="in-word" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>ONE INTELLIGENCE</span>
            </span>
            <span className="in-word" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>LAYER.</span>
            </span>
          </h2>

          <p className="in-foot" style={{ ...micro, color: c.onDarkFaint, opacity: 0, lineHeight: 2 }}>
            Document AI available now · Risk Intelligence and Voice AI in development
          </p>
        </div>
      </div>
    </section>
  );
}
