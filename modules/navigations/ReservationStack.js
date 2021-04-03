import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Reservation from "../screens/reservation/Reservation"
import colors from "../../shared/styles/ColorsApp"
import { message } from "../../assets/messages/Message"

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
    </Stack.Navigator>
  );
}
