import { FlexStyle, StyleSheet, View, ViewStyle } from "react-native";
import { isNotNullish } from "../utils/nullish";
import { SpacingValue, spacingValues } from "./Space";

const baseStyle: FlexStyle = {
  flexGrow: 1,
  flexShrink: 1,
};

const rawHeightStyles: Record<number, ViewStyle> = {};
const rawWidthStyles: Record<number, ViewStyle> = {};

spacingValues.forEach(value => {
  rawHeightStyles[value] = { ...baseStyle, minHeight: value };
  rawWidthStyles[value] = { ...baseStyle, minWidth: value };
});

const styles = StyleSheet.create({
  base: baseStyle,
});

const heightStyles = StyleSheet.create(rawHeightStyles);
const widthStyles = StyleSheet.create(rawWidthStyles);

type Props = {
  minHeight?: SpacingValue;
  minWidth?: SpacingValue;
};

export const Fill = ({ minHeight, minWidth }: Props) => (
  <View
    focusable={false}
    pointerEvents="none"
    style={[
      styles.base,
      isNotNullish(minHeight) && heightStyles[minHeight],
      isNotNullish(minWidth) && widthStyles[minWidth],
    ]}
  />
);
