import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Favorites from "../screens/favorites/Favorites"
import colors from "../../shared/styles/ColorsApp"
import { message } from "../../assets/messages/message"

const Stack = createStackNavigator()

export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: message.favorites.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  )
}
