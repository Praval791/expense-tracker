import { TouchableOpacity, Text } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { theme } from "../themes";
import { Expense } from "../types/expense";
import { Recurrence } from "../types/recurrence";
import { categories } from "../dummy";

const defaultExpense = {
  _id: "",
  amount: 0,
  recurrence: Recurrence.None,
  date: new Date(),
  note: "",
  category: categories[0],
};

type NewExpenseCardProps = {
  setSelectedExpense: Dispatch<SetStateAction<Expense>>;
};

const NewExpenseCard = ({ setSelectedExpense }: NewExpenseCardProps) => {
  const handleAddNew = () => {
    setSelectedExpense(defaultExpense);
  };
  return (
    <TouchableOpacity // expense Card
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 8,
        borderStyle: "dashed",
        borderWidth: 1,
        paddingHorizontal: 4,
        height: 32,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.6}
      onPress={() => handleAddNew()}
    >
      <Text
        style={{
          textAlign: "center",
          color: theme.colors.primary,
          fontSize: 18,
          textShadowColor: theme.colors.primaryShadow,
          textShadowRadius: 100,
        }}
      >
        Add New
      </Text>
    </TouchableOpacity>
  );
};

export default NewExpenseCard;
