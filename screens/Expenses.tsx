import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { dummyExpenses as totalExpenses } from "../dummy";
import ExpenseList from "../components/ExpenseList";
import { theme } from "../themes";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Recurrence } from "../types/recurrence";
import { TouchableHighlight } from "react-native";
import { getPlainRecurrence } from "../utils/recurrence";
import { getGroupedExpenses } from "../utils/expenses";

const Expenses = () => {
  const recurrenceSheetRef = React.useRef<BottomSheet>(null);
  const [recurrence, setRecurrence] = React.useState<Recurrence>(
    Recurrence.Weekly
  );
  const groupedExpenses = getGroupedExpenses(totalExpenses, recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);

  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    recurrenceSheetRef.current?.close();
  };

  return (
    <>
      <View
        style={{
          margin: 16,
          gap: 16,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 18 }}>
            Total for:
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => recurrenceSheetRef.current?.expand()}
          >
            <View style={{ gap: 2, flexDirection: "row" }}>
              <FontAwesome
                name="angle-down"
                size={20}
                color={theme.colors.primary}
                style={{ alignSelf: "center" }}
              />
              <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
                This {getPlainRecurrence(recurrence)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: 0,
            padding: 0,
          }}
        >
          <FontAwesome
            name="inr"
            size={18}
            color={theme.colors.textSecondary}
          />
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 40,
              fontWeight: "600",
              marginLeft: 2,
            }}
          >
            {total}
          </Text>
        </View>
        {groupedExpenses.length > 0 ? (
          <ExpenseList expenseGroups={groupedExpenses} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: theme.colors.textSecondary, fontSize: 18 }}>
              No expenses for this period
            </Text>
          </View>
        )}
      </View>
      <BottomSheet
        snapPoints={[150]}
        ref={recurrenceSheetRef}
        index={-1}
        backgroundComponent={() => (
          <View style={{ backgroundColor: theme.colors.card, flex: 1 }} />
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
        <BottomSheetScrollView
          style={{ backgroundColor: theme.colors.card }}
          snapToAlignment="start"
        >
          {[
            Recurrence.Daily,
            Recurrence.Weekly,
            Recurrence.Monthly,
            Recurrence.Yearly,
          ].map((item, ind) => (
            <TouchableHighlight
              key={ind}
              style={{ paddingHorizontal: 18, paddingVertical: 12 }}
              onPress={() => changeRecurrence(item)}
            >
              <Text
                style={{
                  fontSize: 18,
                  textTransform: "capitalize",
                  color: recurrence === item ? theme.colors.primary : "white",
                }}
              >
                This {getPlainRecurrence(item)}
              </Text>
            </TouchableHighlight>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default Expenses;
