import { Text, View } from "react-native";

import { COLORS } from "../../constants/theme";

type BadgeProps = {
  label: string;
  backgroundColor?: string;
  textColor?: string;
};

export function Badge({
  label,
  backgroundColor = COLORS.accentSoft,
  textColor = COLORS.accent,
}: BadgeProps) {
  return (
    <View className="rounded-full px-3 py-1" style={{ backgroundColor }}>
      <Text className="font-dm-semibold text-xs" style={{ color: textColor }}>
        {label}
      </Text>
    </View>
  );
}
