import { useEffect, useRef, useState } from "react";
import { c, gutter, micro, shell } from "../theme";
import { Enter, Explain, Micro, Statement } from "../components/kit";
import { Workspace } from "../components/Workspace";
import { map, reducedMotion, useScrollY } from "../lib/scroll";

/* The product arrives: small → large → full-bleed → camera pushes in. */
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
  const p = reducedMotion() ? 0.55 : Math.min(1, Math.max(0, (y - box.top) / travel));

  const rise = map(p, 0.02, 0.36, 0, 1); // enters from below, small
  const fadeWords = map(p, 0.26, 0.44, 0, 1); // the words step aside
  const push = map(p, 0.46, 0.96, 0, 1); // camera moves in

  const scale = 0.66 + rise * 0.34 + push * 0.22;
  const shift = (1 - rise) * 16 - push * 6;
  const originX = 50 - push * 16;
  const frame = 1 - push * 0.6;

  return (
    <section
      ref={ref}
      id="workspace"
      data-scene
      data-tone="dark"
      data-label="The workspace"
      data-index="06"
      className="grain"
      style={{ position: "relative", background: c.ink, color: c.onDark, height: "300vh" }}
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
        {/* headline layer — recedes as the product takes over */}
        <div
          style={{
            position: "absolute",
            top: "clamp(88px, 12vh, 132px)",
            left: 0,
            right: 0,
            zIndex: 3,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            opacity: 1 - push * 1.15,
            transform: `translateY(${-push * 26}px)`,
            pointerEvents: "none",
          }}
        >
          <Enter>
            <div className="cols c-6-6" style={{ alignItems: "end" }}>
              <div>
                <Micro tone="dark">06 / 11 — The workspace</Micro>
                <Statement
                  tone="dark"
                  min={1.8}
                  max={3.6}
                  style={{ marginTop: 16 }}
                  lines={[{ t: "THE PRODUCT," }, { t: "NOT A MOCKUP.", accent: true }]}
                />
              </div>
              <Explain tone="dark" delay={120} style={{ maxWidth: "40ch" }}>
                Documents, states, extracted fields and comparisons in one workspace. Shown here as
                an illustrative interface with example data.
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
            marginTop: "clamp(60px, 9vh, 120px)",
          }}
        >
          {/* framing hairlines that open up as the product grows */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-6% -1% -6% -1%",
              border: `1px solid ${c.hairDark}`,
              opacity: frame * 0.9,
            }}
          />
          <div
            style={{
              height: "min(62vh, 560px)",
              transform: `scale(${scale}) translateY(${shift}vh)`,
              transformOrigin: `${originX}% 42%`,
              boxShadow: `0 ${40 + push * 50}px ${90 + push * 60}px -60px rgba(0,0,0,0.85)`,
              willChange: "transform",
            }}
          >
            <Workspace />
          </div>
        </div>

        {/* scene telemetry */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(20px, 4vh, 44px)",
            left: 0,
            right: 0,
            zIndex: 4,
            maxWidth: shell,
            margin: "0 auto",
            padding: `0 ${gutter}`,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>
            {push > 0.6 ? "inside the workspace" : rise > 0.8 ? "workspace" : "loading workspace"}
          </span>
          <span style={{ ...micro, color: c.onDarkFaint }} className="hide-sm">
            placeholder interface — to be replaced by the live product
          </span>
        </div>
      </div>
    </section>
  );
}
