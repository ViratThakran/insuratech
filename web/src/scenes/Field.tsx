import { c, font, gutter, micro, shell, statement } from "../theme";
import { EditorialImage } from "../components/EditorialImage";
import { Enter, Micro } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * INTERLUDE — THE FIELD                                               *
 * A collage of the things insurance actually runs on: a building, a    *
 * clause, a number, a signal, a person's note. They arrive separately  *
 * and then align to one grid. Dense, off-grid, deliberately physical.  *
 * ------------------------------------------------------------------ */

function Sparkline({ p }: { p: number }) {
  const n = 22;
  const k = map(p, 0.2, 0.8, 0, 1);
  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return 26 - (Math.sin(t * 7) * 0.5 + Math.sin(t * 15) * 0.2) * 12 - (t > 0.7 ? (t - 0.7) * 34 * k : 0);
  });
  return (
    <svg viewBox="0 0 160 44" width="100%" aria-hidden style={{ display: "block" }}>
      <line x1="0" y1="8" x2="160" y2="8" stroke={c.brass} strokeOpacity="0.5" strokeDasharray="2 5" />
      <path
        d={pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * 160) / (n - 1)} ${v}`).join(" ")}
        fill="none"
        stroke={k > 0.6 ? c.brass : c.onLightMuted}
        strokeWidth="1.1"
      />
      {k > 0.6 && <circle cx="152" cy={pts[21]} r="2.4" fill={c.brass} />}
    </svg>
  );
}

export function Field() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.92, end: 0.12 });
  const align = map(p, 0.16, 0.72, 0, 1);

  /* each piece drifts in from its own offset, then settles onto the grid */
  const off = (dx: number, dy: number, rot = 0) => ({
    transform: `translate3d(${dx * (1 - align)}px, ${dy * (1 - align)}px, 0) rotate(${rot * (1 - align)}deg)`,
  });

  return (
    <section
      data-scene
      data-tone="paper"
      data-label="The field"
      data-index="—"
      className="mat rules dense"
      style={{
        position: "relative",
        background: c.paper,
        color: c.onLight,
        padding: "clamp(90px, 12vw, 160px) 0",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        style={{ position: "relative", zIndex: 2, maxWidth: shell, margin: "0 auto", padding: `0 ${gutter}` }}
      >
        {/* a small label, top-right — not another giant top-left heading */}
        <Enter style={{ display: "flex", justifyContent: "flex-end", marginBottom: "clamp(28px, 4vw, 56px)" }}>
          <div style={{ textAlign: "right" }}>
            <Micro>Interlude — the field</Micro>
            <p
              style={{
                fontFamily: font.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: c.onLightMuted,
                margin: "10px 0 0",
              }}
            >
              documents · data · risk · people · decisions
            </p>
          </div>
        </Enter>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gridAutoRows: "minmax(10px, auto)",
            gap: "clamp(14px, 2vw, 28px)",
            alignItems: "start",
          }}
          className="field-grid"
        >
          {/* 01 — the asset, cropped hard by the left edge */}
          <div style={{ gridColumn: "1 / span 5", ...off(-70, 20, -1.5) }}>
            <EditorialImage kind="facade" ratio="5 / 6" alt="Commercial property, insured asset" />
          </div>

          {/* 02 — the number, alone, far from its explanation */}
          <div style={{ gridColumn: "7 / span 3", ...off(50, -40) }}>
            <div style={{ ...statement(2.6, 4.4), lineHeight: 0.84 }}>
              62
            </div>
            <Micro style={{ display: "block", marginTop: 12 }}>pages in one wording</Micro>
          </div>

          {/* 03 — the clause, as a torn strip of the document */}
          <div
            style={{
              gridColumn: "10 / span 3",
              background: c.sheet,
              border: `1px solid ${c.hairLight}`,
              borderRight: "none",
              marginRight: "calc(-1 * clamp(20px, 4.4vw, 64px))",
              padding: "16px 18px",
              boxShadow: "0 26px 50px -44px rgba(9,11,14,0.45)",
              ...off(80, 30, 1),
            }}
          >
            <Micro>clause</Micro>
            <p
              style={{
                fontFamily: font.serif,
                fontSize: 13,
                lineHeight: 1.7,
                color: c.onLight,
                margin: "10px 0 0",
              }}
            >
              …up to a limit of{" "}
              <span style={{ background: "rgba(79,99,255,0.14)", boxShadow: `inset 0 -1px 0 ${c.blue}` }}>
                ₹65,00,00,000
              </span>{" "}
              in respect of any one occurrence…
            </p>
          </div>

          {/* 04 — the signal, low and wide */}
          <div style={{ gridColumn: "7 / span 4", marginTop: "clamp(18px, 3vw, 44px)", ...off(30, 60) }}>
            <Micro color={c.brass}>exposure · above threshold</Micro>
            <div style={{ marginTop: 10 }}>
              <Sparkline p={p} />
            </div>
          </div>

          {/* 05 — the human note */}
          <div
            style={{
              gridColumn: "11 / span 2",
              marginTop: "clamp(18px, 3vw, 44px)",
              ...off(40, 70, -2),
            }}
          >
            <span
              style={{
                fontFamily: font.serif,
                fontStyle: "italic",
                fontSize: 14,
                lineHeight: 1.45,
                color: c.brass,
              }}
            >
              “check the flood sub-limit”
            </span>
          </div>

          {/* 06 — the fleet schedule, a data table reduced to marks */}
          <div style={{ gridColumn: "1 / span 5", marginTop: "clamp(20px, 3vw, 40px)", ...off(-40, 50) }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                border: `1px solid ${c.hairLight}`,
                background: c.sheet,
              }}
            >
              {["AV-01", "AV-02", "AV-03", "AV-04", "AV-05", "AV-06", "12.4", "8.10", "2.05", "9.60", "4.42", "7.18"].map(
                (v, i) => (
                  <span
                    key={v + i}
                    style={{
                      fontFamily: font.mono,
                      fontSize: 9.5,
                      letterSpacing: "0.1em",
                      padding: "9px 4px",
                      textAlign: "center",
                      color: i === 8 ? c.green : c.onLightMuted,
                      borderRight: (i + 1) % 6 ? `1px solid ${c.hairLightSoft}` : undefined,
                      borderBottom: i < 6 ? `1px solid ${c.hairLightSoft}` : undefined,
                    }}
                  >
                    {v}
                  </span>
                )
              )}
            </div>
            <Micro style={{ display: "block", marginTop: 10 }}>schedule of assets · extract</Micro>
          </div>
        </div>
      </div>
    </section>
  );
}
