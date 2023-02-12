import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getAllIngredients } from "../../data/api";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;
  const [ingredientsArray, setAllIngredientsArray] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  useEffect(() => {
    getAllIngredientsData();
  }, []);

  const getAllIngredientsData = async () => {
    try {
      const ingredients = await getAllIngredients(item);

      setAllIngredientsArray(ingredients);
    } catch (error) {
      console.error(error);
    }
  };

  const onPressIngredient = async (item) => {
    let name = item.name;
    let ingredient = item.id;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
      <Text style={styles.title}>{item[0].name}</Text>
      <Text style={{ color: "grey" }}>{item[1]}</Text>
    </View>
  );

  return (
    <View style={styles.maincontainer}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={ingredientsArray}
        renderItem={renderIngredient}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
