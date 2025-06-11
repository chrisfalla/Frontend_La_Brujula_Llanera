import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigation from './src/presentation/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/shared/store/store';
import { useFonts } from 'expo-font';
import { LogVisitProvider } from './src/context/LogVisitContext';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./src/shared/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./src/shared/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./src/shared/assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <LogVisitProvider>
        <View style={styles.container}>
          <AppNavigation />
        </View>
      </LogVisitProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
