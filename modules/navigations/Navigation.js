import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "react-native-elements"

import HomeStack from './HomeStack'
import ReservationStack from './ReservationStack'
import FavoriteStack from './FavoriteStack'
import PromotionsStack from './PromotionsStack'
import AccountStack from './AccountStack'
import message from "../../assets/messages/Message"
import colors from "../../shared/styles/ColorsApp"


const Tab = createBottomTabNavigator();

export default function Navigation() {

  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "home":
        iconName = "apps";
        break;
      case "reservation":
        iconName = "magnify";
        break;
      case "favorites":
        iconName = "star"
        break;
      case "promotions":
        iconName = "alert-circle"
        break;
      case "account":
        iconName = "cog"
        break;
    }
    return (
      <Icon
        type="material-community"
        name={iconName}
        size={22}
        color={color}
      />
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          inactiveTintColor: colors.secundary,
          activeTintColor: colors.four,
          style: {
            backgroundColor: colors.primary,
          }
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color)
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{ title: message.home.title, }}
        />
        <Tab.Screen
          name="reservation"
          component={ReservationStack}
          options={{ title: message.reservation.title }}
        />
        <Tab.Screen
          name="promotions"
          component={PromotionsStack}
          options={{ title: message.promotions.title }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoriteStack}
          options={{ title: message.favorites.title }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: message.account.title }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

