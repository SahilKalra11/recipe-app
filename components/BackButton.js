import React from "react";
import { TouchableHighlight, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function BackButton(props) {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.btnContainer}>
      <Image
        source={require("../assets/icons/icons/backArrow.png")}
        style={styles.btnIcon}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: "#fc6e3c",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  btnIcon: {
    height: 17,
    width: 17,
  },
});
