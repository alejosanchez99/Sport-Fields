import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../../navigations/Navigation";

import AccountStack from "../../navigations/AccountStack";

export default function Account() {
  const [login, setlogin] = useState(null);

  setlogin(false)
  return login ? (
    <Navigation />
  ) : (
    <NavigationContainer>
      <AccountStack route={"login"}/>
    </NavigationContainer>
  )
}

