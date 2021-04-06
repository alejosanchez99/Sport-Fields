import React,{useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../../navigations/Navigation";

import AccountStack from "../../navigations/AccountStack";

export default function Account({ login }) {
  const [navigation, setNavigation] = useState(login)
  const [route, setRoute] = useState("user-logged")

  return  (
    <NavigationContainer>
    {
     navigation ? (<Navigation routeScreen={route} />) :
      (<AccountStack route={"menu-account"} setNavigation={setNavigation} setRoute={setRoute} />)
    }
    </NavigationContainer>
  )
}

