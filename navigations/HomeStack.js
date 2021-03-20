import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Home from "../modules/screens/home/Home";
import colors from "../shared/components/ColorsApp"
import strings from "../shared/components/Strings"

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: strings.home.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
