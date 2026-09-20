import { useState } from "react";
import { c, font, gutter, micro, shell } from "../theme";
import { useActiveScene, useScrollY } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * NAVIGATION — minimal and tone-adaptive. It inverts itself against    *
 * whichever scene owns the top of the viewport, and says nothing else. *
 * ------------------------------------------------------------------ */

const links: [string, string][] = [
  ["Document AI", "#document-ai"],
  ["Risk", "#risk"],
  ["Intelligence", "#intelligence"],
];

export function Mark({ fg }: { fg: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden style={{ display: "block", overflow: "visible" }}>
        <rect x="0.5" y="0.5" width="15" height="15" fill="none" stroke={fg} strokeOpacity="0.4" />
        <path d="M1 12 C 6 12, 6 4, 15 4" fill="none" stroke={c.blue} strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2" fill={c.blue} />
      </svg>
      <span
        style={{ fontFamily: font.sans, fontWeight: 700, letterSpacing: "0.3em", fontSize: 12, color: fg }}
      >
        AUREVIA
      </span>
    </span>
  );
}

export function Nav() {
  const scene = useActiveScene();
  const y = useScrollY();
  const [open, setOpen] = useState(false);

  const dark = scene.tone === "dark" || scene.tone === "charcoal";
  const fg = dark ? c.onDark : c.onLight;
  const veil = y > 40 ? (dark ? "rgba(10,11,13,0.66)" : "rgba(241,238,229,0.74)") : "transparent";

  return (
    <>
      <a className="skip" href="#world">
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          color: fg,
          background: veil,
          backdropFilter: y > 40 ? "blur(14px) saturate(1.08)" : "none",
          transition: "color 0.7s linear, background-color 0.5s linear",
        }}
      >
        <div
          style={{
            maxWidth: shell,
            margin: "0 auto",
            padding: `16px ${gutter}`,
            display: "flex",
            alignItems: "center",
            gap: 26,
          }}
        >
          <a href="#world" aria-label="Aurevia — home">
            <Mark fg={fg} />
          </a>

          <div className="hide-md" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="nav-item"
                data-active={`#${scene.id}` === href}
                style={{ ...micro, color: fg }}
              >
                {label}
              </a>
            ))}
            <a href="#talk" className="nav-item" style={{ ...micro, color: fg, opacity: 1 }}>
              Talk to us →
            </a>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="hide-lg"
            style={{
              marginLeft: "auto",
              background: "none",
              border: 0,
              padding: "6px 0",
              cursor: "pointer",
              ...micro,
              color: fg,
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 59,
            background: c.ink,
            color: c.onDark,
            padding: `96px ${gutter} ${gutter}`,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[...links, ["Talk to us", "#talk"] as [string, string]].map(([label, href], i) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: font.sans,
                fontSize: "clamp(1.6rem, 9vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                padding: "14px 0",
                borderBottom: `1px solid ${c.hairDark}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              {label.toUpperCase()}
              <span style={{ ...micro, color: c.onDarkFaint }}>{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * FOOTER — kept deliberately plain.                                   *
 * ------------------------------------------------------------------ */
const footLinks: [string, string][] = [
  ["Document AI", "#document-ai"],
  ["Risk Intelligence", "#risk"],
  ["Intelligence layer", "#intelligence"],
  ["Contact", "mailto:hello@aurevia.ai"],
];

export function Footer() {
  return (
    <footer
      className="mat"
      data-tone="dark"
      style={{
        position: "relative",
        background: c.ink,
        color: c.onDarkMuted,
        borderTop: `1px solid ${c.hairDark}`,
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: shell,
          margin: "0 auto",
          padding: `clamp(40px, 5vw, 64px) ${gutter} 24px`,
        }}
      >
        <div
          className="cols"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 4fr) minmax(0, 8fr)",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Mark fg={c.onDark} />
            <span style={{ ...micro, color: c.onDarkFaint }}>AI &amp; Intelligence for Insurance</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px clamp(20px, 3vw, 44px)",
              justifyContent: "flex-start",
            }}
          >
            {footLinks.map(([label, href]) => (
              <a key={label} href={href} className="nav-item" style={{ ...micro, color: c.onDark, opacity: 0.68 }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(28px, 4vw, 48px)",
            paddingTop: 16,
            borderTop: `1px solid ${c.hairDark}`,
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 24px",
            alignItems: "baseline",
          }}
        >
          <span style={{ ...micro, color: c.onDarkFaint }}>Aurevia / intelligence system</span>
          <span style={{ ...micro, color: c.onDarkFaint, marginLeft: "auto", maxWidth: "58ch", lineHeight: 1.9 }}>
            A technology company building AI solutions for the insurance ecosystem — not an insurer,
            broker or reinsurer. Documents, interfaces and values shown here are fictional.
          </span>
        </div>
      </div>
    </footer>
  );
}
