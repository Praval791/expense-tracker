import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../themes";
import { MaterialIcons } from "@expo/vector-icons";
import EditCategoryModel from "./models/EditCategoryModel";
import { Category } from "../types/category";

export const CategoryRow = ({
  color,
  name,
  _id,
}: {
  color: string;
  name: string;
  _id: string;
}) => {
  const [showEditCategoryModal, setShowEditCategoryModal] =
    useState<boolean>(false);
  const onClickEditCategory = () => {
    setShowEditCategoryModal(true);
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              width: 24,
              aspectRatio: 1 / 1,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: theme.colors.border,
            }}
          />
          <Text
            style={{ color: theme.colors.text, fontSize: 16, marginLeft: 8 }}
          >
            {name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onClickEditCategory()}>
          <MaterialIcons name="edit" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <EditCategoryModel
        showEditCategory={showEditCategoryModal}
        setShowEditCategory={setShowEditCategoryModal}
        name={name}
        _id={_id}
        color={color}
      />
    </>
  );
};
