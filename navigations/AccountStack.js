import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../shared/components/ColorsApp"
import strings from "../shared/components/Strings"
import Account from "../modules/screens/account/InfoUser";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: strings.account.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
