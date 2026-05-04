/**
 * Editorial dark UI — zinc neutrals, one accent (sky), restrained greens/rose for money only.
 */
export const COLORS = {
  background: "#09090b",
  surface: "#18181b",
  surfaceRaised: "#1f1f23",
  surfaceInset: "#27272a",

  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.11)",

  text: "#fafafa",
  textSecondary: "#a1a1aa",
  textTertiary: "#71717a",

  /** Primary interactive — sky (single accent family) */
  accent: "#38bdf8",
  accentMuted: "rgba(56, 189, 248, 0.14)",
  onAccent: "#020617",

  /** Money semantics only */
  positive: "#4ade80",
  positiveMuted: "rgba(74, 222, 128, 0.12)",
  negative: "#f87171",
  negativeMuted: "rgba(248, 113, 113, 0.10)",

  chipInactiveBg: "#27272a",
  overlay: "rgba(0,0,0,0.55)",

  // Legacy aliases (same system — keeps call sites stable)
  card: "#18181b",
  muted: "#71717a",
  mutedLight: "#a1a1aa",
  accentGreen: "#4ade80",
  accentGreenSoft: "rgba(74, 222, 128, 0.12)",
  accentSoft: "rgba(56, 189, 248, 0.14)",
  accentSecondary: "#94a3b8",
  accentSecondarySoft: "rgba(148, 163, 184, 0.12)",
  dangerRed: "#f87171",
  dangerSoft: "rgba(248, 113, 113, 0.10)",
  cardTintMint: "#18181b",
  cardTintPink: "#18181b",
  cardTintSky: "#18181b",
  backgroundLift: "#0f0f12",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 18,
  pill: 999,
} as const;

export const TAB_BAR_FLOAT_HEIGHT = 72;
