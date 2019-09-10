import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favourites from "./screens/Favourites";
import User from "./screens/User";

import colors from "./utils/colors";

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreen = createStackNavigator(
  {
    Contacts: Contacts,
    Profile: Profile
  },
  {
    initialRouteName: "Contacts",
    defaultNavigationOptions: {
      tabBarIcon: getTabBarIcon("list")
    }
  }
);

const FavouritesScreen = createStackNavigator(
  {
    Favourites: Favourites,
    Profile: Profile
  },
  {
    initialRouteName: "Favourites",
    defaultNavigationOptions: {
      tabBarIcon: getTabBarIcon("star")
    }
  }
);

const UserScreen = createStackNavigator(
  { User },
  {
    initialRouteName: "User",
    defaultNavigationOptions: {
      tabBarIcon: getTabBarIcon("person")
    }
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    Contacts: ContactsScreen,
    Favourites: FavouritesScreen,
    User: UserScreen
  },
  {
    initialRouteName: "Contacts",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight
      },
      showLabel: true,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark
    }
  }
);
