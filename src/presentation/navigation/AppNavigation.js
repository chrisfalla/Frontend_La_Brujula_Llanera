import 'react-native-gesture-handler'; 
import React, {  useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { navigationRef } from '../../infrastructure/services/navigationService';
import { Text } from 'react-native';
import SplashScreen from '../screens/Splash/SplashScreen';
import RegisterStepOneScreen from '../screens/Register/RegisterStepOne/RegisterStepOneScreen';
import RegisterStepTwoScreen from '../screens/Register/RegisterStepTwo/RegisterStepTwoScreen';
import { userStorage } from '../../infrastructure/storage/userStorage';
import AnonymousProfileScreen from '../screens/Profile/AnonymousProfileScreen';
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
import ProfileInformationScreen from '../screens/ProfileInformation/ProfileInformationScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import { setAppReady } from '../../shared/store/appSlice/appSlice';
import DetailScreen from '../screens/Detail/DetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// RootStack (pantallas principales con tabs)
const RootStack = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
  </Stack.Navigator>
);
};

// TabNavigator (tabs principal)
const TabNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const screens = [
    { name: 'Home', component: HomeScreen },
    { name: 'Categories', component: CategoriesScreen },
    { name: 'Map', component: MapaScreen },
    { name: 'Profile', component: isLoggedIn ? ProfileScreen : AnonymousProfileScreen },
  ];

  if (!isLoggedIn) {
    screens.push({ name: 'Login', component: LoginScreen });
  }

  return (
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
        tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12 }}>{route.name}</Text>,
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
      {screens.map(({ name, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false }}
        />
      ))}
    </Tab.Navigator>
  );
};


// AuthStack (pantallas de registro y recuperación)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}initialRouteName="Login">
    <Stack.Screen name="RegisterStepOne" component={RegisterStepOneScreen} />
    <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwoScreen} />
    <Stack.Screen name="RecoveryOne" component={PasswordRecoveryStepOneScreen} />
    <Stack.Screen name="RecoveryTwo" component={PasswordRecoveryStepTwoScreen} />
    <Stack.Screen name="RecoveryThree" component={PasswordRecoveryStepThreeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

// SplashStack (pantalla splash y luego decide a dónde navegar)
const SplashStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Root" component={RootStack} />
    <Stack.Screen name="Auth" component={AuthStack} />
  </Stack.Navigator>
);


// AppNavigator principal
const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAppReady = useSelector((state) => state.app.isAppReady);

  useEffect(() => {
    const loadUser = async () => {
      const user = await userStorage.get();
      if (user) {
        dispatch(login(user));
      }
    dispatch(setAppReady(true));
    };
    loadUser();
  }, [dispatch]);

  if (!isAppReady) return null; // Aquí podrías mostrar un loader mientras cargas

  return (
    <NavigationContainer ref={navigationRef}>
      <SplashStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
