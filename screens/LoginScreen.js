import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";

const LoginScreen = ({ navigation }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setemailError] = useState(null);
  const [passError, setpassError] = useState(null);
  const handleChange = (name, value) => {
    setuserData(({...userData, [name]:value}));
    switch(name){
      case "email":
        setemailError(!emailRegex.test(value) ? "Email is not valid" : (value==null || value=='') ? "Email is required" : null)
        break;
      case "password":
        setpassError((value==null || value=='') ? "password is required" : null);
        break;
      default:
        break;
    }
  }
  const handleLogin = async () => {
    if(!emailRegex.test(userData.email)){
      setemailError("Email is not valid");
    }
    if(userData.email=="" || userData.email==null){
      setemailError("Email is required*");
    }
    if(userData.password=="" || userData.password==null){
      setpassError("Password is required*");
    }
    if (
      userData.email == "sallubhai@yopmail.com" &&
      userData.password == "12345678"
    ) {
      navigation.navigate("HomeScreen");
      await AsyncStorage.setItem("token", "adsasdasdsdadsad");
    }
    console.log(userData);
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        height: "100%",
      }}
    >
      <ImageBackground
      source={require("../assets/marvel.jpg")}
      className="flex w-full h-full items-center">
        <Text className="text-4xl font-bold text-white mt-[10vh]">
          Lets Get You Started
        </Text>
        <View className="flex flex-col justify-center items-center w-full h-4/5">
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-700 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%]"
            placeholder="john@gmail.com"
            value={userData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          {
            emailError && <Text className="text-white">{emailError}</Text>
          }
          <TextInput
            secureTextEntry={true}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%] mt-10"
            placeholder="Password"
            onChangeText={(text) => handleChange("password", text)}
            value={userData.password}
          />
          {
            passError && <Text className="text-white ">{passError}</Text>
          }
          <TouchableOpacity className="w-80 h-10 bg-white mt-6 rounded-xl flex justify-center">
            <Text className="text-center" onPress={handleLogin}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
