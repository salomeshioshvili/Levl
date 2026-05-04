import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, TAB_BAR_FLOAT_HEIGHT } from "../../constants/theme";

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 12);

  /** Web: `absolute` sits under the scene; `fixed` + z-index keeps the bar above RN web layers (esp. mobile Safari). */
  const webDock: ViewStyle | null =
    Platform.OS === "web"
      ? ({
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          elevation: 99999,
        } as unknown as ViewStyle)
      : null;

  const nativeDock =
    Platform.OS !== "web"
      ? ({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        } as const)
      : null;

  return (
    <View
      style={[
        styles.wrapBase,
        nativeDock,
        webDock,
        {
          paddingBottom: bottom,
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.bar} pointerEvents="auto">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? String(options.tabBarLabel)
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = options.tabBarIcon;
          const color = isFocused ? COLORS.accent : COLORS.textTertiary;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tab}
            >
              {typeof Icon === "function"
                ? Icon({ focused: isFocused, color, size: isFocused ? 23 : 21 })
                : null}
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapBase: {
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "92%",
    maxWidth: 420,
    minHeight: TAB_BAR_FLOAT_HEIGHT,
    paddingHorizontal: 8,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 4,
  },
  label: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
