import { c, font, gutter, micro, shell } from "../theme";
import { EditorialImage } from "../components/EditorialImage";
import { Enter, Micro } from "../components/kit";
import { Thread } from "../components/Thread";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * BREATH — the quiet moment straight after the opening.               *
 * One sentence. One physical detail. Nothing else. Deliberately still. *
 * ------------------------------------------------------------------ */

export function Breath() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.9, end: 0.2 });
  const lift = map(p, 0.1, 0.7, 0, 1);

  return (
    <section
      id="information"
      data-scene
      data-tone="bone"
      data-label="Information"
      data-index="02"
      className="mat"
      style={{
        position: "relative",
        background: c.bone,
        color: c.onLight,
        padding: "clamp(120px, 18vh, 220px) 0 clamp(90px, 12vw, 160px)",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: shell,
          margin: "0 auto",
          padding: `0 ${gutter}`,
        }}
      >
        <Enter>
          {/* the sentence sits right of centre and low — not a top-left heading */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "clamp(56px, 9vw, 130px)",
            }}
          >
            <div style={{ maxWidth: "26ch" }}>
              <Micro>02 — Information</Micro>
              <h2
                style={{
                  fontFamily: font.sans,
                  fontSize: "clamp(1.5rem, 2.9vw, 2.9rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  margin: "18px 0 0",
                }}
              >
                <span className="mask">
                  <span>INSURANCE RUNS</span>
                </span>
                <span className="mask">
                  <span style={{ transitionDelay: "90ms" }}>ON INFORMATION.</span>
                </span>
              </h2>
            </div>
          </div>
        </Enter>

        {/* the physical detail: a plate pushed off-grid, past the left gutter */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "end",
          }}
          className="cols"
        >
          <div
            style={{
              marginLeft: "calc(-1 * clamp(20px, 4.4vw, 64px))",
              transform: `translateY(${(1 - lift) * 26}px)`,
            }}
          >
            <EditorialImage
              kind="macro"
              ratio="16 / 9"
              alt="Policy wording, page detail"
            />
          </div>

          <div style={{ paddingBottom: 8 }}>
            <p
              style={{
                fontFamily: font.serif,
                fontSize: "clamp(1rem, 1.25vw, 1.25rem)",
                lineHeight: 1.62,
                color: c.onLightMuted,
                margin: 0,
                maxWidth: "34ch",
                opacity: lift,
              }}
            >
              Every renewal, every claim, every decision starts as language on a page — and
              someone has to read it.
            </p>
          </div>
        </div>
      </div>

      {/* the thread leaves this scene looking for something */}
      <div
        style={{
          maxWidth: shell,
          margin: "clamp(48px, 7vw, 96px) auto 0",
          padding: `0 ${gutter}`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Thread role="find" tone="light" height={80} annotate />
      </div>
    </section>
  );
}
