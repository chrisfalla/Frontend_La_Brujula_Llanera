import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';



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
                        case 'Auth':
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
                name="Auth"
                component={LoginScreen}
                options={{
                    title: 'Login',
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