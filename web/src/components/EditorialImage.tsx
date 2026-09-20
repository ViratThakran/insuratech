import type { CSSProperties } from "react";
import { c, micro } from "../theme";

/* ==========================================================================
   EDITORIAL IMAGE — the physical world.
   ==========================================================================
   Aurevia works on real buildings, fleets, warehouses and paper. These plates
   carry that world into the page.

   PHOTOGRAPHY SLOT
   ----------------
   Pass `src` and the plate renders the photograph instead, with the same
   duotone/grain treatment, crop and frame:

       <EditorialImage kind="facade" src="/images/facade.jpg" alt="…" />

   Until art-directed photography is supplied, each plate renders an authored
   duotone composition of the same subject — drawn, not pretending to be a
   photograph, and replaceable one file at a time.
   ========================================================================== */

export type PlateKind = "facade" | "warehouse" | "macro" | "workspace";

const caption: Record<PlateKind, string> = {
  facade: "Commercial property · insured asset",
  warehouse: "Logistics structure · schedule of assets",
  macro: "Policy wording · page detail",
  workspace: "Renewal review · desk",
};

/* ----------------------------- the plates ----------------------------- */

function Facade({ dark }: { dark: boolean }) {
  const rows = 9;
  const cols = 14;
  const fg = dark ? c.bone : c.ink;
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <rect width="560" height="420" fill={dark ? c.charcoal : c.paper} />
      {/* facade slab, slightly skewed so it reads as a photographed elevation */}
      <g transform="translate(-30 -14) skewY(2.2)">
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, i) => {
            /* deterministic "light" per window */
            const n = Math.abs(Math.sin(r * 12.9898 + i * 78.233) * 43758.5453) % 1;
            const lit = n > 0.72;
            const half = n > 0.55 && n <= 0.72;
            return (
              <rect
                key={`${r}-${i}`}
                x={18 + i * 44}
                y={16 + r * 46}
                width={30}
                height={30}
                fill={fg}
                opacity={lit ? 0.5 : half ? 0.22 : 0.075}
              />
            );
          })
        )}
        {/* structural bands */}
        {Array.from({ length: rows }, (_, r) => (
          <rect key={r} x="0" y={12 + r * 46} width="620" height="1.5" fill={fg} opacity="0.13" />
        ))}
      </g>
      {/* light falling across the elevation */}
      <rect width="560" height="420" fill="url(#fade)" />
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={dark ? "#000" : "#fff"} stopOpacity={dark ? 0.55 : 0.35} />
          <stop offset="55%" stopColor={dark ? "#000" : "#fff"} stopOpacity="0" />
          <stop offset="100%" stopColor={dark ? "#000" : "#000"} stopOpacity={dark ? 0.7 : 0.18} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Warehouse({ dark }: { dark: boolean }) {
  const fg = dark ? c.bone : c.ink;
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <rect width="560" height="420" fill={dark ? c.ink : c.paper} />
      {/* roof trusses receding to a vanishing point */}
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        const x = 30 + t * 520;
        const top = 60 + t * 90;
        const bottom = 400 - t * 40;
        return (
          <g key={i} opacity={0.5 - t * 0.3}>
            <rect x={x} y={top} width="2" height={bottom - top} fill={fg} />
            <path d={`M ${x} ${top} L ${x + 52} ${top - 26} L ${x + 104} ${top}`} fill="none" stroke={fg} strokeWidth="1.4" />
          </g>
        );
      })}
      {/* floor + high windows */}
      <rect x="0" y="392" width="560" height="1.5" fill={fg} opacity="0.35" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={40 + i * 76} y={24} width={44} height={16} fill={fg} opacity={0.16 + (i % 3) * 0.1} />
      ))}
      <rect width="560" height="420" fill="url(#wfade)" />
      <defs>
        <linearGradient id="wfade" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={dark ? "#000" : "#fff"} stopOpacity={dark ? 0.1 : 0.45} />
          <stop offset="70%" stopColor="#000" stopOpacity={dark ? 0.6 : 0.12} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Macro({ dark }: { dark: boolean }) {
  const fg = dark ? c.bone : c.ink;
  const lines = [0.92, 0.78, 0.96, 0.64, 0.88, 0.5, 0.94, 0.72, 0.86, 0.42];
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <rect width="560" height="420" fill={dark ? c.charcoal : c.sheet} />
      {/* type at macro scale, broken into words, rotated as if on a desk */}
      <g transform="rotate(-2.4 280 210) translate(-20 30)">
        {lines.map((w, i) => {
          /* deterministic word runs so each line reads as language, not a bar */
          const words: number[] = [];
          let used = 0;
          let k = 0;
          while (used < 520 * w) {
            const n = Math.abs(Math.sin(i * 7.7 + k * 3.3)) ;
            const len = 26 + n * 86;
            words.push(len);
            used += len + 11;
            k++;
          }
          return (
            <g key={i}>
              {words.map((len, j) => {
                const x = 26 + words.slice(0, j).reduce((a, b) => a + b + 11, 0);
                return (
                  <g key={j}>
                    <rect x={x} y={i * 38} width={len} height="8" fill={fg} opacity={0.46} rx="1" />
                    <rect
                      x={x}
                      y={i * 38 + 14}
                      width={len * 0.86}
                      height="8"
                      fill={fg}
                      opacity={0.24}
                      rx="1"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* the clause under the lens */}
        <rect x="26" y={4 * 38 - 6} width={520 * 0.88} height="26" fill={c.blue} opacity="0.13" />
        <rect x="26" y={4 * 38 + 21} width={520 * 0.88} height="1.5" fill={c.blue} opacity="0.5" />
      </g>
      {/* page edge and the shadow it throws */}
      <rect x="0" y="0" width="14" height="420" fill={dark ? c.ink : c.paper} />
      <rect x="14" y="0" width="16" height="420" fill="#000" opacity={dark ? 0.5 : 0.12} />
      <rect width="560" height="420" fill="url(#mfade)" />
      <defs>
        <linearGradient id="mfade" x1="0.2" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={dark ? 0.72 : 0.22} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Workspace({ dark }: { dark: boolean }) {
  const fg = dark ? c.bone : c.ink;
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <rect width="560" height="420" fill={dark ? c.charcoal : c.paper} />
      {/* papers on a desk, overlapping at human angles */}
      {[
        { x: 40, y: 60, r: -6, w: 250, h: 320, o: 0.9 },
        { x: 200, y: 96, r: 4, w: 260, h: 300, o: 1 },
        { x: 330, y: 40, r: -2, w: 200, h: 150, o: 0.85 },
      ].map((s, i) => (
        <g key={i} transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`} opacity={s.o}>
          <rect x={s.x + 5} y={s.y + 7} width={s.w} height={s.h} fill="#000" opacity={dark ? 0.5 : 0.14} />
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={dark ? "#1C1F24" : c.sheet} stroke={dark ? c.hairDark : c.hairLight} />
          {Array.from({ length: Math.floor(s.h / 26) }, (_, k) => (
            <rect
              key={k}
              x={s.x + 18}
              y={s.y + 26 + k * 26}
              width={(s.w - 42) * (k % 4 === 3 ? 0.55 : 0.92)}
              height="3"
              fill={fg}
              opacity={0.2}
            />
          ))}
        </g>
      ))}
      {/* a pen laid across the top sheet, and the mark it left */}
      <rect x="250" y="300" width="170" height="5" rx="2.5" fill={fg} opacity="0.55" transform="rotate(-14 335 302)" />
      <rect x="262" y="236" width="120" height="8" fill={c.brass} opacity="0.35" transform="rotate(4 322 240)" />
      <rect width="560" height="420" fill="url(#sfade)" />
      <defs>
        <linearGradient id="sfade" x1="0.5" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={dark ? "#000" : "#fff"} stopOpacity={dark ? 0.15 : 0.3} />
          <stop offset="100%" stopColor="#000" stopOpacity={dark ? 0.65 : 0.2} />
        </linearGradient>
      </defs>
    </svg>
  );
}

const plates = { facade: Facade, warehouse: Warehouse, macro: Macro, workspace: Workspace };

export function EditorialImage({
  kind,
  src,
  alt,
  dark = false,
  ratio = "4 / 3",
  showCaption = true,
  style,
}: {
  kind: PlateKind;
  /** drop in art-directed photography here; the treatment stays the same */
  src?: string;
  alt?: string;
  dark?: boolean;
  ratio?: string;
  showCaption?: boolean;
  style?: CSSProperties;
}) {
  const Plate = plates[kind];
  return (
    <figure style={{ margin: 0, position: "relative", ...style }}>
      <div
        className="mat"
        data-tone={dark ? "dark" : "light"}
        role={src ? undefined : "img"}
        aria-label={src ? undefined : alt ?? caption[kind]}
        style={{
          position: "relative",
          aspectRatio: ratio,
          overflow: "hidden",
          background: dark ? c.ink : c.paper,
          boxShadow: dark
            ? "0 50px 90px -60px rgba(0,0,0,0.9)"
            : "0 44px 80px -60px rgba(9,11,14,0.5)",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? caption[kind]}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(1) contrast(1.12) brightness(0.98)",
            }}
          />
        ) : (
          <Plate dark={dark} />
        )}
      </div>

      {showCaption && (
        <figcaption
          style={{
            ...micro,
            fontSize: 8.5,
            color: dark ? c.onDarkFaint : c.onLightFaint,
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span>{alt ?? caption[kind]}</span>
          <span>{src ? "" : "plate"}</span>
        </figcaption>
      )}
    </figure>
  );
}
