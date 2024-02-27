import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, TextInput } from "react-native";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { AuthContext } from "./Navigator";
import { FIREBAE_AUTH } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState()
  const auth  = FIREBAE_AUTH;

  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  // const [state, setState] = useState()
  // useEffect(()=>{
  //   GoogleSignin.configure('724562316648-9r1io7rssia3kelc7r4445dhmsf600t0.apps.googleusercontent.com  ')
  // },[])

  const signIn = async () => {
   try {
    const res = await signInWithEmailAndPassword(auth, userData.email, userData.password);
   } catch (error) {
    Alert.alert("error", error?.message)
   }
  };
  const handleGoogleLogin = async()=>{
    try {
      const result = await expo.Google.logInAsync({
        androidClientId: "1:724562316648:android:d767a8034b3adcefce1add",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]

      })
      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
           firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
             console.log(result);
           });
 } else {
   console.log("cancelled")
 }
    } catch (e) {
      console.log("error", e)
    }

  }
  const {isSignedIn, setisSignedIn} = useContext(AuthContext)
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
    // if (
    //   userData.email == "sallubhai@yopmail.com" &&
    //   userData.password == "12345678"
    // ) {
    //   await AsyncStorage.setItem("token", "adsasdasdsdadsad");
    //   navigation.navigate("HomeScreen");
    // }
    // console.log(userData);
    await AsyncStorage.setItem("authToken", "adsasdasdsdadsad");
    await AsyncStorage.setItem("keeploogedin", "true");
    setisSignedIn(true);
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
            <Text className="text-center" onPress={()=>handleLogin()}>
              Login
            </Text>
          </TouchableOpacity>

          <View className="mt-5">
            <Text>OR</Text>
            <TouchableOpacity onPress={()=>signIn()} className="flex flex-row items-center mx-3">
              <Ionicons name="logo-google" size={25} />
              <Text>Login With Google</Text>
            </TouchableOpacity>
            </View>
          </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
