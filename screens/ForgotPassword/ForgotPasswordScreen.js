import React, { useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Formik } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";

import { passwordResetSchema } from "../../utils";
import { Colors, auth } from "../../config";
import { View, TextInput, Button, FormErrorMessage } from "../../components";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const handleSendPasswordResetEmail = (values) => {
    const { email } = values;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Success: Password Reset Email sent.");
        navigation.navigate("Login");
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.maincontainer}>
      <Image
        style={styles.photo}
        source={require("../../assets/topscreen.jpg")}
      />
      <View style={styles.logincontainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.screenTitle}>Reset your password</Text>
        </View>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={passwordResetSchema}
          onSubmit={(values) => handleSendPasswordResetEmail(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <>
              <TextInput
                name="email"
                leftIconName="email"
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />

              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}

              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Reset Email</Text>
              </Button>
            </>
          )}
        </Formik>

        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={"Go back to Login"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 0,
  },
  innercontainer: {
    alignItems: "center",
  },
  logincontainer: {
    borderRadius: 30,
    top: -20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 20,
  },
  photo: {
    width: "100%",
    height: 250,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 40,
    width: 250,
    height: 55,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: "#000",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
