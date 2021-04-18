import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import colors from "../../shared/styles/ColorsApp"
import { message } from "../../assets/messages/message"
import SearchFields from "../screens/field/SearchFields"
import Detail from "../screens/field/DetailField"
import MapFullScreen from "../screens/home/MapFullScreen"
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
         <Stack.Screen
        name="detail"
        component={Detail}
        options={{
          title: message.reservation.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
        <Stack.Screen
        name="map-reservation"
        component={MapFullScreen}
        options={{
          title: message.home.mapFullScreen.title,
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
