import React from "react";
import { Switch as RNSwitch } from "react-native";

export type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const Switch = ({ value, onValueChange }: SwitchProps) => (
  <RNSwitch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: "#ddd", true: "#E53E3E" }}
    thumbColor={value ? "#fff" : "#f4f3f4"}
  />
);
