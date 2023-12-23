// project imports
import { NativeWindStyleSheet } from "nativewind";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Trending from './screens/Tending';
import SearchScreen from './screens/SearchScreen'
import { createContext, useState } from "react";

// Added imports
import { Search } from 'lucide-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// screens navigator
const Tab = createBottomTabNavigator();
const Context = createContext();

export default function App() {
  const [loading, setLoading]=useState(false);
  return (
    <Context.Provider
    value={{loading, setLoading}}
    >
    <NavigationContainer style={{
      background: "white"
    }}>
    <Tab.Navigator
     screenOptions={({ route }) => ({
      tabBarStyle: [{
        backgroundColor: '#b2bccd',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
      }],
    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarIcon: ({size,focused,color}) => {
          return (
            <Ionicons name="md-home" size={30} color={focused ? "gold" : ""}/>
          );
        },
      }}
      />
      <Tab.Screen name="Search" component={SearchScreen}
      options={{
        headerShown: false,
        tabBarActiveTintColor: "gold",
        tabBarIcon: ({size,focused,color})=>{
          return(
            <Search color="black" size={25}/>
          )
        }
      }}
      />

      <Tab.Screen name="Trending" component={Trending}
      options={{
        headerShown: true,
        tabBarActiveTintColor: "gold",
        tabBarIcon: ({size,focused,color})=>{
          return(
            <Image
            style={{ color: focused ? "gold" : ""}}
            source={require('./assets/flame.png')}
            />
          )
        }
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
    </Context.Provider>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

export {Context};