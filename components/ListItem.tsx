import { Text, TouchableOpacity } from "react-native";
import React, { useMemo, ReactNode } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { theme } from "../themes";
type ListItemProps = {
  label: string;
  detail?: ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: () => void;
  isDestructive?: boolean;
};

export const ListItem = ({
  label,
  detail,
  onClick,
  swipeToDelete,
  onDelete,
  isDestructive,
}: ListItemProps) => {
  const item = useMemo(
    () => (
      <TouchableOpacity
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: !!detail ? "space-between" : "flex-start",
          alignItems: "center",
          minHeight: 50,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
        onPress={onClick}
        disabled={!onClick}
        activeOpacity={0.6}
      >
        <Text
          style={{
            fontSize: 18,
            color: isDestructive ? theme.colors.error : theme.colors.text,
          }}
        >
          {label}
        </Text>
        {detail}
      </TouchableOpacity>
    ),
    [label, detail]
  );

  if (swipeToDelete)
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 100,
            }}
            onPress={onDelete}
          >
            <Text style={{ color: theme.colors.text }}> Delete</Text>
          </TouchableOpacity>
        )}
        onSwipeableOpen={onDelete}
      >
        {item}
      </Swipeable>
    );
  return item;
};
