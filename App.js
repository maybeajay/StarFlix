// project imports
import { NativeWindStyleSheet } from "nativewind";
import * as React from 'react';
import Navigator from "./screens/Navigator";
import 'react-native-gesture-handler';
import { AuthProvider } from "./components/context/AuthContext";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
export default function App() {
  React.useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  return(
    <AuthProvider>
  <Navigator />
  </AuthProvider>
  )
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
