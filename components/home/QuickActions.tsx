import type { ComponentProps } from "react";
import { router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants/theme";

const ACTIONS: {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  href?: string;
  onPress?: () => void;
}[] = [
  { label: "Activity", icon: "list-outline", href: "/activity" },
  { label: "Transfer", icon: "swap-horizontal-outline", onPress: () => Alert.alert("Transfer", "Connect an account to send money.") },
  { label: "Goals", icon: "flag-outline", href: "/goals" },
  { label: "More", icon: "ellipsis-horizontal", onPress: () => Alert.alert("More", "Statements and exports — coming soon.") },
];

export function QuickActions() {
  return (
    <View style={{ marginTop: 28 }}>
      <Text className="font-dm-semibold px-0.5" style={{ color: COLORS.textTertiary, fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase" }}>
        Shortcuts
      </Text>
      <View className="mt-3 flex-row justify-between">
        {ACTIONS.map((a) => (
          <Pressable
            key={a.label}
            onPress={() => {
              if (a.href) router.push(a.href);
              else a.onPress?.();
            }}
            style={({ pressed }) => ({
              width: "23%",
              alignItems: "center",
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <View
              style={{
                marginBottom: 8,
                height: 48,
                width: 48,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                backgroundColor: COLORS.surface,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            >
              <Ionicons name={a.icon} size={22} color={COLORS.textSecondary} />
            </View>
            <Text className="font-dm text-center" style={{ color: COLORS.textTertiary, fontSize: 11 }}>
              {a.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
