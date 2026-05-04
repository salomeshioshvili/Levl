import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type IonName = ComponentProps<typeof Ionicons>["name"];

/** Default outline icons per spend category when a row has no specific icon. */
export const CATEGORY_ICON: Record<string, IonName> = {
  food: "fast-food-outline",
  transport: "car-outline",
  shopping: "bag-handle-outline",
  bills: "document-text-outline",
  income: "trending-up-outline",
};

export function resolveIonIcon(icon: string | undefined, category: string): IonName {
  if (icon && isLikelyIonGlyph(icon)) {
    return icon as IonName;
  }
  return CATEGORY_ICON[category] ?? "ellipse-outline";
}

function isLikelyIonGlyph(s: string): boolean {
  return s.length > 2 && s.includes("-") && /^[a-z0-9-]+$/i.test(s);
}

const DEFAULT_GOAL_ICON: IonName = "flag-outline";

export function resolveGoalIcon(icon: string | undefined): IonName {
  if (icon && isLikelyIonGlyph(icon)) {
    return icon as IonName;
  }
  return DEFAULT_GOAL_ICON;
}
