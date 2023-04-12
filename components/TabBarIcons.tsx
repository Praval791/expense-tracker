import React from "react";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ADI from "@expo/vector-icons/AntDesign";

type TabBarIconProps = {
  type: "expenses" | "reports" | "add" | "settings";
  color: string;
  size: number;
}

export const TabBarIcon = ({ type, color, size }: TabBarIconProps) => {
  switch (type) {
    case "expenses":
      return <MCI name="wallet-outline" color={color} size={size} />;
    case "reports":
      return <Ionicons name="bar-chart" size={size} color={color} />;
    case "add":
      return <ADI name="plus" size={size} color={color} />;
    case "settings":
      return <MCI name="cog" size={size} color={color} />;
    default:
      return null;
  }
};
