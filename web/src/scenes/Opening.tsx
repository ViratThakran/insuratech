import { useEffect, useRef, useState } from "react";
import { annotation, c, font, micro, shell, gutter } from "../theme";
import { Act, Enter, Explain, Statement } from "../components/kit";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* Scattered fragments of an information system that organize themselves
   into one structured policy record as the visitor scrolls. */
type Frag = {
  t: string;
  /** scattered position, % of stage */
  x: number;
  y: number;
  /** organized row (0-6) or null → dissolves once the system resolves */
  row: number | null;
  value?: string;
  accent?: boolean;
};

const frags: Frag[] = [
  { t: "POLICY", x: 6, y: 12, row: 0, value: "AV-4021-A" },
  { t: "PERIOD", x: 62, y: 4, row: 1, value: "2026 → 2027" },
  { t: "COVERAGE", x: 30, y: 74, row: 2, value: "PROPERTY DAMAGE" },
  { t: "LIMIT", x: 78, y: 40, row: 3, value: "₹65,00,00,000", accent: true },
  { t: "DEDUCTIBLE", x: 2, y: 52, row: 4, value: "₹5,00,000" },
  { t: "ENDORSEMENT", x: 50, y: 92, row: 5, value: "03 ATTACHED" },
  { t: "EXPOSURE", x: 84, y: 82, row: 6, value: "ASSESSED" },
  /* noise — these resolve away */
  { t: "2026", x: 20, y: 34, row: null },
  { t: "2027", x: 70, y: 62, row: null },
  { t: "CL-114", x: 44, y: 24, row: null },
  { t: "SCHEDULE", x: 12, y: 88, row: null },
  { t: "RENEWAL", x: 90, y: 18, row: null },
  { t: "EXCLUSION", x: 34, y: 48, row: null },
  { t: "RISK", x: 58, y: 40, row: null },
];

const ROWS = 7;

export function Opening() {
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
    return () => window.removeEventListener("resize", measure);
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const travel = Math.max(1, box.height - vh);
  const p = reducedMotion() ? 1 : Math.min(1, Math.max(0, (y - box.top) / travel));

  /* three beats: drift → organize → resolve */
  const organize = map(p, 0.06, 0.62, 0, 1);
  const resolve = map(p, 0.5, 0.9, 0, 1);

  return (
    <section
      ref={ref}
      id="opening"
      data-scene
      data-tone="dark"
      data-label="Opening"
      data-index="01"
      className="grain hairgrid"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "230vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* top rail — engineered system micro-detail */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            maxWidth: shell,
            width: "100%",
            margin: "0 auto",
            padding: `clamp(78px, 10vh, 108px) ${gutter} 0`,
            display: "flex",
            gap: 24,
            alignItems: "baseline",
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>01 / 11</span>
          <span aria-hidden style={{ flex: 1, height: 1, background: c.hairDark }} />
          <span style={{ ...micro, color: c.onDarkFaint }} className="hide-sm">
            Aurevia / intelligence system
          </span>
          <span style={{ ...micro, color: c.onDarkFaint }}>
            {Math.round(p * 100)
              .toString()
              .padStart(3, "0")}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            maxWidth: shell,
            width: "100%",
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 6.6fr) minmax(0, 5.4fr)",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "center",
          }}
          className="cols"
        >
          {/* --- headline --- */}
          <Enter style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 28px)" }}>
            <div className="fade" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ ...annotation, fontSize: 10.5, color: c.onDarkMuted }}>
                AI &amp; Intelligence for Insurance
              </span>
            </div>

            <Statement
              as="h1"
              tone="dark"
              min={2}
              max={4.2}
              lines={[{ t: "WE TURN" }, { t: "BUSINESS RISK" }, { t: "INTO INTELLIGENCE." }]}
            />

            <Explain tone="dark" delay={180} style={{ maxWidth: "46ch" }}>
              Aurevia builds AI-powered solutions that help insurers, brokers and risk
              professionals understand information, automate workflows and work with risk more
              intelligently.
            </Explain>

            <div
              className="fade"
              style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 4vw, 52px)", transitionDelay: "300ms" }}
            >
              <Act href="#talk" tone="dark" lead>
                Talk to Aurevia
              </Act>
              <Act href="#solutions" tone="dark">
                Explore solutions
              </Act>
            </div>
          </Enter>

          {/* --- the system --- */}
          <div
            aria-hidden
            style={{
              position: "relative",
              height: "min(62vh, 520px)",
              minHeight: 280,
            }}
          >
            {/* spine the record aligns to */}
            <div
              style={{
                position: "absolute",
                left: "6%",
                top: "8%",
                bottom: "8%",
                width: 1,
                background: c.hairDark,
                opacity: 0.4 + organize * 0.6,
                transform: `scaleY(${0.3 + organize * 0.7})`,
                transformOrigin: "top",
              }}
            />

            {/* connective lines, drawn as the system organizes */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: organize * 0.5 }}
            >
              {frags
                .filter((f) => f.row !== null)
                .map((f, i) => {
                  const ty = 8 + (f.row! * 84) / (ROWS - 1);
                  return (
                    <line
                      key={i}
                      x1="6"
                      y1={ty}
                      x2={6 + 88 * organize}
                      y2={ty}
                      stroke={f.accent ? c.blueLift : c.hairDark}
                      strokeWidth="0.35"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
            </svg>

            {frags.map((f, i) => {
              const isRecord = f.row !== null;
              const ty = isRecord ? 8 + (f.row! * 84) / (ROWS - 1) : f.y;
              const tx = isRecord ? 9 : f.x;
              const left = f.x + (tx - f.x) * organize;
              const top = f.y + (ty - f.y) * organize;
              const opacity = isRecord
                ? 0.42 + organize * 0.58
                : Math.max(0, 0.34 - resolve * 0.34);
              const drift = isRecord ? 0 : Math.sin((i + 1) * 1.7) * (1 - organize) * 6;

              return (
                <span
                  key={f.t + i}
                  style={{
                    position: "absolute",
                    left: `${left}%`,
                    top: `calc(${top}% + ${drift}px)`,
                    ...micro,
                    fontSize: isRecord ? 10 : 9,
                    color: f.accent ? c.blueLift : isRecord ? c.onDark : c.onDarkFaint,
                    opacity,
                    whiteSpace: "nowrap",
                    transition: "color 0.6s linear",
                  }}
                >
                  {f.t}
                </span>
              );
            })}

            {/* extracted values arrive only once the record exists */}
            {frags
              .filter((f) => f.row !== null)
              .map((f) => {
                const ty = 8 + (f.row! * 84) / (ROWS - 1);
                const show = map(resolve, 0.15 + f.row! * 0.07, 0.5 + f.row! * 0.07, 0, 1);
                return (
                  <span
                    key={`v-${f.t}`}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: `${ty}%`,
                      fontFamily: font.mono,
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: f.accent ? c.blueLift : c.onDarkMuted,
                      opacity: show,
                      transform: `translateX(${(1 - show) * 10}px)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.value}
                  </span>
                );
              })}

            {/* the resolved signal */}
            <span
              style={{
                position: "absolute",
                left: "6%",
                bottom: "-2%",
                transform: "translate(-50%, 0)",
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: c.blue,
                opacity: resolve,
              }}
              className={resolve > 0.8 ? "breathe" : undefined}
            />
            <span
              style={{
                position: "absolute",
                left: "10%",
                bottom: "-3.4%",
                ...micro,
                color: c.blueLift,
                opacity: resolve,
              }}
            >
              structured
            </span>
          </div>
        </div>

        {/* bottom rail */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            maxWidth: shell,
            width: "100%",
            margin: "0 auto",
            padding: `0 ${gutter} clamp(28px, 4vh, 48px)`,
            display: "flex",
            gap: 20,
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>
            {organize < 0.5 ? "unstructured information" : resolve < 0.6 ? "organizing" : "intelligence"}
          </span>
          <span style={{ ...micro, color: c.onDarkFaint }} className="hide-sm">
            scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}
