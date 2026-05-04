import { Redirect } from "expo-router";

/** Entry `/` → main tabs (no auth gate). */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
