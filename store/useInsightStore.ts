import { create } from "zustand";

import {
  mockBehaviourScore,
  mockInsights,
  mockSpendingBreakdown,
  mockWeeklySpending,
} from "../data/mock";
import type {
  BehaviourScore,
  Insight,
  SpendingCategory,
  WeeklySpendDay,
} from "../types";

interface InsightStore {
  insights: Insight[];
  behaviourScore: BehaviourScore;
  spendingBreakdown: SpendingCategory[];
  weeklySpending: WeeklySpendDay[];
}

export const useInsightStore = create<InsightStore>(() => ({
  insights: mockInsights,
  behaviourScore: mockBehaviourScore,
  spendingBreakdown: mockSpendingBreakdown,
  weeklySpending: mockWeeklySpending,
}));
