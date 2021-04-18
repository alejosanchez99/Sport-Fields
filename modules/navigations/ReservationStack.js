import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Reservation from "../screens/reservation/Reservation"
import Detail from "../screens/field/DetailField"
import colors from "../../shared/styles/ColorsApp"
import MapFullScreen from "../screens/home/MapFullScreen"
import { message } from "../../assets/messages/message"

const Stack = createStackNavigator();

export default function ReservationStack() {
  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name="reservation"
        component={Reservation}
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
  );
}
