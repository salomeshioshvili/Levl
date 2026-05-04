import { Pressable, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

type InsightStripProps = {
  body: string;
  onPressSetLimit: () => void;
};

export function AIInsightCard({ body, onPressSetLimit }: InsightStripProps) {
  return (
    <View
      style={{
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 3, backgroundColor: COLORS.accent }} />
        <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 16 }}>
          <Text
            className="font-dm-semibold"
            style={{
              color: COLORS.textSecondary,
              fontSize: 11,
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            Insight
          </Text>
          <Text className="mt-2 font-dm leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
            {body}
          </Text>
          <Pressable
            onPress={onPressSetLimit}
            className="mt-4 self-start rounded-lg px-3 py-2 active:opacity-85"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Text className="font-dm-semibold" style={{ color: COLORS.onAccent, fontSize: 13 }}>
              Set weekly dining limit
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
