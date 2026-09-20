import { c, font, meaning, micro, statement } from "../theme";
import { Act, Enter, Explain, Micro, Scene, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * SCENE 08 — BROKERS                                                  *
 * Repetitive document work clears; the people remain. One human        *
 * moment: a marked-up page with a note in someone's own hand.          *
 * ------------------------------------------------------------------ */

const clutter = [
  "RE: RENEWAL WORDING", "CL-114", "PAGE 41/62", "SCHEDULE v3", "SIGNED COPY", "ENDT 02",
  "QUOTE 7714", "ATTACHMENT", "SCAN 0041", "PROPOSAL FORM", "V2 FINAL", "SUBJECTIVITIES",
  "PAGE 12/62", "CHASER 3", "WORDING DIFF", "SCAN 0042", "FW: FW: POLICY", "v2-final-2",
  "CLAUSE LIST", "NOT SIGNED", "PAGE 58/62", "ENDT 03", "SCHEDULE v4", "QUOTE 7715",
];

const audiences = [
  ["BROKERS", "Renewal reviews and client-ready comparisons."],
  ["INSURERS", "Intake, structured information, internal workflows."],
  ["RISK TEAMS", "Exposure information teams can actually work with."],
  ["ENTERPRISES", "Sight of the policies sitting across the business."],
];

/** The human moment: a page as it actually looks after a broker has read it. */
function MarkedPage({ p }: { p: number }) {
  const ink = map(p, 0.25, 0.75, 0, 1);
  return (
    <div
      aria-label="A renewal page after review, annotated by hand"
      role="img"
      style={{
        position: "relative",
        background: c.sheet,
        border: `1px solid ${c.hairLight}`,
        boxShadow: "0 40px 70px -50px rgba(10,11,13,0.5)",
        padding: "clamp(22px, 2.6vw, 38px)",
        transform: "rotate(-0.6deg)",
      }}
      className="mat"
      data-tone="sheet"
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <Micro tone="paper">Renewal review · page 41 / 62</Micro>
        <Micro tone="paper">Specimen</Micro>
      </div>

      {[
        "In consideration of the premium paid, the Company agrees to",
        "indemnify the Insured in respect of the Property described in",
        "the Schedule, subject to the terms, exclusions and conditions",
        "set out herein and to the limits stated in Section 4.",
      ].map((l, i) => (
        <p
          key={l}
          style={{
            fontFamily: font.serif,
            fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
            lineHeight: 1.85,
            color: c.onLight,
            margin: 0,
            textAlign: "justify",
            background: i === 3 ? `rgba(169,124,51,${0.14 * ink})` : "transparent",
          }}
        >
          {l}
        </p>
      ))}

      {/* a hand in the margin */}
      <div
        style={{
          marginTop: 26,
          paddingTop: 16,
          borderTop: `1px dashed ${c.hairLight}`,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          opacity: ink,
          transform: `translateY(${(1 - ink) * 8}px)`,
        }}
      >
        <span aria-hidden style={{ ...micro, color: c.brass, paddingTop: 4 }}>
          ↳
        </span>
        <span
          style={{
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
            lineHeight: 1.5,
            color: c.brass,
          }}
        >
          Limit moved — check the flood sub-limit before we send this to the client.
        </span>
      </div>

      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
        <Micro tone="paper">Broker's note</Micro>
        <Micro tone="paper" color={meaning.stable}>
          Aurevia flagged this in 1 pass
        </Micro>
      </div>
    </div>
  );
}

export function Brokers() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.72, end: 0.1 });
  const clear = map(p, 0.12, 0.66, 0, 1);
  const arrive = map(p, 0.5, 1, 0, 1);

  const [humanRef, hp] = useStageProgress<HTMLDivElement>({ start: 0.9, end: 0.25 });

  return (
    <Scene id="brokers" index="08" label="Brokers" tone="bone">
      <Enter>
        <div className="cols c-7-5" style={{ alignItems: "start" }}>
          <div>
            <Micro>08 / 11 — Brokers</Micro>
            <Statement
              min={1.7}
              max={3.6}
              style={{ marginTop: 22 }}
              lines={[
                { t: "LESS MANUAL" },
                { t: "REVIEW." },
                { t: "MORE TIME" },
                { t: "FOR THE WORK" },
                { t: "that matters.", serif: true, accent: true },
              ]}
            />
          </div>
          <Explain delay={140} style={{ maxWidth: "36ch", marginTop: 10 }}>
            Aurevia is designed to reduce repetitive document work so insurance professionals can
            spend more time on clients, risk discussions and decisions. People stay in control of
            every decision.
          </Explain>
        </div>
      </Enter>

      {/* --- the clearing --- */}
      <div
        ref={ref}
        style={{
          position: "relative",
          marginTop: "clamp(40px, 6vw, 76px)",
          minHeight: "clamp(190px, 21vw, 250px)",
        }}
      >
        {clutter.map((t, i) => {
          const gone = map(clear, (i % 9) * 0.07, 0.35 + (i % 9) * 0.07, 0, 1);
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <span
              key={t + i}
              aria-hidden
              style={{
                position: "absolute",
                left: `${3 + col * 16 + ((i * 7) % 5)}%`,
                top: `${4 + row * 24 + ((i * 11) % 6)}%`,
                ...micro,
                fontSize: 9,
                color: c.onLightFaint,
                whiteSpace: "nowrap",
                opacity: (1 - gone) * 0.85,
                transform: `translateY(${gone * -14}px)`,
                filter: gone > 0.5 ? "blur(1px)" : "none",
              }}
            >
              {t}
            </span>
          );
        })}

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            borderTop: `1px solid ${c.hairLight}`,
            marginTop: "clamp(116px, 14vw, 168px)",
          }}
        >
          {audiences.map(([name, note], i) => {
            const o = map(arrive, i * 0.14, 0.45 + i * 0.14, 0, 1);
            return (
              <div
                key={name}
                style={{
                  padding: "clamp(20px, 2.6vw, 32px) clamp(14px, 1.8vw, 26px)",
                  borderRight: i < audiences.length - 1 ? `1px solid ${c.hairLight}` : undefined,
                  borderBottom: `1px solid ${c.hairLight}`,
                  opacity: o,
                  transform: `translateY(${(1 - o) * 16}px)`,
                }}
              >
                <span style={{ ...micro, color: c.onLightFaint }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ ...statement(1.05, 1.5), marginTop: 10 }}>{name}</h3>
                <p
                  style={{
                    fontFamily: font.serif,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: c.onLightMuted,
                    margin: "12px 0 0",
                  }}
                >
                  {note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- the human moment: cropped, off-grid, deliberately asymmetric --- */}
      <div
        ref={humanRef}
        className="cols"
        style={{
          marginTop: "clamp(64px, 9vw, 130px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 6.4fr) minmax(0, 5.6fr)",
          gap: "clamp(28px, 4vw, 72px)",
          alignItems: "center",
        }}
      >
        <div style={{ transform: `translateY(${(1 - map(hp, 0.1, 0.7, 0, 1)) * 26}px)` }}>
          <MarkedPage p={hp} />
        </div>

        <Enter style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Micro>The work behind the workflow</Micro>
          <h3 style={{ ...statement(1.3, 2.4) }}>
            <span className="mask">
              <span>SOMEONE STILL HAS</span>
            </span>
            <span className="mask">
              <span style={{ transitionDelay: "90ms" }}>TO READ PAGE 41.</span>
            </span>
          </h3>
          <Explain delay={140} style={{ maxWidth: "40ch" }}>
            Renewals are read, annotated and argued over by people. Aurevia's job is to get the
            detail in front of them faster — not to take the decision away.
          </Explain>
          <div className="fade" style={{ transitionDelay: "220ms" }}>
            <Act href="#comparison" variant="brass">
              See what changed
            </Act>
          </div>
        </Enter>
      </div>
    </Scene>
  );
}
