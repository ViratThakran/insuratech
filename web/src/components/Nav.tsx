import { useState } from "react";
import { c, eyebrow, font, maxW } from "../theme";
import { useScrollProgress } from "../hooks/useReveal";

export function Mark({ tone = "light", size = 18 }: { tone?: "light" | "dark"; size?: number }) {
  const fg = tone === "dark" ? c.ivory : c.ink;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden style={{ display: "block" }}>
        <circle cx="10" cy="10" r="9" fill="none" stroke={fg} strokeWidth="1" />
        <path d="M2 14 C 7 14, 8 7, 18 6" fill="none" stroke={c.blue} strokeWidth="1.4" />
        <circle cx="10" cy="10" r="2.6" fill={c.blue} />
      </svg>
      <span
        style={{
          fontFamily: font.sans,
          fontWeight: 700,
          letterSpacing: "0.26em",
          fontSize: 13,
          color: fg,
        }}
      >
        AUREVIA
      </span>
    </span>
  );
}

const links = [
  ["Solutions", "#solutions"],
  ["Document AI", "#document-ai"],
  ["Risk", "#risk"],
  ["Voice AI", "#voice"],
  ["About", "#about"],
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useScrollProgress((y) => setSolid(y > 40));

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: solid ? "rgba(244,240,232,0.92)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: `1px solid ${solid ? c.line : "transparent"}`,
        transition: "background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: "14px clamp(20px, 5vw, 56px)",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <a href="#top" style={{ textDecoration: "none" }} aria-label="Aurevia home">
          <Mark />
        </a>

        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: 26, marginLeft: "auto" }}
        >
          {links.map(([label, href]) => (
            <a key={label} href={href} className="navlink" style={{ ...eyebrow, color: c.body }}>
              {label}
            </a>
          ))}
          <a href="#talk" className="navlink" style={{ ...eyebrow, color: c.ink, fontWeight: 700 }}>
            Talk to us
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          style={{
            display: "none",
            marginLeft: "auto",
            background: "none",
            border: `1px solid ${c.line}`,
            padding: "8px 12px",
            ...eyebrow,
            color: c.ink,
            cursor: "pointer",
          }}
          className="nav-toggle"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          className="nav-panel"
          style={{
            borderTop: `1px solid ${c.line}`,
            background: c.ivory,
            padding: "16px clamp(20px, 5vw, 56px) 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[...links, ["Talk to us", "#talk"]].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ ...eyebrow, color: c.ink, textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ background: c.ink, color: c.bodyDark, borderTop: `1px solid ${c.lineDark}` }}>
      <div
        style={{
          maxWidth: maxW,
          margin: "0 auto",
          padding: "40px clamp(20px, 5vw, 56px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Mark tone="dark" />
        <span style={{ ...eyebrow, color: c.bodyDark }}>AI &amp; Intelligence for Insurance</span>
        <span style={{ ...eyebrow, color: c.bodyDark, marginLeft: "auto", maxWidth: "46ch", opacity: 0.8 }}>
          Aurevia is a technology company building AI solutions for the insurance ecosystem. It is
          not an insurer, broker or reinsurer. Product interfaces shown are illustrative.
        </span>
      </div>
    </footer>
  );
}
