import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { navigationRef } from '../../infrastructure/services/navigationService';
import { Text } from 'react-native';

import RegisterStepOneScreen from '../screens/Register/RegisterStepOne/RegisterStepOneScreen';
import RegisterStepTwoScreen from '../screens/Register/RegisterStepTwo/RegisterStepTwoScreen';
import { userStorage } from '../../infrastructure/storage/userStorage';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import MapaScreen from '../screens/Map/MapaScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../shared/store/authSlice/authSlice';
import LoginScreen from '../screens/Login/LoginScreen';
import PasswordRecoveryStepOneScreen from '../screens/PasswordRecovery/PasswordRecoveryStepOneScreen';
import PasswordRecoveryStepTwoScreen from '../screens/PasswordRecovery/PasswordRecoveryStepTwoScreen';
import PasswordRecoveryStepThreeScreen from '../screens/PasswordRecovery/PasswordRecoveryStepThreeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Modificamos para crear un Stack fuera del TabNavigator para pantallas que no deberían estar en tabs
const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="RecoveryOne" component={PasswordRecoveryStepOneScreen} />
    <Stack.Screen name="Recovery2" component={PasswordRecoveryStepTwoScreen} />
    <Stack.Screen name="Recovery3" component={PasswordRecoveryStepThreeScreen} />
  </Stack.Navigator>
);

// Hook para acceder al auth state
const useAuth = () => useSelector(state => state.auth);

// Navegador de tabs principal
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Categories':
            iconName = focused ? 'search' : 'search-outline';
            break;
          case 'Map':
            iconName = focused ? 'location' : 'location-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          case 'Login':
            iconName = focused ? 'log-in' : 'log-in-outline';
            break;
          default:
            iconName = 'help-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ color }) => <Text style={{color, fontSize: 12}}>{route.name}</Text>,
      tabBarActiveTintColor: '#236A34',
      tabBarInactiveTintColor: 'black',
      tabBarStyle: {
        height: 54,
        paddingBottom: 5,
        backgroundColor: '#fff',
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Map" component={MapaScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

// Navegador de autenticación (registro)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterStepOne" component={RegisterStepOneScreen} />
    <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwoScreen} />
    <Stack.Screen name="RecoveryOne" component={PasswordRecoveryStepOneScreen} />
    <Stack.Screen name="Recovery2" component={PasswordRecoveryStepTwoScreen} />
    <Stack.Screen name="Recovery3" component={PasswordRecoveryStepThreeScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isGuest = authState.isGuest;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const user = await userStorage.get();
      if (user) {
        dispatch(login(user));
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {(isLoggedIn || isGuest) ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;