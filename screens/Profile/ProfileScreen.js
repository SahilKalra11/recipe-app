import React from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import { signOut, getAuth } from "firebase/auth";

import { auth } from "../../config";

const info = getAuth();
const user = info.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    const uid = user.uid;
  });
}

export const ProfileScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../../assets/recipe.jpg")}
      />
      <View style={styles.innercontainer}>
        <Image style={styles.image} source={require("../../assets/user.png")} />
        <Button title="Sign Out" onPress={handleLogout} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    width: "100%",
    height: 350,
  },
  image: {
    width: 150,
    height: 150,
    borderRaiuds: 400 / 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  innercontainer: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    top: -10,
  },
});
