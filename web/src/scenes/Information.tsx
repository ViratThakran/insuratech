import { c, font, gutter, micro, shell, statement } from "../theme";
import { ScrollTrigger, gsap, useScene } from "../lib/motion";

/* ==========================================================================
   02 — INFORMATION
   ==========================================================================
   Real fragments of a renewal file, scattered. They are dense and unreadable
   as a set. Aurevia pulls them into one column, in order. The scene then
   goes quiet and black for a single line.
   ========================================================================== */

type Frag = { t: string; x: number; y: number; key?: string; value?: string; row?: number };

/* every fragment is real policy language, not decoration */
const frags: Frag[] = [
  { t: "Policy No. AV-PR-4021-A", x: 6, y: 9, key: "Policy", value: "AV-PR-4021-A", row: 0 },
  { t: "Example Industries Ltd., Pune", x: 58, y: 5, key: "Insured", value: "Example Industries Ltd.", row: 1 },
  { t: "01 January 2026 to 01 January 2027", x: 27, y: 17, key: "Period", value: "01 JAN 2026 → 01 JAN 2027", row: 2 },
  { t: "physical loss of or damage to the Property Insured", x: 62, y: 27, key: "Coverage", value: "Property damage", row: 3 },
  { t: "up to a limit of ₹65,00,00,000", x: 9, y: 34, key: "Limit", value: "₹65,00,00,000", row: 4 },
  { t: "subject to a deductible of ₹5,00,000", x: 46, y: 43, key: "Deductible", value: "₹5,00,000", row: 5 },
  { t: "Endorsement 03 — flood and inundation", x: 71, y: 52, key: "Endorsement", value: "03 · flood sub-limit", row: 6 },
  { t: "Wording CL-118 applies", x: 15, y: 58, key: "Exclusions", value: "CL-118", row: 7 },

  /* the noise that does not survive */
  { t: "RE: FW: renewal wording v2-final", x: 34, y: 66 },
  { t: "scan_0041.pdf", x: 76, y: 71 },
  { t: "both days inclusive", x: 8, y: 74 },
  { t: "page 41 of 62", x: 52, y: 81 },
  { t: "signed copy attached", x: 24, y: 88 },
  { t: "chaser 3", x: 66, y: 92 },
  { t: "schedule v4.xlsx", x: 40, y: 96 },
];

const rows = frags.filter((f) => f.row !== undefined).length;

export function Information() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    if (reduced) {
      /* the ordered record is the point of the scene, so that is the frame
         reduced-motion visitors get — and the scene gives back its scroll */
      gsap.set(root, { height: "100vh" });
      gsap.set(".i-frag", { opacity: 1, y: 0 });
      gsap.set(".i-noise", { opacity: 0 });
      gsap.set(".i-spine", { scaleY: 1 });
      gsap.set(".i-keep", { left: "8%", top: (i: number) => `${14 + i * 8.4}%` });
      gsap.set(".i-keep .i-raw", { opacity: 0 });
      gsap.set(".i-keep .i-key, .i-keep .i-value", { opacity: 1, x: 0 });
      return;
    }

    /* the scene ends black, so the navigation has to be told to invert with
       it — otherwise a light veil sits over the dark frame */
    ScrollTrigger.create({
      trigger: root,
      start: "72% top",
      /* through to the end of the section, not just the end of the pin, or the
         navigation flips back to the light tone on the last frame */
      end: "bottom top",
      onToggle: (self) => {
        root.dataset.tone = self.isActive ? "dark" : "bone";
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });

    /* they arrive as a mess */
    tl.fromTo(
      ".i-frag",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: { each: 0.05, from: "random" }, ease: "power2.out" },
      0
    )
      /* the noise leaves */
      .to(".i-noise", { opacity: 0, y: -10, duration: 0.6, stagger: 0.04 }, 1.4)
      /* the record aligns */
      .to(
        ".i-keep",
        {
          left: "8%",
          top: (i: number) => `${14 + i * 8.4}%`,
          duration: 1.1,
          ease: "power3.inOut",
        },
        1.5
      )
      .to(".i-keep .i-raw", { opacity: 0, duration: 0.4 }, 2.2)
      .fromTo(".i-keep .i-key", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.04 }, 2.3)
      .fromTo(
        ".i-keep .i-value",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.04 },
        2.4
      )
      .fromTo(".i-spine", { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power2.out" }, 2.2)
      /* then everything goes quiet */
      .to(".i-record", { opacity: 0, duration: 0.8 }, 3.5)
      .to(".i-veil", { opacity: 1, duration: 0.8 }, 3.5)
      .fromTo(".i-quiet", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3.9);
  });

  return (
    <section
      ref={ref}
      id="information"
      data-scene
      data-tone="bone"
      className="mat"
      style={{ position: "relative", background: c.bone, height: "400vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div
          className="i-record"
          style={{
            position: "absolute",
            inset: 0,
            maxWidth: shell,
            margin: "0 auto",
            padding: `clamp(96px, 14vh, 150px) ${gutter}`,
          }}
        >
          {/* the spine the record aligns to */}
          <div
            className="i-spine"
            aria-hidden
            style={{
              position: "absolute",
              left: "7%",
              top: "12%",
              bottom: "18%",
              width: 1,
              background: c.hairLight,
              transformOrigin: "top",
              transform: "scaleY(0)",
            }}
          />

          {frags.map((f, i) => {
            const keep = f.row !== undefined;
            return (
              <div
                key={f.t}
                className={`i-frag ${keep ? "i-keep" : "i-noise"}`}
                style={{
                  position: "absolute",
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  opacity: 0,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="i-raw"
                  style={{
                    fontFamily: font.serif,
                    fontSize: keep ? "clamp(0.82rem, 1vw, 0.98rem)" : 11,
                    color: keep ? c.onLight : c.onLightFaint,
                  }}
                >
                  {f.t}
                </span>

                {keep && (
                  <>
                    <span
                      className="i-key"
                      style={{ ...micro, color: c.onLightMuted, opacity: 0, position: "absolute", left: 0 }}
                    >
                      {f.key}
                    </span>
                    <span
                      className="i-value"
                      style={{
                        fontFamily: font.mono,
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        color: f.row === 4 ? c.blue : f.row === 6 ? c.brass : c.onLight,
                        opacity: 0,
                        position: "absolute",
                        left: "16vw",
                      }}
                    >
                      {f.value}
                    </span>
                  </>
                )}
              </div>
            );
          })}

          <span
            style={{
              position: "absolute",
              right: gutter,
              bottom: "12%",
              ...micro,
              color: c.onLightFaint,
              textAlign: "right",
              maxWidth: "22ch",
              lineHeight: 1.9,
            }}
          >
            One renewal file · {rows} fields that matter
          </span>
        </div>

        {/* the quiet */}
        <div className="i-veil" aria-hidden style={{ position: "absolute", inset: 0, background: c.ink, opacity: 0 }} />
        <div
          className="i-quiet"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${gutter}`,
            opacity: 0,
          }}
        >
          <p
            style={{
              ...statement(1.1, 2.3),
              fontFamily: font.serif,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              textAlign: "center",
              maxWidth: "26ch",
              color: c.onDark,
            }}
          >
            Somewhere inside all this information is a decision.
          </p>
        </div>
      </div>
    </section>
  );
}
