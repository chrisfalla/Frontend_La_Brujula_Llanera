import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login'
import RecoveryScreen from './src/screens/RecoveryEmail';
import RecoveryScreen1 from './src/screens/SendCode';
import RecoveryScreen2 from './src/screens/ValidateCode';
import RecoveryScreen3 from './src/screens/RecoveryPassword';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Recovery" 
          component={RecoveryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Recovery1" 
          component={RecoveryScreen1}
          options={{ headerShown: false }}
        />
            <Stack.Screen 
          name="Recovery2" 
          component={RecoveryScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Recovery3"
        component={RecoveryScreen3}
        options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
