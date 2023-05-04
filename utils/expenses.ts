import { format, isThisYear, isToday, isYesterday } from "date-fns";
import { Expense } from "../types/expense";
import { Recurrence } from "../types/recurrence";
import { ExpensesGroup } from "../types/expensesGroup";
import { calculateRange } from "./date";

export const filterExpensesInPeriod = (
  expenses: Expense[],
  period: Recurrence,
  periodIndex: number
) => {
  const { start, end } = calculateRange(period, periodIndex);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return expenses.filter(({ date }) => {
    const comparableDate = new Date(date);
    comparableDate.setHours(0, 0, 0, 0);
    return comparableDate >= start && comparableDate <= end;
  });
};

export const getGroupedExpenses = (
  expenses: Expense[],
  recurrence: Recurrence
) => {
  const filteredExpenses = filterExpensesInPeriod(
    Array.from(expenses),
    recurrence,
    0
  );

  return groupExpensesByDay(filteredExpenses);
};

export const groupExpensesByDay = (expenses: Expense[]): ExpensesGroup[] => {
  const groupedExpenses: { [key: string]: Expense[] } = {};

  expenses.sort((a, b) => b.date.getTime() - a.date.getTime());

  expenses.forEach((expense) => {
    const { date } = expense;
    let key = "";
    if (isToday(date)) key = "Today";
    else if (isYesterday(date)) key = "Yesterday";
    else if (isThisYear(date)) key = format(date, "E, d MMM");
    else key = format(date, "E, d MMM yyyy");

    if (!groupedExpenses[key]) groupedExpenses[key] = [];

    groupedExpenses[key].push(expense);
  });

  return Object.keys(groupedExpenses).map((key) => ({
    day: key,
    expenses: groupedExpenses[key],
    total: groupedExpenses[key].reduce((acc, { amount }) => acc + amount, 0),
  }));
};

export const getAverageAmountInPeriod = (total: number, period: Recurrence) => {
  switch (period) {
    case Recurrence.Weekly:
      return total / 7;
    case Recurrence.Monthly:
      return total / 30;
    case Recurrence.Yearly:
      return total / 365;
    default:
      return total;
  }
};
