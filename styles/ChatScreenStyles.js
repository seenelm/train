import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatArea: {
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    marginHorizontal: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 40,
    paddingRight: 40,
    paddingLeft: 10,
  },
  sendButton: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
});
