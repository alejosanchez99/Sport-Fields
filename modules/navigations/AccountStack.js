import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { message } from "../../assets/messages/message"
import colors from "../../shared/styles/ColorsApp"
import UserLogged from "../screens/account/UserLogged"
import UserGuest from "../screens/account/UserGuest"
import MenuAccount from "../screens/account/MenuAccount"
import ChangePersonalInformation from "../screens/account/ChangePersonalInformation";
import ChangePassword from "../screens/account/ChangePassword";
import Register from "../screens/account/Register";
import Login from "../screens/account/Login";
import AddUserAdmin from "../screens/account/AddUserAdmin";
import AddField from "../screens/field/AddField"
import CurrentLocation from "../screens/field/CurrentLocation"
import AddFieldSchedule from "../screens/field/AddFieldSchedule"

const Stack = createStackNavigator();

export default function AccountStack({ route, setNavigation, setRoute }) {
  return (
    <Stack.Navigator initialRouteName={route}>
      <Stack.Screen
        name="user-logged"
        component={UserLogged}
        options={{
          title: message.account.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="user-guest"
        component={UserGuest}
        options={{
          title: message.account.title,
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
        name="menu-account"
        component={() => <MenuAccount setNavigation={setNavigation} setRoute={setRoute} />}
        options={{
          title: message.login.title,
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
        name="register"
        component={Register}
        options={{
          title: message.login.register.title,
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
          title: message.login.login.title,
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
        name="add-user-admin"
        component={AddUserAdmin}
        options={{
          title: message.account.addUserAdmin.title,
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
        name="add-field"
        component={AddField}
        options={{
          title: message.account.addField.title,
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
        name="current-location"
        component={CurrentLocation}
        options={{
          title: message.home.currentLocation.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="add-field-schedule"
        component={AddFieldSchedule}
        options={{
          title: message.account.addFieldSchedule.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
