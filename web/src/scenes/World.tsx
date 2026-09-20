import { c, font, gutter, maskLine, micro, shell, statement } from "../theme";
import { Plate } from "../components/Plate";
import { gsap, useScene } from "../lib/motion";

/* ==========================================================================
   01 — THE WORLD
   ==========================================================================
   The film opens on a real place. Information is discovered inside it. The
   frame then shears into horizontal bands, the bands become the rules of a
   document, and the document resolves into the Aurevia statement.

   This is the signature Aurevia transition:
   PHYSICAL → DOCUMENT → DATA → SIGNAL → INTELLIGENCE.
   ========================================================================== */

/* information found inside the photograph, positioned as if it belongs to
   parts of the building rather than floating over it */
const found = [
  { t: "PROPERTY", x: 12, y: 33 },
  { t: "COVERAGE", x: 63, y: 24 },
  { t: "LIMIT", x: 38, y: 52 },
  { t: "EXPOSURE", x: 78, y: 61 },
  { t: "RENEWAL", x: 22, y: 70 },
  { t: "ENDORSEMENT", x: 54, y: 79 },
  { t: "POLICY", x: 86, y: 41 },
];

const BANDS = 9;

export function World() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    /* The hidden start states live here, not in `fromTo`: a scrubbed timeline
       renders from progress 0 anyway, and `fromTo`'s immediateRender leaves
       elements stranded in their from-state when the effect is re-run. */
    const rest = () => {
      gsap.set(".w-found", { opacity: 0, y: 8 });
      gsap.set(".w-rule", { scaleX: 0, opacity: 0 });
      /* `y: 0` matters: GSAP parses the inline `translateY(108%)` that React
         renders as `y: "108%"`, which is a different property from yPercent —
         without zeroing it the reveal animates against a stuck offset. */
      gsap.set(".w-line > span", { y: 0, yPercent: 108 });
      gsap.set(".w-sub", { opacity: 0 });
    };

    /* without motion the scene is simply legible: statement, nothing else */
    if (reduced) {
      /* the scene gives back the scroll length it only needed for scrubbing */
      gsap.set(root, { height: "100vh" });
      gsap.set(".w-line > span", { y: 0, yPercent: 0 });
      gsap.set(".w-sub", { opacity: 1 });
      gsap.set(".w-sheet", { opacity: 1 });
      gsap.set(".w-band, .w-found", { opacity: 0 });
      return;
    }

    rest();

    /* the near-imperceptible camera: the whole sequence is scrubbed */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    tl.fromTo(".w-frame", { scale: 1.08 }, { scale: 1, ease: "none", duration: 3 }, 0)
      /* information is found */
      .to(".w-found", { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" }, 0.5)
      .to(".w-found", { opacity: 0, duration: 0.4, stagger: 0.05 }, 2.1)
      /* the frame shears into bands */
      .to(
        ".w-band",
        {
          xPercent: (i: number) => (i % 2 ? 1 : -1) * (6 + (i % 4) * 5),
          duration: 1.2,
          ease: "power2.inOut",
        },
        2.0
      )
      .to(".w-band", { opacity: 0, duration: 0.9, stagger: 0.06, ease: "none" }, 2.5)
      /* the bands become document rules */
      .to(".w-rule", { scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power2.out" }, 2.7)
      .to(".w-sheet", { opacity: 1, duration: 0.8 }, 2.8)
      /* one rule becomes the signal */
      .to(".w-rule-signal", { backgroundColor: c.blue, duration: 0.3 }, 3.5)
      .to(".w-rule", { opacity: 0.12, duration: 0.5 }, 3.7)
      /* and the statement arrives */
      .to(".w-line > span", { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, 3.8)
      .to(".w-sub", { opacity: 1, duration: 0.5 }, 4.4);
  });

  return (
    <section
      ref={ref}
      id="world"
      data-scene
      data-tone="dark"
      style={{ position: "relative", background: c.ink, height: "420vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* ---------- the photograph, sheared into bands ---------- */}
        <div className="w-frame" style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: BANDS }, (_, i) => (
            <div
              key={i}
              className="w-band"
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(${(i * 100) / BANDS}% 0% ${100 - ((i + 1) * 100) / BANDS}% 0%)`,
                willChange: "transform, opacity",
              }}
            >
              <Plate asset="world" position="50% 42%" silent={i !== 0} style={{ position: "absolute", inset: 0 }} />
            </div>
          ))}
        </div>

        {/* ---------- information discovered in the frame ---------- */}
        <div aria-hidden style={{ position: "absolute", inset: 0 }}>
          {found.map((f) => (
            <span
              key={f.t}
              className="w-found"
              style={{
                position: "absolute",
                left: `${f.x}%`,
                top: `${f.y}%`,
                ...micro,
                fontSize: 9.5,
                color: c.onDark,
                opacity: 0,
                whiteSpace: "nowrap",
                textShadow: "0 1px 12px rgba(8,10,13,0.9)",
              }}
            >
              {f.t}
            </span>
          ))}
        </div>

        {/* ---------- the sheet the bands become ---------- */}
        <div
          className="w-sheet"
          aria-hidden
          style={{ position: "absolute", inset: 0, background: c.ink, opacity: 0 }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.6vh, 18px)",
          }}
        >
          {Array.from({ length: BANDS }, (_, i) => (
            <div
              key={i}
              className={`w-rule${i === 4 ? " w-rule-signal" : ""}`}
              style={{
                height: 1,
                width: `${[86, 72, 94, 61, 78, 88, 54, 82, 68][i]}%`,
                background: c.hairDark,
                transformOrigin: "left",
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* ---------- the statement ---------- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "clamp(64px, 12vh, 140px)",
            pointerEvents: "none",
          }}
        >
          <h1 style={{ ...statement(2.2, 5.2), color: c.onDark, margin: 0 }}>
            {["WE TURN", "BUSINESS RISK"].map((l) => (
              <span key={l} className="w-line" style={maskLine}>
                <span style={{ display: "block", transform: "translateY(108%)" }}>{l}</span>
              </span>
            ))}
            <span className="w-line" style={maskLine}>
              <span
                style={{
                  display: "flex",
                  transform: "translateY(108%)",
                  alignItems: "baseline",
                  gap: "0.3em",
                  flexWrap: "wrap",
                }}
              >
                <span>INTO</span>
                <span
                  style={{
                    fontFamily: font.serif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: c.blueLift,
                  }}
                >
                  intelligence.
                </span>
              </span>
            </span>
          </h1>

          <p
            className="w-sub"
            style={{
              ...micro,
              color: c.onDarkMuted,
              marginTop: "clamp(20px, 3vh, 34px)",
              opacity: 0,
            }}
          >
            AI &amp; intelligence for insurance
          </p>
        </div>
      </div>
    </section>
  );
}
