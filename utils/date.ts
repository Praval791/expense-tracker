import {
  format,
  add,
  previousSunday,
  sub,
  nextSaturday,
  isSunday,
} from "date-fns";

import { Recurrence } from "../types/recurrence";

export const formatDateRange = (start: Date, end: Date, period: Recurrence) => {
  switch (period) {
    case Recurrence.Weekly:
      return format(start, "d MMM") + " - " + format(end, "d MMM");
    case Recurrence.Monthly:
      return format(start, "MMMM");
    case Recurrence.Yearly:
      return format(start, "yyyy");
  }

  return format(start, "d MMM") + " - " + format(end, "d MMM");
};

export const formatDate = (date: Date) => format(date, "MMM d, yyyy h:mm a");

export const calculateRange = (period: Recurrence, periodIndex: number) => {
  const now = new Date();
  let start: Date;
  let end: Date;

  switch (period) {
    case Recurrence.Daily:
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = add(start, {
        hours: 23,
        minutes: 59,
        seconds: 59,
      });
      break;
    case Recurrence.Weekly:
      const firstDayOfThisWeek = isSunday(now) ? now : previousSunday(now);
      const daysToSubtract = periodIndex * 7;
      start = sub(firstDayOfThisWeek, { days: daysToSubtract });
      end = nextSaturday(start);
      break;
    case Recurrence.Monthly:
      start = new Date(now.getFullYear(), now.getMonth() - periodIndex, 1);
      end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      break;
    case Recurrence.Yearly:
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
      break;
  }

  return {
    start,
    end,
  };
};
