import { StyleSheet } from "react-native";

export const chatListStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 35,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  calendarContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  halfPage: {
    flex: 0.5,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});

export const chatScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
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
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
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
    backgroundColor: "white",
  },
  sectionListContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",

    color: "black",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileImage1: {
    backgroundColor: "transparent",
    width: 25,
    height: 25,
    marginRight: 30,
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 25,
    maxWidth: 27,
    marginLeft: 13,
    marginRight: 2,
  },
  iconGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  listContainer: {
    backgroundColor: "white",
  },
  addGroupIcon: {
    width: 30,
    height: 30,
  },
  addGroupButton: {
    backgroundColor: "black",
    borderRadius: 30,
    width: 60,
    height: 60,
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 15,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
  },
  inputContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F6F6F8",
    borderColor: "transparent",
    borderRadius: 5,
  },
  inputError: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F6F6F8",
    borderColor: "transparent",
    borderRadius: 5,
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "90%",
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
  logo: {
    width: 50, // Set the width you want
    height: 50, // Set the height you want
    resizeMode: "contain", // To ensure the logo fits within the width and height
  },
});
