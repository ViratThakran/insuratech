/* Aurevia design tokens — quiet, technical, institutional. */

export const c = {
  /* surfaces */
  ink: "#0A0B0D",
  inkRaised: "#101216",
  paper: "#EFEAE0",
  paperRaised: "#F5F1E9",
  sheet: "#FBF9F5",

  /* strokes */
  hairLight: "#D9D2C4",
  hairLightSoft: "#E4DED2",
  hairDark: "#1D2026",
  hairDarkSoft: "#171A1F",

  /* text */
  onDark: "#EFEAE0",
  onDarkMuted: "#8D939E",
  onDarkFaint: "#4E545E",
  onLight: "#0A0B0D",
  onLightMuted: "#5B6068",
  onLightFaint: "#9A9488",

  /* accents — one blue, one amber, used sparingly */
  blue: "#1C3CD6",
  blueLift: "#6E8AF5",
  amber: "#A96A16",
  amberLift: "#D9A05B",
};

export const font = {
  sans: '"Helvetica Neue", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  serif: '"Iowan Old Style", Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
};

/** Level 1 — huge editorial statement. */
export const statement = (min: number, max: number) => ({
  fontFamily: font.sans,
  fontSize: `clamp(${min}rem, ${(max - min) * 2.1 + 2.4}vw, ${max}rem)`,
  lineHeight: 0.9,
  letterSpacing: "-0.04em",
  fontWeight: 600 as const,
  margin: 0,
});

/** Level 2 — small explanation, set in the serif for warmth. */
export const explain = {
  fontFamily: font.serif,
  fontSize: "clamp(1rem, 1.15vw, 1.28rem)",
  lineHeight: 1.6,
  margin: 0,
};

/** Level 3 — technical annotation. */
export const annotation = {
  fontFamily: font.mono,
  fontSize: 11,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  margin: 0,
};

/** Level 4 — micro label. */
export const micro = {
  fontFamily: font.mono,
  fontSize: 9.5,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  margin: 0,
};

export const text = (tone: "dark" | "light" | "paper") =>
  tone === "dark"
    ? { fg: c.onDark, muted: c.onDarkMuted, faint: c.onDarkFaint, hair: c.hairDark, hairSoft: c.hairDarkSoft }
    : { fg: c.onLight, muted: c.onLightMuted, faint: c.onLightFaint, hair: c.hairLight, hairSoft: c.hairLightSoft };

export const surface = (tone: "dark" | "light" | "paper") =>
  tone === "dark" ? c.ink : tone === "paper" ? c.paperRaised : c.paper;

export const shell = 1320;
export const gutter = "clamp(20px, 4.4vw, 64px)";
