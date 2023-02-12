import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function ViewIngredientsButton(props) {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>View Ingredients</Text>
      </View>
    </TouchableHighlight>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
});
