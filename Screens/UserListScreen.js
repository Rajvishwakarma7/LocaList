import { View, FlatList, Button, Text, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "../Component/UserItem";
import { useNavigation } from "@react-navigation/native";

const UserListScreen = () => {
  const [userData, setuserData] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        setuserData(res.data.data);
      })
      .catch((err) => {
        console.log("this is error", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Go to Favorites"
        onPress={() => navigation.navigate("Favorites")}
      />
      {userData ? (
        <FlatList
          data={userData}
          renderItem={({ item }) => (
            <UserItem user={item} isFavorite={item.id} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Loading users...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default UserListScreen;
