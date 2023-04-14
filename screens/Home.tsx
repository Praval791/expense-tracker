import { View, Text } from "react-native";
import React from "react";
import { theme } from "../themes";
import { TabBarIcon } from "../components/TabBarIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expenses from "./Expenses";
import Reports from "./Reports";
import Add from "./Add";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleAlign: "center",
      }}
      key={"Home"}
    >
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="expenses" />,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="reports" />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="add" />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="settings" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
