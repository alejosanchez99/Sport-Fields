import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/home/Home"
import colors from "../../shared/styles/ColorsApp"
import message from "../../assets/messages/Message"

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: message.home.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
