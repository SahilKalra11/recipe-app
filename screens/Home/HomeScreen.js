import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  useLayoutEffect,
  TextInput,
  Pressable,
} from "react-native";
import styles from "./styles";
import {
  getCategoryName,
  getAllRecipesData,
  getRecipesByRecipeName,
} from "../../data/api.js";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [timeoutVariable, setTimeoutVariable] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllRecipes();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => {
      if (timeoutVariable) {
        clearTimeout(timeoutVariable);
      }
    };
  }, [SearchValue]);

  const handleSearch = async (text) => {
    setSearchValue(text);
    const interval = setTimeout(async () => {
      const recipeArray1 = await getRecipesByRecipeName(text);
      const recipeArray2 = [];

      const aux = recipeArray1.concat(recipeArray2);
      const recipeArray = [...new Set(aux)];
      if (text == "") {
        setFilteredRecipes([...allRecipes]);
      } else {
        if (recipeArray && Array.isArray(recipeArray)) {
          setFilteredRecipes([...recipeArray]);
          let categories = await new Promise.all(
            data.map((recipe) => getCategoryName(recipe.categoryId))
          );
          setCategoryNames(categories);
        }
      }
    }, 1000);

    setTimeoutVariable(interval);
  };

  const getAllRecipes = async () => {
    try {
      const data = await getAllRecipesData();
      if (data && Array.isArray(data)) {
        setAllRecipes(data);
        setFilteredRecipes(data);
        let categories = await new Promise.all(
          data.map((recipe) => getCategoryName(recipe.categoryId))
        );
        setCategoryNames(categories);
      }
    } catch (error) {
      console.error("error ", error);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item, index }) => {
    return (
      <View>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => onPressRecipe(item, index)}
        >
          <View style={styles.container}>
            <Image
              style={styles.photo}
              source={{
                uri: item.photo_url
                  ? item.photo_url
                  : "../../assets/recipeScreen.jpg",
              }}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.maincontainer}>
      <Searchbar
        placeholder="Type Here"
        onChangeText={handleSearch}
        value={SearchValue}
        style={styles.searchbar}
      />
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredRecipes}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </View>
  );
}
