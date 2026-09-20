import { useState } from "react";
import { c, display, eyebrow, font, maxW } from "../theme";
import { Button, Lede } from "../components/primitives";
import { HeroSignal } from "../components/visuals";
import { useScrollProgress } from "../hooks/useReveal";

export function Hero() {
  const [y, setY] = useState(0);
  useScrollProgress(setY);
  const damp = Math.min(y, 600);

  return (
    <header
      id="top"
      style={{
        background: c.ivory,
        borderBottom: `1px solid ${c.line}`,
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(120px, 16vh, 190px)",
        paddingBottom: "clamp(72px, 10vw, 128px)",
      }}
    >
      <div
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 0.92fr)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}
        className="grid-2"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 38px)" }}>
          <div className="reveal is-in" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
            <span style={{ ...eyebrow, fontWeight: 700, fontSize: 12, color: c.ink }}>AUREVIA</span>
            <span aria-hidden style={{ width: 28, height: 1, background: c.blue }} />
            <span style={{ ...eyebrow, color: c.body }}>AI &amp; Intelligence for Insurance</span>
          </div>

          <h1
            className="reveal is-in"
            style={{ ...display(2.1, 5.4), transitionDelay: "120ms" }}
          >
            <span style={{ display: "block" }}>WE TURN BUSINESS RISK</span>
            <span style={{ display: "block" }}>
              INTO{" "}
              <span
                style={{
                  color: c.blue,
                  fontFamily: font.serif,
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                }}
              >
                intelligence
              </span>
              .
            </span>
          </h1>

          <div className="reveal is-in" style={{ transitionDelay: "240ms" }}>
            <Lede>
              Aurevia builds AI-powered solutions that help insurers, brokers and risk
              professionals understand information, automate workflows and work with risk more
              intelligently.
            </Lede>
          </div>

          <div
            className="reveal is-in"
            style={{ display: "flex", flexWrap: "wrap", gap: 14, transitionDelay: "340ms" }}
          >
            <Button href="#talk">Talk to Aurevia</Button>
            <Button href="#solutions" variant="ghost">
              Explore solutions
            </Button>
          </div>
        </div>

        <div
          className="reveal is-in"
          style={{
            position: "relative",
            transitionDelay: "160ms",
            minHeight: "clamp(240px, 42vw, 440px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HeroSignal shift={damp * -0.06} />
        </div>
      </div>

      {/* scroll ledger */}
      <div
        style={{
          maxWidth: maxW,
          margin: "clamp(48px, 7vw, 96px) auto 0",
          padding: "0 clamp(20px, 5vw, 56px)",
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${c.line}`,
            paddingTop: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: "18px 40px",
            ...eyebrow,
            color: c.body,
          }}
        >
          <span>Document AI</span>
          <span style={{ color: c.line }}>/</span>
          <span>Risk Intelligence</span>
          <span style={{ color: c.line }}>/</span>
          <span>Voice AI</span>
          <span style={{ marginLeft: "auto" }} className="hide-sm">
            Scroll ↓
          </span>
        </div>
      </div>
    </header>
  );
}
