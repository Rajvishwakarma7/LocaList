import React, { useEffect, useState } from "react";
import { getFavorites, clearFavorites } from "../Utils/Storage";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FavoriteListScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteItems = await getFavorites();
        setFavorites(favoriteItems);
        console.log("Favorite users from local storage:", favoriteItems);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleClearFavorites = async () => {
    try {
      await clearFavorites();
      setFavorites([]); // Clear the state
      console.log("Favorites cleared from local storage.");
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      {favorites && favorites.length > 0 ? (
        <>
          {favorites.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <Icon name={"heart"} size={24} color={"red"} />
            </View>
          ))}
          <Button
            title="Clear Favorites"
            onPress={handleClearFavorites}
            color="#E0610A"
          />
        </>
      ) : (
        <Text style={styles.name}>No User in favorites List</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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

export default FavoriteListScreen;
