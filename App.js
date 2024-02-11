// project imports
import { NativeWindStyleSheet } from "nativewind";
import * as React from 'react';
import Navigator from "./screens/Navigator";
export default function App() {
  return(
  <Navigator />
  )
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
