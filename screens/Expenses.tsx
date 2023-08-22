import { FlatList, View } from "react-native";
import React from "react";
import { dummyExpenses as totalExpenses } from "../dummy";
import ExpenseCard from "../components/ExpenseCard";
import NewExpenseCard from "../components/NewExpenseCard";
import { Expense } from "../types/expense";
import DeleteExpenseModel from "../components/models/DeleteExpenseModel";
import AddOrEditExpense from "../components/AddOrEditExpense";

const Expenses = () => {
  const [selectedExpense, setSelectedExpense] = React.useState<Expense>();
  const [showDeleteExpenseModel, setShowDeleteExpenseModel] =
    React.useState<boolean>(false);
  const deleteExpense = () => {
    //!TODO delete expense
    setSelectedExpense(undefined);
    setShowDeleteExpenseModel(false);
  };
  return (
    <View style={{ margin: 16, gap: 8 }}>
      <NewExpenseCard setSelectedExpense={setSelectedExpense} />
      <FlatList
        style={{ height: "95%" }}
        data={totalExpenses}
        keyExtractor={(_, ind) => ind.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            setSelectedExpense={setSelectedExpense}
            setShowDeleteExpenseModel={setShowDeleteExpenseModel}
          />
        )}
      />
      <DeleteExpenseModel
        setSelectedExpense={setSelectedExpense}
        deleteExpense={deleteExpense}
        setShowModal={setShowDeleteExpenseModel}
        showModal={showDeleteExpenseModel}
      />
      {selectedExpense && !showDeleteExpenseModel && (
        <AddOrEditExpense
          expense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
        />
      )}
    </View>
  );
};

export default Expenses;
