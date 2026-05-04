import { useMemo } from "react";
import { Pressable, ScrollView, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TransactionItem } from "../../components/home/TransactionItem";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { SCREEN_EDGE_GUTTER, TAB_SCENE_PADDING_BOTTOM } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { formatSectionHeader } from "../../lib/formatters";
import type { Transaction } from "../../types";
import { useTransactionStore } from "../../store/useTransactionStore";

const FILTER_CHIPS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Shopping", value: "shopping" },
  { label: "Bills", value: "bills" },
  { label: "Income", value: "income" },
];

function groupTransactions(transactions: Transaction[]) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const map = new Map<string, Transaction[]>();
  for (const t of sorted) {
    const key = t.date.slice(0, 10);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  }
  const keys = Array.from(map.keys()).sort((a, b) => b.localeCompare(a));
  return keys.map((key) => {
    const data = map.get(key)!;
    return {
      title: formatSectionHeader(data[0].date),
      data,
    };
  });
}

export default function ActivityScreen() {
  const selectedCategory = useTransactionStore((s) => s.selectedCategory);
  const setCategory = useTransactionStore((s) => s.setCategory);
  const filteredTransactions = useTransactionStore((s) => s.filteredTransactions);

  const sections = useMemo(
    () => groupTransactions(filteredTransactions),
    [filteredTransactions]
  );

  const emptyFilter =
    selectedCategory !== "all" && filteredTransactions.length === 0;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
      edges={["top"]}
    >
      <View style={{ paddingHorizontal: SCREEN_EDGE_GUTTER }}>
        <ScreenHeader title="Activity" subtitle="Newest first, grouped by date." />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: SCREEN_EDGE_GUTTER,
          paddingBottom: 10,
        }}
        style={{ flexGrow: 0 }}
      >
        {FILTER_CHIPS.map((chip) => {
          const active = selectedCategory === chip.value;
          return (
            <Pressable
              key={chip.value}
              onPress={() => setCategory(chip.value)}
              className="px-4 py-2.5"
              style={{
                borderRadius: 20,
                backgroundColor: active ? COLORS.accent : COLORS.surface,
                borderWidth: 1,
                borderColor: active ? COLORS.accent : COLORS.border,
              }}
            >
              <Text
                className="font-dm-semibold"
                style={{
                  color: active ? COLORS.onAccent : COLORS.textSecondary,
                  fontSize: 13,
                }}
              >
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {emptyFilter ? (
        <View
          className="flex-1 items-center justify-center"
          style={{ paddingHorizontal: SCREEN_EDGE_GUTTER + 8 }}
        >
          <Text
            className="font-dm text-center"
            style={{ color: COLORS.textSecondary, fontSize: 15, lineHeight: 22 }}
          >
            No transactions in this category.
          </Text>
        </View>
      ) : (
        <SectionList
          style={{ flex: 1 }}
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Text
              className="font-dm-bold uppercase"
              style={{
                color: COLORS.textTertiary,
                fontSize: 11,
                letterSpacing: 0.6,
                paddingHorizontal: SCREEN_EDGE_GUTTER,
                paddingVertical: 8,
                backgroundColor: COLORS.background,
              }}
            >
              {section.title}
            </Text>
          )}
          renderItem={({ item, index, section }) => (
            <View style={{ paddingHorizontal: SCREEN_EDGE_GUTTER }}>
              <TransactionItem
                transaction={item}
                showBottomBorder={index < section.data.length - 1}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: TAB_SCENE_PADDING_BOTTOM }}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
