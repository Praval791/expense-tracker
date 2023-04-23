import { Category } from "../types/category";
import { Expense } from "../types/expense";
import { ExpenseGroup } from "../types/expense-group";
import { Recurrence } from "../types/recurrence";
export const categories: Category[] = [
  { _id: "1", name: "Category 1", color: "#FF0000" },
  { _id: "2", name: "Category 2", color: "#00FF00" },
  { _id: "3", name: "Category 3", color: "#0000FF" },
  { _id: "4", name: "Category 4", color: "#FFFF00" },
  { _id: "5", name: "Category 5", color: "#00FFFF" },
  { _id: "6", name: "Category 6", color: "#FF00FF" },
  { _id: "7", name: "Category 7", color: "#C0C0C0" },
  { _id: "8", name: "Category 8", color: "#808080" },
  { _id: "9", name: "Category 9", color: "#800000" },
  { _id: "10", name: "Category 10", color: "#008000" },
];

export const dummyExpenses: Expense[] = [
  {
    _id: "1",
    amount: 10.5,
    recurrence: Recurrence.None,
    date: new Date("2023-04-22"),
    note: "Lunch at McDonald's",
    category: categories[0],
  },
  {
    _id: "2",
    amount: 20.0,
    recurrence: Recurrence.Weekly,
    date: new Date("2023-04-23"),
    note: "Gasoline for car",
    category: categories[1],
  },
  {
    _id: "3",
    amount: 5.99,
    recurrence: Recurrence.None,
    date: new Date("2023-04-20"),
    note: "Spotify subscription",
    category: categories[2],
  },
  {
    _id: "4",
    amount: 15.75,
    recurrence: Recurrence.Monthly,
    date: new Date("2023-04-15"),
    note: "Movie ticket",
    category: categories[3],
  },
  {
    _id: "5",
    amount: 100.0,
    recurrence: Recurrence.Yearly,
    date: new Date("2023-12-31"),
    note: "New Year's Eve party",
    category: categories[4],
  },
];

export const dummyExpenseGroups: ExpenseGroup[] = [
  {
    day: "2023-04-22",
    expenses: [
      {
        _id: "1",
        amount: 10.5,
        recurrence: Recurrence.None,
        date: new Date("2023-04-22"),
        note: "Lunch at McDonald's",
        category: {
          _id: "1",
          color: "#FF0000",
          name: "Food",
        },
      },
      {
        _id: "6",
        amount: 35.0,
        recurrence: Recurrence.None,
        date: new Date("2023-04-22"),
        note: "Groceries",
        category: {
          _id: "4",
          color: "#FFFF00",
          name: "Shopping",
        },
      },
    ],
    total: 45.5,
  },
  {
    day: "2023-04-23",
    expenses: [
      {
        _id: "2",
        amount: 20.0,
        recurrence: Recurrence.Weekly,
        date: new Date("2023-04-23"),
        note: "Gasoline for car",
        category: {
          _id: "2",
          color: "#0000FF",
          name: "Transportation",
        },
      },
      {
        _id: "7",
        amount: 10.99,
        recurrence: Recurrence.None,
        date: new Date("2023-04-23"),
        note: "Coffee with friends",
        category: {
          _id: "3",
          color: "#008000",
          name: "Entertainment",
        },
      },
    ],
    total: 30.99,
  },
];
