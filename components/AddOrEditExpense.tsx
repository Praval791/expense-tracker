import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Keyboard,
  Platform,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ListItem } from "./ListItem";
import { theme } from "../themes";
import { Recurrence } from "../types/recurrence";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useToast } from "react-native-toast-notifications";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Category } from "../types/category";
import { Expense } from "../types/expense";

import { categories } from "../dummy";
import { isAmountInRange, isValidAmount } from "../utils/expenses";

type AddOrEditExpenseProps = {
  expense?: Expense;
  setSelectedExpense: React.Dispatch<React.SetStateAction<Expense>>;
};

const AddOrEditExpense = ({
  expense,
  setSelectedExpense,
}: AddOrEditExpenseProps) => {
  const [amount, setAmount] = useState(expense?.amount.toString());
  const [recurrence, setRecurrence] = useState<Recurrence>(expense?.recurrence);
  const [date, setDate] = useState(expense?.date);
  const [note, setNote] = useState(expense?.note);
  const [category, setCategory] = useState<Category>(expense?.category);

  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const sheetRef = useRef<BottomSheet>(null);
  const [sheetView, setSheetView] = useState<"recurrence" | "category">(
    "recurrence"
  );

  const toast = useToast();
  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    sheetRef.current?.close();
  };

  const selectCategory = (selectedCategory: Category) => {
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

  const handleCancel = () => {
    setSelectedExpense(undefined);
    clearForm();
  };

  const handleBackButtonClick = () => {
    handleCancel();
    return true;
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
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <ScrollView
        style={{
          // padding: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: theme.colors.background,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
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
        <View
          style={{
            marginTop: 32,
            gap: 8,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.errorShadow,
              borderRadius: 12,
              paddingVertical: 10,
              flex: 1,
            }}
            onPress={handleCancel}
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
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: theme.colors.primaryShadow,
              borderRadius: 12,
              paddingVertical: 12,
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
                <Text style={{ color: theme.colors.text, fontSize: 18 }}>
                  {item}
                </Text>
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

const DateTimePickerDetail = ({ date, setDate, sheetRef }) => {
  if (Platform.OS === "ios") {
    return (
      <DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        themeVariant="dark"
        style={{ backgroundColor: theme.colors.card }}
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
export default AddOrEditExpense;
