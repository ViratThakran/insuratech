import { c, font, micro, statement } from "../theme";
import { Enter, Explain, Micro, Scene, Statement } from "../components/kit";
import { map, useStageProgress } from "../lib/scroll";

/* Repetitive document work clears away; the people remain. */
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

export function People() {
  const [ref, p] = useStageProgress<HTMLDivElement>({ start: 0.72, end: 0.1 });
  const clear = map(p, 0.12, 0.66, 0, 1);
  const arrive = map(p, 0.5, 1, 0, 1);

  return (
    <Scene id="people" index="08" label="People" tone="paper">
      <Enter>
        <div className="cols c-7-5" style={{ alignItems: "start" }}>
          <div>
            <Micro>08 / 11 — People</Micro>
            <Statement
              min={1.7}
              max={3.6}
              style={{ marginTop: 22 }}
              lines={[
                { t: "LESS MANUAL" },
                { t: "REVIEW." },
                { t: "MORE TIME FOR THE WORK" },
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

        {/* audiences emerge out of the cleared space */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 0,
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
    </Scene>
  );
}
