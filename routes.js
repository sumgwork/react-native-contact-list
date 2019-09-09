import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const StackNavigator = createStackNavigator(
  {
    Contacts: Contacts,
    Profile: Profile
  },
  config
);

StackNavigator.navigationOptions = {
  tabBarLabel: "Home"
};

export default StackNavigator;
