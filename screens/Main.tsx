import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";

import Home from "./Home";
import Reports from "./Reports";
import Add from "./Add";
import Settings from "./Settings";
import { theme } from "../themes";
import { TabBarIcon } from "../components/TabBarIcons";

const Tab = createBottomTabNavigator();

const Main = () => {
  const reportsSheetRef = useRef<BottomSheet>(null);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
        tabBarHideOnKeyboard: true,
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="expenses" />,
        }}
      />
      <Tab.Screen
        name="Reports"
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => reportsSheetRef.current?.expand()}
              style={{ marginRight: 16 }}
            >
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: (props) => <TabBarIcon {...props} type="reports" />,
        }}
      >
        {() => <Reports reportsSheetRef={reportsSheetRef} />}
      </Tab.Screen>
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

export default Main;
