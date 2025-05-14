import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { navigationRef } from '../../infraestructure/services/navigationService';

import RegisterStepOneScreen from '../screens/Register/RegisterStepOne/RegisterStepOneScreen';
import RegisterStepTwoScreen from '../screens/Register/RegisterStepTwo/RegisterStepTwoScreen';
import { userStorage } from '../../infraestructure/storage/userStorage';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import MapaScreen from '../screens/Map/MapaScreen';
import ProfileScreen from '../screens/PasswordRecovery/PasswordRecoveryStepOneScreen';



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
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const isLoggedIn = authState.isLoggedIn;
    const isGuest = authState.isGuest;
  
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const loadUser = async () => {
        console.log("yendo")
        const user = await userStorage.get();
        console.log(user)
        if (user) {
          dispatch(login(user));
        }
        setIsLoading(false);
      };
      loadUser();
    }, []);
  
    if (isLoading) return null; // puedes mostrar un splash o loader
  
    return (
      <NavigationContainer ref={navigationRef}>
        {(isLoggedIn || isGuest) ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    );
  };



export default AppNavigator;
