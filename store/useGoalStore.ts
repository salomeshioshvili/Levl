import { create } from "zustand";

import { mockGoals } from "../data/mock";
import type { Goal } from "../types";

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  contributeToGoal: (id: string, amount: number) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: mockGoals,
  addGoal: (goal: Goal) =>
    set((state) => ({
      goals: [goal, ...state.goals],
    })),
  updateGoal: (id: string, updates: Partial<Goal>) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, ...updates } : g
      ),
    })),
  contributeToGoal: (id: string, amount: number) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== id) return g;
        const add = Math.max(0, amount);
        if (!Number.isFinite(add) || add === 0) return g;
        const nextSaved = Math.min(g.targetAmount, g.savedAmount + add);
        return { ...g, savedAmount: nextSaved };
      }),
    })),
}));
