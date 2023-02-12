import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { postIngredient } from "../../data/api";
import {
  ingredientSchema,
  validateInputs,
  validateSchema,
} from "../../utils/validateInputs";
import styles from "./styles";

export default function NewIngredient(props) {
  const { navigation } = props;
  const [ingredientData, setIngredientData] = useState({
    id: "",
    name: "",
    photo_url: "",
  });

  const [errorState, setErrorState] = useState({
    isError: false,
    errors: {
      ingredientName: "",
    },
  });

  const createIngredient = async () => {
    try {
      const errorObj = await validateSchema(ingredientSchema, {
        ingredientName: ingredientData.name,
      });

      if (errorObj && errorObj.isError) {
        alert("Please fill out the Form Properly");
        return;
      }
      const data = {
        ...ingredientData,
        id: new Date().getTime(),
        photo_url: "",
      };

      const result = await postIngredient(data);
      uploadImage(result.name);
    } catch (error) {}
  };

  const uploadImage = (id) => {
    const { name } = ingredientData;
    navigation.navigate("SelectImage", {
      id,
      title: name,
      type: "ingredients",
    });
  };

  const handleBlur = async (name, value) => {
    try {
      const errorObj = await validateInputs(ingredientSchema, name, value);

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

  const updateIngredient = (photo_url) => {
    setIngredientData({ ...ingredientData, photo_url });
  };

  return (
    <View isSafe style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/ingredient.jpg")}
      />
      <View style={styles.maincontainer}>
        <View style={styles.searchContainer}>
          <TextInput
            left="chef-hat"
            placeholder="Ingredient Name"
            autoCapitalize="words"
            onChangeText={(text) =>
              setIngredientData({
                ...ingredientData,
                name: text,
              })
            }
            onBlur={() => handleBlur("ingredientName", ingredientData.name)}
            style={styles.input}
          />
          <Text style={{ color: "red" }}>
            {errorState.errors.ingredientName
              ? errorState.errors.ingredientName
              : ""}
          </Text>
        </View>
        <TouchableOpacity
          onPress={createIngredient}
          disabled={errorState.isError}
          title="Create"
          style={styles.button}
        >
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
