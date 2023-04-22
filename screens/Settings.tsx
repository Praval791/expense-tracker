import { View, Modal, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import { ListItem } from "../components/ListItem";

import { theme } from "../themes";
import { useState, useRef } from "react";
import EraseAllDataModel from "../components/models/EraseAllDataModel";

const Settings = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View
      style={{
        margin: 16,
        borderRadius: 12,
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
        onClick={() => {
          navigation.navigate("Categories");
        }}
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
      <ListItem
        label="Erase all Data"
        isDestructive
        onClick={() => setShowModal(true)}
      />
      <EraseAllDataModel {...{ showModal, setShowModal }} />
    </View>
  );
};

export default Settings;
