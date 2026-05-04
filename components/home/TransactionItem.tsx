import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import { formatCurrency, formatTransactionRowDate } from "../../lib/formatters";
import { resolveIonIcon } from "../../lib/icons";
import type { Transaction } from "../../types";

type TransactionItemProps = {
  transaction: Transaction;
  showBottomBorder?: boolean;
};

export function TransactionItem({
  transaction,
  showBottomBorder = true,
}: TransactionItemProps) {
  const isIncome = transaction.amount > 0;
  const amountColor = isIncome ? COLORS.positive : COLORS.negative;
  const { recurring, merchant } = transaction;
  const cadenceLabel =
    recurring?.cadence === "monthly" ? "Monthly" : recurring?.cadence === "weekly" ? "Weekly" : null;

  return (
    <View
      className="flex-row items-center gap-3 py-3.5"
      style={
        showBottomBorder
          ? { borderBottomWidth: 1, borderBottomColor: COLORS.border }
          : undefined
      }
    >
      <View
        className="h-11 w-11 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: COLORS.chipInactiveBg,
          borderWidth: 1,
          borderColor: COLORS.border,
        }}
      >
        <Ionicons
          name={resolveIonIcon(transaction.icon, transaction.category)}
          size={20}
          color={COLORS.textSecondary}
        />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 15 }} numberOfLines={1}>
          {transaction.name}
        </Text>
        <View className="mt-1 flex-row flex-wrap items-center gap-1.5">
          {merchant ? (
            <Text className="font-dm" style={{ color: COLORS.mutedLight, fontSize: 12 }} numberOfLines={1}>
              {merchant}
            </Text>
          ) : null}
          {merchant ? (
            <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
              ·
            </Text>
          ) : null}
          <Text className="font-dm" style={{ color: COLORS.muted, fontSize: 12 }}>
            {formatTransactionRowDate(transaction.date)}
          </Text>
          {cadenceLabel ? (
            <View
              className="rounded-full px-2 py-0.5"
              style={{ backgroundColor: COLORS.accentSecondarySoft }}
            >
              <Text
                className="font-dm-semibold"
                style={{ color: COLORS.accentSecondary, fontSize: 10 }}
                numberOfLines={1}
              >
                {recurring?.planLabel ? `${cadenceLabel} · ${recurring.planLabel}` : cadenceLabel}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <Text className="font-dm-bold pl-1" style={{ color: amountColor, fontSize: 15, flexShrink: 0 }}>
        {formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
}
