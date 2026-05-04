export type RecurringCadence = "monthly" | "weekly";

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  /** Ionicons glyph name, e.g. `cafe-outline` */
  icon: string;
  /** Merchant or counterparty label (optional). */
  merchant?: string;
  /** Subscription / repeating spend (demo). */
  recurring?: {
    cadence: RecurringCadence;
    /** e.g. "Spotify Premium" */
    planLabel?: string;
  };
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  /** Ionicons glyph name, e.g. `airplane-outline` */
  icon: string;
  deadline?: string | null;
  /** ISO date (YYYY-MM-DD) for pacing / “next best action” (optional). */
  deadlineIso?: string | null;
}

export interface Insight {
  id: string;
  type: "positive" | "negative" | "nudge";
  title: string;
  body: string;
}

export interface SpendingCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface BehaviourScore {
  score: number;
  change: number;
  label: string;
}

export interface WeeklySpendDay {
  day: string;
  amount: number;
  highlight?: boolean;
}
