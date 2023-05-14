import { useState } from "react";
import { TextInput, View, Text, Modal, TouchableOpacity } from "react-native";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import { theme } from "../../themes";

const EditCategoryModel = ({
  showEditCategory,
  setShowEditCategory,
  name,
  _id,
  color,
}) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [newName, setNewName] = useState(name);
  const HandleSave = () => {
    closeModel();
  };
  const closeModel = () => setShowEditCategory(false);
  return (
    <Modal
      transparent
      visible={showEditCategory}
      animationType="fade"
      onRequestClose={() => setShowEditCategory(false)}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          backgroundColor: theme.colors.transparentBackground,
        }}
      >
        <View
          style={{
            padding: 24,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            overflow: "hidden",
            borderRadius: 12,
            gap: 24,
          }}
        >
          <ColorPicker
            hideSliders
            color={selectedColor}
            onColorChange={(color) => setSelectedColor(fromHsv(color))}
            style={{ width: "100%", height: 300 }}
          />
          <TextInput
            inputMode="text"
            placeholder="Category name"
            placeholderTextColor={theme.colors.textSecondary}
            onChange={(e) => setNewName(e.nativeEvent.text)}
            value={newName}
            cursorColor={theme.colors.text}
            style={{
              color: theme.colors.text,
              height: 40,
              borderColor: theme.colors.border,
              borderWidth: 1,
              padding: 8,
              fontSize: 16,
              borderRadius: 12,
              width: "100%",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <TouchableOpacity onPress={HandleSave}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 20,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModel}>
              <Text
                style={{
                  color: theme.colors.error,
                  fontSize: 20,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCategoryModel;
