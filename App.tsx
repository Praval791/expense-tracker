import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Add, Expenses, Reports, Settings } from "./screens";
import { theme } from "./themes";
import { TabBarIcon } from "./components/TabBarIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTitleAlign: "center",
        }}
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
    </NavigationContainer>
  );
}
