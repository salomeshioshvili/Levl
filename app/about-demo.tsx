import { Text, View } from "react-native";

import { SubscreenScaffold } from "../components/layout/SubscreenScaffold";
import { COLORS } from "../constants/theme";

export default function AboutDemoScreen() {
  return (
    <SubscreenScaffold title="About this demo" subtitle="Levl sample data and scope.">
      <Text className="font-dm mt-2 leading-[24px]" style={{ color: COLORS.textSecondary, fontSize: 15 }}>
        Balances and some summaries are static mock values. Goals, contributions, weekly food budgets,
        and filters update in-session so you can feel the flows. Nothing persists after a full app
        restart unless you add storage later.
      </Text>
    </SubscreenScaffold>
  );
}
