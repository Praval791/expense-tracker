import { View, Text, TouchableHighlight } from "react-native";
import React, { MutableRefObject, useState } from "react";
import { theme } from "../themes";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Recurrence } from "../types/recurrence";
import WeeklyReport from "../components/charts/WeeklyReport";
import { dummyExpenses } from "../dummy";

type reportProps = {
  reportsSheetRef: MutableRefObject<BottomSheet>;
};

const Reports = ({ reportsSheetRef }: reportProps) => {
  const [recurrence, setRecurrence] = useState<Recurrence>(Recurrence.Weekly);
  const selectRecurrence = (item: Recurrence) => {
    setRecurrence(item);
    reportsSheetRef.current?.close();
  };

  return (
    <>
      <View
        style={{
          margin: 16,
          gap: 16,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 8 }}>
            <Text style={{ color: theme.colors.text, fontSize: 20 }}>
              12REC - 13DEC
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
                INR
              </Text>
              <Text style={{ color: theme.colors.text, fontSize: 16 }}>85</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end", gap: 8 }}>
            <Text style={{ color: theme.colors.text, fontSize: 20 }}>
              Avg/Day
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
                INR
              </Text>
              <Text style={{ color: theme.colors.text, fontSize: 16 }}>25</Text>
            </View>
          </View>
        </View>

        <WeeklyReport expenses={dummyExpenses} />
        <Text style={{ color: theme.colors.text }}>Hey</Text>
      </View>
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
                    recurrence === item
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
