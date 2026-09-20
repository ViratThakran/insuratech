import { c, font, gutter, maskLine, micro, shell, statement } from "../theme";
import { Plate } from "../components/Plate";
import { gsap, useScene } from "../lib/motion";

/* ==========================================================================
   07 — HUMAN DECISION
   ==========================================================================
   Back to the physical world, and to the person who still has to decide.
   The signature transition runs once more, compressed: the desk becomes
   bands, the bands become a single line, the line becomes the invitation.
   End credits.
   ========================================================================== */

const BANDS = 7;

export function Decision() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    /* GSAP parses the inline `translateY(108%)` React renders as `y: "108%"`,
       which is a *different* property from yPercent — the reveal has to zero
       both or it animates against an offset that never goes away. */
    const lines = ".h-say > span";

    if (reduced) {
      /* no scrubbing to drive the reveal, so the scene shows its payoff frame
         and gives back the scroll length it no longer needs */
      gsap.set(root, { height: "100vh" });
      gsap.set(lines, { y: 0, yPercent: 0 });
      gsap.set(".h-band", { opacity: 0 });
      gsap.set(".h-veil", { opacity: 1 });
      gsap.set(".h-signal", { width: "72%" });
      gsap.set(".h-dot", { opacity: 1, scale: 1 });
      gsap.set(".h-cta", { opacity: 1, y: 0 });
      return;
    }

    gsap.set(lines, { y: 0, yPercent: 108 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });

    /* the desk, held */
    tl.fromTo(".h-frame", { scale: 1.06 }, { scale: 1, duration: 2, ease: "none" }, 0)
      .fromTo(".h-note", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      /* Aurevia arrives as a mark on the page, not as a takeover */
      .fromTo(".h-mark", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 1.2)
      .fromTo(".h-flag", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5)
      /* the same shear as the opening — the loop closes */
      .to(".h-note, .h-flag", { opacity: 0, duration: 0.5 }, 2.2)
      .to(
        ".h-band",
        { xPercent: (i: number) => (i % 2 ? 1 : -1) * (7 + (i % 3) * 6), duration: 1.1, ease: "power2.inOut" },
        2.3
      )
      .to(".h-band", { opacity: 0, duration: 0.8, stagger: 0.07 }, 2.7)
      .to(".h-veil", { opacity: 1, duration: 0.8 }, 2.8)
      /* one line crosses, and stops */
      .fromTo(".h-signal", { width: "0%" }, { width: "72%", duration: 1.1, ease: "power2.inOut" }, 3.2)
      .fromTo(".h-dot", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 4.1)
      /* end credits */
      .to(".h-say > span", { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, 4.2)
      .fromTo(".h-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 4.9);
  });

  return (
    <section
      ref={ref}
      id="talk"
      data-scene
      data-tone="dark"
      className="mat"
      style={{ position: "relative", background: c.ink, height: "480vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* ---------- the desk ---------- */}
        <div className="h-frame" style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: BANDS }, (_, i) => (
            <div
              key={i}
              className="h-band"
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(${(i * 100) / BANDS}% 0% ${100 - ((i + 1) * 100) / BANDS}% 0%)`,
                willChange: "transform, opacity",
              }}
            >
              <Plate asset="human" position="52% 48%" silent={i !== 0} style={{ position: "absolute", inset: 0 }} />
            </div>
          ))}
        </div>

        {/* what the person wrote, and what Aurevia had already found */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "clamp(72px, 14vh, 160px)",
          }}
        >
          <div style={{ maxWidth: "34ch" }}>
            <p
              className="h-note"
              style={{
                position: "relative",
                fontFamily: font.serif,
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.5vw, 1.35rem)",
                lineHeight: 1.5,
                color: c.onDark,
                margin: 0,
                opacity: 0,
                textShadow: "0 1px 18px rgba(8,10,13,0.85)",
              }}
            >
              Limit moved — check the flood sub-limit before this goes to the client.
              <span
                aria-hidden
                className="h-mark"
                style={{
                  position: "absolute",
                  left: 0,
                  right: "18%",
                  bottom: -6,
                  height: 1,
                  background: c.brassLift,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </p>
            <span className="h-flag" style={{ ...micro, color: c.brassLift, opacity: 0, display: "block", marginTop: 16 }}>
              Aurevia flagged this on the first pass
            </span>
          </div>
        </div>

        {/* ---------- end credits ---------- */}
        <div className="h-veil" aria-hidden style={{ position: "absolute", inset: 0, background: c.ink, opacity: 0 }} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(26px, 5vh, 56px)",
            pointerEvents: "none",
          }}
        >
          {/* the signal crosses the screen and stops */}
          <div style={{ position: "relative", height: 10 }}>
            <span
              aria-hidden
              className="h-signal"
              style={{ position: "absolute", left: 0, top: 4, height: 1, width: 0, background: c.blueLift }}
            />
            <span
              aria-hidden
              className="h-dot"
              style={{
                position: "absolute",
                left: "72%",
                top: 0,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: c.blue,
                boxShadow: "0 0 0 8px rgba(82,103,255,0.10)",
                opacity: 0,
              }}
            />
          </div>

          <h2 style={{ ...statement(2.4, 6), color: c.onDark, margin: 0 }}>
            <span className="h-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>LET'S BUILD</span>
            </span>
            <span className="h-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>THE FUTURE</span>
            </span>
            <span className="h-say" style={maskLine}>
              <span
                style={{
                  display: "block",
                  transform: "translateY(108%)",
                  fontFamily: font.serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "0.46em",
                  letterSpacing: "-0.01em",
                  color: c.onDarkMuted,
                  paddingTop: "0.3em",
                }}
              >
                of insurance.
              </span>
            </span>
          </h2>

          <div className="h-cta" style={{ opacity: 0, pointerEvents: "auto" }}>
            <a href="mailto:hello@aurevia.ai" className="act-fill">
              <span>Talk to Aurevia</span>
              <span className="arw" aria-hidden>
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
