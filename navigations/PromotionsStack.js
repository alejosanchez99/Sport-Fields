import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Promotions from "../modules/screens/promotions/Promotions";
import colors from "../shared/components/ColorsApp"
import strings from "../shared/components/Strings"

const Stack = createStackNavigator();

export default function PromotionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="promotions"
        component={Promotions}
        options={{
          title: strings.promotions.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
