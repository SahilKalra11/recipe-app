import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 55,
    border: 0,
    width: "100%",
    marginLeft: 0,
    padding: 15,
    backgroundColor: "#red",
  },
  heading: {
    fontSize: 30,
    paddingLeft: 25,
    paddingTop: 25,
    paddingBottom: 25,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 20,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    margin: 0,
    paddingTop: 5,
  },
  category: {
    marginTop: 0,
    marginBottom: 5,
  },
  input: {},
});
