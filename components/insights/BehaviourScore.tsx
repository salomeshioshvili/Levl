import { Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import type { BehaviourScore as BehaviourScoreModel } from "../../types";

type BehaviourScoreProps = {
  score: BehaviourScoreModel;
};

export function BehaviourScore({ score }: BehaviourScoreProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 18,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <View
        style={{
          height: 72,
          width: 72,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          borderWidth: 2,
          borderColor: COLORS.borderStrong,
          backgroundColor: COLORS.surfaceInset,
        }}
      >
        <Text className="font-dm-bold" style={{ color: COLORS.text, fontSize: 22 }}>
          {score.score}
        </Text>
        <Text
          className="font-dm mt-0.5"
          style={{ color: COLORS.textTertiary, fontSize: 9, letterSpacing: 1 }}
        >
          SCORE
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 16 }}>
          {score.label}
        </Text>
        <Text className="font-dm mt-1 leading-5" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
          +{score.change} pts vs last month
        </Text>
      </View>
    </View>
  );
}
