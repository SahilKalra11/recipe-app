import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { postCategory } from "../../data/api";
import { Button } from "../../components";
import {
  categorySchema,
  validateInputs,
  validateSchema,
} from "../../utils/validateInputs";
import styles from "./styles";

export default function NewCategory(props) {
  const { route, navigation } = props;
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    photo_url: "",
  });

  const [errorState, setErrorState] = useState({
    isError: false,
    errors: {
      categoryName: "",
    },
  });

  const createCategory = async () => {
    const { name } = categoryData;
    try {
      const errorObj = await validateSchema(categorySchema, {
        categoryName: name,
      });

      if (errorObj && errorObj.isError) {
        alert("Please fill out the Form Properly");
        return;
      }
      const data = {
        ...categoryData,
        id: new Date().getTime(),
        photo_url: "",
      };
      const result = await postCategory(data);
      uploadImage(result.name);
    } catch (error) {}
  };
  const uploadImage = (id) => {
    const { name } = categoryData;
    navigation.navigate("SelectImage", {
      id,
      title: name,
      type: "categories",
    });
  };

  const updateCategory = (photo_url) => {
    setCategoryData({ ...categoryData, photo_url });
  };

  const handleBlur = async (name, value) => {
    try {
      const errorObj = await validateInputs(
        categorySchema,
        name === "name" ? "categoryName" : name,
        value
      );

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
      <Image
        style={styles.image}
        source={require("../../assets/category.jpg")}
      />
      <View style={styles.maincontainer}>
        <View style={styles.searchContainer}>
          <TextInput
            left="chef-hat"
            placeholder="Category Name"
            autoCapitalize="words"
            onChangeText={(text) =>
              setCategoryData({
                ...categoryData,
                name: text,
              })
            }
            onBlur={() => handleBlur("categoryName", categoryData.name)}
            style={styles.input}
          />
          <Text style={{ color: "red" }}>
            {errorState.errors.categoryName
              ? errorState.errors.categoryName
              : ""}
          </Text>
        </View>

        <TouchableOpacity
          onPress={createCategory}
          disabled={errorState.isError}
          title="Create"
          style={styles.button}
        >
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
        <Button
          onPress={createCategory}
          disabled={errorState.isError}
          title="Create"
          style={styles.Button}
        ></Button>
      </View>
    </View>
  );
}
