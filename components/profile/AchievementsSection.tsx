import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { ACHIEVEMENTS, type AchievementId } from "../../lib/gamification";
import type { IonName } from "../../lib/icons";

type AchievementsSectionProps = {
  unlockedIds: AchievementId[];
};

export function AchievementsSection({ unlockedIds }: AchievementsSectionProps) {
  const unlocked = new Set(unlockedIds);
  const n = unlockedIds.length;

  return (
    <View className="mt-8">
      <View className="mb-3 flex-row items-center justify-between px-1">
        <Text
          className="font-dm-semibold"
          style={{
            color: COLORS.textTertiary,
            fontSize: 11,
            letterSpacing: 0.7,
            textTransform: "uppercase",
          }}
        >
          Achievements
        </Text>
        <Text className="font-dm" style={{ color: COLORS.mutedLight, fontSize: 12 }}>
          {n} / {ACHIEVEMENTS.length}
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 2, paddingBottom: 2 }}
      >
        {ACHIEVEMENTS.map((a) => {
          const on = unlocked.has(a.id);
          return (
            <View
              key={a.id}
              style={{
                width: 112,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 16,
                backgroundColor: COLORS.surface,
                borderWidth: 1,
                borderColor: on ? COLORS.accentMuted : COLORS.border,
              }}
            >
              <View className="items-center">
                <View
                  className="mb-2 h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: on ? COLORS.accentMuted : COLORS.surfaceInset,
                  }}
                >
                  <Ionicons
                    name={(on ? a.ion : "lock-closed-outline") as IonName}
                    size={20}
                    color={on ? COLORS.accent : COLORS.muted}
                  />
                </View>
                <Text
                  className="font-dm-semibold text-center"
                  style={{ color: on ? COLORS.text : COLORS.muted, fontSize: 12 }}
                  numberOfLines={2}
                >
                  {a.title}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
