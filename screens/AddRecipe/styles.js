import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    border: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
  },
  searchContainer: {
    marginBottom: 25,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  inputContainer: {
    padding: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: "#fff",
    opacity: 1,
    zIndex: 1,
    top: -15,
  },
  keyboardlayout: {
    width: "100%",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  searchInput: {
    color: "black",
    width: 180,
    height: 50,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 5,
    borderColor: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 0,
    elevation: 1.1,
  },
  error: {
    position: "absolute",
    bottom: -20,
    paddingLeft: 15,
    marginTop: 0,
    color: "orange",
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "#fff",
    border: 0,
    borderColor: 0,
    borderRadius: 30,
    marginBottom: 15,
    height: 60,
    marginTop: 10,
    elevation: 1.1,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
  },
  appButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    width: "50%",
    alignSelf: "center",
    padding: 20,
    width: 150,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: "#000",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
