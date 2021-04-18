import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import HomeStack from "./HomeStack";
import FavoriteStack from "./FavoriteStack";
import PromotionsStack from "./PromotionsStack";
import AccountStack from "./AccountStack";
import colors from "../../shared/styles/ColorsApp";
import { message } from "../../assets/messages/message";
import FieldStack from "./FieldStack";

const Tab = createBottomTabNavigator();

export default function Navigation({ routeScreen }) {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "home":
        iconName = "home";
        break;
      case "field":
        iconName = "magnify";
        break;
      case "favorites":
        iconName = "star";
        break;
      case "promotions":
        iconName = "alert-circle";
        break;
      case "account":
        iconName = "account-circle-outline";
        break;
    }
    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        inactiveTintColor: colors.secundary,
        activeTintColor: colors.four,
        style: {
          backgroundColor: colors.primary,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{ title: message.home.title }}
      />
      <Tab.Screen
        name="field"
        component={FieldStack}
        options={{ title: message.field.title }}
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
        children={(props) => <AccountStack route={routeScreen} props={props}/>}
        options={{ title: message.account.title }}
      />
    </Tab.Navigator>
  );
}
