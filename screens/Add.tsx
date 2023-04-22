import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { ListItem } from "../components/ListItem";
import { theme } from "../themes";
import { Recurrence } from "../types/recurrence";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useToast } from "react-native-toast-notifications";
import Ionicons from "@expo/vector-icons/Ionicons";

const categories = [
  { _id: 1, name: "Category 1", color: "#FF0000" },
  { _id: 2, name: "Category 2", color: "#00FF00" },
  { _id: 3, name: "Category 3", color: "#0000FF" },
  { _id: 4, name: "Category 4", color: "#FFFF00" },
  { _id: 5, name: "Category 5", color: "#00FFFF" },
  { _id: 6, name: "Category 6", color: "#FF00FF" },
  { _id: 7, name: "Category 7", color: "#C0C0C0" },
  { _id: 8, name: "Category 8", color: "#808080" },
  { _id: 9, name: "Category 9", color: "#800000" },
  { _id: 10, name: "Category 10", color: "#008000" },
];

const Add = () => {
  const [amount, setAmount] = React.useState("");
  const [recurrence, setRecurrence] = React.useState<Recurrence>(
    Recurrence.None
  );
  const [date, setDate] = React.useState(new Date());
  const [note, setNote] = React.useState("");
  const [category, setCategory] = React.useState(categories[0]);

  const snapPoints = useMemo(() => ["30%"], []);
  const sheetRef = useRef<BottomSheet>(null);
  const [sheetView, setSheetView] = React.useState<"recurrence" | "category">(
    "recurrence"
  );

  const toast = useToast();

  function isAmountInRange(enteredAmount: string) {
    const parsedAmount = parseFloat(enteredAmount);
    return parsedAmount > -1000000000 && parsedAmount < 1000000000;
  }

  function isValidAmount(enteredAmount: string) {
    try {
      const parsedAmount = parseFloat(enteredAmount);
      return !!parsedAmount;
    } catch (error) {
      return false;
    }
  }

  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    sheetRef.current?.close();
  };

  const selectCategory = (
    selectedCategory: React.SetStateAction<{
      _id: number;
      name: string;
      color: string;
    }>
  ) => {
    setCategory(selectedCategory);
    sheetRef.current?.close();
  };

  const clearForm = () => {
    setAmount("");
    setRecurrence(Recurrence.None);
    setDate(new Date());
    setNote("");
    setCategory(categories[0]);
  };

  const submitExpense = () => {
    if (!isValidAmount(amount)) {
      toast.hideAll();
      toast.show(`Amount is not valid.`, {
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
    if (!isAmountInRange(amount)) {
      toast.hideAll();
      toast.show(`Amount exceeds limit.`, {
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
    /** Add expense */
    clearForm();

    toast.hideAll();
    toast.show(`Expense Added Successfully`, {
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
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => sheetRef.current?.close?.()
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {}
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{
          margin: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <View
          style={{
            borderRadius: 12,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <ListItem
            label="Amount"
            detail={
              <TextInput
                placeholder="Amount"
                onChange={(e) => setAmount(e.nativeEvent.text)}
                value={amount}
                keyboardType="numeric"
                placeholderTextColor={theme.colors.textSecondary}
                cursorColor={theme.colors.text}
                style={{
                  width: 100,
                  textAlign: "right",
                  color: theme.colors.text,
                  fontSize: 16,
                }}
              />
            }
          />
          <ListItem
            label="Recurrence"
            detail={
              <TouchableOpacity
                style={{
                  width: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
                onPress={() => {
                  setSheetView("recurrence");
                  Keyboard.dismiss();
                  sheetRef.current?.snapToIndex(0);
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    textTransform: "capitalize",
                    fontSize: 16,
                  }}
                >
                  {recurrence}
                </Text>
              </TouchableOpacity>
            }
          />
          <ListItem
            label="Date"
            detail={
              <DateTimePickerDetail
                date={date}
                sheetRef={sheetRef}
                setDate={setDate}
              />
            }
          />
          <ListItem
            label="Note"
            detail={
              <TextInput
                placeholder="Note"
                onChange={(event) => setNote(event.nativeEvent.text)}
                value={note}
                placeholderTextColor={theme.colors.textSecondary}
                cursorColor={theme.colors.text}
                style={{
                  width: 100,
                  textAlign: "right",
                  color: theme.colors.text,
                  fontSize: 16,
                }}
              />
            }
          />
          <ListItem
            label="Category"
            detail={
              <TouchableOpacity
                style={{
                  width: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
                onPress={() => {
                  setSheetView("category");
                  Keyboard.dismiss();
                  sheetRef.current?.snapToIndex(0);
                }}
              >
                <Text
                  style={{
                    color: category?.color || theme.colors.primary,
                    textTransform: "capitalize",
                    fontSize: 16,
                  }}
                >
                  {category?.name}
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primaryShadow,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            marginTop: 32,
          }}
          onPress={submitExpense}
          activeOpacity={0.6}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "600",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Add expense
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enableOverDrag={false}
        backgroundComponent={() => (
          <View style={{ backgroundColor: theme.colors.card, flex: 1 }}></View>
        )}
        handleStyle={{
          backgroundColor: theme.colors.card,

          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.textSecondary,
        }}
        enablePanDownToClose
      >
        {sheetView === "recurrence" && (
          <BottomSheetScrollView
            style={{ backgroundColor: theme.colors.card }}
            snapToAlignment="start"
          >
            {Object.keys(Recurrence).map((item, index) => (
              <TouchableHighlight
                key={index}
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 12,
                  borderBottomColor: theme.colors.border,
                  borderBottomWidth:
                    index === Object.keys(Recurrence).length - 1 ? 0 : 1,
                }}
                onPress={() => selectRecurrence(item)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>{item}</Text>
              </TouchableHighlight>
            ))}
          </BottomSheetScrollView>
        )}
        {sheetView === "category" && (
          <BottomSheetScrollView
            style={{ backgroundColor: theme.colors.card }}
            snapToAlignment="start"
          >
            {categories.map((item, index) => (
              <TouchableHighlight
                key={index}
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 12,

                  borderBottomColor: theme.colors.border,
                  borderBottomWidth: index === categories.length - 1 ? 0 : 1,
                }}
                onPress={() => selectCategory(item)}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: item.color,
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                    }}
                  />
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontSize: 18,
                      marginLeft: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </>
  );
};

export default Add;

const DateTimePickerDetail = ({ date, setDate, sheetRef }) => {
  if (Platform.OS === "ios") {
    return (
      <DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        themeVariant="dark"
        style={{
          backgroundColor: theme.colors.card,
        }}
        maximumDate={new Date()}
        minimumDate={
          new Date(
            new Date().getFullYear() - 1,
            new Date().getMonth(),
            new Date().getDate()
          )
        }
        onChange={(event, newDate) => setDate(newDate)}
      />
    );
  }
  return (
    <TouchableOpacity
      style={{
        width: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      onPress={() => {
        // Keyboard.dismiss();
        sheetRef.current?.close?.();
        DateTimePickerAndroid.open({
          value: date,
          mode: "date",
          is24Hour: true,
          display: "spinner",
          maximumDate: new Date(),
          minimumDate: new Date(
            new Date().getFullYear() - 1,
            new Date().getMonth(),
            new Date().getDate()
          ),

          onChange: (event, newDate) => setDate(newDate),
        });
      }}
    >
      <Text
        style={{
          color: theme.colors.primary,
          textTransform: "capitalize",
          fontSize: 16,
        }}
      >
        {date.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};

{
  /* {sheetView === "recurrence" && (
          <BottomSheetFlatList
            data={Object.keys(Recurrence)}
            keyExtractor={(i) => i}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 12,
                  borderBottomColor: theme.colors.border,
                  borderBottomWidth:
                    index === Object.keys(Recurrence).length - 1 ? 0 : 1,
                }}
                onPress={() => selectRecurrence(item)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>{item}</Text>
              </TouchableHighlight>
            )}
          />
        )} */
}
