import { Expense } from "./expense";
import { Recurrence } from "./recurrence";

export type ReportPageProps = {
  page: number;
  total: number;
  average: number;
  expenses: Expense[];
  recurrence: Recurrence;
  onPreviousPage?: (page: number) => void;
  onNextPage?: (page: number) => void;
};
