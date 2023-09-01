import {StyleSheet} from 'react-native';

export const chatListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    flex: 0,
  },
  text: {
    fontSize: 25,
    // fontFamily: 'bold',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
});

export const chatScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  chatArea: {
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    marginHorizontal: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
});

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  sectionListContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 25,
    // fontWeight: 'bold',
    color: 'black',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 2,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  profileImage1: {
    backgroundColor: 'transparent',
    width: 45,
    height: 45,
    marginRight: 15,
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: 'transparent',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  // listContainer: {
  //   backgroundColor: "red",
  // },
  addGroupIcon: {
    width: 24,
    height: 24,
  },
  addGroupButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    bottom: 11,
    right: 15,
    position: 'absolute', // Add this line to position it absolutely.
    alignSelf: 'flex-end',
    shadowColor: '#000', // For iOS
    shadowOffset: {
      width: 0,
      height: 2, // Shadow position
    },
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Blur radius
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 28,
    // fontWeight: 'bold',
    margin: 5,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  inputContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    marginBottom: 27,
    paddingHorizontal: 15,
    backgroundColor: '#F6F6F8',
    borderColor: 'transparent',
    borderRadius: 5,
  },
  inputError: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    marginBottom: 27,
    paddingHorizontal: 15,
    backgroundColor: '#F6F6F8',
    borderColor: 'transparent',
    borderRadius: 5,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: 14,
    padding: 5,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export const calendarStyles = StyleSheet.create({
  addEventButton: {
    position: 'absolute',
    bottom: 45,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  addGroupIcon: {
    width: 25,
    height: 25,
  },
});
