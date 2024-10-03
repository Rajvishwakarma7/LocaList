import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "./Screens/UserListScreen";
import FavoriteListScreen from "./Screens/FavoriteListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Users" component={UserListScreen} />
        <Stack.Screen name="Favorites" component={FavoriteListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
