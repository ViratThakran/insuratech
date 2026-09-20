import { useEffect, useRef, useState } from "react";
import { c, font, gutter, micro, shell, statement } from "../theme";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * THE DECISION — the scene that does not look like a website section. *
 *                                                                     *
 * Black. No heading. Fragments of a real file drift in the dark. Then  *
 * one line. Then the fragments snap into a single column and the       *
 * wordmark appears. It is over in one screen.                          *
 * ------------------------------------------------------------------ */

const fragments = [
  { t: "PROPERTY DAMAGE", x: 12, y: 14 },
  { t: "₹65,00,00,000", x: 68, y: 9 },
  { t: "EXCESS ₹5,00,000", x: 34, y: 26 },
  { t: "FLOOD SUB-LIMIT", x: 78, y: 31 },
  { t: "CL-118", x: 8, y: 38 },
  { t: "SCHEDULE OF ASSETS", x: 52, y: 44 },
  { t: "3 SITES", x: 24, y: 55 },
  { t: "CLAIMS 2023–25", x: 72, y: 58 },
  { t: "ENDORSEMENT 03", x: 14, y: 68 },
  { t: "01 JAN 2027", x: 60, y: 74 },
  { t: "BUSINESS INTERRUPTION", x: 30, y: 84 },
  { t: "SIGNED", x: 84, y: 88 },
];

export function Decision() {
  const ref = useRef<HTMLElement>(null);
  const y = useScrollY();
  const [box, setBox] = useState({ top: 0, height: 1 });

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setBox({ top: el.offsetTop, height: el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const travel = Math.max(1, box.height - vh);
  const p = reducedMotion() ? 0.8 : Math.min(1, Math.max(0, (y - box.top) / travel));

  const drift = map(p, 0, 0.42, 0, 1);      /* fragments arrive */
  const line = map(p, 0.34, 0.5, 0, 1);      /* the sentence */
  const snap = map(p, 0.56, 0.74, 0, 1);     /* everything reorganises */
  const mark = map(p, 0.76, 0.92, 0, 1);     /* AUREVIA */

  return (
    <section
      ref={ref}
      id="decision"
      data-scene
      data-tone="dark"
      data-label="The decision"
      data-index="—"
      className="mat"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "260vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* the file, scattered */}
        <div aria-hidden style={{ position: "absolute", inset: 0 }}>
          {fragments.map((f, i) => {
            const appear = map(drift, (i % 6) * 0.1, 0.4 + (i % 6) * 0.1, 0, 1);
            /* on snap they align into one column, centre-left, and fade */
            const colX = 34;
            const colY = 20 + i * 4.6;
            const x = f.x + (colX - f.x) * snap;
            const yy = f.y + (colY - f.y) * snap;
            return (
              <span
                key={f.t}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${yy}%`,
                  ...micro,
                  fontSize: 9.5,
                  whiteSpace: "nowrap",
                  color: snap > 0.7 && i === 5 ? c.blueLift : c.onDarkFaint,
                  opacity: appear * (1 - mark * 0.72),
                  transform: `translateY(${(1 - appear) * 10}px)`,
                  transition: "color 0.7s linear",
                }}
              >
                {f.t}
              </span>
            );
          })}
        </div>

        {/* the line */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${gutter}`,
          }}
        >
          <p
            style={{
              fontFamily: font.serif,
              fontStyle: "italic",
              fontSize: "clamp(1.15rem, 2.1vw, 2rem)",
              lineHeight: 1.35,
              textAlign: "center",
              maxWidth: "30ch",
              margin: 0,
              color: c.onDark,
              opacity: line * (1 - mark),
              transform: `translateY(${(1 - line) * 14}px)`,
            }}
          >
            Somewhere inside all of this is the decision.
          </p>
        </div>

        {/* the wordmark, alone */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              ...statement(2, 5.4),
              letterSpacing: "0.16em",
              fontWeight: 600,
              color: c.onDark,
              opacity: mark,
              transform: `scale(${0.97 + mark * 0.03})`,
            }}
          >
            AUREVIA
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "clamp(22px, 4vh, 44px)",
            left: 0,
            right: 0,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>
            {snap > 0.6 ? "one record" : "one file · many parts"}
          </span>
          <span style={{ ...micro, color: mark > 0.5 ? c.blueLift : c.onDarkFaint }}>
            {mark > 0.5 ? "intelligence layer" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
