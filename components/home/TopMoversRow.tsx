import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../lib/formatters";
import type { TopMover } from "../../lib/topMovers";

type TopMoversRowProps = {
  movers: TopMover[];
  onPressSeeActivity?: () => void;
};

export function TopMoversRow({ movers, onPressSeeActivity }: TopMoversRowProps) {
  if (movers.length === 0) return null;

  return (
    <View style={{ marginTop: 28 }}>
      <View className="mb-3 flex-row items-center justify-between px-0.5">
        <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase" }}>
          Spending by category
        </Text>
        {onPressSeeActivity ? (
          <Pressable onPress={onPressSeeActivity} hitSlop={8}>
            <Text className="font-dm-semibold" style={{ color: COLORS.accent, fontSize: 13 }}>
              View activity
            </Text>
          </Pressable>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingBottom: 4 }}
      >
        {movers.map((m) => (
          <View
            key={m.key}
            style={{
              minWidth: 128,
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderRadius: 14,
              backgroundColor: COLORS.surface,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name={m.icon} size={20} color={COLORS.textSecondary} />
              <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 14 }} numberOfLines={1}>
                {m.label}
              </Text>
            </View>
            <Text className="font-dm-semibold mt-3" style={{ color: COLORS.text, fontSize: 17, letterSpacing: -0.3 }}>
              {formatCurrency(-m.total)}
            </Text>
            <View style={{ marginTop: 10, height: 3, borderRadius: 2, backgroundColor: COLORS.surfaceInset, overflow: "hidden" }}>
              <View
                style={{
                  width: "65%",
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: COLORS.accent,
                  opacity: 0.55,
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
