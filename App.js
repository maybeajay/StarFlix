// project imports
import { NativeWindStyleSheet } from "nativewind";
import * as React from 'react';
import Navigator from "./screens/Navigator";
import 'react-native-gesture-handler';
import { AuthProvider } from "./components/context/AuthContext";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View } from "react-native";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_500Medium, Sarala_400Regular, Prompt_600SemiBold, Ubuntu_400Regular } from "@expo-google-fonts/dev";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Sarala_400Regular,
    Prompt_600SemiBold,
    Ubuntu_400Regular
  })
  React.useEffect(() => {
    async function prepare() {
      try {
        console.log("FONT LOADED",fontsLoaded)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
     await SplashScreen.hideAsync();
   }
   }, [appIsReady]);
   
   if (!appIsReady) {
    return null;
   }

  return(
    <AuthProvider>
  <Navigator />
  </AuthProvider>
  )
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
