import React, { useState, useEffect, useLayoutEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View, Button, BackHandler, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Appbar,
} from "react-native-paper";
import { db, storage } from "../config/firebase";
import { Colors } from "../config/theme";
import { ref as databaseRef, remove, update } from "firebase/database";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AppRenderIf from "../components/AppRenderIf";
import BackButton from "../components/BackButton";

export const SelectImage = (props) => {
  const { navigation, route } = props;

  const id = route.params?.id;
  const title = route.params?.title;
  const category = route.params?.category;
  const type = route.params?.type;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permission to make this work");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      const { name } = navigation.getState();
      if (name !== SelectImage) return;
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: async () => {},
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            let idRef = databaseRef(db, `${type}/${id}`);
            await remove(idRef);
            navigation.goBack();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const imageId = Date.now().toString();
    const storageRef = ref(storage, `${type}/` + imageId);
    console.log("storages", storageRef, imageId);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setUploading(true);
            break;
        }
      },
      (error) => {
        console.log("error", error, error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setUploaded(true);
            console.log("url is", downloadURL);
            return updateImage(downloadURL);
          })
          .then((res) => {
            navigation.dispatch(StackActions.popToTop());
            blob.close();
          });
      }
    );
  };

  const updateImage = async (imageUrl) => {
    const newFields = { photo_url: imageUrl };
    if (type === "recipes") {
      newFields.photosArray = [imageUrl];
    }
    let idRef = await databaseRef(db, `${type}/${id}`);
    await update(idRef, newFields);
  };

  return (
    <View isSafe style={styles.maincontainer}>
      {uploading != true && (
        <Title
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            color: Colors.mediumGray,
          }}
        >
          Upload Image
        </Title>
      )}
      {uploading == true && (
        <Title
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 10 }}
        >
          Image Uploading
        </Title>
      )}
      <Card style={styles.container}>
        {AppRenderIf(
          image != null,
          <Card.Cover style={styles.photo} source={{ uri: image }} />
        )}
        {AppRenderIf(
          image == null,
          <Card.Cover
            style={styles.photo}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/kitchennetwork-cw.appspot.com/o/default.png?alt=media&token=77cfe569-4e3c-45e8-89f2-ce75584ee611",
            }}
          />
        )}
      </Card>
      <View>
        {uploading == true && (
          <>
            <ActivityIndicator
              style={{ marginTop: 10 }}
              size={40}
              animating={uploading}
              color={Colors.primary}
            />
          </>
        )}

        {uploaded == false && (
          <>
            {image == null && (
              <Button
                style={{
                  width: 100,
                  alignSelf: "center",
                  elevation: 10,
                  borderRadius: 30,
                }}
                icon="image"
                color="#000"
                mode="contained"
                onPress={pickImage}
                title="Choose Picture"
              />
            )}
            {uploading == false && image && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Button
                  style={{
                    width: 182,
                    alignSelf: "center",
                    elevation: 10,
                    borderRadius: 25,
                  }}
                  icon="image"
                  mode="contained"
                  onPress={() => {
                    setImage(null);
                  }}
                  color="black"
                  title="Change Picture"
                />

                <Button
                  style={{
                    width: 182,
                    alignSelf: "center",
                    elevation: 10,
                    borderRadius: 25,
                    backgroundColor: Colors.green,
                  }}
                  title="Upload"
                  onPress={uploadImage}
                />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: "100%",
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  choosepicture: {
    backgroundColor: "#000",
  },
});
