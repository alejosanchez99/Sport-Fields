import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import colors from "../../shared/styles/ColorsApp"
import Account from "../screens/account/InformationUser"
import message from "../../assets/messages/Message"

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: message.account.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
