import { Pressable, Text } from "react-native";

import { COLORS } from "../../constants/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl px-6 py-3 active:opacity-90"
      style={{ backgroundColor: COLORS.accent }}
    >
      <Text className="text-center font-dm-bold text-sm" style={{ color: COLORS.onAccent }}>
        {title}
      </Text>
    </Pressable>
  );
}
