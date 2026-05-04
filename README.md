# Levl

> Making student money habits stick

## The Problem

79% of young adults have never made a budget and 77% have no emergency savings. Existing tools don't stick — they feel judgmental, require too much effort, and show numbers without behaviour context.

## The Solution

Levl is a behaviour-aware money coach that connects to your existing bank cards, tracks spending automatically, and shows progress — not just numbers. Built for students, designed to actually stick.

## Features

- Automatic spend tracking across multiple cards
- Savings goals with visual progress
- Behaviour score that improves over time
- AI-style spending insights (pattern detection)
- Weekly spending breakdown by category
- Friday spending alerts and nudges

## Tech Stack

- React Native + Expo SDK 54 (iOS & Android)
- expo-router for navigation
- NativeWind (Tailwind for React Native)
- Zustand for state management
- Victory Native for charts
- TypeScript throughout

## Getting Started

```bash
git clone https://github.com/yourusername/levl.git
cd levl
npm install
npx expo start
```

## Project Structure

```
levl/
├── app/
│   ├── _layout.tsx           # root layout with tab navigator
│   ├── (tabs)/
│   │   ├── _layout.tsx       # tab bar config
│   │   ├── index.tsx         # Home screen
│   │   ├── activity.tsx      # Activity screen
│   │   ├── goals.tsx         # Goals screen
│   │   ├── insights.tsx      # Insights screen
│   │   └── profile.tsx       # Profile screen
│   └── modals/
│       └── add-goal.tsx      # Add goal modal
├── components/
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   ├── home/
│   │   ├── BalanceCard.tsx
│   │   ├── AIInsightCard.tsx
│   │   ├── GoalPreviewItem.tsx
│   │   └── TransactionItem.tsx
│   ├── goals/
│   │   └── GoalCard.tsx
│   └── insights/
│       ├── SpendingChart.tsx
│       ├── BreakdownRow.tsx
│       └── BehaviourScore.tsx
├── store/
│   ├── useTransactionStore.ts
│   ├── useGoalStore.ts
│   └── useInsightStore.ts
├── lib/
│   └── formatters.ts         # currency, date helpers
├── data/
│   └── mock.ts               # all mock data
├── types/
│   └── index.ts              # shared TypeScript types
└── constants/
    └── theme.ts              # colors, spacing, typography
```

## Design Decisions

- Dark-only UI: reduces eye strain for late-night budget checks
- Emoji icons: no icon library dependency, works cross-platform
- Behaviour score: motivates improvement without shaming
- No auth screen: prototype focuses on core UX flow
- Charts use Victory Native XL (Skia-backed) on Expo SDK 54 for performance and compatibility with the current React Native renderer.

## License

MIT
