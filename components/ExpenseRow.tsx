import { View, Text } from "react-native";
import React from "react";

import { Expense } from "../types/expense";
import { theme } from "../themes";
type ExpenseRowProps = {
  expense: Expense;
};

const ExpenseRow = ({ expense }: ExpenseRowProps) => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      marginBottom: 8,
      gap: 4,
    }}
  >
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
          fontWeight: "600",
          color: theme.colors.text,
        }}
      >
        {expense.note}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.text,
        }}
      >
        INR {expense.amount}
      </Text>
    </View>
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
      <Text style={{ fontSize: 17, color: theme.colors.textSecondary }}>
        {`${expense.date.getHours()}`.padStart(2, "0")}:
        {`${expense.date.getMinutes()}`.padStart(2, "0")}
      </Text>
    </View>
  </View>
);

export default ExpenseRow;
