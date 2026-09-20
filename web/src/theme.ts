/* ==========================================================================
   AUREVIA — design tokens
   A restrained system: ~90% ink/bone/paper, 7% blue, 2% brass, 1% semantic.
   Colour carries meaning; it is never decoration.
   ========================================================================== */

export const c = {
  /* surfaces */
  ink: "#090B0E",
  charcoal: "#15171B",
  bone: "#F2EFE7",
  paper: "#E7E2D8",
  sheet: "#FBF9F4",

  /* strokes */
  hairLight: "#D5CFC0",
  hairLightSoft: "#E1DBCD",
  hairDark: "#212429",
  hairDarkSoft: "#191C20",

  /* text */
  onDark: "#F2EFE7",
  onDarkMuted: "#8F959F",
  onDarkFaint: "#50565F",
  onLight: "#090B0E",
  onLightMuted: "#565B63",
  onLightFaint: "#928C7F",

  /* AUREVIA COBALT — the company, intelligence, the active system.
     Never used merely because something is interactive. */
  blue: "#4F63FF",
  blueLift: "#7184FF",
  blueSoft: "#6376FF",

  /* OXIDIZED COPPER — change, attention, comparison */
  brass: "#9C6A3A",
  brassLift: "#B47C45",
  amber: "#B47C45",

  /* SOFT SAGE — processed, stable, confirmed */
  green: "#69856F",
  greenLift: "#7D9984",

  /* MUTED WINE — issue, elevated, exception */
  red: "#8E4F55",
  redLift: "#A45D63",

  /* voice keeps a trace of its own so the room is not another cobalt scene */
  violet: "#6F62B8",
  violetLift: "#9186D6",
};

/** What a colour means, so scenes stay consistent. */
export const meaning = {
  aurevia: c.blue,
  aureviaOnDark: c.blueLift,
  change: c.brass,
  changeOnDark: c.brassLift,
  stable: c.green,
  stableOnDark: c.greenLift,
  elevated: c.red,
  elevatedOnDark: c.redLift,
  voice: c.violet,
  voiceOnDark: c.violetLift,
};

export const font = {
  sans: '"Helvetica Neue", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  serif: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
};

/* ---------- five typographic levels ---------- */

/** 1 — DISPLAY: the statement. */
export const statement = (min: number, max: number) => ({
  fontFamily: font.sans,
  fontSize: `clamp(${min}rem, ${(max - min) * 2.1 + 2.4}vw, ${max}rem)`,
  lineHeight: 0.9,
  letterSpacing: "-0.042em",
  fontWeight: 600 as const,
  margin: 0,
});

/** 2 — EDITORIAL: the serif voice, used sparingly. */
export const editorial = (min: number, max: number) => ({
  fontFamily: font.serif,
  fontSize: `clamp(${min}rem, ${(max - min) * 2.1 + 2.4}vw, ${max}rem)`,
  lineHeight: 0.96,
  letterSpacing: "-0.02em",
  fontStyle: "italic" as const,
  fontWeight: 400 as const,
  margin: 0,
});

/** 3 — BODY: the explanation. */
export const body = {
  fontFamily: font.serif,
  fontSize: "clamp(1rem, 1.12vw, 1.26rem)",
  lineHeight: 1.62,
  letterSpacing: "0.002em",
  margin: 0,
};

/** 4 — SYSTEM LABEL: technical annotation. */
export const annotation = {
  fontFamily: font.mono,
  fontSize: 11,
  lineHeight: 1.55,
  letterSpacing: "0.145em",
  textTransform: "uppercase" as const,
  margin: 0,
};

/** 5 — MICRO LABEL. */
export const micro = {
  fontFamily: font.mono,
  fontSize: 9.5,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  margin: 0,
};

export type Tone = "dark" | "charcoal" | "bone" | "paper";

export const text = (tone: Tone) =>
  tone === "dark" || tone === "charcoal"
    ? {
        fg: c.onDark,
        muted: c.onDarkMuted,
        faint: c.onDarkFaint,
        hair: c.hairDark,
        hairSoft: c.hairDarkSoft,
        accent: c.blueLift,
        change: c.brassLift,
        dark: true,
      }
    : {
        fg: c.onLight,
        muted: c.onLightMuted,
        faint: c.onLightFaint,
        hair: c.hairLight,
        hairSoft: c.hairLightSoft,
        accent: c.blue,
        change: c.brass,
        dark: false,
      };

export const surface = (tone: Tone) =>
  tone === "dark" ? c.ink : tone === "charcoal" ? c.charcoal : tone === "paper" ? c.paper : c.bone;

export const shell = 1320;
export const gutter = "clamp(20px, 4.4vw, 64px)";
