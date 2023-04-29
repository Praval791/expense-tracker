import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Svg, Text, G, Rect } from "react-native-svg";
import { scalePoint, scaleLinear } from "d3";

import { Expense } from "../../types/expense";
import { theme } from "../../themes";
type WeeklyReportProps = {
  expenses: Expense[];
};

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const GRAPH_MARGIN = 16;
const GRAPH_BAR_WIDTH = 40;
const GRAPH_BAR_HEIGHT = 147;
const GRAPH_LABEL_HEIGHT = 20; // include padding that separates label from axis

const WeeklyReport = ({ expenses }: WeeklyReportProps) => {
  // const [openToolTipIndex, setOpenToolTipIndex] = useState(-1); // -1 means no tooltip is open

  let averageExpense: any = 0,
    maxExpense = 0;
  const { format } = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  const defaultValues: number[] = Array(7).fill(0);
  const formatted: string[] = Array(7);

  const expenseToDay = expenses.reduce((accumulated, expense) => {
    const day = expense.date.getDay();
    accumulated[day] += expense.amount;
    return accumulated;
  }, defaultValues);

  expenseToDay.forEach((expense, index) => {
    formatted[index] = format(expense);
    if (maxExpense < expense) maxExpense = expense;
    averageExpense = averageExpense + expense;
  });

  averageExpense = (averageExpense / 7).toFixed(2);

  const SVGHeight = GRAPH_BAR_HEIGHT + GRAPH_LABEL_HEIGHT;
  const SVGWidth = Dimensions.get("window").width;
  const graphHeight = SVGHeight - GRAPH_LABEL_HEIGHT;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN - GRAPH_BAR_WIDTH;

  const xDomain = weekDays;
  const xRange = [0, graphWidth];
  const getX = scalePoint().domain(xDomain).range(xRange);

  const yDomain = [0, maxExpense];
  const yRange = [0, graphHeight];
  const getY = scaleLinear().domain(yDomain).range(yRange);

  useEffect(() => {
    console.log(0);
  });

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        {expenseToDay.map((expense, index) => (
          <React.Fragment key={index}>
            {/* <TouchableWithoutFeedback 
                onPressIn={() => setOpenToolTipIndex(index)}
                onPressOut={() => setOpenToolTipIndex(-1)}
              > */}
            <Rect // bar BackGround
              x={getX(weekDays[index])}
              y={getY(maxExpense) * -1}
              width={GRAPH_BAR_WIDTH}
              height={getY(maxExpense)}
              rx={8}
              fill={theme.colors.barBackground}
            />
            {/* </TouchableWithoutFeedback>
              <TouchableWithoutFeedback 
                onPressIn={() => setOpenToolTipIndex(index)}
                onPressOut={() => setOpenToolTipIndex(-1)}
              > */}
            <Rect // bar
              x={getX(weekDays[index])}
              y={getY(expense) * -1}
              width={GRAPH_BAR_WIDTH}
              height={getY(expense)}
              rx={8}
              fill={theme.colors.text}
            />
            {/* </TouchableWithoutFeedback> */}
            <Text // bar label first line
              x={getX(weekDays[index]) + GRAPH_BAR_WIDTH / 2}
              y={getY(maxExpense) * -1 + 20}
              fill={theme.colors.textGray}
              fontWeight="500"
              textAnchor="middle"
            >
              {formatted[index]}
            </Text>
            <Text // x axis label
              x={getX(weekDays[index]) + GRAPH_BAR_WIDTH / 2}
              y={GRAPH_LABEL_HEIGHT}
              textAnchor="middle"
              fontSize={14}
              fontWeight="500"
              fill={theme.colors.textSecondary}
            >
              {weekDays[index][0]}
            </Text>
          </React.Fragment>
        ))}
        {/* {openToolTipIndex !== -1 && (
          <React.Fragment>
            <Polygon points="10,10 20,20 0,20" fill={"red"} />
            <Rect
              x={
                getX(weekDays[openToolTipIndex]) -
                  (expenseToDay[openToolTipIndex].toString().length +
                    2) *
                    5 <=
                0
                  ? getX(weekDays[openToolTipIndex]) + GRAPH_BAR_WIDTH
                  : getX(weekDays[openToolTipIndex]) -
                    (expenseToDay[openToolTipIndex].toString().length +
                      2) *
                      5
              }
              y="-100"
              width={
                (expenseToDay[openToolTipIndex].toString().length +
                  2) *
                5
              }
              height="24"
              // fill={theme.colors.transparentBackground}
              fill={"red"}
            />
            <Text
              x={
                getX(weekDays[openToolTipIndex]) -
                  (expenseToDay[openToolTipIndex].toString().length +
                    2) *
                    5 <=
                0
                  ? getX(weekDays[openToolTipIndex]) + GRAPH_BAR_WIDTH + 5
                  : getX(weekDays[openToolTipIndex]) -
                    (expenseToDay[openToolTipIndex].toString().length +
                      1) *
                      5
              }
              y="-84"
              fill="#fff"
            >
              {expenseToDay[openToolTipIndex]}
            </Text>
          </React.Fragment>
        )} */}
      </G>
    </Svg>
  );
};

export default WeeklyReport;
