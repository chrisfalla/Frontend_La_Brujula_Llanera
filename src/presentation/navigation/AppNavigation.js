import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { navigationRef } from "../../infrastructure/services/navigationService";
import { Text } from "react-native";

import RegisterStepOneScreen from "../screens/Register/RegisterStepOne/RegisterStepOneScreen";
import RegisterStepTwoScreen from "../screens/Register/RegisterStepTwo/RegisterStepTwoScreen";
import { userStorage } from "../../infrastructure/storage/userStorage";
import AnonymousProfileScreen from "../screens/Profile/AnonymousProfileScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import MapaScreen from "../screens/Map/MapaScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../shared/store/authSlice/authSlice";
import LoginScreen from "../screens/Login/LoginScreen";
import PasswordRecoveryStepOneScreen from "../screens/PasswordRecovery/PasswordRecoveryStepOneScreen";
import PasswordRecoveryStepTwoScreen from "../screens/PasswordRecovery/PasswordRecoveryStepTwoScreen";
import PasswordRecoveryStepThreeScreen from "../screens/PasswordRecovery/PasswordRecoveryStepThreeScreen";
import ProfileInformationScreen from "../screens/ProfileInformation/ProfileInformationScreen";
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import DetailScreen from "../screens/Detail/DetailScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import TermsCondition from "../screens/TermsCondition/TermsCondition";
import PlaceReviews from "../screens/PlaceReviews/PlaceReviewsScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import PlaceRegisterScreen from "../screens/PlaceRegister/PlaceRegisterScreen";

// 👇 Importa el SplashScreen
import SplashScreen from "../screens/Splash/SplashScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack principal
const RootStack = ({ isLoggedIn }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs">
      {() => <TabNavigator isLoggedIn={isLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
    <Stack.Screen name="TermsCondition" component={TermsCondition} />
    <Stack.Screen name="PlaceReviews" component={PlaceReviews} />
    <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="PlaceRegisterScreen" component={PlaceRegisterScreen} />
  </Stack.Navigator>
);

// Navegación con tabs inferiores
const TabNavigator = ({ isLoggedIn }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case "Home":
            iconName = focused ? "home" : "home-outline";
            break;
          case "Explora":
            iconName = focused ? "compass" : "compass-outline";
            break;
          case "Categories":
            iconName = focused ? "pricetags" : "pricetags-outline";
            break;
          case "Profile":
            iconName = focused ? "person" : "person-outline";
            break;
          case "Login":
            iconName = focused ? "log-in" : "log-in-outline";
            break;
          default:
            iconName = "help-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ color }) => {
        let label;
        switch (route.name) {
          case "Home":
            label = "Inicio";
            break;
          case "Explora":
            label = "Explora";
            break;
          case "Categories":
            label = "Categorías";
            break;
          case "Profile":
            label = "Perfil";
            break;
          case "Login":
            label = "Ingresar";
            break;
          default:
            label = route.name;
        }
        return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
      },
      tabBarActiveTintColor: "#236A34",
      tabBarInactiveTintColor: "black",
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
        backgroundColor: "#fff",
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Explora" component={MapaScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={isLoggedIn ? ProfileScreen : AnonymousProfileScreen} options={{ headerShown: false }} />
    {!isLoggedIn && (
      <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    )}
  </Tab.Navigator>
);

// Navegación para autenticación
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
    <Stack.Screen name="RegisterStepOne" component={RegisterStepOneScreen} />
    <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwoScreen} />
    <Stack.Screen name="RecoveryOne" component={PasswordRecoveryStepOneScreen} />
    <Stack.Screen name="RecoveryTwo" component={PasswordRecoveryStepTwoScreen} />
    <Stack.Screen name="RecoveryThree" component={PasswordRecoveryStepThreeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="TermsCondition" component={TermsCondition} />
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
  </Stack.Navigator>
);

// Componente principal
const AppNavigator = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isGuest = authState.isGuest;

  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // 👈 Nuevo estado para splash

  useEffect(() => {
    const loadUser = async () => {
      const user = await userStorage.get();
      if (user) {
        dispatch(login(user));
      }

      // Simular duración del SplashScreen (4 segundos)
      setTimeout(() => {
        setIsLoading(false);
        setShowSplash(false); // Ocultar splash
      }, 4000);
    };

    loadUser();
  }, [dispatch]);

  // Mostrar splash screen primero
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn || isGuest ? (
        <RootStack isLoggedIn={isLoggedIn} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
