/** XP needed per level band (level 1 starts at 0 XP). */
const XP_PER_LEVEL = 120;

export type AchievementId =
  | "first_boost"
  | "saver_100"
  | "planner"
  | "on_a_roll"
  | "week_warrior"
  | "rising_star"
  | "veteran";

export interface AchievementDef {
  id: AchievementId;
  title: string;
  description: string;
  /** Ionicons glyph name */
  ion: string;
}

export interface GamificationSnapshot {
  totalXp: number;
  contributionCount: number;
  lifetimeContributed: number;
  goalsCreatedCount: number;
  checkInStreak: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "first_boost",
    title: "First boost",
    description: "Added savings to a goal.",
    ion: "rocket-outline",
  },
  {
    id: "saver_100",
    title: "Century club",
    description: "Contributed $100+ to goals in total.",
    ion: "trophy-outline",
  },
  {
    id: "planner",
    title: "Planner",
    description: "Created a savings goal.",
    ion: "flag-outline",
  },
  {
    id: "on_a_roll",
    title: "On a roll",
    description: "Opened the app 3 days in a row.",
    ion: "flame-outline",
  },
  {
    id: "week_warrior",
    title: "Week warrior",
    description: "7-day check-in streak.",
    ion: "shield-checkmark-outline",
  },
  {
    id: "rising_star",
    title: "Rising star",
    description: "Reached level 3.",
    ion: "star-outline",
  },
  {
    id: "veteran",
    title: "Veteran",
    description: "Reached level 6.",
    ion: "medal-outline",
  },
];

export function calendarKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function previousCalendarKey(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() - 1);
  return calendarKey(dt);
}

export function xpForContribution(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const bonus = Math.min(45, Math.floor(amount / 4));
  return 18 + bonus;
}

export const XP_FOR_NEW_GOAL = 32;

export function levelFromTotalXp(totalXp: number): number {
  const xp = Math.max(0, totalXp);
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function progressInCurrentLevel(totalXp: number): {
  level: number;
  xpIntoLevel: number;
  xpToNext: number;
  fraction: number;
} {
  const xp = Math.max(0, totalXp);
  const level = levelFromTotalXp(xp);
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const xpToNext = XP_PER_LEVEL;
  return {
    level,
    xpIntoLevel,
    xpToNext,
    fraction: xpToNext > 0 ? xpIntoLevel / xpToNext : 1,
  };
}

export function achievementUnlocked(id: AchievementId, s: GamificationSnapshot): boolean {
  const lvl = levelFromTotalXp(s.totalXp);
  switch (id) {
    case "first_boost":
      return s.contributionCount >= 1;
    case "saver_100":
      return s.lifetimeContributed >= 100;
    case "planner":
      return s.goalsCreatedCount >= 1;
    case "on_a_roll":
      return s.checkInStreak >= 3;
    case "week_warrior":
      return s.checkInStreak >= 7;
    case "rising_star":
      return lvl >= 3;
    case "veteran":
      return lvl >= 6;
    default:
      return false;
  }
}

export function computeUnlockedIds(
  s: GamificationSnapshot,
  previous: Set<AchievementId>
): AchievementId[] {
  const next: AchievementId[] = [];
  for (const a of ACHIEVEMENTS) {
    if (previous.has(a.id)) continue;
    if (achievementUnlocked(a.id, s)) next.push(a.id);
  }
  return next;
}
