import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  heading: RecipeCard.heading,
  highlight: RecipeCard.highlight,
  maincontainer: {
    backgroundColor: "#fff",
    paddingBottom: 80,
    height: "100%",
    width: "100%",
  },
  searchInput: {
    backgroundColor: "red",
  },
  searchbar: {
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#fff",
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
  },
});

export default styles;
