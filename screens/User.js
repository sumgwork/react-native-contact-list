import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import store from "../store";
import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";
import { MaterialIcons } from "@expo/vector-icons";

const User = ({ params }) => {
  const [user, setUser] = useState(store.getState().user);
  const [loading, setLoading] = useState(store.getState().isFetchingUser);
  const [error, setError] = useState(store.getState().error);

  const localFetchUser = async () => {
    try {
      const user = await fetchUserContact();

      setUser(user);
      setLoading(false);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const unsubscribe = store.onChange(() => {
    setUser(store.getState().user);
    setLoading(store.getState().isFetchingUser);
    setError(store.getState().error);
  });

  useEffect(() => {
    localFetchUser();
    return unsubscribe;
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={avatar} phone={phone} name={name} />
      )}
    </View>
  );
};

User.navigationOptions = ({ navigation: { navigate } }) => ({
  title: "Me",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: colors.blue
  },
  headerRight: (
    <MaterialIcons
      name="settings"
      size={24}
      style={{ color: "white", marginRight: 10 }}
      onPress={() => navigate("Options")}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
});

export default User;
