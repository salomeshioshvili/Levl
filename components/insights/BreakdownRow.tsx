import { Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import type { SpendingCategory } from "../../types";

type BreakdownRowProps = {
  category: SpendingCategory;
  showBorderBottom?: boolean;
};

export function BreakdownRow({
  category,
  showBorderBottom = true,
}: BreakdownRowProps) {
  return (
    <View
      className="flex-row items-center gap-3 py-3.5"
      style={
        showBorderBottom
          ? { borderBottomWidth: 1, borderBottomColor: COLORS.border }
          : undefined
      }
    >
      <View
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: category.color }}
      />
      <Text className="flex-1 font-dm-semibold" style={{ color: COLORS.text, fontSize: 14 }}>
        {category.name}
      </Text>
      <View
        className="mr-2 h-1.5 overflow-hidden rounded-full"
        style={{ width: 88, backgroundColor: COLORS.surfaceInset }}
      >
        <View
          style={{
            height: 6,
            width: `${category.percentage}%`,
            borderRadius: 6,
            backgroundColor: category.color,
          }}
        />
      </View>
      <Text className="font-dm-semibold w-10 text-right" style={{ color: COLORS.textSecondary, fontSize: 13 }}>
        {category.percentage}%
      </Text>
    </View>
  );
}
