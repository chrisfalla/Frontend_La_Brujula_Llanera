import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';

import BuscarCategoriasScreen from '../screens/BuscarCategoriasScreen';
import MapaScreen from '../screens/MapaScreen';
import CategoriasScreen from '../screens/CategoriasScreen';

import Login from '../screens/Login';
import RegistroScreen from '../screens/RegistroScreen';
import RecoveryScreen from '../screens/RecoveryEmail';
import RecoveryScreen1 from '../screens/SendCode';
import RecoveryScreen2 from '../screens/ValidateCode';
import RecoveryScreen3 from '../screens/RecoveryPassword';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'BuscarCategorias':
                            iconName = focused ? 'search' : 'search-outline';
                            break;
                        case 'Mapa':
                            iconName = focused ? 'location' : 'location-outline';
                            break;
                        case 'Categorias':
                            iconName = focused ? 'menu' : 'menu-outline';
                            break;
                        case 'Auth':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        case 'Dashboard':
                            iconName = focused ? 'grid' : 'grid-outline';
                            break;
                        default:
                            iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#236A34',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: {
                    height: 54,
                    paddingBottom: 5,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="BuscarCategorias"
                component={BuscarCategoriasScreen}
                options={{
                    title: 'Buscar',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Mapa"
                component={MapaScreen}
                options={{
                    title: 'Mapa',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Categorias"
                component={CategoriasScreen}
                options={{
                    title: 'Categorías',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Auth"
                component={AuthStack}
                options={{
                    title: 'Login',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="Recovery" component={RecoveryScreen} />
            <Stack.Screen name="Recovery1" component={RecoveryScreen1} />
            <Stack.Screen name="Recovery2" component={RecoveryScreen2} />
            <Stack.Screen name="Recovery3" component={RecoveryScreen3} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;