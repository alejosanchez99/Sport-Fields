import React,{useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../../navigations/Navigation";

import AccountStack from "../../navigations/AccountStack";

export default function Account({ login }) {
  const [navigation, setNavigation] = useState(login)

  return navigation ? (
    <Navigation routeScreen={"user-logged"} />
  ) : (
    <NavigationContainer>
      <AccountStack route={"menu-account"} setNavigation={setNavigation} />
    </NavigationContainer>
  )
}

