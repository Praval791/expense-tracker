import WeeklyReport from "./WeeklyReport";
import MonthlyReport from "./MonthlyReport";
import YearlyReport from "./YearlyReport";
import { Recurrence } from "../../types/recurrence";
import { View } from "react-native";
import { Expense } from "../../types/expense";

type ChartsProps = {
  recurrence: Recurrence;
  expenses: Expense[];
  start?: Date;
};

const Charts = ({ recurrence, start, expenses }: ChartsProps) => {
  return (
    <View
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      {recurrence === Recurrence.Weekly && <WeeklyReport expenses={expenses} />}
      {recurrence === Recurrence.Monthly && (
        <MonthlyReport date={start} expenses={expenses} />
      )}
      {recurrence === Recurrence.Yearly && <YearlyReport expenses={expenses} />}
    </View>
  );
};
export default Charts;
