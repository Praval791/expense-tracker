import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Text,
} from "react-native";
import { useState, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

import { theme } from "../themes";
import { CategoryRow } from "../components/CategoryRow";
import ColorPickerModel from "../components/models/ColorPickerModel";

const Categories = ({ navigation }) => {
  const [newName, setNewName] = useState("");
  const [selectedColor, setSelectedColor] = useState(theme.colors.primary);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const categoriesRef = useRef([]);
  const scrollViewRef = useRef(null);
  let prevOpenRow: any = null;

  const createCategory = () => {
    const newName_Trimmed = newName.trim();
    if (!newName_Trimmed.length) {
      toast.hideAll();
      toast.show(`Enter a valid Category name`, {
        type: "normal",
        placement: "bottom",
        duration: 3000,
        animationType: "zoom-in",
        icon: (
          <Ionicons
            name="warning-outline"
            size={24}
            color={theme.colors.warning}
          />
        ),
        textStyle: {
          color: theme.colors.warning,
          fontSize: 14,
        },
      });

      return;
    }

    if (categories.find(({ name }) => name === newName_Trimmed)) {
      toast.hideAll();

      toast.show(`Category ${newName_Trimmed} already exists`, {
        type: "normal",
        placement: "bottom",
        duration: 3000,
        animationType: "zoom-in",
        icon: (
          <Ionicons
            name="warning-outline"
            size={24}
            color={theme.colors.warning}
          />
        ),
        textStyle: {
          color: theme.colors.warning,
          fontSize: 14,
        },
      });
      return;
    }

    setCategories([
      ...categories,
      {
        _id: Math.random() * 100000,
        name: newName_Trimmed,
        color: selectedColor,
      },
    ]);

    toast.hideAll();
    toast.show(`Category ${newName_Trimmed} Added`, {
      type: "normal",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      icon: (
        <Ionicons
          name="checkmark-circle-outline"
          size={24}
          color={theme.colors.success}
        />
      ),
      textStyle: {
        color: theme.colors.success,
        fontSize: 14,
      },
    });

    setNewName("");
    setSelectedColor(theme.colors.primary);
  };

  const deleteCategory = (_id: any) => {
    setCategories(categories.filter((category) => category._id !== _id));
  };

  const handleDelete = (ind: any, _id: any) => {
    deleteCategory(_id);
    categoriesRef.current[ind].close();
  };

  const closePrevOpenRow = (e: { target: any }) => {
    if (prevOpenRow != null && e.target != categoriesRef.current[prevOpenRow])
      categoriesRef.current[prevOpenRow].close();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          margin: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            marginBottom: 16,
          }}
          onStartShouldSetResponder={() => true}
          onTouchStart={closePrevOpenRow}
        >
          {categories.map(({ _id, color, name }, ind) => (
            <Swipeable
              key={ind}
              ref={(ref) => (categoriesRef.current[ind] = ref)}
              renderRightActions={() => (
                <View
                  style={{
                    backgroundColor: theme.colors.error,
                    width: "100%",
                  }}
                >
                  <RectButton
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => handleDelete(ind, _id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                    <Text
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      Delete
                    </Text>
                  </RectButton>
                </View>
              )}
              onSwipeableWillOpen={() => {
                if (prevOpenRow != null && ind != prevOpenRow)
                  categoriesRef.current[prevOpenRow].close();
                prevOpenRow = ind;
              }}
            >
              <CategoryRow color={color} name={name} />
            </Swipeable>
          ))}
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setShowColorPicker((showColorPicker) => !showColorPicker)
            }
            style={{
              backgroundColor: selectedColor,
              height: 40,
              aspectRatio: 1 / 1,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: theme.colors.border,
            }}
          ></TouchableOpacity>
          <View
            style={{
              height: 40,
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderRadius: 12,
              flexDirection: "row",
              flex: 1,
              marginLeft: 16,
              padding: 8,
            }}
          >
            <TextInput
              inputMode="text"
              placeholder="Category name"
              placeholderTextColor={theme.colors.textSecondary}
              onChange={(e) => setNewName(e.nativeEvent.text)}
              onSubmitEditing={createCategory}
              value={newName}
              cursorColor={theme.colors.text}
              style={{
                color: theme.colors.text,
                flex: 1,
              }}
            />
            <TouchableOpacity
              children={
                <Ionicons name="send" size={20} color={theme.colors.primary} />
              }
              onPress={createCategory}
              style={{
                paddingLeft: 8,
              }}
            ></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ColorPickerModel
        {...{
          showColorPicker,
          setShowColorPicker,
          selectedColor,
          setSelectedColor,
        }}
      />
    </>
  );
};

export default Categories;
