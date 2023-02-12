import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { getCategoryById } from "../../data/api";

import ViewIngredientsButton from "../../components/ViewIngredientsButton";

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;

  const [activeSlide, setActiveSlide] = useState(0);
  const [category, setCategory] = useState({});

  const slider1Ref = useRef();

  useEffect(() => {
    getCategory();
  }, [item]);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const getCategory = async () => {
    try {
      if (!item) {
        throw new Error("Recipe not found");
      }
      const data = await getCategoryById(item.categoryId);

      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.photo_url }} />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("RecipesList", {
                  category,
                  title: category?.name,
                })
              }
            >
              <Text style={styles.category}>
                {category && category.name ? category?.name.toUpperCase() : ""}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../assets/icons/icons/time.png")}
            />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = "Ingredients for " + item.title;
                navigation.navigate("IngredientsDetails", {
                  ingredients,
                  title,
                });
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export const { width: viewportWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowOpacity: 1,
    shadowColor: "#000",
    top: -20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 250,
  },
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  photo: {
    width: "100%",
    height: 200,
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#000",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});
