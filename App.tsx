import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./themes";
import Home from "./screens/Home";
import Categories from "./screens/Categories";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />

      <Stack.Navigator screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Home"
          component={Home}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
