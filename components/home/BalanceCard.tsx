import { Text, View } from "react-native";

import { SCREEN_EDGE_GUTTER } from "../../constants/layout";
import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../lib/formatters";

type BalanceCardProps = {
  totalBalance: number;
  changePercent: number;
};

export function BalanceCard({ totalBalance, changePercent }: BalanceCardProps) {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: COLORS.surfaceRaised,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: Math.max(20, SCREEN_EDGE_GUTTER - 4),
        paddingVertical: 22,
      }}
    >
      <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 13, letterSpacing: 0.2 }}>
        Total balance
      </Text>
      <Text
        className="mt-2 font-dm-bold"
        style={{ color: COLORS.text, fontSize: 36, letterSpacing: -1.2 }}
      >
        {formatCurrency(totalBalance)}
      </Text>
      <View className="mt-4 flex-row items-center gap-2">
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            backgroundColor: COLORS.positiveMuted,
          }}
        >
          <Text className="font-dm-semibold" style={{ color: COLORS.positive, fontSize: 12 }}>
            +{changePercent}%
          </Text>
        </View>
        <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
          vs last month
        </Text>
      </View>
    </View>
  );
}
