import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favorites from "../modules/screens/favorites/Favorites";
import colors from "../shared/components/ColorsApp"
import strings from "../shared/components/Strings"

const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: strings.favorites.title,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.four,
        }}
      />
    </Stack.Navigator>
  );
}
