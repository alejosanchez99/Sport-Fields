import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Reservation from "../modules/screens/reservation/Reservation";
import colors from "../shared/components/ColorsApp"
import strings from "../shared/components/Strings"

const Stack = createStackNavigator();

export default function ReservationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="reservation"
        component={Reservation}
        options={{
          title: strings.reservation.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
