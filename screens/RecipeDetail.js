// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

// import { auth } from "../config";

// export const RecipeDetail = (props) => {
//   const API_URL = "https://book-mange-default-rtdb.firebaseio.com/recipes";

//   console.log(API_URL);
//   const item = route;
//   //   console.log({ item });
//   const [recipe, setRecipe] = useState({});
//   const { navigation, route } = props;

//   const getRecipeById = async (recipeId) => {
//     const resp = await fetch(`${API_URL}`);
//     const data = resp.filter((item) => item.id === recipeId);
//     // setData(data);
//     // alert(data);
//   };

//   const renderImage = ({ item }) => {
//     <TouchableHighlight>
//       <View style={styles.imageContainer}>
//         <Image style={styles.image} source={{ uri: item }} />
//       </View>
//     </TouchableHighlight>;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.carouselContainer}>
//         <View style={styles.infoRecipeContainer}>
//           <View style={styles.infoContainer}></View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
