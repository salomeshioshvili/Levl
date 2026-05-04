import { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BehaviourScore } from "../../components/insights/BehaviourScore";
import { BudgetWeekCard } from "../../components/insights/BudgetWeekCard";
import { BreakdownRow } from "../../components/insights/BreakdownRow";
import { SpendingChart } from "../../components/insights/SpendingChart";
import { SpendingDonut } from "../../components/insights/SpendingDonut";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { SCREEN_EDGE_GUTTER, TAB_SCENE_PADDING_BOTTOM } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { mockHomeSummary } from "../../data/mock";
import { sumFoodSpendInWeek } from "../../lib/foodWeekSpend";
import { useBudgetStore } from "../../store/useBudgetStore";
import { useInsightStore } from "../../store/useInsightStore";
import { useTransactionStore } from "../../store/useTransactionStore";

const HIGHLIGHT_PATTERN = /(\d+%|~\$[\d,.]+|\$[\d,.]+)/g;

function NudgeBanner({ body }: { body: string }) {
  const fragments = body.split(HIGHLIGHT_PATTERN);

  return (
    <View
      className="mt-4 overflow-hidden rounded-[14px]"
      style={{
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
      }}
    >
      <View style={{ width: 3, backgroundColor: COLORS.accent, opacity: 0.9 }} />
      <View className="flex-1 py-4" style={{ paddingHorizontal: 18 }}>
        <Text className="font-dm leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
          {fragments.map((part, index) => {
            if (part.match(/^\d+%$|^\$[\d,.]+$|^~\$[\d,.]+$/)) {
              return (
                <Text key={`${part}-${index}`} className="font-dm-semibold" style={{ color: COLORS.text }}>
                  {part}
                </Text>
              );
            }
            return part;
          })}
        </Text>
      </View>
    </View>
  );
}

export default function InsightsScreen() {
  const behaviourScore = useInsightStore((s) => s.behaviourScore);
  const spendingBreakdown = useInsightStore((s) => s.spendingBreakdown);
  const weeklySpending = useInsightStore((s) => s.weeklySpending);
  const insights = useInsightStore((s) => s.insights);
  const transactions = useTransactionStore((s) => s.transactions);
  const weeklyFoodSpendLimit = useBudgetStore((s) => s.weeklyFoodSpendLimit);
  const spentFoodWeek = useMemo(() => sumFoodSpendInWeek(transactions), [transactions]);

  const positive = insights.find((i) => i.type === "positive");
  const negative = insights.find((i) => i.type === "negative");
  const nudge = insights.find((i) => i.type === "nudge");

  const Header = (
    <View className="pb-6">
      <ScreenHeader title="Insights" subtitle="Where your spending concentrates." />

      <SpendingDonut
        categories={spendingBreakdown}
        centerLabel="This month (demo)"
        centerAmount={-mockHomeSummary.monthlySpend}
        footnote="Needs, wants, and savings share"
      />

      <View className="mt-6">
        <BehaviourScore score={behaviourScore} />
      </View>
      {nudge ? <NudgeBanner body={nudge.body} /> : null}

      <BudgetWeekCard spentThisWeek={spentFoodWeek} weeklyLimit={weeklyFoodSpendLimit} />

      <View className="mt-6">
        <SpendingChart weeklySpending={weeklySpending} />
      </View>

      <Text
        className="font-dm-semibold mt-8"
        style={{
          color: COLORS.textTertiary,
          fontSize: 11,
          letterSpacing: 0.65,
          textTransform: "uppercase",
        }}
      >
        Breakdown
      </Text>

      <View
        className="mt-3 overflow-hidden rounded-[18px] px-4"
        style={{
          backgroundColor: COLORS.surface,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}
      >
        {spendingBreakdown.map((cat, idx) => (
          <BreakdownRow
            key={cat.name}
            category={cat}
            showBorderBottom={idx < spendingBreakdown.length - 1}
          />
        ))}
      </View>

      <View
        className="mt-8 overflow-hidden rounded-[14px]"
        style={{
          backgroundColor: COLORS.surface,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}
      >
        {positive ? (
          <View
            style={{
              paddingHorizontal: 18,
              paddingVertical: 16,
              borderBottomWidth: negative ? 1 : 0,
              borderBottomColor: COLORS.border,
            }}
          >
            <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 11, letterSpacing: 0.6 }}>
              WHAT WENT WELL
            </Text>
            <Text className="font-dm-semibold mt-2" style={{ color: COLORS.text, fontSize: 15 }}>
              {positive.title}
            </Text>
            <Text className="font-dm mt-2 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 13 }}>
              {positive.body}
            </Text>
          </View>
        ) : null}

        {negative ? (
          <View style={{ paddingHorizontal: 18, paddingVertical: 16 }}>
            <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 11, letterSpacing: 0.6 }}>
              WATCH
            </Text>
            <Text className="font-dm-semibold mt-2" style={{ color: COLORS.text, fontSize: 15 }}>
              {negative.title}
            </Text>
            <Text className="font-dm mt-2 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 13 }}>
              {negative.body}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }} edges={["top"]}>
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={Header}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SCREEN_EDGE_GUTTER,
          paddingBottom: TAB_SCENE_PADDING_BOTTOM,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
