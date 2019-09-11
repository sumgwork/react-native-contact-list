import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import store from "../store";
import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";

const Favourites = props => {
  const [contacts, setContacts] = useState(store.getState().contacts);
  const [loading, setLoading] = useState(store.getState().isFetchingContacts);
  const [error, setError] = useState(store.getState().error);

  const localFetchContacts = async () => {
    try {
      if (contacts.length === 0) {
        const contacts = await fetchContacts();

        setContacts(contacts);
        setLoading(false);
        setError(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const unsubscribe = store.onChange(() => {
    setContacts(store.getState().contacts);
    setLoading(store.getState().isFetchingContacts);
    setError(store.getState().error);
  });

  useEffect(() => {
    localFetchContacts();
    return unsubscribe;
  }, []);

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
  const favorites = contacts.filter(contact => contact.favorite);
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}

      {!loading && !error && (
        <FlatList
          data={favorites}
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
