import { create } from "zustand";

import {
  type AchievementId,
  type GamificationSnapshot,
  calendarKey,
  computeUnlockedIds,
  previousCalendarKey,
  xpForContribution,
  XP_FOR_NEW_GOAL,
} from "../lib/gamification";

interface GamificationState {
  totalXp: number;
  contributionCount: number;
  lifetimeContributed: number;
  goalsCreatedCount: number;
  checkInStreak: number;
  lastCheckInKey: string | null;
  unlockedAchievementIds: AchievementId[];
  recordContribution: (amount: number) => void;
  recordGoalCreated: () => void;
  registerCheckIn: () => void;
}

function mergeUnlocked(
  prev: AchievementId[],
  newly: AchievementId[]
): AchievementId[] {
  if (newly.length === 0) return prev;
  const set = new Set(prev);
  for (const id of newly) set.add(id);
  return Array.from(set);
}

export const useGamificationStore = create<GamificationState>((set) => ({
  totalXp: 0,
  contributionCount: 0,
  lifetimeContributed: 0,
  goalsCreatedCount: 0,
  checkInStreak: 0,
  lastCheckInKey: null,
  unlockedAchievementIds: [],

  recordContribution: (amount: number) => {
    const add = xpForContribution(amount);
    if (add <= 0) return;
    set((state) => {
      const contributionCount = state.contributionCount + 1;
      const lifetimeContributed = state.lifetimeContributed + Math.max(0, amount);
      const totalXp = state.totalXp + add;
      const nextSnap: GamificationSnapshot = {
        totalXp,
        contributionCount,
        lifetimeContributed,
        goalsCreatedCount: state.goalsCreatedCount,
        checkInStreak: state.checkInStreak,
      };
      const newly = computeUnlockedIds(nextSnap, new Set(state.unlockedAchievementIds));
      return {
        totalXp,
        contributionCount,
        lifetimeContributed,
        unlockedAchievementIds: mergeUnlocked(state.unlockedAchievementIds, newly),
      };
    });
  },

  recordGoalCreated: () => {
    set((state) => {
      const goalsCreatedCount = state.goalsCreatedCount + 1;
      const totalXp = state.totalXp + XP_FOR_NEW_GOAL;
      const nextSnap = {
        totalXp,
        contributionCount: state.contributionCount,
        lifetimeContributed: state.lifetimeContributed,
        goalsCreatedCount,
        checkInStreak: state.checkInStreak,
      };
      const newly = computeUnlockedIds(
        nextSnap,
        new Set(state.unlockedAchievementIds)
      );
      return {
        goalsCreatedCount,
        totalXp,
        unlockedAchievementIds: mergeUnlocked(state.unlockedAchievementIds, newly),
      };
    });
  },

  registerCheckIn: () => {
    const today = calendarKey(new Date());
    set((state) => {
      if (state.lastCheckInKey === today) {
        return state;
      }
      let checkInStreak = 1;
      if (state.lastCheckInKey) {
        const yday = previousCalendarKey(today);
        if (state.lastCheckInKey === yday) {
          checkInStreak = state.checkInStreak + 1;
        }
      }
      const nextSnap = {
        totalXp: state.totalXp,
        contributionCount: state.contributionCount,
        lifetimeContributed: state.lifetimeContributed,
        goalsCreatedCount: state.goalsCreatedCount,
        checkInStreak,
      };
      const newly = computeUnlockedIds(
        nextSnap,
        new Set(state.unlockedAchievementIds)
      );
      return {
        lastCheckInKey: today,
        checkInStreak,
        unlockedAchievementIds: mergeUnlocked(state.unlockedAchievementIds, newly),
      };
    });
  },
}));
