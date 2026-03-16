import React from "react";
import { Switch as RNSwitch } from "react-native";

export type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const SWITCH_COLORS = {
  trackFalse: "#ddd",
  trackTrue: "#E53E3E",
  thumbTrue: "#fff",
  thumbFalse: "#f4f3f4",
} as const;

export const Switch = ({ value, onValueChange }: SwitchProps) => (
  <RNSwitch
    value={value}
    onValueChange={onValueChange}
    trackColor={{
      false: SWITCH_COLORS.trackFalse,
      true: SWITCH_COLORS.trackTrue,
    }}
    thumbColor={value ? SWITCH_COLORS.thumbTrue : SWITCH_COLORS.thumbFalse}
  />
);
