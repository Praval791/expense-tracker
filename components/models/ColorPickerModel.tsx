import { View, Text, Modal, TouchableOpacity } from "react-native";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import { theme } from "../../themes";

const ColorPickerModel = ({
  showColorPicker,
  setShowColorPicker,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <Modal
      transparent
      visible={showColorPicker}
      animationType="fade"
      onRequestClose={() => setShowColorPicker(false)}
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
          }}
        >
          <TriangleColorPicker
            hideControls
            hideSliders
            color={selectedColor}
            onColorChange={(color) => setSelectedColor(fromHsv(color))}
            style={{ width: "100%", height: 300 }}
          />
          <TouchableOpacity onPress={() => setShowColorPicker(false)}>
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 20,
              }}
            >
              select
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ColorPickerModel;
