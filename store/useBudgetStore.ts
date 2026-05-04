import { create } from "zustand";

/** Default weekly cap for dining / food (aligned with insight nudge copy). */
const DEFAULT_WEEKLY_FOOD_LIMIT = 150;

interface BudgetStore {
  /** Weekly spending cap for food & dining out (demo category = `food`). */
  weeklyFoodSpendLimit: number;
  setWeeklyFoodSpendLimit: (amount: number) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  weeklyFoodSpendLimit: DEFAULT_WEEKLY_FOOD_LIMIT,
  setWeeklyFoodSpendLimit: (amount: number) =>
    set(() => {
      const n = Number.isFinite(amount) ? Math.round(amount) : DEFAULT_WEEKLY_FOOD_LIMIT;
      return {
        weeklyFoodSpendLimit: Math.min(2000, Math.max(40, n)),
      };
    }),
}));
