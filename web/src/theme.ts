/* ==========================================================================
   AUREVIA — design tokens
   A restrained system: ~90% ink/bone/paper, 7% blue, 2% brass, 1% semantic.
   Colour carries meaning; it is never decoration.
   ========================================================================== */

export const c = {
  /* surfaces */
  ink: "#0A0B0D",
  charcoal: "#111315",
  bone: "#F1EEE5",
  paper: "#E8E4DA",
  sheet: "#FAF8F3",

  /* strokes */
  hairLight: "#D7D1C2",
  hairLightSoft: "#E2DCCF",
  hairDark: "#1E2126",
  hairDarkSoft: "#171A1E",

  /* text */
  onDark: "#F1EEE5",
  onDarkMuted: "#8E949E",
  onDarkFaint: "#4F555E",
  onLight: "#0A0B0D",
  onLightMuted: "#575C64",
  onLightFaint: "#938D80",

  /* AUREVIA BLUE — the company, intelligence, the active state */
  blue: "#4155E8",
  blueLift: "#7887FF",
  blueSoft: "#5D6FF2",

  /* BRASS — change, attention, review */
  brass: "#A97C33",
  brassLift: "#C99A58",
  amber: "#B98446",

  /* semantic state — used once or twice, never as decoration */
  green: "#4E7A63",
  greenLift: "#6E9B83",
  red: "#9E4F4F",
  redLift: "#B95F5F",

  /* voice carries a whisper of violet so it is not "another blue scene" */
  violet: "#6A5AC6",
  violetLift: "#9B8DE0",
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
