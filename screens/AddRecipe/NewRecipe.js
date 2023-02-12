import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getAllCategoriesData,
  getAllIngredientsData,
  postRecipe,
} from "../../data/api";
import {
  recipeSchema,
  validateInputs,
  validateSchema,
} from "../../utils/validateInputs";

const initialState = {
  categoryId: "",
  title: "",
  time: 0,
  description: "",
  ingredients: [],
  photo_url: "",
  photosArray: [],
};

export default function NewRecipe(props) {
  const { navigation } = props;

  const [recipeData, setRecipeData] = useState({ ...initialState });

  const [allCategories, setAllCategories] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [errorState, setErrorState] = useState({
    isError: false,
    errors: {
      title: "",
      time: "",
      description: "",
      ingredients: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    loadDate();
  }, []);

  const loadDate = async () => {
    try {
      const data = await new Promise.all([
        getAllCategoriesData(),
        getAllIngredientsData(),
      ]);

      if (!data || !Array.isArray(data)) throw new Error("failed to load data");

      const categories = data[0].map((val) => ({
        label: val.name,
        value: val.id,
      }));
      const ingredients = data[1].map((val) => ({
        label: val.name,
        value: val.id,
      }));

      setAllCategories([...categories]);
      setAllIngredients([...ingredients]);
    } catch (error) {
      console.error(error);
    }
  };

  const createRecipe = async () => {
    try {
      const { title, categoryId, ingredients, time, description } = recipeData;
      const data = {
        ...recipeData,
        id: new Date().getTime(),
        ingredients: ingredients.map((id) => [id]),
        photo_url: "",
        photosArray: [],
      };
      const errorObj = await validateSchema(recipeSchema, { ...recipeData });

      if (errorObj && errorObj.isError) {
        alert("Please fill out the Form Properly");
        return;
      }

      const result = await postRecipe(data);

      uploadImage(result.name);
    } catch (error) {
      console.error(error);
    } finally {
      setRecipeData({ ...initialState });
    }
  };

  const uploadImage = (id) => {
    const { title } = recipeData;
    navigation.navigate("SelectImage", {
      title,
      id,
      type: "recipes",
    });
  };

  const updateRecipe = (photo_url) => {
    setRecipeData({ ...recipeData, photo_url, photosArray: [photo_url] });
  };

  const handleBlur = async (name, value) => {
    try {
      const errorObj = await validateInputs(recipeSchema, name, value);

      const { isError, errorMessage } = errorObj;

      if (isError) {
        setErrorState({
          isError: true,
          errors: {
            ...errorState.errors,
            [name]: errorMessage,
          },
        });
      } else {
        setErrorState({
          isError: false,
          errors: {
            ...errorState.errors,
            [name]: "",
          },
        });
      }
    } catch (error) {}
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={styles.keyboardlayout}
      >
        <Image
          style={styles.image}
          source={require("../../assets/recipe.jpg")}
        />
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              underlineColor="transparent"
              left="chef-hat"
              placeholder="Recipe Name"
              autoCapitalize="words"
              onChangeText={(text) =>
                setRecipeData({
                  ...recipeData,
                  title: text,
                })
              }
              onBlur={() => handleBlur("title", recipeData.title)}
              style={styles.input}
            />
            <Text style={styles.error}>
              {errorState.errors.title ? errorState.errors.title : ""}
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              underlineColor="transparent"
              left="timer"
              placeholder="Estimated Time"
              onChangeText={(text) =>
                setRecipeData({
                  ...recipeData,
                  time: text,
                })
              }
              keyboardType="number-pad"
              onBlur={() => handleBlur("time", recipeData.time)}
              style={styles.input}
            />
            <Text style={styles.error}>
              {errorState.errors.time ? errorState.errors.time : ""}
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              underlineColor="transparent"
              multiline={true}
              numberOfLines={5}
              label="Description"
              autoCapitalize="sentences"
              onChangeText={(text) =>
                setRecipeData({
                  ...recipeData,
                  description: text,
                })
              }
              onBlur={() => handleBlur("description", recipeData.description)}
              style={styles.input}
            />
            <Text style={styles.error}>
              {errorState.errors.description
                ? errorState.errors.description
                : ""}
            </Text>
          </View>
          <View>
            <DropDownPicker
              placeholder="Select Category"
              open={categoryOpen}
              value={recipeData.categoryId}
              items={allCategories}
              style={styles.dropdown}
              setOpen={() => {
                setIngredientOpen(false);
                setCategoryOpen(!categoryOpen);
              }}
              onSelectItem={(item) =>
                setRecipeData({ ...recipeData, categoryId: item.value })
              }
              zIndex={3000}
              zIndexInverse={1000}
            />
            <Text style={styles.error}>
              {errorState.categoryId ? errorState.categoryId : ""}
            </Text>
          </View>

          <View>
            <DropDownPicker
              placeholder="Select Ingredients"
              multiple={true}
              value={recipeData.ingredients}
              open={ingredientOpen}
              items={allIngredients}
              style={styles.dropdown}
              setOpen={() => {
                setCategoryOpen(false);
                setIngredientOpen(!ingredientOpen);
              }}
              onSelectItem={(item) => {
                setRecipeData({
                  ...recipeData,
                  ingredients: item.map((ing) => ing.value),
                });
              }}
              zIndex={1000}
              zIndexInverse={3000}
            />
            <Text style={{ color: "red" }}>
              {errorState.ingredients ? errorState.ingredients : ""}
            </Text>
          </View>

          <TouchableOpacity
            onPress={createRecipe}
            style={styles.appButton}
            disabled={errorState.isError}
          >
            <Text style={styles.text}>{"create"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
