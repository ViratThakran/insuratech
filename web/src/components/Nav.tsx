import { useState } from "react";
import { c, font, micro, shell, gutter } from "../theme";
import { useActiveScene, useScrollY } from "../lib/scroll";

const links = [
  ["Solutions", "#solutions"],
  ["Document AI", "#document-ai"],
  ["Risk", "#risk"],
  ["Voice", "#voice"],
  ["Platform", "#platform"],
];

export function Mark({ fg }: { fg: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden style={{ display: "block", overflow: "visible" }}>
        <rect x="0.5" y="0.5" width="15" height="15" fill="none" stroke={fg} strokeOpacity="0.45" />
        <path d="M1 12 C 6 12, 6 4, 15 4" fill="none" stroke={c.blue} strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2" fill={c.blue} />
      </svg>
      <span
        style={{
          fontFamily: font.sans,
          fontWeight: 700,
          letterSpacing: "0.3em",
          fontSize: 12,
          color: fg,
        }}
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

  const dark = scene.tone === "dark";
  const fg = dark ? c.onDark : c.onLight;
  const faint = dark ? c.onDarkFaint : c.onLightFaint;
  const veil = y > 40 ? (dark ? "rgba(10,11,13,0.72)" : "rgba(239,234,224,0.78)") : "transparent";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          color: fg,
          background: veil,
          backdropFilter: y > 40 ? "blur(12px) saturate(1.1)" : "none",
          transition: "color 0.6s linear, background-color 0.5s linear",
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
          <a href="#opening" aria-label="Aurevia — home">
            <Mark fg={fg} />
          </a>

          {/* which scene the visitor is standing in */}
          <span
            className="hide-md"
            style={{ ...micro, color: faint, display: "inline-flex", gap: 10, alignItems: "center" }}
          >
            <span aria-hidden style={{ width: 22, height: 1, background: "currentColor", opacity: 0.6 }} />
            {scene.index} {scene.label && `— ${scene.label}`}
          </span>

          <div
            className="hide-md"
            style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}
          >
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
            aria-label="Menu"
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
          {[...links, ["Talk to us", "#talk"]].map(([label, href], i) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: font.sans,
                fontSize: "clamp(1.6rem, 9vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
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

export function Footer() {
  return (
    <footer
      style={{
        background: c.ink,
        color: c.onDarkMuted,
        borderTop: `1px solid ${c.hairDark}`,
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: shell,
          margin: "0 auto",
          padding: `44px ${gutter}`,
          display: "grid",
          gridTemplateColumns: "minmax(0, 4fr) minmax(0, 3fr) minmax(0, 5fr)",
          gap: "clamp(20px, 3vw, 48px)",
          alignItems: "start",
        }}
        className="cols"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Mark fg={c.onDark} />
          <span style={{ ...micro, color: c.onDarkFaint }}>AI &amp; Intelligence for Insurance</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-item" style={{ ...micro, color: c.onDarkMuted }}>
              {label}
            </a>
          ))}
        </div>

        <p style={{ ...micro, color: c.onDarkFaint, lineHeight: 2, maxWidth: "52ch", margin: 0 }}>
          Aurevia is a technology company building AI solutions for the insurance ecosystem. It is
          not an insurer, broker or reinsurer. Documents, dashboards, values and conversations shown
          on this site are fictional illustrations, not customer data or performance claims.
        </p>
      </div>
    </footer>
  );
}
