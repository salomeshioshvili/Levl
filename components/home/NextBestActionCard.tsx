import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants/theme";
import type { NextBestAction } from "../../lib/nextBestAction";
import { formatCurrency } from "../../lib/formatters";

type NextBestActionCardProps = {
  action: NextBestAction;
};

export function NextBestActionCard({ action }: NextBestActionCardProps) {
  return (
    <View
      className="mt-5"
      style={{
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.borderStrong,
        overflow: "hidden",
      }}
    >
      <View className="flex-row">
        <View style={{ width: 4, backgroundColor: COLORS.positive }} />
        <View className="flex-1 py-4" style={{ paddingHorizontal: 18 }}>
          <View className="flex-row items-center justify-between">
            <Text
              className="font-dm-semibold"
              style={{
                color: COLORS.textTertiary,
                fontSize: 11,
                letterSpacing: 0.7,
                textTransform: "uppercase",
              }}
            >
              {action.headline}
            </Text>
            <View className="flex-row items-center gap-1 rounded-full px-2 py-0.5" style={{ backgroundColor: COLORS.positiveMuted }}>
              <Ionicons name="flag" size={12} color={COLORS.positive} />
              <Text className="font-dm-semibold" style={{ color: COLORS.positive, fontSize: 11 }}>
                {formatCurrency(action.suggestedAmount)}
              </Text>
            </View>
          </View>
          <Text className="font-dm mt-2 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 15 }}>
            {action.detail}
          </Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/modals/contribute-goal",
                params: { goalId: action.goalId },
              })
            }
            className="mt-4 flex-row items-center justify-center rounded-[14px] py-3.5 active:opacity-90"
            style={{ backgroundColor: COLORS.accent }}
            accessibilityRole="button"
            accessibilityLabel={`Contribute to ${action.goalName}`}
          >
            <Text className="font-dm-bold" style={{ color: COLORS.onAccent, fontSize: 15 }}>
              Add to {action.goalName}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.onAccent} style={{ marginLeft: 8 }} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
