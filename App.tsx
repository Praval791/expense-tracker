import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ToastProvider } from "react-native-toast-notifications";
import { theme } from "./themes";
import Main from "./screens/Main";
import Categories from "./screens/Categories";
import Expenses from "./screens/Expenses";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ToastProvider normalColor={theme.colors.card} offsetBottom={70}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />

        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              headerTitleStyle: {
                color: theme.colors.text,
              },
              headerTintColor: theme.colors.primary,
            }}
          />
          <Stack.Screen
            name="Expenses"
            component={Expenses}
            options={{
              headerTitleStyle: { color: theme.colors.text },
              headerTintColor: theme.colors.primary,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
