import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";

const Favourites = props => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await fetchContacts();
        setFavourites(contacts);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  });

  const renderFavouriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate }
    } = props;
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  const keyExtractor = ({ phone }) => phone;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}

      {!loading && !error && (
        <FlatList
          data={favourites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavouriteThumbnail}
        />
      )}
    </View>
  );
};

Favourites.navigationOptions = {
  title: "Favourites"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  list: {
    alignItems: "center"
  }
});

export default Favourites;
