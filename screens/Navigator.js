import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Trending from "./Tending";
import SearchScreen from "./SearchScreen";
import { createContext, useState } from "react";

// Added imports
import { Search } from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Flame } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetails from "../screens/MovieDetails";
import CastDetailsScreen from "../screens/CastDetailsScreen";
import VideoPlayer from "../components/VideoPlayer";
import PlaceHolder from '../components/PlaceHolder'
import "react-native-reanimated";
import "react-native-gesture-handler";
import LoginScreen from "./LoginScreen";
import DetailsViewPage from './DetailsViewPage'
// screens navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Context = createContext();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: [
          {
            backgroundColor: "rgba(255, 255, 255, .1)",
            position: "absolute",
            borderTopWidth: 0,
            elevation: 0,
          },
        ],
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name="md-home"
                size={30}
                color={focused ? "#6936f5" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#6936f5",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Search size={30} color={focused ? "#6936f5" : "black"} />;
          },
        }}
      />

      <Tab.Screen
        name="Trending"
        component={Trending}
        options={{
          headerShown: true,
          tabBarActiveTintColor: "#6936f5",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused, color }) => {
            return <Flame size={30} color={focused ? "#6936f5" : "black"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const [loading, setLoading] = useState(false);
  return (
    <NavigationContainer>
      <Context.Provider value={{ loading, setLoading }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeScreen" component={BottomNavigator} />
          <Stack.Screen name="Movie Details" component={MovieDetails} />
          <Stack.Screen name="People Details" component={CastDetailsScreen} />
          <Stack.Screen name="Video Player" component={VideoPlayer} />
          <Stack.Screen name="PlaceHolder" component={PlaceHolder} />
          <Stack.Screen name="Details View" component={DetailsViewPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
};

export default Navigator;
export {Context};