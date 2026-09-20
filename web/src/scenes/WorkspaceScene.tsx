import { useEffect, useRef, useState } from "react";
import { c, gutter, micro, shell } from "../theme";
import { Enter, Explain, Micro, Statement, Ticker } from "../components/kit";
import { Thread } from "../components/Thread";
import { DocumentAIProductPreview, type ProductFocus } from "../components/DocumentAIProductPreview";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 06 — WORKFLOW / THE WORKSPACE                                 *
 * The product arrives, then the scene walks the visitor through it:    *
 * documents → comparison → fields → insights. Restrained camera.       *
 * ------------------------------------------------------------------ */

const stages: { focus: ProductFocus; label: string; note: string }[] = [
  { focus: "overview", label: "The workspace", note: "Everything in one place." },
  { focus: "documents", label: "Documents", note: "Intake, states, and what still needs work." },
  { focus: "comparison", label: "Comparison", note: "Two documents lined up side by side." },
  { focus: "fields", label: "Extracted fields", note: "Structured values, with coverage per field." },
  { focus: "insights", label: "Insights", note: "What changed, and what to review." },
];

export function WorkspaceScene() {
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
  const p = reducedMotion() ? 0.5 : Math.min(1, Math.max(0, (y - box.top) / travel));

  const rise = map(p, 0.02, 0.3, 0, 1); // enters small, from below
  const fadeWords = map(p, 0.1, 0.26, 0, 1); // the words step aside
  const tour = map(p, 0.36, 0.96, 0, 1); // the guided pass

  const i = Math.min(stages.length - 1, Math.floor(tour * stages.length));
  const stage = stages[i];

  /* restrained camera: it stays recognisable as an application */
  const scale = 0.72 + rise * 0.28 + tour * 0.08;
  const shiftY = (1 - rise) * 12;
  const originX = stage.focus === "comparison" || stage.focus === "insights" ? 78 : stage.focus === "documents" ? 42 : 50;
  const originY = 40;

  return (
    <section
      ref={ref}
      id="workspace"
      data-scene
      data-tone="dark"
      data-label="Product view"
      data-index="06"
      className="mat"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "320vh" }}
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
        {/* headline layer */}
        <div
          style={{
            position: "absolute",
            top: "clamp(88px, 12vh, 132px)",
            left: 0,
            right: 0,
            zIndex: 4,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            opacity: 1 - fadeWords,
            transform: `translateY(${-fadeWords * 34}px)`,
            pointerEvents: "none",
          }}
        >
          <Enter>
            <div className="cols c-6-6" style={{ alignItems: "end" }}>
              <div>
                <Micro tone="dark">06 — Product view</Micro>
                <Statement
                  tone="dark"
                  min={1.6}
                  max={3}
                  style={{ marginTop: 16 }}
                  lines={[{ t: "DOCUMENT AI" }, { t: "PRODUCT VIEW", accent: true }]}
                />
              </div>
              <Explain tone="dark" delay={120} style={{ maxWidth: "38ch" }}>
                The same record, now inside Aurevia. Illustrative interface, example data.
              </Explain>
            </div>
          </Enter>
        </div>

        {/* product stage */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            marginTop: "clamp(56px, 8vh, 110px)",
            perspective: 2200,
          }}
        >
          <div
            style={{
              height: "min(60vh, 540px)",
              transform: `scale(${scale}) translateY(${shiftY}vh) rotateX(${(1 - rise) * 5}deg)`,
              transformOrigin: `${originX}% ${originY}%`,
              boxShadow: `0 ${44 + tour * 40}px ${100 + tour * 50}px -62px rgba(0,0,0,0.9)`,
              transition: "transform-origin 0.9s cubic-bezier(0.32,0.72,0.24,1)",
              willChange: "transform",
            }}
          >
            <DocumentAIProductPreview focus={rise > 0.85 ? stage.focus : "overview"} />
          </div>

          {/* the surface it stands on */}
          <div
            aria-hidden
            style={{
              height: 90,
              marginTop: 1,
              background: "linear-gradient(to bottom, rgba(241,238,229,0.055), transparent 72%)",
              transform: `scaleY(-1) scale(${scale})`,
              transformOrigin: "top center",
              opacity: 0.5 * rise,
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* the guide — one line, changing with the camera */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(20px, 4vh, 44px)",
            left: 0,
            right: 0,
            zIndex: 5,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <span key={stage.label} className="scene-tick" style={{ display: "inline-flex", gap: 16, alignItems: "baseline" }}>
            <span style={{ ...micro, color: c.blueLift }}>
              {String(i + 1).padStart(2, "0")} / 05
            </span>
            <span style={{ ...micro, color: c.onDark }}>{stage.label}</span>
            <span style={{ ...micro, color: c.onDarkFaint }} className="hide-sm">
              {stage.note}
            </span>
          </span>
          <Ticker
            tone="dark"
            active={rise > 0.85}
            state={rise > 0.85 ? "system / active" : "loading workspace"}
          />
        </div>
      </div>
    </section>
  );
}
