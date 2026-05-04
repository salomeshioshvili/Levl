import type { ReactNode } from "react";
import { View } from "react-native";

import { COLORS } from "../../constants/theme";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <View
      className="rounded-[18px] border p-4"
      style={{
        backgroundColor: COLORS.card,
        borderColor: COLORS.border,
      }}
    >
      {children}
    </View>
  );
}
