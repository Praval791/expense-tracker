import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import React, {
  MutableRefObject,
  useState,
  useReducer,
  useRef,
  useMemo,
} from "react";
import { theme } from "../themes";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Recurrence } from "../types/recurrence";
import { dummyExpenses as totalExpenses } from "../dummy";
import { ReportPageProps } from "../types/reportPageProps";
import {
  filterExpensesInPeriod,
  getAverageAmountInPeriod,
} from "../utils/expenses";
import ReportPage from "../components/ReportPage";
import YearlyReport from "../components/charts/YearlyReport";

type reportProps = {
  reportsSheetRef: MutableRefObject<BottomSheet>;
};

enum PagerActionType {
  SET_RECURRENCE = "SET_RECURRENCE",
}

type PagerReducerAction = {
  type: PagerActionType;
  payload: any;
};

type PagerState = {
  recurrence: Recurrence;
  numberOfPages: number;
};

const initialValues: PagerState = {
  recurrence: Recurrence.Weekly,
  numberOfPages: 53,
};

const pagerReducer = (state: PagerState, action: PagerReducerAction) => {
  switch (action.type) {
    case PagerActionType.SET_RECURRENCE:
      var newNumberOfPages = 1;
      switch (action.payload) {
        case Recurrence.Weekly:
          newNumberOfPages = 53;
          break;
        case Recurrence.Monthly:
          newNumberOfPages = 12;
          break;
        case Recurrence.Yearly:
          newNumberOfPages = 1;
          break;
      }
      return {
        ...state,
        numberOfPages: newNumberOfPages,
        recurrence: action.payload,
        page: 0,
      };

    default:
      return state;
  }
};

const Reports = ({ reportsSheetRef }: reportProps) => {
  const [state, dispatch] = useReducer(pagerReducer, initialValues);
  const listRef = useRef<FlatList>(null);

  const selectRecurrence = (selectedRecurrence: Recurrence) => {
    dispatch({
      type: PagerActionType.SET_RECURRENCE,
      payload: selectedRecurrence,
    });
    reportsSheetRef.current?.close();
    listRef.current.scrollToIndex({ index: 0 });
  };

  const pagePropsData = useMemo(
    () =>
      Array(state.numberOfPages)
        .fill(undefined)
        .map<ReportPageProps>((_, page) => {
          const filteredExpenses = filterExpensesInPeriod(
            totalExpenses,
            state.recurrence,
            page
          );
          const total = filteredExpenses.reduce(
            (acc, expense) => acc + expense.amount,
            0
          );
          const average = getAverageAmountInPeriod(total, state.recurrence);
          return {
            page,
            total,
            average,
            expenses: filteredExpenses,
            recurrence: state.recurrence,
          };
        }),
    [state.numberOfPages, totalExpenses]
  );

  const onPreviousPage = (page: number) => {
    listRef.current.scrollToIndex({ index: page + 1 });
  };
  const onNextPage = (page: number) => {
    listRef.current.scrollToIndex({ index: page - 1 });
  };

  return (
    <>
      {/* <YearlyReport expenses={totalExpenses} /> */}
      <FlatList
        data={pagePropsData}
        ref={listRef}
        horizontal
        nestedScrollEnabled
        scrollEnabled={false}
        inverted
        initialNumToRender={3}
        windowSize={3}
        keyExtractor={(_, ind) => ind.toString()}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={Dimensions.get("window").width}
        style={{ flex: 1 }}
        renderItem={({ item: pageProp }) => (
          <ReportPage
            {...pageProp}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        )}
      />
      <BottomSheet
        snapPoints={[200]}
        ref={reportsSheetRef}
        index={-1}
        backgroundComponent={() => (
          <View style={{ backgroundColor: theme.colors.card, flex: 1 }} />
        )}
        handleStyle={{
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.textSecondary,
        }}
        enablePanDownToClose
      >
        <BottomSheetFlatList
          style={{ backgroundColor: theme.colors.card }}
          data={[Recurrence.Weekly, Recurrence.Monthly, Recurrence.Yearly]}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={{ paddingHorizontal: 18, paddingVertical: 12 }}
              onPress={() => selectRecurrence(item)}
            >
              <Text
                style={{
                  fontSize: 18,
                  textTransform: "capitalize",
                  color:
                    state.recurrence === item
                      ? theme.colors.primary
                      : theme.colors.text,
                }}
              >
                {item}
              </Text>
            </TouchableHighlight>
          )}
        />
      </BottomSheet>
    </>
  );
};

export default Reports;
