import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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
import type { IonName } from "../../lib/icons";
import { useGamificationStore } from "../../store/useGamificationStore";
import { useGoalStore } from "../../store/useGoalStore";

const ICON_OPTIONS: IonName[] = [
  "globe-outline",
  "laptop-outline",
  "sunny-outline",
  "airplane-outline",
  "school-outline",
  "musical-notes-outline",
];

export default function AddGoalModal() {
  const insets = useSafeAreaInsets();
  const addGoal = useGoalStore((s) => s.addGoal);
  const recordGoalCreated = useGamificationStore((s) => s.recordGoalCreated);

  const [name, setName] = useState("");
  const [amountRaw, setAmountRaw] = useState("");
  const [deadline, setDeadline] = useState("");
  const [icon, setIcon] = useState<IonName>("globe-outline");

  const amountNum = parseFloat(amountRaw.replace(/[^0-9.]/g, ""));
  const disabled = name.trim().length === 0 || Number.isNaN(amountNum) || amountNum <= 0;

  const handleCreate = () => {
    if (disabled) return;
    addGoal({
      id: Date.now().toString(),
      name: name.trim(),
      targetAmount: amountNum,
      savedAmount: 0,
      icon,
      deadline: deadline.trim() || null,
      deadlineIso: null,
    });
    recordGoalCreated();
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
            New goal
          </Text>
          <Text className="font-dm mt-1" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
            Name, amount, and optional deadline.
          </Text>

          <Text className="font-dm mt-6 mb-2" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
            Goal name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Trip to Lisbon"
            placeholderTextColor={COLORS.muted}
            className="font-dm px-[14px] text-white"
            style={{
              height: 50,
              backgroundColor: COLORS.chipInactiveBg,
              borderColor: COLORS.border,
              borderWidth: 1,
              borderRadius: 14,
              fontSize: 16,
              color: COLORS.text,
            }}
          />

          <Text className="font-dm mt-4 mb-2" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
            Target amount
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
              className="font-dm ml-1 flex-1"
              style={{ fontSize: 16, height: 50, color: COLORS.text }}
            />
          </View>

          <Text className="font-dm mt-4 mb-2" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
            Icon
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {ICON_OPTIONS.map((ion) => {
              const selected = icon === ion;
              return (
                <Pressable
                  key={ion}
                  onPress={() => setIcon(ion)}
                  className="h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: selected ? COLORS.surfaceInset : COLORS.chipInactiveBg,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? COLORS.accent : COLORS.border,
                  }}
                >
                  <Ionicons name={ion} size={22} color={COLORS.textSecondary} />
                </Pressable>
              );
            })}
          </View>

          <Text className="font-dm mt-4 mb-2" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
            Deadline (optional)
          </Text>
          <TextInput
            value={deadline}
            onChangeText={setDeadline}
            placeholder="e.g. Sep 2026"
            placeholderTextColor={COLORS.muted}
            className="font-dm px-[14px]"
            style={{
              height: 50,
              backgroundColor: COLORS.chipInactiveBg,
              borderColor: COLORS.border,
              borderWidth: 1,
              borderRadius: 14,
              fontSize: 16,
              color: COLORS.text,
            }}
          />

          <Pressable
            onPress={handleCreate}
            disabled={disabled}
            className="mt-9 w-full items-center justify-center rounded-[16px] active:opacity-90"
            style={{
              height: 54,
              backgroundColor: COLORS.accent,
              opacity: disabled ? 0.35 : 1,
            }}
          >
            <Text className="font-dm-bold" style={{ color: COLORS.onAccent, fontSize: 16 }}>
              Create goal
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
