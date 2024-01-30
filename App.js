// project imports
import { NativeWindStyleSheet } from "nativewind";
import { useEffect } from "react";
import Navigator from "./screens/Navigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
const checkIsLoggedIn = async ({navigation})=>{
  const token = await AsyncStorage.getItem("token");
  if(token){
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }
  else{
    return false;
  }
}
export default function App() {
  useEffect(()=>{
    checkIsLoggedIn();
  }, [])
  
  return(
  <Navigator />
  )
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
