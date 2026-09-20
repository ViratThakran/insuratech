import { useEffect, useState, type CSSProperties } from "react";
import { assets, type AssetKey } from "../assets";
import { c, font, micro } from "../theme";

/* ==========================================================================
   PLATE — an art-direction slot for one of the four assets.
   Renders the asset if the file exists, otherwise an honest reservation.
   ========================================================================== */

function useAsset(src: string) {
  const [state, setState] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setState("ready");
    img.onerror = () => alive && setState("missing");
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  return state;
}

/** The reservation shown until the photography lands. */
function Reservation({ slot, note, dark, silent }: { slot: string; note: string; dark: boolean; silent: boolean }) {
  const line = dark ? "rgba(242,239,231,0.20)" : "rgba(9,11,14,0.18)";
  const text = dark ? c.onDarkFaint : c.onLightFaint;
  const mark = 22;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: dark ? c.ink : c.paper,
        display: "flex",
        alignItems: "flex-end",
        padding: "clamp(16px, 2.4vw, 32px)",
      }}
    >
      {/* crop marks, as on a layout board */}
      {[
        { top: 14, left: 14, bt: 1, bl: 1 },
        { top: 14, right: 14, bt: 1, br: 1 },
        { bottom: 14, left: 14, bb: 1, bl: 1 },
        { bottom: 14, right: 14, bb: 1, br: 1 },
      ].map((p, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            width: mark,
            height: mark,
            borderTop: p.bt ? `1px solid ${line}` : undefined,
            borderBottom: p.bb ? `1px solid ${line}` : undefined,
            borderLeft: p.bl ? `1px solid ${line}` : undefined,
            borderRight: p.br ? `1px solid ${line}` : undefined,
          }}
        />
      ))}

      {!silent && (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ ...micro, color: text }}>{slot}</span>
        <span
          style={{
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 1.5vw, 1.3rem)",
            color: text,
            maxWidth: "26ch",
            lineHeight: 1.35,
          }}
        >
          {note}
        </span>
      </div>
      )}
    </div>
  );
}

export function Plate({
  asset,
  dark = true,
  /** object-position, so the same frame can be cropped differently per scene */
  position = "50% 50%",
  scale = 1,
  /** for banded/repeated use: render the ground and crop marks, but no label */
  silent = false,
  className,
  style,
  children,
}: {
  asset: AssetKey;
  dark?: boolean;
  position?: string;
  scale?: number;
  silent?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  const a = assets[asset];
  const state = useAsset(a.src);

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", background: dark ? c.ink : c.paper, ...style }}
    >
      {state === "ready" ? (
        <img
          src={a.src}
          alt={a.alt}
          loading={asset === "world" ? "eager" : "lazy"}
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position,
            transform: `scale(${scale})`,
            filter: "grayscale(1) contrast(1.1) brightness(0.96)",
          }}
        />
      ) : (
        <Reservation slot={a.slot} note={a.note} dark={dark} silent={silent} />
      )}

      {/* grade: keeps type legible over any photograph that lands here */}
      {state === "ready" && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: dark
              ? "linear-gradient(to bottom, rgba(8,10,13,0.62), rgba(8,10,13,0.30) 45%, rgba(8,10,13,0.86))"
              : "linear-gradient(to bottom, rgba(242,239,231,0.18), rgba(242,239,231,0.55))",
          }}
        />
      )}

      {children}
    </div>
  );
}
