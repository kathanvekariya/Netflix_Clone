import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import DetailsScreen from "./DetailsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff", textAlign: "center" },
        headerTintColor: "#fff", // ensures back button is also white
      }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff", textAlign: "center" },
        headerTintColor: "#fff", // ensures back button is also white
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Search") {
          iconName = "search";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarStyle: { backgroundColor: "#000" },
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#888",
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStack}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
