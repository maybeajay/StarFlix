import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Linking, TextInput } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../components/context/AuthContext";
import { FIREBAE_AUTH } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
const LoginScreen = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [state, setState] = useState();
  const auth = FIREBAE_AUTH;
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  // const [state, setState] = useState()
  // useEffect(()=>{
  //   GoogleSignin.configure('724562316648-9r1io7rssia3kelc7r4445dhmsf600t0.apps.googleusercontent.com  ')
  // },[])
  // GoogleSignin.configure({
  //   scopes: ["profile", "email"], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId:
  //     "724562316648-9r1io7rssia3kelc7r4445dhmsf600t0.apps.googleusercontent.com",
  //   offlineAccess: true,
  //   androidClientId: "724562316648-9r1io7rssia3kelc7r4445dhmsf600t0.apps.googleusercontent.com"
    
  // });

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
    } catch (error) {
      Alert.alert("error", error?.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
       
      }
      Alert.alert(error?.message)
    }
  };
  const { Login, Logout } = useContext(AuthContext);
  const [emailError, setemailError] = useState(null);
  const [passError, setpassError] = useState(null);
  const handleChange = (name, value) => {
    setuserData({ ...userData, [name]: value });
    switch (name) {
      case "username":
        setemailError(
             value == null || value == ""
            ? "Username is required"
            : null
        );
        break;
      case "password":
        setpassError(
          value == null || value == "" ? "password is required" : null
        );
        break;
      default:
        break;
    }
  };

  const handleLogin = ()=>{
    console.log("USER DATA", userData)
    if(userData.username ==null || userData.username==""){
      setemailError("username is required");
      return ;
    }
    if(userData.password == null || userData.password == ''){
      setpassError("Password is required");
      return ;
    }
    if(!emailError && !passError){
      Login(userData);
    }
  }
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <Image
        source={require("../assets/Avengers.jpg")}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.2,
        }}
      />

      <Text className="text-3xl font-bold text-white mt-[10vh]">
        Login to Your Account
      </Text>

      <View className="flex flex-col justify-center items-center w-full h-4/5">
        <TextInput
          className="bg-gray-900 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-gray-700 block p-2.5 w-[80%] border border-gray-600 mt-6"
          placeholder="username"
          placeholderTextColor="#aaa"
          value={userData.username}
          onChangeText={(text) => handleChange("username", text)}
        />
        {emailError && <Text className="text-red-500">{emailError}</Text>}

        <TextInput
          secureTextEntry={true}
          className="bg-gray-900 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[80%] mt-5 border border-gray-600"
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={userData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {passError && <Text className="text-red-500">{passError}</Text>}

        {/* Remember Me and Forgot Password */}
        <View className="flex flex-row justify-between w-[80%] mt-5">
          <View className="flex flex-row items-center">
            {/* <CheckBox value={rememberMe} onValueChange={setRememberMe} /> */}
            <Text className="text-white ml-2">Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500">Forgot the password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-80 h-12 bg-indigo-600 mt-6 rounded-xl flex justify-center"
          onPress={() => handleLogin()}
        >
          <Text className="text-center text-white text-lg">Sign in</Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View className="mt-5 flex justify-center">
          <Text className="text-gray-300 text-center">Don't have a TMDB Account yet?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.themoviedb.org/signup")}
            className="w-80 h-12 mt-5 rounded-xl flex justify-center "
          >
            <Text className="text-center text-blue-600">Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
