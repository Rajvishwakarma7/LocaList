import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFavorite = async (user) => {
  console.log("this storage---->>", user);
  try {
    // Retrieve the current favorites from AsyncStorage
    let favorites = await AsyncStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];

    // Check if the user is already in the favorites
    if (!favorites.some((fav) => fav.id === user.id)) {
      favorites.push(user);
      console.log("Updated list of favorites:", favorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      console.log("User is already in favorites.");
    }
  } catch (error) {
    console.error("Error saving favorite:", error);
    // Log the error message
    console.log("Error saving favorite:", error.message);
  }
};

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return [];
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem("favorites");
  } catch (error) {
    console.error("Error clearing favorites:", error);
  }
};
