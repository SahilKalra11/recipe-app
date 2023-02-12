import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import RecipeDetailScreen from "../screens/RecipeDetail/RecipeDetailScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";

import AddRecipe from "../screens/AddRecipe/NewRecipe";
import AddCategory from "../screens/AddCategory/NewCategory";
import AddIngredients from "../screens/AddIngredients/NewIngredients";
import AddScreen from "../screens/Add/AddScreen";
import { SelectImage } from "../components/SelectImage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Recipe App" component={TabNavigation} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Recipe" component={RecipeDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />

      <Stack.Screen name="AddRecipes" component={AddRecipe} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
      <Stack.Screen name="AddIngredient" component={AddIngredients} />
      <Stack.Screen name="SelectImage" component={SelectImage} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        tabBarStyle: { color: "red" },
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          borderTopWidth: 0.2,
          borderColor: "#000",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: "Add Recipe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
