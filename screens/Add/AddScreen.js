import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";

export default function AddScreen(props) {
  const { navigation } = props;
  const Items = [
    {
      name: "Recipe",
      photo_url:
        "https://media-cdn.tripadvisor.com/media/photo-s/10/ad/fc/fc/fresh-toppings-and-hot.jpg",
    },
    {
      name: "Category",
      photo_url:
        "https://media.cnn.com/api/v1/images/stellar/prod/200811120029-15-best-polish-foods.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280",
    },
    {
      name: "Ingredient",
      photo_url: "https://food.unl.edu/newsletters/images/mise-en-plase.jpg",
    },
  ];

  const onPressCategory = (item) => {
    const title = item.name;
    switch (title) {
      case "Recipe":
        navigation.navigate("AddRecipes", { title: "Recipes" });
        break;
      case "Category":
        navigation.navigate("AddCategory", { title: "Categories" });
        break;
      case "Ingredient":
        navigation.navigate("AddIngredient", { title: "Ingredients" });
        break;
      default:
        return;
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.AddItemContainer}>
        <Image style={styles.AddPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.AddName}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Items}
        renderItem={renderCategory}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
