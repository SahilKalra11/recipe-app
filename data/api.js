import axios from "axios";
import { parseObject, parseObjectArray } from "../utils";
const API_URL = "https://book-mange-default-rtdb.firebaseio.com";

export const getAllRecipesData = async () => {
  let recipeArray = [];
  try {
    let result = await axios.get(`${API_URL}/recipes.json`);
    recipeArray = parseObjectArray(result.data);
    return recipeArray;
  } catch (error) {}
  return recipeArray;
};

export async function getRecipeById(recipeId) {
  let recipe = null;
  const q = `orderBy="id"&equalTo=${recipeId}&print=pretty`;
  try {
    const result = await axios.get(`${API_URL}/recipes.json?${q}`);
    recipe = result.data;
    return parseObject(recipe);
  } catch (error) {}
  return recipe;
}

export const getRecipes = async (categoryId) => {
  let recipesArray = [];
  try {
    const data = await getAllRecipesData();
    recipesArray = [...data].filter(
      (recipe) => recipe.categoryId == categoryId
    );

    return recipesArray;
  } catch (error) {}

  return recipesArray;
};

export const getRecipesByRecipeName = async (recipeName) => {
  const nameUpper = recipeName
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");
  let recipesArray = [];
  const q = `orderBy="title"&startAt="${nameUpper}"&print=pretty`;

  try {
    const result = await axios.get(`${API_URL}/recipes.json?${q}`);
    recipesArray = parseObjectArray(result.data);
    return recipesArray;
  } catch (error) {}

  return recipesArray;
};

export const getAllCategoriesData = async () => {
  let categoriesArray = [];
  try {
    let result = await axios.get(`${API_URL}/categories.json/`);
    categoriesArray = parseObjectArray(result.data);
    return categoriesArray;
  } catch (error) {}
  return categoriesArray;
};

export async function getCategoryById(categoryId) {
  let category = null;
  const q = `orderBy="id"&equalTo=${categoryId}&print=pretty`;
  try {
    const result = await axios.get(`${API_URL}/categories.json?${q}`);
    category = result.data;
    return parseObject(category);
  } catch (error) {}
  return category;
}

export const getCategoryName = async (categoryId) => {
  let name;
  try {
    const category = await getCategoryById(categoryId);

    if (!category) {
      throw new Error("No Category name found");
    }

    return category?.name;
  } catch (error) {}
  return name;
};

export const getAllIngredientsData = async () => {
  let ingredientsArray = [];
  try {
    let result = await axios.get(`${API_URL}/ingredients.json`);
    ingredientsArray = parseObjectArray(result.data);
    return ingredientsArray;
  } catch (error) {}
  return ingredientsArray;
};

export async function getIngredientById(ingredientID) {
  let ingredient = null;
  const q = `orderBy="id"&equalTo=${ingredientID}&print=pretty`;
  try {
    const result = await axios.get(`${API_URL}/ingredients.json/?${q}`);
    ingredient = result.data;
    return parseObject(ingredient);
  } catch (error) {}
  return ingredient;
}

export const getAllIngredients = async (idArray) => {
  let ingredientsArray = [];
  try {
    const ingredientPromise = idArray.map((index) =>
      getIngredientById(index[0])
    );
    ingredientsArray = await new Promise.all(ingredientPromise).then((res) =>
      res.map((ing) => [ing, ing.name])
    );
    return ingredientsArray;
  } catch (error) {}

  return ingredientsArray;
};

export const getIngredientUrl = async (ingredientID) => {
  let url;
  try {
    const ingredient = await getIngredientById(ingredientID);
    if (ingredient && ingredient.photo_url) {
      return ingredient.photo_url;
    }

    throw new Error("No Ingredient url found");
  } catch (error) {}
  return url;
};

export const getRecipesByIngredient = async (ingredientId) => {
  let recipesArray = [];
  try {
    const recipes = await getAllRecipesData();

    if (!recipes || !Array.isArray(recipes)) {
      return [];
    }

    recipesArray = recipes.filter((data) =>
      data.ingredients.some((ing) => ing[0] == ingredientId)
    );

    return recipesArray;
  } catch (error) {}
  return recipesArray;
};

export const postRecipe = async (recipe) => {
  try {
    if (!recipe) {
      throw new Error("No Recipe found");
    }
    const result = await axios.post(`${API_URL}/recipes.json/`, recipe);
    return result.data;
  } catch (error) {}
};

export const postCategory = async (category) => {
  try {
    if (!category) {
      throw new Error("No Category found");
    }
    const result = await axios.post(`${API_URL}/categories.json/`, category);
    return result.data;
  } catch (error) {}
};

export const postIngredient = async (ingredient) => {
  try {
    if (!ingredient) {
      throw new Error("No Ingredient found");
    }
    const result = await axios.post(`${API_URL}/ingredients.json/`, ingredient);
    return result.data;
  } catch (error) {}
};
