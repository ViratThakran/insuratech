export const c = {
  ivory: "#F4F0E8",
  ivoryDeep: "#EBE5D9",
  ink: "#0B0D10",
  inkSoft: "#15181D",
  line: "#D8D1C2",
  lineDark: "#23272E",
  body: "#4A4F58",
  bodyDark: "#A2A8B2",
  blue: "#1B3FD1",
  blueSoft: "#5C79E8",
  amber: "#B5701C",
  amberSoft: "#E0A253",
};

export const font = {
  sans: '"Helvetica Neue", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", "Iowan Old Style", serif',
  mono: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
};

/** Oversized editorial display type. */
export const display = (min: number, max: number) => ({
  fontFamily: font.sans,
  fontSize: `clamp(${min}rem, ${((max - min) / 10) * 1.6 + 3}vw, ${max}rem)`,
  lineHeight: 0.94,
  letterSpacing: "-0.035em",
  fontWeight: 600 as const,
  margin: 0,
  textWrap: "balance" as const,
});

export const eyebrow = {
  fontFamily: font.mono,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  margin: 0,
};

export const lede = {
  fontFamily: font.serif,
  fontSize: "clamp(1.05rem, 1.35vw, 1.4rem)",
  lineHeight: 1.55,
  margin: 0,
};

export const maxW = 1240;
