import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import MapaScreen from '../screens/Map/MapaScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';



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
                            
                            case 'Categories':
                            iconName = focused ? 'search' : 'search-outline';
                            break;

                            case 'Map':
                            iconName = focused ? 'location' : 'location-outline';
                            break;
                            
                            case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
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
            name="Categories"
            component={CategoriesScreen}
            options={{
                title: 'Categories',
                headerShown: false
            }}
            />
            <Tab.Screen
            name="Map"
            component={MapaScreen}
            options={{
                title: 'Mapa',
                headerShown: false
            }}
            />    
            <Tab.Screen
                name="Profile"
                component={FavoritesScreen}
                options={{
                    title: 'Perfil',
                    headerShown: false
                }}
            />

        </Tab.Navigator>
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