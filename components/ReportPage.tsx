import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ReportPageProps } from "../types/reportPageProps";
import Charts from "./charts";
import ExpenseList from "./ExpenseList";
import { theme } from "../themes";
import { calculateRange, formatDateRange } from "../utils/date";
import { groupExpensesByDay } from "../utils/expenses";
import { isFirstPage, isLastPage } from "../utils/recurrence";

const { format } = Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const ReportPage = ({
  page,
  average,
  expenses,
  recurrence,
  total,
  onNextPage,
  onPreviousPage,
}: ReportPageProps) => {
  const groupedExpenses = groupExpensesByDay(expenses);
  const { start, end } = calculateRange(recurrence, page);
  const periodLabel = formatDateRange(start, end, recurrence);

  return (
    <View
      onLayout={() => console.log(page)}
      style={{
        margin: 16,
        width: Dimensions.get("window").width - 32,
        gap: 16,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 8,
          }}
          onPress={() => onPreviousPage(page)}
          disabled={isLastPage(page, recurrence)}
        >
          <FontAwesome5
            name="arrow-left"
            size={14}
            color={
              isLastPage(page, recurrence)
                ? theme.colors.primaryShadow
                : theme.colors.primary
            }
          />
          <Text
            style={{
              color: isLastPage(page, recurrence)
                ? theme.colors.primaryShadow
                : theme.colors.primary,
            }}
          >
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 8,
          }}
          onPress={() => onNextPage(page)}
          disabled={isFirstPage(page)}
        >
          <Text
            style={{
              color: isFirstPage(page)
                ? theme.colors.primaryShadow
                : theme.colors.primary,
            }}
          >
            Next
          </Text>
          <FontAwesome5
            name="arrow-right"
            size={14}
            color={
              isFirstPage(page)
                ? theme.colors.primaryShadow
                : theme.colors.primary
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 8 }}>
          <Text style={{ color: theme.colors.text, fontSize: 20 }}>
            {periodLabel}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
              INR
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>
              {format(total)}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: 8 }}>
          <Text style={{ color: theme.colors.text, fontSize: 20 }}>
            Avg/Day
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
              INR
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>
              {format(average)}
            </Text>
          </View>
        </View>
      </View>
      {expenses.length > 0 ? (
        <>
          <Charts expenses={expenses} recurrence={recurrence} start={start} />
          <ExpenseList expenseGroups={groupedExpenses} />
        </>
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
  );
};

export default ReportPage;
