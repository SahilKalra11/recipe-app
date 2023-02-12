import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Logo,
  Button,
  FormErrorMessage,
} from "../../components";
import { Images, Colors, auth } from "../../config";
import { useTogglePasswordVisibility } from "../../hooks";
import { loginValidationSchema } from "../../utils";

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };

  return (
    <>
      <View isSafe style={styles.maincontainer}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{ width: "100%", padding: 0 }}
        >
          <Image
            style={styles.photo}
            source={require("../../assets/topscreen.jpg")}
          />
          <View style={styles.logincontainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.screenTitle}>Login</Text>
            </View>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => handleLogin(values)}
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
                  {/* Input fields */}
                  <TextInput
                    name="email"
                    leftIconName="email"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <FormErrorMessage
                    error={errors.email}
                    visible={touched.email}
                    style={styles.error}
                  />
                  <TextInput
                    name="password"
                    leftIconName="key-variant"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    rightIcon={rightIcon}
                    handlePasswordVisibility={handlePasswordVisibility}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <FormErrorMessage
                    error={errors.password}
                    visible={touched.password}
                    style={styles.error}
                  />
                  {errorState !== "" ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  <Button style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                  </Button>
                </>
              )}
            </Formik>
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={"Create a new account?"}
              onPress={() => navigation.navigate("Signup")}
            />
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={"Forgot Password"}
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    padding: 20,
  },
  maincontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 0,
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
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
  photo: {
    width: "100%",
    height: 250,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.orange,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 40,
    width: 150,
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
    fontWeight: "bold",
  },
});
