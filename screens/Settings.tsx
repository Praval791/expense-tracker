import { View, Text } from "react-native";
import React from "react";
import { ListItem } from "../components/ListItem";

import Entypo from "@expo/vector-icons/Entypo";
import { theme } from "../themes";

const Settings = () => {
  return (
    <View
      style={{
        margin: 16,
        borderRadius: 11,
        overflow: "hidden",
      }}
    >
      <ListItem
        label="Categories"
        detail={
          <Entypo
            name="chevron-thin-right"
            color={theme.colors.text}
            style={{ opacity: 0.3 }}
            size={20}
          />
        }
        onClick={() => {}}
      />
      <ListItem
        label="Report a bug"
        detail={
          <Entypo
            name="chevron-thin-right"
            color={theme.colors.text}
            style={{ opacity: 0.3 }}
            size={20}
          />
        }
        onClick={() => {}}
      />
      <ListItem label="Erase all Data" isDestructive onClick={() => {}} />
    </View>
  );
};

export default Settings;
