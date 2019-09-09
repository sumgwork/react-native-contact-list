import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";

import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";

const Contacts = props => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    localFetchContacts();
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

export default Contacts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});
