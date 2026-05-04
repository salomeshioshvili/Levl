import type {
  BehaviourScore,
  Goal,
  Insight,
  SpendingCategory,
  Transaction,
  WeeklySpendDay,
} from "../types";

export const mockTransactions: Transaction[] = [
  {
    id: "t0",
    name: "Work lunch",
    merchant: "Sweetgreen",
    amount: -14.25,
    category: "food",
    date: "2026-05-04T12:40:00",
    icon: "nutrition-outline",
  },
  {
    id: "t1",
    name: "Starbucks",
    merchant: "Starbucks Reserve · Downtown",
    amount: -6.4,
    category: "food",
    date: "2026-05-03T08:15:00",
    icon: "cafe-outline",
    recurring: { cadence: "weekly", planLabel: "Coffee run" },
  },
  {
    id: "t2",
    name: "Whole Foods",
    merchant: "Whole Foods Market",
    amount: -47.2,
    category: "food",
    date: "2026-05-03T14:22:00",
    icon: "cart-outline",
  },
  {
    id: "t3",
    name: "Uber",
    merchant: "Uber Technologies",
    amount: -28.43,
    category: "transport",
    date: "2026-05-02T19:40:00",
    icon: "car-outline",
  },
  {
    id: "t4",
    name: "Ramen Spot",
    amount: -18.9,
    category: "food",
    date: "2026-05-02T12:05:00",
    icon: "restaurant-outline",
  },
  {
    id: "t5",
    name: "Salary",
    amount: 2400,
    category: "income",
    date: "2026-05-02T09:00:00",
    icon: "trending-up-outline",
  },
  {
    id: "t6",
    name: "H&M",
    amount: -38.99,
    category: "shopping",
    date: "2026-04-30T16:30:00",
    icon: "bag-handle-outline",
  },
  {
    id: "t7",
    name: "Spotify",
    merchant: "Spotify AB",
    amount: -9.99,
    category: "bills",
    date: "2026-04-30T08:00:00",
    icon: "musical-notes-outline",
    recurring: { cadence: "monthly", planLabel: "Spotify Premium" },
  },
  {
    id: "t8",
    name: "Phone bill",
    merchant: "T-Mobile",
    amount: -35.0,
    category: "bills",
    date: "2026-04-30T11:15:00",
    icon: "phone-portrait-outline",
    recurring: { cadence: "monthly", planLabel: "Magenta" },
  },
  {
    id: "t9",
    name: "Jade Matcha",
    amount: -7.5,
    category: "food",
    date: "2026-04-29T15:20:00",
    icon: "leaf-outline",
  },
  {
    id: "t10",
    name: "Uber",
    merchant: "Uber Technologies",
    amount: -14.2,
    category: "transport",
    date: "2026-04-29T18:45:00",
    icon: "car-outline",
  },
  {
    id: "t11",
    name: "Amazon",
    amount: -23.99,
    category: "shopping",
    date: "2026-04-29T10:10:00",
    icon: "cube-outline",
  },
  {
    id: "t12",
    name: "Tesco",
    merchant: "Tesco Stores",
    amount: -52.3,
    category: "food",
    date: "2026-04-28T17:00:00",
    icon: "cart-outline",
  },
  {
    id: "t13",
    name: "Netflix",
    merchant: "Netflix Inc.",
    amount: -15.99,
    category: "bills",
    date: "2026-04-28T09:30:00",
    icon: "film-outline",
    recurring: { cadence: "monthly", planLabel: "Standard" },
  },
  {
    id: "t14",
    name: "Jade Matcha",
    amount: -7.5,
    category: "food",
    date: "2026-04-27T13:45:00",
    icon: "leaf-outline",
  },
  {
    id: "t15",
    name: "Gym",
    merchant: "Equinox",
    amount: -30.0,
    category: "bills",
    date: "2026-04-27T07:30:00",
    icon: "barbell-outline",
    recurring: { cadence: "monthly", planLabel: "All access" },
  },
];

export const mockGoals: Goal[] = [
  {
    id: "g1",
    name: "Trip to Morocco",
    targetAmount: 1500,
    savedAmount: 1050,
    icon: "globe-outline",
    deadline: "Sep 15, 2026",
    deadlineIso: "2026-09-15",
  },
  {
    id: "g2",
    name: "New laptop",
    targetAmount: 1500,
    savedAmount: 675,
    icon: "laptop-outline",
    deadline: null,
    deadlineIso: null,
  },
  {
    id: "g3",
    name: "Weekend getaway",
    targetAmount: 500,
    savedAmount: 100,
    icon: "sunny-outline",
    deadline: "Aug 1, 2026",
    deadlineIso: "2026-08-01",
  },
];

export const mockInsights: Insight[] = [
  {
    id: "i1",
    type: "positive",
    title: "Strong point",
    body: "You kept rent and essentials on track this month.",
  },
  {
    id: "i2",
    type: "nudge",
    title: "Try this",
    body: "Set a weekly limit for dining out to smooth spending.",
  },
  {
    id: "i3",
    type: "negative",
    title: "Watch area",
    body: "Shopping spend was higher than your usual pattern.",
  },
];

export const mockSpendingCategories: SpendingCategory[] = [
  { name: "Food", percentage: 38, color: "#7C6CF9" },
  { name: "Transport", percentage: 22, color: "#5EC8D8" },
  { name: "Shopping", percentage: 18, color: "#E98BA8" },
  { name: "Bills", percentage: 22, color: "#C4B5FD" },
];

export const mockBehaviourScore: BehaviourScore = {
  score: 78,
  change: 4,
  label: "vs last month",
};

export const mockWeeklySpend: WeeklySpendDay[] = [
  { day: "Mon", amount: 42, highlight: false },
  { day: "Tue", amount: 28, highlight: false },
  { day: "Wed", amount: 65, highlight: true },
  { day: "Thu", amount: 31, highlight: false },
  { day: "Fri", amount: 58, highlight: false },
  { day: "Sat", amount: 44, highlight: false },
  { day: "Sun", amount: 19, highlight: false },
];

export const mockHomeSummary = {
  totalBalance: 12_450.32,
  balanceChangePercent: 2.4,
  monthlySpend: 2840,
  savingsRate: 18,
  behaviourScoreDisplay: 78,
};

export const mockUserProfile = {
  firstName: "Alex",
  fullName: "Alex Morgan",
  initials: "AM",
  memberSince: "Jan 2024",
  linkedAccounts: 2,
};

export const mockLinkedInstitutions = [
  { id: "bk1", name: "Chase", detail: "Checking ···4291", status: "Synced" as const },
  { id: "bk2", name: "Amex", detail: "Gold ···8840", status: "Synced" as const },
];

/** Aliases for insight store naming */
export const mockSpendingBreakdown = mockSpendingCategories;
export const mockWeeklySpending = mockWeeklySpend;
