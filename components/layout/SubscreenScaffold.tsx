import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { SCREEN_EDGE_GUTTER } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { ScreenHeader } from "../ui/ScreenHeader";

type SubscreenScaffoldProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SubscreenScaffold({ title, subtitle, children }: SubscreenScaffoldProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, 10),
          paddingHorizontal: SCREEN_EDGE_GUTTER,
          paddingBottom: insets.bottom + 36,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="mb-1 flex-row items-center self-start py-2 active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.accent} />
          <Text className="font-dm-semibold ml-0.5" style={{ color: COLORS.accent, fontSize: 16 }}>
            Back
          </Text>
        </Pressable>

        <ScreenHeader title={title} subtitle={subtitle} />

        {children}
      </ScrollView>
    </View>
  );
}
