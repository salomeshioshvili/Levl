import { Text, View } from "react-native";

import { SubscreenScaffold } from "../components/layout/SubscreenScaffold";
import { COLORS } from "../constants/theme";

export default function ExportDataScreen() {
  return (
    <SubscreenScaffold
      title="Export data"
      subtitle="Take your demo data with you (CSV coming soon)."
    >
      <View
        className="mt-2 rounded-[16px] p-5"
        style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }}
      >
        <Text className="font-dm-semibold" style={{ color: COLORS.textTertiary, fontSize: 12, letterSpacing: 0.6 }}>
          PLANNED EXPORT
        </Text>
        <Text className="font-dm mt-3 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 15 }}>
          A future build will let you download:
        </Text>
        <Text className="font-dm mt-2 leading-[24px]" style={{ color: COLORS.text, fontSize: 15 }}>
          {"\u2022"} Transactions (date, merchant, category, amount){"\n"}
          {"\u2022"} Goals and contributions{"\n"}
          {"\u2022"} Weekly budget history
        </Text>
        <View className="mt-5 rounded-[12px] px-4 py-3" style={{ backgroundColor: COLORS.surfaceInset }}>
          <Text className="font-dm" style={{ color: COLORS.textTertiary, fontSize: 13 }}>
            For now, use screenshots or duplicate the mock dataset in code if you need a static sample
            for design reviews.
          </Text>
        </View>
      </View>
    </SubscreenScaffold>
  );
}
