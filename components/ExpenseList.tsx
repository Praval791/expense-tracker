import { View, Text } from "react-native";
import React from "react";
import { ExpenseGroup } from "../types/expense-group";
import { theme } from "../themes";
import { FlatList } from "react-native";
import ExpenseRow from "./ExpenseRow";

type ExpenseListProps = {
  expenseGroups: ExpenseGroup[];
};
const ExpenseList = ({ expenseGroups }: ExpenseListProps) => {
  return (
    <FlatList
      data={expenseGroups}
      keyExtractor={(item) => item.day}
      renderItem={({ item: { day, expenses, total } }) => (
        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {day}
          </Text>
          <View
            style={{
              borderBottomColor: theme.colors.border,
              borderBottomWidth: 2,
            }}
          />
          {expenses.map((expense, ind) => (
            <ExpenseRow key={ind} expense={expense} />
          ))}
          <View
            style={{
              borderBottomColor: theme.colors.border,
              borderBottomWidth: 2,
            }}
          />
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.textSecondary,
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.textSecondary,
                fontWeight: "600",
              }}
            >
              INR {total}
            </Text>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
    />
  );
};

export default ExpenseList;
