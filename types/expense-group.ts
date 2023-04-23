import { Expense } from "./expense";

export type ExpenseGroup = {
  day: string;
  expenses: Expense[];
  total: number;
};
