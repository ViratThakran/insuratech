import { useEffect, useRef, useState } from "react";
import { c, font, gutter, micro, shell, statement } from "../theme";
import { Act, Enter, Explain, Micro } from "../components/kit";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* Everything the visitor has seen dissolves. One signal remains, and
   travels toward the invitation. */
const residue = [
  { t: "POLICY WORDING", x: 8, y: 18 },
  { t: "₹65,00,00,000", x: 68, y: 12 },
  { t: "EXP-03 ABOVE THRESHOLD", x: 26, y: 72 },
  { t: "01 JAN 2026 → 01 JAN 2027", x: 58, y: 80 },
  { t: "ENDORSEMENT 03", x: 80, y: 44 },
  { t: "RENEWAL CALL", x: 12, y: 46 },
  { t: "CL-118", x: 44, y: 30 },
  { t: "STRUCTURED", x: 36, y: 56 },
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

  const dissolve = map(p, 0.02, 0.4, 0, 1);
  const signal = map(p, 0.24, 0.7, 0, 1);
  const words = map(p, 0.3, 0.7, 0, 1);

  return (
    <section
      ref={ref}
      id="talk"
      data-scene
      data-tone="dark"
      data-label="Talk to us"
      data-index="END"
      className="grain"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "260vh" }}
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

        {/* the last signal, travelling toward the invitation */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${c.hairDark} 20%, ${c.hairDark} 80%, transparent)`,
            opacity: signal * 0.8,
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: `${8 + signal * 76}%`,
            width: 10,
            height: 10,
            marginTop: -5,
            borderRadius: "50%",
            background: c.blue,
            boxShadow: `0 0 0 ${4 + signal * 10}px rgba(28,60,214,0.12)`,
            opacity: signal,
          }}
          className={signal > 0.9 ? "breathe" : undefined}
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
              {["LET'S BUILD", "THE FUTURE"].map((l, i) => (
                <span className="mask" key={l}>
                  <span style={{ transitionDelay: `${i * 90}ms` }}>{l}</span>
                </span>
              ))}
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

            <Explain tone="dark" delay={220} style={{ maxWidth: "42ch" }}>
              Explore Aurevia's AI solutions for insurance documents, risk and workflow automation.
            </Explain>

            <div
              className="fade"
              style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 4vw, 56px)", transitionDelay: "300ms" }}
            >
              <Act href="mailto:hello@aurevia.ai" tone="dark" lead>
                Talk to Aurevia
              </Act>
              <Act href="#solutions" tone="dark">
                Explore solutions
              </Act>
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
