import { FlatList, View } from "react-native";
import React from "react";
import { theme } from "../themes";
import { dummyExpenses as totalExpenses } from "../dummy";
import ExpenseCard from "../components/ExpenseCard";

const Expenses = () => {
  return (
    <FlatList
      data={totalExpenses}
      style={{ margin: 16 }}
      keyExtractor={(_, ind) => ind.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
      renderItem={({ item }) => <ExpenseCard {...item} />}
    />
  );
};

export default Expenses;
