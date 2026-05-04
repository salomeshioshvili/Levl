import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import {
  DMSans_400Regular,
  DMSans_600SemiBold,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Platform, View, type ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { COLORS } from "../constants/theme";
import { useGamificationStore } from "../store/useGamificationStore";

SplashScreen.preventAutoHideAsync();

const webFill: ViewStyle | undefined =
  Platform.OS === "web" ? ({ minHeight: "100vh" } as unknown as ViewStyle) : undefined;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });
  const registerCheckIn = useGamificationStore((s) => s.registerCheckIn);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      registerCheckIn();
    }
  }, [loaded, error, registerCheckIn]);

  if (!loaded && !error) {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: COLORS.background,
            alignItems: "center",
            justifyContent: "center",
          },
          webFill,
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={[{ flex: 1, backgroundColor: COLORS.background }, webFill]}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1 } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="budgets" />
        <Stack.Screen name="privacy-data" />
        <Stack.Screen name="export-data" />
        <Stack.Screen name="connected-accounts" />
        <Stack.Screen name="about-demo" />
        <Stack.Screen
          name="modals/add-goal"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
        <Stack.Screen
          name="modals/contribute-goal"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
