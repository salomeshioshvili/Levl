import { Text, useWindowDimensions, View } from "react-native";

import { SCREEN_EDGE_GUTTER } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import type { WeeklySpendDay } from "../../types";

const BAR_MUTED = "#3f3f46";

const DAY_INITIAL: Record<string, string> = {
  Mon: "M",
  Tue: "T",
  Wed: "W",
  Thu: "T",
  Fri: "F",
  Sat: "S",
  Sun: "S",
};

type SpendingChartProps = {
  weeklySpending: WeeklySpendDay[];
};

/** View-only bars — same path on iOS, Android, and web (no Skia / victory-native). */
export function SpendingChart({ weeklySpending }: SpendingChartProps) {
  const maxY = Math.max(1, ...weeklySpending.map((d) => d.amount));
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - SCREEN_EDGE_GUTTER * 2 - 32, 340);

  return (
    <View
      className="p-4"
      style={{
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 16,
      }}
    >
      <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 14 }}>
        Spending this week
      </Text>
      <Text className="font-dm mt-0.5" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
        Taller bar = more spend that day
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: 200,
          width: chartWidth,
          alignSelf: "center",
          marginTop: 12,
          gap: 6,
        }}
      >
        {weeklySpending.map((d) => {
          const h = Math.max(8, (d.amount / maxY) * 170);
          const bg = d.highlight ? COLORS.accent : BAR_MUTED;
          return (
            <View key={d.day} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
              <View
                style={{
                  width: "88%",
                  height: h,
                  borderRadius: 6,
                  backgroundColor: bg,
                }}
              />
            </View>
          );
        })}
      </View>
      <View className="mt-2 flex-row justify-between px-2">
        {weeklySpending.map((d) => (
          <Text
            key={d.day}
            className="font-dm text-center"
            style={{ color: COLORS.textTertiary, fontSize: 10, width: chartWidth / 7 - 4 }}
          >
            {DAY_INITIAL[d.day] ?? d.day[0]}
          </Text>
        ))}
      </View>
    </View>
  );
}
