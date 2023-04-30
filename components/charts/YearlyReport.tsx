import { View, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";

import { Expense } from "../../types/expense";
import { theme } from "../../themes";
import { LineChart } from "react-native-chart-kit";
import { Rect, Svg, Text } from "react-native-svg";
// import { Circle } from "react-native-svg";

type YearlyReportProps = {
  expenses: Expense[];
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const screenWidth = Dimensions.get("window").width;
const GRAPH_WIDTH = screenWidth + 200;
const MARGIN = 16;
const getX = (x: number, width: number, borderWidth: number) => {
  if (x + width + 2 * borderWidth > GRAPH_WIDTH - MARGIN)
    return x - width - 2 * borderWidth;
  return x;
};

const TooTip = ({ tooltipPos }) => {
  let width = 40;
  if (tooltipPos.visible)
    width = Math.max(20 + tooltipPos.value.toString().length * 7, 30);
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
        // fill="red"
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

const YearlyReport = ({ expenses }: YearlyReportProps) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const { format } = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 0,
  });

  const expensesToMonths = expenses.reduce((accumulated, expense) => {
    const month = expense.date.getMonth();
    accumulated[month] += expense.amount;
    return accumulated;
  }, Array(12).fill(0));

  let leftMargin = -30;
  expensesToMonths.forEach((expense) => {
    if (format(expense).length > 3) leftMargin = -20;
  });
  const data = {
    labels: MONTH_NAMES,
    datasets: [
      {
        data: expensesToMonths,
        color: () => theme.colors.text,
        strokeWidth: 1,
      },
    ],
  };

  const handleDataPointClick = (data: any) => {
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
    isSamePoint
      ? setTooltipPos((previousState) => {
          return {
            ...previousState,
            value: data.value,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({
          x: data.x,
          value: data.value,
          y: data.y,
          visible: true,
        });
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
        bezier
        formatYLabel={(yValue) => format(parseFloat(yValue))}
        withInnerLines={false}
        verticalLabelRotation={20}
        decorator={() => <TooTip tooltipPos={tooltipPos} />}
        onDataPointClick={handleDataPointClick}
        style={{ marginLeft: leftMargin }}
      />
    </ScrollView>
  );
};

export default YearlyReport;
