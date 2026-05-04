import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { COLORS } from "../../constants/theme";
import {
  formatCurrency,
  getProgressLabel,
  getProgressPercentage,
} from "../../lib/formatters";
import { resolveGoalIcon } from "../../lib/icons";
import type { Goal } from "../../types";
import { ProgressBar } from "../ui/ProgressBar";

type GoalCardProps = {
  goal: Goal;
  onPress?: () => void;
};

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pct = getProgressPercentage(goal.savedAmount, goal.targetAmount);
  const toGo = Math.max(0, goal.targetAmount - goal.savedAmount);

  const subtitle =
    goal.deadline == null || goal.deadline === ""
      ? `${formatCurrency(goal.targetAmount)} target · Open-ended`
      : `${formatCurrency(goal.targetAmount)} target · ${goal.deadline}`;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.99);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={{
          marginBottom: 12,
          paddingHorizontal: 18,
          paddingVertical: 18,
          borderRadius: 16,
          backgroundColor: COLORS.surface,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
            <View
              style={{
                height: 48,
                width: 48,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                backgroundColor: COLORS.surfaceInset,
              }}
            >
              <Ionicons
                name={resolveGoalIcon(goal.icon)}
                size={24}
                color={COLORS.textSecondary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 16 }}>
                {goal.name}
              </Text>
              <Text className="font-dm mt-1 leading-5" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
                {subtitle}
              </Text>
            </View>
          </View>
          <Text className="font-dm-semibold" style={{ color: COLORS.textSecondary, fontSize: 15 }}>
            {getProgressLabel(goal.savedAmount, goal.targetAmount)}
          </Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <ProgressBar progress={pct} height={5} trackColor={COLORS.surfaceInset} fillColor={COLORS.accent} />
        </View>
        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
            {formatCurrency(goal.savedAmount)} saved
          </Text>
          <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
            {formatCurrency(toGo)} left
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
