import React, { useEffect, createContext, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Trending from "./Tending";
import SearchScreen from "./SearchScreen";
// Added imports
import { Search, Home, Tv, Heart } from "lucide-react-native";
import { Flame } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetails from "../screens/MovieDetails";
import CastDetailsScreen from "../screens/CastDetailsScreen";
import VideoPlayer from "../components/VideoPlayer";
import PlaceHolder from "../components/PlaceHolder";
import Favourites from "./Favourites";
import "react-native-reanimated";
import "react-native-gesture-handler";
import LoginScreen from "./LoginScreen";
import DetailsViewPage from "./DetailsViewPage";
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList } from "@react-navigation/drawer";
import WatchList from "./WatchList";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../components/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { ImageBackground, Image,
  TouchableOpacity,
  StyleSheet,
  Switch, Text, } from "react-native";

// screens navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CustomDrawer = ({ title }) => (
  <View style={{ flex: 1 }}>
  <DrawerContentScrollView
    contentContainerStyle={{
      backgroundColor: "#9288F9",
      marginTop: -50,
      zIndex: 10,
    }}
  >
    <ImageBackground
      source={{uri: "https://media.istockphoto.com/id/1371246627/photo/a-small-terrier-dog-sits-on-a-tree-stump-in-the-forest.jpg?s=2048x2048&w=is&k=20&c=ZqAsfOt7PfgX65rPyJ11I2wLlrsJx5eJLCxGQieZirA="}}
      style={{ padding: 20 }}
    >
      <Image
        alt="Not find"
        source={{uri: 'https://media.istockphoto.com/id/1371246627/photo/a-small-terrier-dog-sits-on-a-tree-stump-in-the-forest.jpg?s=2048x2048&w=is&k=20&c=ZqAsfOt7PfgX65rPyJ11I2wLlrsJx5eJLCxGQieZirA='}}
        style={styles.userAvatar}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          marginBottom: 5,
        }}
      >
        Name
      </Text>
    </ImageBackground>
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
      <DrawerItemList  />
    </View>
  </DrawerContentScrollView>
  <View
    style={{
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      // backgroundColor: colors.cardbackground,
    }}
  >
    <Text style={styles.preferences}>Preferences</Text>
    <View style={styles.switchTextContainer}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor="#f4f3f4"
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
      />
      <Text
        style={{
          fontSize: 15,
        }}
      >
        Dark Theme
      </Text>
    </View>
  </View>
  <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
    <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="share-social-outline" size={22} />
        <Text
          style={{
            fontSize: 15,

            marginLeft: 5,
          }}
        >
          Tell a Friend
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={{ paddingVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="exit-outline" size={22} />
        <Text
          style={{
            fontSize: 15,

            marginLeft: 5,
          }}
        >
          Sign Out
        </Text>
      </View>
    </TouchableOpacity>
  </View>
</View>
);

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
            return <Home size={30} color={focused ? "#6936f5" : "black"} />;
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
          headerShown: false,
          tabBarActiveTintColor: "#6936f5",
          tabBarShowLabel: false,
          presentation: "modal",
          tabBarIcon: ({ size, focused, color }) => {
            return <Flame size={30} color={focused ? "#6936f5" : "black"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AfterLogin = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={BottomNavigator} 
       options={({ route }) => ({
        headerShown: false
      })}/>
      <Stack.Screen name="Movie Details" component={MovieDetails} />
      <Stack.Screen name="People Details" component={CastDetailsScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Video Player" component={VideoPlayer} />
      <Stack.Screen name="PlaceHolder" component={PlaceHolder} />
      <Stack.Screen name="Details View" component={DetailsViewPage} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
    // drawerContent={() => <CustomDrawer {...{}} />}
    >
      <Drawer.Screen
        name="Home"
        component={AfterLogin}
        options={({  }) => ({
          headerShown: true,
          drawerIcon: ({focused}) =>{
            return <Home size={30} color= {focused ? "#6936f5" : "black"}/>
          }
        })}
      />
      <Drawer.Screen name="WatchList" component={WatchList}
      options={{
        drawerIcon: ({ size, focused, color }) => {
          return <Tv size={30} color={focused ? "#6936f5" : "black"} />;
        }
      }}
      />
      <Drawer.Screen name="Favourites" component={Favourites}
       options={{
        drawerIcon: ({ size, focused, color }) => {
          return <Heart size={30} color={focused ? "#6936f5" : "black"} />;
        }
      }}
      />
    </Drawer.Navigator>
  );
};
const FirstAuth = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
const Navigator = () => {
  const { loading, userToken } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken != null ? <DrawerNav /> : <FirstAuth />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
export default Navigator;
