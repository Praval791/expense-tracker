import { View, Text } from "react-native";
import { theme } from "../themes";

export const CategoryRow = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "flex-start",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    }}
  >
    <View
      style={{
        backgroundColor: color,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.border,
      }}
    />
    <Text style={{ color: "white", fontSize: 16, marginLeft: 8 }}>{name}</Text>
  </View>
);
