import React from 'react'
import { LogBox } from "react-native"

import Splash from "./modules/screens/Splash"

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Splash />
  );
}

