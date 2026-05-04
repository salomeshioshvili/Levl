import type { ReactNode } from "react";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { AchievementsSection } from "../../components/profile/AchievementsSection";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { SCREEN_EDGE_GUTTER, TAB_SCENE_PADDING_BOTTOM } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { mockUserProfile } from "../../data/mock";
import { levelFromTotalXp } from "../../lib/gamification";
import { useGamificationStore } from "../../store/useGamificationStore";

export default function ProfileScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const totalXp = useGamificationStore((s) => s.totalXp);
  const unlockedAchievementIds = useGamificationStore((s) => s.unlockedAchievementIds);
  const level = levelFromTotalXp(totalXp);

  const Header = (
    <View className="pb-6">
      <ScreenHeader
        title="Profile"
        subtitle={`Level ${level} · ${totalXp} XP · settings and plan.`}
      />

      <View className="flex-row items-center gap-4 py-2" style={{ paddingHorizontal: 2 }}>
        <View
          className="h-[72px] w-[72px] items-center justify-center rounded-full"
          style={{
            backgroundColor: COLORS.surfaceInset,
            borderWidth: 1,
            borderColor: COLORS.borderStrong,
          }}
        >
          <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 22 }}>
            {mockUserProfile.initials}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-dm-bold" style={{ color: COLORS.text, fontSize: 18 }}>
            {mockUserProfile.fullName}
          </Text>
          <Text className="font-dm mt-1" style={{ color: COLORS.muted, fontSize: 13 }}>
            Member since {mockUserProfile.memberSince}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.card,
          borderColor: COLORS.border,
          borderWidth: 1,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <PressableRow
          label="Connected accounts"
          onPress={() => router.push("/connected-accounts")}
          right={
            <View className="flex-row items-center gap-1">
              <Text className="font-dm" style={{ color: COLORS.mutedLight, fontSize: 14 }}>
                {mockUserProfile.linkedAccounts} linked
              </Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </View>
          }
          border
        />
        <Row
          label="Notifications"
          right={
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor="#fdfdfd"
            />
          }
          border
        />
        <PressableRow
          label="Privacy & data"
          onPress={() => router.push("/privacy-data")}
          right={<Ionicons name="chevron-forward" size={18} color={COLORS.muted} />}
          border
        />
        <PressableRow
          label="Export data"
          onPress={() => router.push("/export-data")}
          right={<Ionicons name="chevron-forward" size={18} color={COLORS.muted} />}
          border
        />
        <Row
          label="Plan"
          right={
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: COLORS.accentSoft }}>
              <Text className="font-dm-semibold" style={{ color: COLORS.accent, fontSize: 12 }}>
                Free
              </Text>
            </View>
          }
          border
        />
        <Row
          label="Dark mode"
          right={
            <Switch
              value
              disabled
              trackColor={{ false: COLORS.border, true: COLORS.accentSecondary }}
              thumbColor="#fdfdfd"
            />
          }
          border={false}
        />
      </View>

      <AchievementsSection unlockedIds={unlockedAchievementIds} />

      <Pressable
        onPress={() => router.push("/about-demo")}
        className="mt-8 w-full items-center justify-center rounded-[16px] py-3.5 active:opacity-85"
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          backgroundColor: COLORS.card,
        }}
        accessibilityRole="button"
        accessibilityLabel="About this demo"
      >
        <Text className="font-dm-semibold" style={{ color: COLORS.mutedLight, fontSize: 15 }}>
          About this demo
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }} edges={["top"]}>
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={Header}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SCREEN_EDGE_GUTTER,
          paddingBottom: TAB_SCENE_PADDING_BOTTOM,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function PressableRow({
  label,
  right,
  border,
  onPress,
}: {
  label: string;
  right: ReactNode;
  border: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: border ? 1 : 0,
        borderBottomColor: COLORS.border,
        backgroundColor: pressed ? COLORS.surfaceInset : "transparent",
      })}
    >
      <Text className="font-dm flex-1 pr-3" style={{ color: COLORS.text, fontSize: 15 }}>
        {label}
      </Text>
      {right}
    </Pressable>
  );
}

function Row({
  label,
  right,
  border,
}: {
  label: string;
  right: ReactNode;
  border: boolean;
}) {
  return (
    <View
      className="flex-row items-center justify-between px-4 py-3.5"
      style={
        border
          ? { borderBottomWidth: 1, borderBottomColor: COLORS.border }
          : undefined
      }
    >
      <Text className="font-dm flex-1 pr-3" style={{ color: COLORS.text, fontSize: 15 }}>
        {label}
      </Text>
      {right}
    </View>
  );
}
