import { Category } from "./category";
import { Recurrence } from "./recurrence";

export type Expense = {
  _id: string;
  amount: number;
  recurrence: Recurrence;
  date: Date;
  note: string;
  category: Category;
};
