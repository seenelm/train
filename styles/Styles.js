import { StyleSheet } from "react-native";

export const chatListStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 30,
    marginRight: 10,
    height: 40,
  },
  calendarContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  halfPage: {
    flex: 0.5,
  },
});

export const chatScreenStyles = StyleSheet.create({
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

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionListContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 25,
    backgroundColor: "#2A2A2A",
    borderRadius: 30,
    elevation: 8,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  plus: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 21,
    maxWidth: 21,
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 28,
    maxWidth: 30,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "blue",
    width: "80%",
    alignSelf: "center",
  },
  inputError: {
    height: 50,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    top: 14,
    padding: 5,
  },
});
