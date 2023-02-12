import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  AddItemContainer: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  AddPhoto: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    elevation: 3,
  },
  AddName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "#333333",
    marginTop: 8,
  },
  AddInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
});

export default styles;
