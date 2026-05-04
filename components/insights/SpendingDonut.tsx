import { Text, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../lib/formatters";
import type { SpendingCategory } from "../../types";

function slicePath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number
) {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const large = endDeg - startDeg > 180 ? 1 : 0;

  const x1 = cx + rOuter * Math.cos(toRad(startDeg));
  const y1 = cy + rOuter * Math.sin(toRad(startDeg));
  const x2 = cx + rOuter * Math.cos(toRad(endDeg));
  const y2 = cy + rOuter * Math.sin(toRad(endDeg));
  const x3 = cx + rInner * Math.cos(toRad(endDeg));
  const y3 = cy + rInner * Math.sin(toRad(endDeg));
  const x4 = cx + rInner * Math.cos(toRad(startDeg));
  const y4 = cy + rInner * Math.sin(toRad(startDeg));

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

type SpendingDonutProps = {
  categories: SpendingCategory[];
  centerLabel: string;
  centerAmount: number;
  footnote?: string;
};

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUT = 92;
const R_IN = 58;

export function SpendingDonut({
  categories,
  centerLabel,
  centerAmount,
  footnote,
}: SpendingDonutProps) {
  const totalPct = categories.reduce((s, c) => s + c.percentage, 0) || 1;

  let cursor = 0;
  const arcs = categories.map((c) => {
    const sweep = (c.percentage / totalPct) * 360;
    const start = cursor;
    const end = cursor + sweep;
    cursor = end;
    return { c, start, end };
  });

  return (
    <View
      className="items-center px-4 py-5"
      style={{
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
      }}
    >
      <Text className="font-dm-semibold self-start" style={{ color: COLORS.text, fontSize: 15 }}>
        This month
      </Text>
      <Text className="font-dm mt-1 self-start" style={{ color: COLORS.textTertiary, fontSize: 12 }}>
        {footnote ?? "Share of spending by type"}
      </Text>

      <View className="relative mt-4" style={{ width: SIZE, height: SIZE }}>
        <Svg width={SIZE} height={SIZE}>
          <G>
            {arcs.map(({ c, start, end }) => (
              <Path
                key={c.name}
                d={slicePath(CX, CY, R_OUT, R_IN, start, end)}
                fill={c.color}
                opacity={0.92}
              />
            ))}
          </G>
        </Svg>
        <View
          className="absolute"
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          pointerEvents="none"
        >
          <Text className="font-dm text-center" style={{ color: COLORS.textTertiary, fontSize: 11 }}>
            {centerLabel}
          </Text>
          <Text
            className="font-dm-bold mt-0.5 text-center"
            style={{ color: COLORS.text, fontSize: 17, letterSpacing: -0.3 }}
          >
            {formatCurrency(centerAmount)}
          </Text>
        </View>
      </View>

      <View className="mt-4 w-full flex-row flex-wrap justify-center gap-x-4 gap-y-2">
        {categories.map((c) => (
          <View key={c.name} className="flex-row items-center gap-2">
            <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            <Text className="font-dm" style={{ color: COLORS.textSecondary, fontSize: 12 }}>
              {c.name} {c.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
