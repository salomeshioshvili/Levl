import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SubscreenScaffold } from "../components/layout/SubscreenScaffold";
import { COLORS } from "../constants/theme";
import { mockLinkedInstitutions } from "../data/mock";

export default function ConnectedAccountsScreen() {
  return (
    <SubscreenScaffold
      title="Connected accounts"
      subtitle="Demo institutions — no live bank link in this build."
    >
      <View className="mt-2 gap-3">
        {mockLinkedInstitutions.map((b) => (
          <View
            key={b.id}
            className="flex-row items-center justify-between rounded-[16px] px-4 py-4"
            style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }}
          >
            <View className="flex-row items-center gap-3">
              <View
                className="h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: COLORS.surfaceInset }}
              >
                <Ionicons name="business-outline" size={22} color={COLORS.textSecondary} />
              </View>
              <View>
                <Text className="font-dm-semibold" style={{ color: COLORS.text, fontSize: 16 }}>
                  {b.name}
                </Text>
                <Text className="font-dm mt-0.5" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
                  {b.detail}
                </Text>
              </View>
            </View>
            <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: COLORS.positiveMuted }}>
              <Text className="font-dm-semibold" style={{ color: COLORS.positive, fontSize: 11 }}>
                {b.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="font-dm mt-8 leading-[22px]" style={{ color: COLORS.textTertiary, fontSize: 14 }}>
        When you add real aggregation, each connection will show last sync time, consent scope, and a
        one-tap disconnect action here.
      </Text>
    </SubscreenScaffold>
  );
}
