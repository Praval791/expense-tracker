import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import React from "react";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { theme } from "../themes";
import { Expense } from "../types/expense";
import { formatDate } from "../utils/date";

const ExpenseCard = ({
  _id,
  amount,
  recurrence,
  date,
  note,
  category,
}: Expense) => {
  return (
    <View // expense Card
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 4,
      }}
    >
      <View // header
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          borderStyle: "dashed",
          padding: 8,
        }}
      >
        <Text // category
          style={{
            fontSize: 20,
            color: category.color + "AA",
          }}
        >
          {category.name}
        </Text>
        <View // buttons
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name="trash-outline"
              size={18}
              color={theme.colors.error}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              size={18}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View // body
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 8,
          gap: 4,
        }}
      >
        <View //left
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text // note
            style={{
              color: theme.colors.text,
              fontSize: 16,
            }}
          >
            {note}
          </Text>
          <Text // recurrence
            style={{
              fontSize: 16,
              color: theme.colors.textSecondary,
            }}
          >
            {recurrence}
          </Text>
        </View>
        <View //right
          style={{
            alignSelf: "flex-end",
          }}
        >
          <View //amount
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: theme.colors.text,
              }}
            >
              {amount}
            </Text>
            <FontAwesome name="inr" size={16} color={theme.colors.text} />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Ionicons
              name="ios-calendar-outline"
              size={14}
              color={theme.colors.textSecondary}
            />
            <Text // date
              style={{
                fontSize: 14,
                color: theme.colors.textSecondary,
              }}
            >
              {formatDate(date)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseCard;
