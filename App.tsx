import React from 'react';
import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux'; // import Provider from react-redux
import {setupStore} from './src/api/store';
import AppNav from './src/nav/appNav';
import AppLoading from './src/components/appLoading';
import {StyleSheet} from 'react-native';
// import * as Keychain from 'react-native-keychain';



function App(): JSX.Element {
  
  const [appLoaded, setAppLoaded] = useState(false);
  const store = setupStore();

  // const getToken = async () => {
  //   try {
  //     const credentials = await Keychain.getGenericPassword();
  //     if (credentials) {
  //       // If you have token-specific logic, handle it here.
  //       return credentials.password;
  //     }
  //   } catch (error) {
  //     console.error('Could not retrieve token from keychain', error);
  //   }
  //   return null;
  // };

  // useEffect(() => {
  //   const initializeApp = async () => {
  //     const token = await getToken();
  //     if (token) {
  //       // Handle authenticated state if needed
  //     } else {
  //       // Handle unauthenticated state if needed
  //     }
  //     setAppLoaded(true);
  //   };

  //   initializeApp();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return appLoaded ? (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <AppNav />
      </SafeAreaProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontFamily: 'regular',
  },
});

export default App;
