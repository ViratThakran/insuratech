import { useEffect, useRef, useState } from "react";
import { c, font, gutter, micro, shell, statement } from "../theme";
import { Act, ActFill, Enter, Explain, Micro } from "../components/kit";
import { Thread } from "../components/Thread";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * OUTRO — TALK TO US                                                  *
 * Everything the visitor has seen dissolves. One blue signal crosses   *
 * the screen, lands as a single point, and the invitation appears.     *
 * ------------------------------------------------------------------ */

const residue = [
  { t: "POLICY WORDING", x: 8, y: 16 },
  { t: "₹65,00,00,000", x: 66, y: 11 },
  { t: "EXP-03 ABOVE THRESHOLD", x: 24, y: 70 },
  { t: "01 JAN 2026 → 01 JAN 2027", x: 56, y: 79 },
  { t: "ENDORSEMENT 03", x: 79, y: 42 },
  { t: "RENEWAL CALL", x: 11, y: 44 },
  { t: "CL-118", x: 43, y: 28 },
  { t: "STRUCTURED", x: 34, y: 55 },
];

export function Outro() {
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
  const p = reducedMotion() ? 1 : Math.min(1, Math.max(0, (y - box.top) / travel));

  const dissolve = map(p, 0.02, 0.38, 0, 1);
  const signal = map(p, 0.2, 0.62, 0, 1);
  const land = map(p, 0.58, 0.78, 0, 1);
  const words = map(p, 0.3, 0.7, 0, 1);

  /* the signal travels, then settles onto the CTA anchor */
  const signalX = 6 + signal * 74;
  const signalY = 50 - land * 14;

  return (
    <section
      ref={ref}
      id="talk"
      data-scene
      data-tone="dark"
      data-label="Talk to us"
      data-index="END"
      className="mat"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "270vh" }}
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
        {/* residue of the whole film */}
        <div aria-hidden style={{ position: "absolute", inset: 0 }}>
          {residue.map((r, i) => {
            const gone = map(dissolve, (i % 5) * 0.09, 0.45 + (i % 5) * 0.09, 0, 1);
            return (
              <span
                key={r.t}
                style={{
                  position: "absolute",
                  left: `${r.x}%`,
                  top: `${r.y}%`,
                  ...micro,
                  fontSize: 9,
                  color: c.onDarkFaint,
                  whiteSpace: "nowrap",
                  opacity: (1 - gone) * 0.7,
                  transform: `translateY(${gone * -10}px)`,
                  filter: gone > 0.6 ? "blur(1px)" : "none",
                }}
              >
                {r.t}
              </span>
            );
          })}
        </div>

        {/* the last signal */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${c.hairDark} 18%, ${c.hairDark} 78%, transparent)`,
            opacity: signal * 0.9 * (1 - land),
          }}
        />
        <span
          aria-hidden
          className={land > 0.9 ? "breathe" : undefined}
          style={{
            position: "absolute",
            top: `${signalY}%`,
            left: `${signalX}%`,
            width: 10,
            height: 10,
            marginTop: -5,
            borderRadius: "50%",
            background: c.blue,
            boxShadow: `0 0 0 ${4 + signal * 12}px rgba(79,99,255,0.10)`,
            opacity: signal,
            transition: "top 0.2s linear",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: shell,
            width: "100%",
            margin: "0 auto",
            padding: `0 ${gutter}`,
          }}
        >
          <Enter style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3vw, 40px)" }}>
            <Micro tone="dark">Talk to us</Micro>

            <h2 style={{ ...statement(2.3, 6), color: c.onDark, opacity: 0.55 + words * 0.45 }}>
              <span className="mask">
                <span>LET'S BUILD</span>
              </span>
              <span className="mask">
                <span style={{ transitionDelay: "90ms" }}>THE FUTURE</span>
              </span>
              <span className="mask">
                <span
                  style={{
                    transitionDelay: "180ms",
                    fontFamily: font.serif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: c.blueLift,
                  }}
                >
                  of insurance.
                </span>
              </span>
            </h2>

            <div className="fade" style={{ transitionDelay: "240ms", maxWidth: 620 }}>
              <Thread role="resolve" tone="dark" height={44} />
            </div>

            {/* the one filled action on the page */}
            <div
              className="fade"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "clamp(20px, 4vw, 48px)",
                transitionDelay: "300ms",
              }}
            >
              <ActFill href="mailto:hello@aurevia.ai">Talk to Aurevia</ActFill>
            </div>
          </Enter>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "clamp(22px, 4vh, 46px)",
            left: 0,
            right: 0,
            zIndex: 4,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>We turn business risk into intelligence.</span>
          <span style={{ ...micro, color: c.onDarkFaint }} className="hide-sm">
            Aurevia / intelligence system
          </span>
        </div>
      </div>
    </section>
  );
}
