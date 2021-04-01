import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import colors from "../../shared/styles/ColorsApp"
import Account from "../../modules/screens/account/Account"
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
          headerTitleStyle: {
            alignSelf: "center"
          },
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
