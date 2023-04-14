import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { useState, useRef, ReactNode } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";

import { theme } from "../themes";
import { CategoryRow } from "../components/CategoryRow";

const Categories = ({ navigation }) => {
  const [newName, setNewName] = useState("");
  const [selectedColor, setSelectedColor] = useState(theme.colors.primary);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef([]);
  let prevOpenedRow: any = null,
    currentOpenRow: any = null;

  const createCategory = () => {
    setCategories([
      ...categories,
      { _id: Math.random() * 100000, name: newName, color: selectedColor },
    ]);
    setNewName("");
    setSelectedColor(theme.colors.primary);
  };

  // const createTwoButtonAlert = (_id: any) => {
  //   Alert.alert("Alert Title", "My Alert Msg", [
  //     {
  //       text: "Cancel",
  //       onPress: () => {},
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => deleteCategory(_id), style: "destructive" },
  //   ]);
  // };

  const deleteCategory = (_id: any) => {
    setCategories(categories.filter((category) => category._id !== _id));
  };

  const handleDelete = (ind: any, _id: any) => {
    deleteCategory(_id);
    categoriesRef.current[ind].close();
  };

  const closePrevOpenRow = (e: { target: any }) => {
    if (
      currentOpenRow != null &&
      e.target != categoriesRef.current[currentOpenRow]
    )
      categoriesRef.current[currentOpenRow].close();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          margin: 16,
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
        onStartShouldSetResponder={() => true}
        onResponderStart={closePrevOpenRow}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
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
              onSwipeableWillOpen={() => (currentOpenRow = ind)}
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
              width: 40,
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
              borderRadius: 8,
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
              onChange={(event) => setNewName(event.nativeEvent.text)}
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    </>
  );
};

export default Categories;
