import { useState } from "react";
import { c, display, eyebrow } from "../theme";
import { Eyebrow, Lede, Reveal, Section, StatusTag } from "../components/primitives";
import { DocumentAIDashboard } from "../components/Dashboard";
import { useScrollProgress } from "../hooks/useReveal";

const steps = ["UPLOAD.", "UNDERSTAND.", "COMPARE."];

export function DocumentAI() {
  const [scale, setScale] = useState(0.965);

  useScrollProgress(() => {
    const el = document.getElementById("doc-stage");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = 1 - Math.min(Math.max(r.top / window.innerHeight, 0), 1);
    setScale(0.965 + p * 0.035);
  });

  return (
    <Section id="document-ai" tone="dark" pad="clamp(96px, 12vw, 160px)">
      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Reveal>
            <Eyebrow tone="dark">05 — Product deep dive</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ ...display(2.2, 4.6), color: c.ivory }}>
              <span style={{ display: "block" }}>MEET AUREVIA</span>
              <span style={{ display: "block", color: c.blueSoft }}>DOCUMENT AI.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <StatusTag status="available" tone="dark" />
          </Reveal>
        </div>

        <Reveal delay={180}>
          <Lede tone="dark">
            Insurance documents contain critical information. Finding, structuring and comparing
            that information shouldn't require repetitive manual work.
          </Lede>
        </Reveal>
      </div>

      {/* UPLOAD. UNDERSTAND. COMPARE. */}
      <div
        style={{
          marginTop: "clamp(48px, 7vw, 88px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(16px, 4vw, 56px)",
          alignItems: "baseline",
        }}
      >
        {steps.map((s, i) => (
          <Reveal key={s} delay={i * 130}>
            <span style={{ ...display(1.8, 3.4), color: i === 2 ? c.blueSoft : c.ivory }}>{s}</span>
          </Reveal>
        ))}
      </div>

      {/* dashboard stage */}
      <div
        id="doc-stage"
        style={{
          marginTop: "clamp(56px, 6vw, 72px)",
          position: "relative",
        }}
      >
        <div
          aria-hidden
          className="hide-sm"
          style={{
            position: "absolute",
            inset: "-6% -4% auto -4%",
            height: "62%",
            border: `1px solid ${c.lineDark}`,
            borderBottom: "none",
          }}
        />
        <Reveal>
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center top",
              willChange: "transform",
            }}
          >
            <DocumentAIDashboard />
          </div>
        </Reveal>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 28px",
            ...eyebrow,
            color: c.bodyDark,
          }}
        >
          {["Documents", "Processing", "Comparison", "Insights", "Recent documents"].map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden style={{ width: 5, height: 5, background: c.blueSoft }} />
              {t}
            </span>
          ))}
          <span style={{ color: c.amberSoft, marginLeft: "auto" }}>
            Illustrative interface — example data, not customer data
          </span>
        </div>
      </div>
    </Section>
  );
}
