// project imports
import { NativeWindStyleSheet } from "nativewind";
import * as React from 'react';
import Navigator from "./screens/Navigator";
import 'react-native-gesture-handler';
import { AuthProvider } from "./components/context/AuthContext";
export default function App() {
  return(
    <AuthProvider>
  <Navigator />
  </AuthProvider>
  )
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
