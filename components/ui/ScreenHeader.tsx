import { Text, View } from "react-native";

import { COLORS, FONT_SIZE } from "../../constants/theme";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View className="pb-4">
      <Text
        className="font-dm-bold"
        style={{
          color: COLORS.text,
          fontSize: 26,
          letterSpacing: -0.6,
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          className="font-dm mt-1"
          style={{
            color: COLORS.textTertiary,
            fontSize: FONT_SIZE.sm,
            letterSpacing: 0.1,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
