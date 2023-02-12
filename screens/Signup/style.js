import { StyleSheet } from "react-native";
import { Colors } from "../../data/theme";

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
  },
});

export default styles;
