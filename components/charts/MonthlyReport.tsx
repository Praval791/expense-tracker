import { ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { Expense } from "../../types/expense";
import { LineChart } from "react-native-chart-kit";
import { theme } from "../../themes";
import { Rect, Svg, Text } from "react-native-svg";

type MonthlyReportProps = {
  expenses: Expense[];
  date: Date;
};
const screenWidth = Dimensions.get("window").width;
const GRAPH_WIDTH = screenWidth + 400;
const MARGIN = 16;
const getX = (x: number, width: number, borderWidth: number) => {
  if (x + width + 2 * borderWidth > GRAPH_WIDTH - MARGIN)
    return x - width - 2 * borderWidth;
  return x;
};
const TooTip = ({ tooltipPos }) => {
  let width = 40;
  if (tooltipPos.visible)
    width = Math.max(20 + tooltipPos.value.length * 7, 30);
  return tooltipPos.visible ? (
    <Svg>
      <Rect
        x={getX(tooltipPos.x, width, 2)}
        y={tooltipPos.y}
        width={width}
        height="20"
        fill={theme.colors.card}
        rx={8}
        strokeWidth={2}
        stroke={theme.colors.border}
      />
      <Text
        x={getX(tooltipPos.x, width, 2) + width / 2}
        y={tooltipPos.y + 15}
        fill={theme.colors.textGray}
        fontSize="14"
        fontWeight="500"
        textAnchor="middle"
      >
        {tooltipPos.value}
      </Text>
    </Svg>
  ) : null;
};

const MonthlyReport = ({ expenses, date }: MonthlyReportProps) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: "",
  });
  const { format } = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 0,
  });
  const daysCount = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const days = Array(daysCount)
    .fill("")
    .map((_, i) => (i + 1).toString());

  const expensesToDay = expenses.reduce((accumulated, expense) => {
    const month = expense.date.getDay();
    accumulated[month] += expense.amount;
    return accumulated;
  }, Array(daysCount).fill(0));

  let leftMargin = -30;
  expensesToDay.forEach((expense) => {
    if (format(expense).length >= 3) leftMargin = -20;
  });

  const handleDataPointClick = (data: any) => {
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
    isSamePoint
      ? setTooltipPos((previousState) => {
          return {
            ...previousState,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({
          x: data.x,
          value: `${data.value} : Day ${data.index + 1 < 10 ? "0" : ""}${
            data.index + 1
          }`,
          y: data.y,
          visible: true,
        });
  };

  const data = {
    labels: days,
    datasets: [
      {
        data: expensesToDay,
        color: () => theme.colors.text,
        strokeWidth: 1,
      },
    ],
  };
  return (
    <ScrollView horizontal>
      <LineChart
        data={data}
        width={GRAPH_WIDTH}
        height={220}
        chartConfig={{
          backgroundGradientFrom: theme.colors.barBackground,
          backgroundGradientFromOpacity: 0.5,
          backgroundGradientTo: theme.colors.barBackground,
          backgroundGradientToOpacity: 0.5,
          color: () => theme.colors.textSecondary,
        }}
        // bezier
        formatYLabel={(yValue) => format(parseFloat(yValue))}
        withInnerLines={false}
        decorator={() => <TooTip tooltipPos={tooltipPos} />}
        onDataPointClick={handleDataPointClick}
        style={{ marginLeft: leftMargin }}
      />
    </ScrollView>
  );
};

export default MonthlyReport;
