import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Expense } from "../types/expense";
import { theme } from "../themes";
type ExpenseRowProps = {
  expense: Expense;
};

const ExpenseRow = ({ expense }: ExpenseRowProps) => (
  <View
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 4,
        alignItems: "flex-start",
        gap: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.text,
        }}
      >
        {expense.note}
      </Text>
      <View
        style={{
          backgroundColor: `${expense.category.color}50`,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: expense.category.color,
            fontSize: 14,
          }}
        >
          {expense.category.name}
        </Text>
      </View>
    </View>
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 4,
        alignItems: "flex-end",
        gap: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.text,
        }}
      >
        INR {expense.amount}
      </Text>
      <Text style={{ fontSize: 17, color: theme.colors.textSecondary }}>
        {`${expense.date.getHours()}`.padStart(2, "0")}:
        {`${expense.date.getMinutes()}`.padStart(2, "0")}
      </Text>
    </View>
  </View>
);

export default ExpenseRow;
