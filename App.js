// project imports
import { NativeWindStyleSheet } from "nativewind";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Trending from './screens/Tending';

// screens navigator
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
    tabBarOptions={{
      tabBarStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
      },
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        title: "Home",
        headerShown: true,
        tabBarActiveTintColor: "gold",
        tabBarIcon: ({size,focused,color}) => {
          return (
            <Image
              style={{ width: size, height: size, tintColor: focused ? "gold" : "" }}
              source={require('./assets/home.png')}

            />
          );
        },
      }}
      />
      <Tab.Screen name="Trending" component={Trending}
      options={{
        title: "Trending",
        headerShown: true,
        tabBarActiveTintColor: "gold",
        tabBarIcon: ({size,focused,color})=>{
          return(
            <Image
            style={{ tintColor: focused ? "gold" : ""}}
            source={require('./assets/flame.png')}
            />
          )
        }
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});