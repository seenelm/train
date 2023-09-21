import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { setupStore } from './src/api/store';
import AppNav from './src/nav/appNav';
import AppLoading from './src/components/appLoading';
import { StyleSheet } from 'react-native';

const store = setupStore(); // Move store setup outside the App component

function App(): JSX.Element {
  const [appLoaded, setAppLoaded] = useState(false);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        {appLoaded ? <AppNav /> : <AppLoading />}
      </SafeAreaProvider>
    </Provider>
  );
}

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
