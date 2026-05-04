import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { progressInCurrentLevel } from "../../lib/gamification";
import { ProgressBar } from "../ui/ProgressBar";

type LevelProgressCardProps = {
  totalXp: number;
  streak: number;
};

export function LevelProgressCard({ totalXp, streak }: LevelProgressCardProps) {
  const { level, fraction } = progressInCurrentLevel(totalXp);
  const pct = Math.round(fraction * 100);

  return (
    <View
      className="mt-5"
      style={{
        borderRadius: 16,
        padding: 16,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View
            className="h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: COLORS.accentMuted }}
          >
            <Ionicons name="sparkles" size={22} color={COLORS.accent} />
          </View>
          <View>
            <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 15 }}>
              Level {level}
            </Text>
            <Text className="font-dm mt-0.5" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
              {totalXp} XP · {pct}% to next level
            </Text>
          </View>
        </View>
        {streak > 0 ? (
          <View className="flex-row items-center gap-1 rounded-full px-2.5 py-1" style={{ backgroundColor: COLORS.positiveMuted }}>
            <Ionicons name="flame" size={14} color={COLORS.positive} />
            <Text className="font-dm-semibold" style={{ color: COLORS.positive, fontSize: 12 }}>
              {streak}d
            </Text>
          </View>
        ) : null}
      </View>
      <View className="mt-3">
        <ProgressBar progress={pct} height={6} />
      </View>
      <Text className="font-dm mt-2" style={{ color: COLORS.textTertiary, fontSize: 11 }}>
        Earn XP by saving toward goals and creating new goals. Check in daily to grow your streak.
      </Text>
    </View>
  );
}
