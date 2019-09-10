import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";

const User = ({ params }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
    fetchUser();
  });

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

User.navigationOptions = {
  title: "Me",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: colors.blue
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
});

export default User;
