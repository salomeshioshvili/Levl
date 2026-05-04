import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../lib/formatters";
import { ProgressBar } from "../ui/ProgressBar";

type BudgetWeekCardProps = {
  spentThisWeek: number;
  weeklyLimit: number;
};

export function BudgetWeekCard({ spentThisWeek, weeklyLimit }: BudgetWeekCardProps) {
  const pct = weeklyLimit > 0 ? Math.min(100, (spentThisWeek / weeklyLimit) * 100) : 0;
  const over = spentThisWeek > weeklyLimit;
  const fillColor = over ? COLORS.negative : COLORS.accent;

  return (
    <View
      className="mt-5 overflow-hidden rounded-[16px]"
      style={{
        position: "relative",
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <View style={{ width: 3, backgroundColor: fillColor, position: "absolute", left: 0, top: 0, bottom: 0 }} />
      <View style={{ paddingLeft: 18, paddingRight: 20, paddingVertical: 16 }}>
        <Text
          className="font-dm-semibold"
          style={{
            color: COLORS.textTertiary,
            fontSize: 11,
            letterSpacing: 0.65,
            textTransform: "uppercase",
          }}
        >
          Weekly dining budget
        </Text>
        <Text className="font-dm mt-2 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
          You set a weekly cap for food & dining out. Spend this week vs your limit:
        </Text>
        <View className="mt-3 flex-row items-baseline justify-between">
          <Text className="font-dm-bold" style={{ color: COLORS.text, fontSize: 22 }}>
            {formatCurrency(spentThisWeek)}
          </Text>
          <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 14 }}>
            of {formatCurrency(weeklyLimit)}
          </Text>
        </View>
        <View className="mt-3">
          <ProgressBar progress={pct} height={6} fillColor={fillColor} />
        </View>
        {over ? (
          <Text className="font-dm mt-2" style={{ color: COLORS.negative, fontSize: 13 }}>
            Over this week’s limit — try cooking at home or lowering the cap in settings.
          </Text>
        ) : (
          <Text className="font-dm mt-2" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
            {formatCurrency(Math.max(0, weeklyLimit - spentThisWeek))} left this week.
          </Text>
        )}
        <Pressable
          onPress={() => router.push("/budgets")}
          className="mt-4 self-start rounded-[12px] px-4 py-2.5 active:opacity-90"
          style={{ backgroundColor: COLORS.accent }}
          accessibilityRole="button"
          accessibilityLabel="Edit weekly dining budget"
        >
          <Text className="font-dm-semibold" style={{ color: COLORS.onAccent, fontSize: 14 }}>
            Edit weekly limit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
