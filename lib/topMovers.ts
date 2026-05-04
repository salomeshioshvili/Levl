import type { Transaction } from "../types";
import type { IonName } from "./icons";

const CAT_META: Record<string, { label: string; icon: IonName }> = {
  food: { label: "Food", icon: "fast-food-outline" },
  transport: { label: "Transport", icon: "car-outline" },
  shopping: { label: "Shopping", icon: "bag-handle-outline" },
  bills: { label: "Bills", icon: "document-text-outline" },
  income: { label: "Income", icon: "trending-up-outline" },
};

export type TopMover = {
  key: string;
  label: string;
  icon: IonName;
  total: number;
};

export function computeTopMovers(transactions: Transaction[], limit = 4): TopMover[] {
  const sums = new Map<string, number>();
  for (const t of transactions) {
    if (t.amount >= 0 || t.category === "income") continue;
    const k = t.category;
    sums.set(k, (sums.get(k) ?? 0) + Math.abs(t.amount));
  }
  return Array.from(sums.entries())
    .map(([key, total]) => {
      const meta = CAT_META[key] ?? { label: key, icon: "wallet-outline" as IonName };
      return { key, label: meta.label, icon: meta.icon, total };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
