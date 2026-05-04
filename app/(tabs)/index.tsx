import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AIInsightCard } from "../../components/home/AIInsightCard";
import { BalanceCard } from "../../components/home/BalanceCard";
import { GoalPreviewItem } from "../../components/home/GoalPreviewItem";
import { LevelProgressCard } from "../../components/home/LevelProgressCard";
import { NextBestActionCard } from "../../components/home/NextBestActionCard";
import { QuickActions } from "../../components/home/QuickActions";
import { TopMoversRow } from "../../components/home/TopMoversRow";
import { TransactionItem } from "../../components/home/TransactionItem";
import { SCREEN_EDGE_GUTTER, TAB_SCENE_PADDING_BOTTOM } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { mockHomeSummary, mockUserProfile } from "../../data/mock";
import { formatCurrency } from "../../lib/formatters";
import { computeNextBestAction } from "../../lib/nextBestAction";
import { computeTopMovers } from "../../lib/topMovers";
import { useGamificationStore } from "../../store/useGamificationStore";
import { useGoalStore } from "../../store/useGoalStore";
import { useInsightStore } from "../../store/useInsightStore";
import { useTransactionStore } from "../../store/useTransactionStore";

export default function HomeScreen() {
  const transactions = useTransactionStore((s) => s.transactions);
  const goals = useGoalStore((s) => s.goals);
  const insights = useInsightStore((s) => s.insights);
  const totalXp = useGamificationStore((s) => s.totalXp);
  const checkInStreak = useGamificationStore((s) => s.checkInStreak);
  const registerCheckIn = useGamificationStore((s) => s.registerCheckIn);

  useFocusEffect(
    useCallback(() => {
      registerCheckIn();
    }, [registerCheckIn])
  );

  const firstName = mockUserProfile.firstName;

  const sortedTx = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recentFour = sortedTx.slice(0, 4);
  const previewGoals = goals.slice(0, 2);
  const nudge = insights.find((i) => i.type === "nudge");
  const topMovers = computeTopMovers(transactions, 4);
  const nextAction = useMemo(() => computeNextBestAction(goals), [goals]);

  const ListHeader = (
    <View className="pb-2">
      <View className="mb-7 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 14 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </Text>
          <Text
            className="mt-2 font-dm-bold"
            style={{ color: COLORS.text, fontSize: 30, letterSpacing: -0.8 }}
          >
            {firstName}
          </Text>
        </View>
        <Pressable
          onPress={() => Alert.alert("Notifications", "Alerts will appear here when enabled.")}
          style={({ pressed }) => ({
            height: 44,
            width: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.border,
            opacity: pressed ? 0.85 : 1,
          })}
          hitSlop={10}
        >
          <Ionicons name="notifications-outline" size={22} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      <BalanceCard
        totalBalance={mockHomeSummary.totalBalance}
        changePercent={mockHomeSummary.balanceChangePercent}
      />

      <LevelProgressCard totalXp={totalXp} streak={checkInStreak} />

      {nextAction ? <NextBestActionCard action={nextAction} /> : null}

      <QuickActions />

      <View className="mt-5 flex-row gap-3">
        <StatPill
          label="Spend"
          value={formatCurrency(-mockHomeSummary.monthlySpend)}
          valueColor={COLORS.negative}
        />
        <StatPill
          label="Save rate"
          value={`${mockHomeSummary.savingsRate}%`}
          valueColor={COLORS.positive}
        />
        <StatPill
          label="Score"
          value={String(mockHomeSummary.behaviourScoreDisplay)}
          valueColor={COLORS.text}
        />
      </View>

      <TopMoversRow movers={topMovers} onPressSeeActivity={() => router.push("/activity")} />

      <View className="mt-7">
        {nudge ? (
          <AIInsightCard body={nudge.body} onPressSetLimit={() => router.push("/budgets")} />
        ) : null}
      </View>

      <SectionTitle title="Goals" onPress={() => router.push("/goals")} />

      <View className="mt-1">
        {previewGoals.map((g, idx) => (
          <GoalPreviewItem
            key={g.id}
            goal={g}
            variant={idx === 0 ? "accent" : "neutral"}
            onPress={() =>
              router.push({
                pathname: "/modals/contribute-goal",
                params: { goalId: g.id },
              })
            }
          />
        ))}
      </View>

      <SectionTitle title="Recent" onPress={() => router.push("/activity")} />

      <View
        style={{
          marginTop: 10,
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: COLORS.surface,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}
      >
        {recentFour.map((t, i) => (
          <View key={t.id} style={{ paddingHorizontal: 16 }}>
            <TransactionItem transaction={t} showBottomBorder={i < recentFour.length - 1} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }} edges={["top"]}>
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SCREEN_EDGE_GUTTER,
          paddingBottom: TAB_SCENE_PADDING_BOTTOM,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function SectionTitle({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View className="mt-9 flex-row items-center justify-between">
      <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 11, letterSpacing: 0.7, textTransform: "uppercase" }}>
        {title}
      </Text>
      <Pressable onPress={onPress} hitSlop={10}>
        <Text className="font-dm-semibold" style={{ color: COLORS.accent, fontSize: 13 }}>
          See all
        </Text>
      </Pressable>
    </View>
  );
}

function StatPill({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <View
      className="min-w-[30%] flex-1"
      style={{
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 11 }} numberOfLines={1}>
        {label}
      </Text>
      <Text className="font-dm-semibold mt-1.5" style={{ color: valueColor, fontSize: 15 }} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
