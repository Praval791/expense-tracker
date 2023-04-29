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

export const firstLine = (str: string) => {
  if (str.length <= 4) return str;

  if (shouldShowSecondLine(str)) return str.substring(0, str.length - 1);

  const dotIndex = str.indexOf(".");
  if (dotIndex !== -1) return str.substring(0, dotIndex);
  return str;
};

export const shouldShowSecondLine = (str: string) => {
  return str.length > 4 && str.at(-1) >= "A" && str.at(-1) <= "Z";
};
