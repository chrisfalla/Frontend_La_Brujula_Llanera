// AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

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
                        }

                        return <Ionicons name={iconName} size={24} color={color} />;
                    },
                    tabBarActiveTintColor: '#236A34',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: {
                        height: 60,
                        paddingBottom: 5
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
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;