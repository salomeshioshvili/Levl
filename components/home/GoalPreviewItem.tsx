import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { SCREEN_EDGE_GUTTER } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import {
  getProgressLabel,
  getProgressPercentage,
} from "../../lib/formatters";
import { resolveGoalIcon } from "../../lib/icons";
import type { Goal } from "../../types";
import { ProgressBar } from "../ui/ProgressBar";

type GoalPreviewItemProps = {
  goal: Goal;
  variant: "accent" | "neutral";
  onPress: () => void;
};

export function GoalPreviewItem({
  goal,
  variant,
  onPress,
}: GoalPreviewItemProps) {
  const barColor = variant === "accent" ? COLORS.accent : COLORS.textTertiary;
  const pct = getProgressPercentage(goal.savedAmount, goal.targetAmount);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: Math.max(16, SCREEN_EDGE_GUTTER - 12),
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        opacity: pressed ? 0.92 : 1,
      })}
    >
      <View
        style={{
          height: 44,
          width: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          backgroundColor: COLORS.surfaceInset,
        }}
      >
        <Ionicons
          name={resolveGoalIcon(goal.icon)}
          size={22}
          color={COLORS.textSecondary}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 15 }}>
          {goal.name}
        </Text>
        <View className="mt-2 pr-1">
          <ProgressBar
            progress={pct}
            height={4}
            trackColor={COLORS.surfaceInset}
            fillColor={barColor}
          />
        </View>
      </View>
      <Text className="font-dm-semibold" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
        {getProgressLabel(goal.savedAmount, goal.targetAmount)}
      </Text>
    </Pressable>
  );
}
