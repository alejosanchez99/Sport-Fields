import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/home/Home"
import colors from "../../shared/styles/ColorsApp"
import MapFullScreen from "../screens/home/MapFullScreen"
import CurrentLocation from "../screens/home/CurrentLocation"
import { message } from "../../assets/messages/message"

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: message.home.title,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
      <Stack.Screen
        name="map"
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
      <Stack.Screen
        name="current-location"
        component={CurrentLocation}
        options={{
          title: message.home.currentLocation.title,
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
