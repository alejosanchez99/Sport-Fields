import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../../shared/styles/ColorsApp"
import UserLogged from "../screens/account/UserLogged";
import UserGuest from "../screens/account/UserGuest"
import message from "../../assets/messages/Message"

const Stack = createStackNavigator();

export default function AccountStack({ route }) {
  return (
    <Stack.Navigator
      initialRouteName={route}
    >
      <Stack.Screen
        name="user-logged"
        component={UserLogged}
        options={{
          title: message.account.title,
          headerTitleStyle: {
            alignSelf: "center"
          },
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="login"
        component={UserGuest}
        options={{
          title: message.account.title,
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
