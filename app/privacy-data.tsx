import { Text, View } from "react-native";

import { SubscreenScaffold } from "../components/layout/SubscreenScaffold";
import { COLORS } from "../constants/theme";

function Block({ title, children }: { title: string; children: string }) {
  return (
    <View
      className="mt-5 rounded-[16px] p-5"
      style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }}
    >
      <Text className="font-dm-bold" style={{ color: COLORS.text, fontSize: 16 }}>
        {title}
      </Text>
      <Text className="font-dm mt-3 leading-[22px]" style={{ color: COLORS.textSecondary, fontSize: 14 }}>
        {children}
      </Text>
    </View>
  );
}

export default function PrivacyDataScreen() {
  return (
    <SubscreenScaffold
      title="Privacy & data"
      subtitle="How Levl (demo) treats your information."
    >
      <Block title="What we store today">
        In this demo, goals, budgets, and transactions live on your device only. Nothing is sent to a
        Levl server because there isn’t one yet.
      </Block>
      <Block title="When you connect banks later">
        Read-only access, encryption in transit, and the ability to disconnect an institution at any
        time. We’ll publish a full policy before any real connection flow ships.
      </Block>
      <Block title="Analytics">
        If we add product analytics, they’ll be opt-in and documented here with retention windows.
      </Block>
      <Block title="Contact">
        Questions about this build? Use your project README or portfolio contact — placeholder until
        there’s a support inbox.
      </Block>
    </SubscreenScaffold>
  );
}
