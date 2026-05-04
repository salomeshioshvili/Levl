import type { Goal } from "../types";

import { formatCurrency } from "./formatters";

function roundTo5(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 5;
  return Math.max(5, Math.round(n / 5) * 5);
}

export type NextBestAction = {
  goalId: string;
  goalName: string;
  headline: string;
  detail: string;
  suggestedAmount: number;
};

export function computeNextBestAction(
  goals: Goal[],
  now: Date = new Date()
): NextBestAction | null {
  const active = goals.filter((g) => g.savedAmount < g.targetAmount);
  if (active.length === 0) return null;

  const withDeadline = active
    .filter((g) => g.deadlineIso)
    .sort(
      (a, b) =>
        new Date(a.deadlineIso!).getTime() - new Date(b.deadlineIso!).getTime()
    );

  const pick = withDeadline[0] ?? active[0];
  const shortfall = pick.targetAmount - pick.savedAmount;
  if (shortfall <= 0) return null;

  let suggested: number;
  if (pick.deadlineIso) {
    const end = new Date(`${pick.deadlineIso}T23:59:59`);
    const ms = end.getTime() - now.getTime();
    const weeks = Math.max(1, Math.ceil(ms / (7 * 86_400_000)));
    const perWeek = shortfall / weeks;
    suggested = roundTo5(Math.min(shortfall, perWeek * 1.08));
  } else {
    suggested = roundTo5(Math.min(shortfall, Math.max(25, shortfall * 0.1)));
  }

  const headline = "Next best move";
  const detail = pick.deadlineIso
    ? `Add ${formatCurrency(suggested)} to ${pick.name} this week to stay on pace before ${pick.deadline ?? "your deadline"}.`
    : `Add about ${formatCurrency(suggested)} to ${pick.name} to keep momentum.`;

  return {
    goalId: pick.id,
    goalName: pick.name,
    headline,
    detail,
    suggestedAmount: suggested,
  };
}
