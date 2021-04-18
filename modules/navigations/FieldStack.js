import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import colors from "../../shared/styles/ColorsApp"
import { message } from "../../assets/messages/message"
import SearchFields from "../screens/field/SearchFields"
const Stack = createStackNavigator()

export default function FieldStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search-fields"
        component={SearchFields}
        options={{
          title: message.field.title,
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  )
}
