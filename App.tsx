/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux'; // import Provider from react-redux
import {setupStore} from './src/api/store';
import AppNav from './src/nav/appNav';
import AppLoading from './src/components/appLoading';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const [appLoaded, setAppLoaded] = useState(false);
  const store = setupStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 2000); // Set delay time to 2 seconds

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
