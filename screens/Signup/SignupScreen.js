import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import styles from "./style";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { signupValidationSchema } from "../../utils";

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };

  return (
    <>
      <View isSafe style={styles.maincontainer}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{ height: "100%" }}
        >
          <Image
            style={styles.photo}
            source={require("../../assets/topscreen.jpg")}
          />
          <View style={styles.logincontainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.screenTitle}>Create a new account!</Text>
            </View>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={(values) => handleSignup(values)}
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
                    autoFocus={true}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <FormErrorMessage
                    error={errors.email}
                    visible={touched.email}
                  />
                  <TextInput
                    name="password"
                    leftIconName="key-variant"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="newPassword"
                    rightIcon={rightIcon}
                    handlePasswordVisibility={handlePasswordVisibility}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <FormErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />
                  <TextInput
                    name="confirmPassword"
                    leftIconName="key-variant"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={confirmPasswordVisibility}
                    textContentType="password"
                    rightIcon={confirmPasswordIcon}
                    handlePasswordVisibility={handleConfirmPasswordVisibility}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                  />
                  <FormErrorMessage
                    error={errors.confirmPassword}
                    visible={touched.confirmPassword}
                  />
                  {errorState !== "" ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  <Button style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Signup</Text>
                  </Button>
                </>
              )}
            </Formik>
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={"Already have an account?"}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
