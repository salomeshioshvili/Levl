import { View } from "react-native";

import { COLORS } from "../../constants/theme";

type ProgressBarProps = {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
};

export function ProgressBar({
  progress,
  height = 4,
  trackColor = COLORS.surfaceInset,
  fillColor = COLORS.accent,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, progress));
  const radius = height > 6 ? 999 : 4;
  return (
    <View
      className="w-full overflow-hidden"
      style={{ height, backgroundColor: trackColor, borderRadius: radius }}
    >
      <View
        style={{
          height,
          width: `${pct}%`,
          backgroundColor: fillColor,
          borderRadius: radius,
        }}
      />
    </View>
  );
}
