import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNav from './src/nav/appNav';
import AppLoading from './src/components/appLoading';
import { StyleSheet } from 'react-native';
import { store, persistor } from './src/api/store.js';
import { PersistGate } from 'redux-persist/integration/react';


function App(): JSX.Element {
  const [appLoaded, setAppLoaded] = useState(false);
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={styles.container}>
          {appLoaded ? <AppNav /> : <AppLoading />}
        </SafeAreaProvider>
      </QueryClientProvider>
      </PersistGate>
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
