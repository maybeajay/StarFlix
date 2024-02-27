import React, {useEffect, createContext, useState, useContext} from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigationContainerRef  } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Trending from "./Tending";
import SearchScreen from "./SearchScreen";

// Added imports
import { Search, Home } from "lucide-react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainerRef } from '@react-navigation/native';
// screens navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthContext = createContext();
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
              <Home size={30} color={focused ? "#6936f5" : "black"} />
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
  const [authToken, setAuthToken] = useState();
  const [isSignedIn, setisSignedIn] = useState(false);
  const [loginToken, setloginToken] = useState(null);

  const NavigationContainerRef = React.createRef();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const login = await AsyncStorage.getItem('keepLoggedIn');

        setAuthToken(storedToken);
        setloginToken(login);
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);
  return (
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setisSignedIn }}>
      <NavigationContainer ref={NavigationContainerRef}>
         <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {
              (isSignedIn) ? 
              <>
              <Stack.Screen name="HomeScreen" component={BottomNavigator} />
             <Stack.Screen name="Movie Details" component={MovieDetails} />
            <Stack.Screen name="People Details" component={CastDetailsScreen} />
            <Stack.Screen name="Video Player" component={VideoPlayer} />
            <Stack.Screen name="PlaceHolder" component={PlaceHolder} />
            <Stack.Screen name="Details View" component={DetailsViewPage} />
              </>
             :
             <Stack.Screen name="Login" component={LoginScreen} />
            }
          </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
  );
};
export {AuthContext};
export default Navigator;