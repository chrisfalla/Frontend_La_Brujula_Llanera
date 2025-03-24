import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import BuscarCategoriasScreen from '../screens/BuscarCategoriasScreen';
import MapaScreen from '../screens/MapaScreen';
import CategoriasScreen from '../screens/CategoriasScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Login') {
                            iconName = focused ? 'log-in' : 'log-in-outline';
                        } else if (route.name === 'Registro') {
                            iconName = focused ? 'person-add' : 'person-add-outline';
                        } else if (route.name === 'BuscarCategorias') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'Mapa') {
                            iconName = focused ? 'location' : 'location-outline';
                        } else if (route.name === 'Categorias') {
                            iconName = focused ? 'menu' : 'menu-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#236A34',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: {
                        height: 54,
                        paddingBottom: 5,
                        backgroundColor: '#fff', // Asegúrate de que el fondo sea blanco
                        borderTopWidth: 0, // Elimina el borde superior si es necesario
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
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: 'Cuenta',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Registro"
                    component={RegistroScreen}
                    options={{
                        title: 'Registro',
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
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;