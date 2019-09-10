import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import colors from "./utils/colors";

const StackNavigator = createStackNavigator(
  {
    Contacts: Contacts,
    Profile: Profile
  },
  {
    initialRouteName: "Contacts",
    defaultNavigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.blue
      }
    }
  }
);

// StackNavigator.navigationOptions = {
//   headerTintColor: "white",
//   headerStyle: {
//     backgroundColor: colors.blue
//   }
// };

export default StackNavigator;
