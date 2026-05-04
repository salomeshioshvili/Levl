import type { Transaction } from "../types";

function startOfWeekMonday(d: Date): Date {
  const copy = new Date(d);
  const dow = copy.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function endOfWeekSunday(d: Date): Date {
  const start = startOfWeekMonday(d);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/** Sum of outflows in `food` category within the ISO week containing `reference` (Mon–Sun). */
export function sumFoodSpendInWeek(
  transactions: Transaction[],
  reference: Date = new Date()
): number {
  const start = startOfWeekMonday(reference).getTime();
  const end = endOfWeekSunday(reference).getTime();
  let sum = 0;
  for (const t of transactions) {
    if (t.category !== "food") continue;
    if (t.amount >= 0) continue;
    const ts = new Date(t.date).getTime();
    if (ts >= start && ts <= end) {
      sum += -t.amount;
    }
  }
  return sum;
}
