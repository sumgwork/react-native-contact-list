import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DetailListItem from "../components/DetailListItem";
import colors from "../utils/colors";

const Options = () => (
  <View style={styles.container}>
    <DetailListItem title="Update Profile" />
    <DetailListItem title="Change Language" />
    <DetailListItem title="Sign Out" />
  </View>
);

Options.navigationOptions = ({ navigation: { goBack } }) => ({
  title: "Options",
  headerLeft: (
    <MaterialIcons
      name="close"
      size={24}
      style={{ color: colors.black, marginLeft: 10 }}
      onPress={() => goBack()}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Options;
