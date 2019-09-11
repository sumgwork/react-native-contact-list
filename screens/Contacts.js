import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import store from "../store";
import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";
import colors from "../utils/colors";

const Contacts = props => {
  const [contacts, setContacts] = useState(store.getState().contacts);
  const [loading, setLoading] = useState(store.getState().isFetchingContacts);
  const [error, setError] = useState(store.getState().error);

  const localFetchContacts = async () => {
    try {
      const contacts = await fetchContacts();

      setContacts(contacts);
      setLoading(false);
      setError(false);
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

  const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

  const renderContact = ({ item }) => {
    const { name, phone, avatar } = item;
    const {
      navigation: { navigate }
    } = props;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
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
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

Contacts.navigationOptions = {
  title: "Contacts",
  headerTintColor: colors.black,
  headerStyle: {
    backgroundColor: "white"
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});

export default Contacts;
