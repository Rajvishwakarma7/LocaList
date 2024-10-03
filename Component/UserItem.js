import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { saveFavorite } from "../Utils/Storage";
const UserItem = ({ user, isFavorite }) => {
  const handlePress = async (user) => {
    try {
      await saveFavorite(user);
      // Optionally, update state or UI to reflect that the user has been favorited
      //   console.log("User added to favorites");
    } catch (error) {
      console.error("Error handling press:", error);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={{ paddingRight: 20 }}
        onPress={() => {
          handlePress(user);
        }}
      >
        <Icon name={"heart"} size={24} color={"red"} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name={"heart-outline"} size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default UserItem;
