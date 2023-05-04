import { Recurrence } from "../types/recurrence";

export const getPlainRecurrence = (recurrence: Recurrence) => {
  switch (recurrence) {
    case Recurrence.Daily:
      return "Day";
    case Recurrence.Weekly:
      return "Week";
    case Recurrence.Monthly:
      return "Month";
    case Recurrence.Yearly:
      return "Year";
    default:
      return "";
  }
};

export const isLastPage = (page: number, recurrence: Recurrence) => {
  switch (recurrence) {
    case Recurrence.Weekly:
      return page === 52;
    case Recurrence.Monthly:
      return page === 11;
    case Recurrence.Yearly:
      return page === 0;
  }
};
export const isFirstPage = (page: number) => {
  return page === 0;
};
