import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import colors from "../../shared/styles/ColorsApp"
import UserLogged from "../screens/account/UserLogged"
import UserGuest from "../screens/account/UserGuest"
import { message } from "../../assets/messages/message"
import Login from "../screens/account/Login"
import ChangePersonalInformation from "../screens/account/ChangePersonalInformation"
import ChangePassword from "../screens/account/ChangePassword"

const Stack = createStackNavigator()

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
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="user-guest"
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
      <Stack.Screen
        name="personal-information"
        component={ChangePersonalInformation}
        options={{
          title: message.account.personalInformation.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: message.account.changePassword.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
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
  )
}
