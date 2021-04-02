import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../../navigations/Navigation";

import AccountStack from "../../navigations/AccountStack";

export default function Account({login}) {
  
  return login ? (
    <Navigation routeScreen={"user-logged"} />
  ) : (
    <NavigationContainer>
      <AccountStack route={"login"}/>
    </NavigationContainer>
  )
}

