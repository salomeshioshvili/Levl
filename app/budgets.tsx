import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { SubscreenScaffold } from "../components/layout/SubscreenScaffold";
import { ProgressBar } from "../components/ui/ProgressBar";
import { COLORS } from "../constants/theme";
import { sumFoodSpendInWeek } from "../lib/foodWeekSpend";
import { formatCurrency } from "../lib/formatters";
import { useBudgetStore } from "../store/useBudgetStore";
import { useTransactionStore } from "../store/useTransactionStore";

const PRESETS = [120, 150, 200, 250];

export default function BudgetsScreen() {
  const transactions = useTransactionStore((s) => s.transactions);
  const weeklyFoodSpendLimit = useBudgetStore((s) => s.weeklyFoodSpendLimit);
  const setWeeklyFoodSpendLimit = useBudgetStore((s) => s.setWeeklyFoodSpendLimit);

  const spent = useMemo(() => sumFoodSpendInWeek(transactions), [transactions]);
  const [draft, setDraft] = useState(String(weeklyFoodSpendLimit));

  const pct =
    weeklyFoodSpendLimit > 0 ? Math.min(100, (spent / weeklyFoodSpendLimit) * 100) : 0;
  const over = spent > weeklyFoodSpendLimit;

  const applyDraft = () => {
    const n = parseFloat(draft.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(n)) setWeeklyFoodSpendLimit(n);
  };

  return (
    <SubscreenScaffold
      title="Weekly dining budget"
      subtitle="Matches the “dining out” nudge on Insights — cap food spend from Mon–Sun."
    >
      <View
        className="mt-2 rounded-[16px] p-5"
        style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }}
      >
        <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
          This week (food)
        </Text>
        <Text className="font-dm-bold mt-1" style={{ color: COLORS.text, fontSize: 28 }}>
          {formatCurrency(spent)}
        </Text>
        <Text className="font-dm mt-1" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
          of {formatCurrency(weeklyFoodSpendLimit)} limit
        </Text>
        <View className="mt-4">
          <ProgressBar
            progress={pct}
            height={8}
            fillColor={over ? COLORS.negative : COLORS.accent}
          />
        </View>
      </View>

      <Text className="font-dm-semibold mt-8" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
        Weekly limit (USD)
      </Text>
      <View
        className="mt-2 flex-row items-center px-4"
        style={{
          height: 52,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: COLORS.border,
          backgroundColor: COLORS.chipInactiveBg,
        }}
      >
        <Text className="font-dm-semibold" style={{ color: COLORS.textSecondary, fontSize: 17 }}>
          $
        </Text>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          keyboardType="decimal-pad"
          placeholder="150"
          placeholderTextColor={COLORS.muted}
          className="font-dm ml-1 flex-1"
          style={{ fontSize: 17, color: COLORS.text, height: 52 }}
          onSubmitEditing={applyDraft}
        />
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Pressable
            key={p}
            onPress={() => {
              setDraft(String(p));
              setWeeklyFoodSpendLimit(p);
            }}
            className="rounded-full px-4 py-2.5 active:opacity-85"
            style={{
              backgroundColor: weeklyFoodSpendLimit === p ? COLORS.accentMuted : COLORS.surface,
              borderWidth: 1,
              borderColor: weeklyFoodSpendLimit === p ? COLORS.accent : COLORS.border,
            }}
          >
            <Text
              className="font-dm-semibold"
              style={{
                color: weeklyFoodSpendLimit === p ? COLORS.accent : COLORS.textSecondary,
                fontSize: 14,
              }}
            >
              {formatCurrency(p)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={applyDraft}
        className="mt-8 items-center justify-center rounded-[16px] py-4 active:opacity-90"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Text className="font-dm-bold" style={{ color: COLORS.onAccent, fontSize: 16 }}>
          Save limit
        </Text>
      </Pressable>

      <Text className="font-dm mt-8 leading-[22px]" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
        Demo only: totals use transactions tagged “food” in the current calendar week. A real app would
        separate groceries vs dining and sync from your bank.
      </Text>
    </SubscreenScaffold>
  );
}
