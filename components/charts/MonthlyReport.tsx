import { View, Text } from "react-native";
import React from "react";
import { Expense } from "../../types/expense";

type MonthlyReportProps = {
  expenses: Expense[];
  date: Date;
};

const MonthlyReport = ({ expenses, date }: MonthlyReportProps) => {
  return (
    <View>
      <Text>MonthlyReport</Text>
    </View>
  );
};

export default MonthlyReport;
