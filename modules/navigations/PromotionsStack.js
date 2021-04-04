import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Promotions from "../screens/promotions/Promotions"
import colors from "../../shared/styles/ColorsApp"
import { message } from "../../assets/messages/Message"

const Stack = createStackNavigator()

export default function PromotionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="promotions"
        component={Promotions}
        options={{
          title: message.promotions.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  )
}
