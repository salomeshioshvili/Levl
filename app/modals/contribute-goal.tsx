import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SCREEN_EDGE_GUTTER } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../lib/formatters";
import { resolveGoalIcon } from "../../lib/icons";
import { useGamificationStore } from "../../store/useGamificationStore";
import { useGoalStore } from "../../store/useGoalStore";

export default function ContributeGoalModal() {
  const insets = useSafeAreaInsets();
  const { goalId } = useLocalSearchParams<{ goalId?: string }>();
  const goals = useGoalStore((s) => s.goals);
  const contributeToGoal = useGoalStore((s) => s.contributeToGoal);
  const recordContribution = useGamificationStore((s) => s.recordContribution);

  const goal = useMemo(
    () => goals.find((g) => g.id === goalId),
    [goals, goalId]
  );

  const [amountRaw, setAmountRaw] = useState("");
  const amountNum = parseFloat(amountRaw.replace(/[^0-9.]/g, ""));
  const disabled =
    !goal || Number.isNaN(amountNum) || amountNum <= 0;

  const handleAdd = () => {
    if (disabled || !goal) return;
    contributeToGoal(goal.id, amountNum);
    recordContribution(amountNum);
    router.back();
  };

  return (
    <View className="flex-1 justify-end" style={{ backgroundColor: "transparent" }}>
      <Pressable className="flex-1" onPress={() => router.back()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <View
          className="pb-8 pt-3"
          style={{
            backgroundColor: COLORS.surface,
            borderTopLeftRadius: 26,
            borderTopRightRadius: 26,
            paddingHorizontal: SCREEN_EDGE_GUTTER,
            paddingBottom: Math.max(insets.bottom, 16) + 12,
            borderTopWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <View className="mb-5 items-center">
            <View
              className="rounded-full"
              style={{ width: 44, height: 5, backgroundColor: COLORS.border }}
            />
          </View>

          <Text className="font-dm-bold" style={{ color: COLORS.text, fontSize: 20 }}>
            Add to goal
          </Text>
          <Text className="font-dm mt-1" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
            Move saved money toward your target. Amount is capped at what is left to reach the goal.
          </Text>

          {goal ? (
            <View className="mt-5 flex-row items-center gap-3">
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
              <View className="flex-1">
                <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 16 }}>
                  {goal.name}
                </Text>
                <Text className="font-dm mt-0.5" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
                  {formatCurrency(goal.savedAmount)} of {formatCurrency(goal.targetAmount)} ·{" "}
                  {formatCurrency(Math.max(0, goal.targetAmount - goal.savedAmount))} left
                </Text>
              </View>
            </View>
          ) : (
            <Text className="font-dm mt-5" style={{ color: COLORS.negative, fontSize: 14 }}>
              Goal not found.
            </Text>
          )}

          <Text className="font-dm mt-6 mb-2" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
            Amount to add
          </Text>
          <View
            className="flex-row items-center px-[14px]"
            style={{
              height: 50,
              backgroundColor: COLORS.chipInactiveBg,
              borderColor: COLORS.border,
              borderWidth: 1,
              borderRadius: 14,
            }}
          >
            <Text className="font-dm-semibold" style={{ color: COLORS.textSecondary, fontSize: 16 }}>
              $
            </Text>
            <TextInput
              value={amountRaw}
              onChangeText={setAmountRaw}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={COLORS.muted}
              editable={!!goal}
              className="font-dm ml-1 flex-1"
              style={{ fontSize: 16, height: 50, color: COLORS.text }}
            />
          </View>

          <Pressable
            onPress={handleAdd}
            disabled={disabled}
            className="mt-9 w-full items-center justify-center rounded-[16px] active:opacity-90"
            style={{
              height: 54,
              backgroundColor: COLORS.accent,
              opacity: disabled ? 0.35 : 1,
            }}
          >
            <Text className="font-dm-bold" style={{ color: COLORS.onAccent, fontSize: 16 }}>
              Add to goal
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
