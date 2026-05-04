import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GoalCard } from "../../components/goals/GoalCard";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { SCREEN_EDGE_GUTTER, TAB_SCENE_PADDING_BOTTOM } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { useGoalStore } from "../../store/useGoalStore";

export default function GoalsScreen() {
  const goals = useGoalStore((s) => s.goals);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }} edges={["top"]}>
      <FlatList
        style={{ flex: 1 }}
        data={goals}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: SCREEN_EDGE_GUTTER }}>
            <ScreenHeader title="Goals" subtitle="Track targets and how close you are." />
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: SCREEN_EDGE_GUTTER }}>
            <GoalCard
              goal={item}
              onPress={() =>
                router.push({
                  pathname: "/modals/contribute-goal",
                  params: { goalId: item.id },
                })
              }
            />
          </View>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: TAB_SCENE_PADDING_BOTTOM + 24,
        }}
        ListFooterComponent={
          <View className="pt-4" style={{ paddingHorizontal: SCREEN_EDGE_GUTTER }}>
            <Pressable
              onPress={() => router.push("/modals/add-goal")}
              className="w-full items-center justify-center py-4 active:opacity-90"
              style={({ pressed }) => ({
                borderWidth: 1.5,
                borderStyle: "dashed",
                borderColor: pressed ? COLORS.accent : COLORS.border,
                borderRadius: 20,
                backgroundColor: COLORS.surface,
              })}
            >
              {({ pressed }) => (
                <Text
                  className="font-dm-semibold"
                  style={{
                    fontSize: 15,
                    color: pressed ? COLORS.accent : COLORS.mutedLight,
                  }}
                >
                  + Add a new goal
                </Text>
              )}
            </Pressable>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
