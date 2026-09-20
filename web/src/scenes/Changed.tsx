import { c, font, gutter, maskLine, micro, shell, statement } from "../theme";
import { gsap, useScene } from "../lib/motion";

/* ==========================================================================
   04 — SEE WHAT CHANGED
   ==========================================================================
   Two pages, side by side, almost identical. Then one value changes. Then
   another. Copper marks where the difference is. No diff boxes, no green or
   red, no cards — forensic reading, set as type.
   ========================================================================== */

type Row = { field: string; before: string; after: string; changed?: string };

const rows: Row[] = [
  { field: "Coverage", before: "Property damage", after: "Property damage" },
  { field: "Property limit", before: "₹50,00,00,000", after: "₹65,00,00,000", changed: "increased" },
  { field: "Deductible", before: "₹2,50,000", after: "₹5,00,000", changed: "doubled" },
  { field: "Policy period", before: "2025 — 2026", after: "2026 — 2027" },
  { field: "Endorsements", before: "02 attached", after: "03 attached", changed: "flood sub-limit added" },
  { field: "Exclusion wording", before: "CL-114", after: "CL-118", changed: "wording differs" },
  { field: "Coverage basis", before: "Reinstatement", after: "Reinstatement" },
];

const changed = rows.map((r, i) => ({ r, i })).filter((x) => x.r.changed);

const COLS = "minmax(0, 3fr) minmax(0, 4.5fr) minmax(0, 4.5fr)";
const GAP = "clamp(10px, 2vw, 32px)";

export function Changed() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    /* GSAP parses the inline `translateY(108%)` React renders as `y: "108%"`,
       which is a *different* property from yPercent — the reveal has to zero
       both or it animates against an offset that never goes away. */
    const lines = ".ch-say > span";

    if (reduced) {
      /* no scrubbing to drive the reveal, so the scene shows its payoff frame
         and gives back the scroll length it no longer needs */
      gsap.set(root, { height: "100vh" });
      gsap.set(lines, { y: 0, yPercent: 0 });
      gsap.set(".ch-page, .ch-row", { opacity: 1 });
      changed.forEach(({ i }) => {
        gsap.set(`.ch-strike-${i}`, { scaleX: 1 });
        gsap.set(`.ch-old-${i}`, { color: c.onDarkFaint });
        gsap.set(`.ch-new-${i}`, { color: c.brassLift });
        gsap.set(`.ch-tie-${i}`, { scaleX: 1 });
        gsap.set(`.ch-note-${i}`, { opacity: 1, x: 0 });
      });
      return;
    }

    gsap.set(lines, { y: 0, yPercent: 108 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.55 },
    });

    /* both pages arrive, indistinguishable */
    tl.fromTo(".ch-page", { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.12 }, 0)
      .fromTo(".ch-row", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, 0.5);

    /* then, one at a time, a difference surfaces */
    changed.forEach(({ i }, n) => {
      const at = 1.8 + n * 0.75;
      tl.to(`.ch-old-${i}`, { color: c.onDarkFaint, duration: 0.3 }, at)
        .to(`.ch-strike-${i}`, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, at)
        .to(`.ch-new-${i}`, { color: c.brassLift, duration: 0.35 }, at + 0.1)
        .to(`.ch-tie-${i}`, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, at + 0.1)
        .fromTo(`.ch-note-${i}`, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3 }, at + 0.3);
    });

    const after = 1.8 + changed.length * 0.75;
    tl.to(".ch-say > span", { yPercent: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, after);
  });

  return (
    <section
      ref={ref}
      id="changed"
      data-scene
      data-tone="dark"
      className="mat"
      style={{ position: "relative", background: c.ink, height: "540vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: shell,
            width: "100%",
            margin: "0 auto",
            padding: `clamp(78px, 11vh, 110px) ${gutter} clamp(28px, 5vh, 56px)`,
          }}
        >
          {/* the two pages, column headings only */}
          <div style={{ display: "grid", gridTemplateColumns: COLS, gap: GAP, alignItems: "end" }}>
            <span />
            <span className="ch-page" style={{ ...micro, color: c.onDarkMuted, opacity: 0 }}>
              Existing policy
            </span>
            <span className="ch-page" style={{ ...micro, color: c.blueLift, opacity: 0 }}>
              Renewal offer
            </span>
          </div>

          {rows.map((r, i) => (
            <div
              key={r.field}
              className="ch-row"
              style={{
                display: "grid",
                gridTemplateColumns: COLS,
                gap: GAP,
                alignItems: "baseline",
                padding: "clamp(7px, 1.1vh, 13px) 0",
                borderTop: `1px solid ${c.hairDarkSoft}`,
                opacity: 0,
              }}
            >
              <span style={{ ...micro, color: c.onDarkMuted }}>{r.field}</span>

              {/* the old value, with the line drawn through it — the wrapper is
                  sized to the text so the rule cannot run past the number */}
              <span style={{ position: "relative", justifySelf: "start" }}>
                <span
                  className={`ch-old-${i}`}
                  style={{
                    fontFamily: font.mono,
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    color: c.onDarkMuted,
                  }}
                >
                  {r.before}
                </span>
                {r.changed && (
                  <span
                    aria-hidden
                    className={`ch-strike-${i}`}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "52%",
                      height: 1,
                      background: c.onDarkFaint,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                    }}
                  />
                )}
              </span>

              {/* the new value, with the tie that links the two */}
              <span
                style={{
                  position: "relative",
                  justifySelf: "start",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {r.changed && (
                  <span
                    aria-hidden
                    className={`ch-tie ch-tie-${i}`}
                    style={{
                      position: "absolute",
                      left: "clamp(-30px, -2vw, -10px)",
                      top: "0.62em",
                      width: "clamp(10px, 2vw, 30px)",
                      height: 1,
                      background: c.brassLift,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                    }}
                  />
                )}
                <span
                  className={`ch-new-${i}`}
                  style={{
                    fontFamily: font.mono,
                    fontSize: "clamp(0.9rem, 1.3vw, 1.2rem)",
                    color: c.onDark,
                  }}
                >
                  {r.after}
                </span>
                {r.changed && (
                  <span className={`ch-note-${i}`} style={{ ...micro, color: c.brassLift, opacity: 0 }}>
                    {r.changed}
                  </span>
                )}
              </span>
            </div>
          ))}

          {/* the line the scene has been building to */}
          <h2
            style={{
              ...statement(1.6, 3),
              color: c.onDark,
              margin: "clamp(20px, 3.4vh, 44px) 0 0",
            }}
          >
            <span className="ch-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)" }}>SEE WHAT</span>
            </span>
            <span className="ch-say" style={maskLine}>
              <span style={{ display: "block", transform: "translateY(108%)", color: c.brassLift }}>CHANGED.</span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
