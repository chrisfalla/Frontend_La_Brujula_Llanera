import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, StatusBar } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//imports logout 
import { logout } from '../../../shared/store/authSlice/authSlice';
import { useDispatch } from 'react-redux';
import { userStorage } from "../../../infrastructure/storage/userStorage";
import { resetRoot } from "../../../infrastructure/services/navigationService"; 

// Helper para aplicar opacidad a un color hexadecimal
function withOpacity(hexColor, opacity) {
    // Elimina el '#' si existe
    hexColor = hexColor.replace('#', '');
    // Si es formato corto, expande a largo
    if (hexColor.length === 3) {
        hexColor = hexColor.split('').map(c => c + c).join('');
    }
    const r = parseInt(hexColor.substring(0,2), 16);
    const g = parseInt(hexColor.substring(2,4), 16);
    const b = parseInt(hexColor.substring(4,6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
}

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    // Obtener el usuario del estado de Redux
    const user = useSelector(state => state.auth.user);
    const userName = user?.name || user?.names || 'Usuario';

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleLogout = async () => {
      try {
        await userStorage.remove();
        dispatch(logout());
      } catch (error) {
        // Error silencioso
      }
    };

    const handleNavigateToInformation = () => {
        navigation.navigate('ProfileInformation');
    };

    const handleNavigateToFavorites = () => {
        navigation.navigate('Favorites');
    };
    const allowedAdminEmails = [
        'leyurbano@gmail.com',
        'christoferfallavillarreal@gmail.com',
        'damiancaro2000@gmail.com',
        'jerstebalpe@gmail.com'
    ];
    const handleNavigateToDashboard = () => {
        if (allowedAdminEmails.includes(user?.email)) {
            navigation.navigate('DashboardScreen');
        } else {
            // Mostrar alerta si el usuario no tiene acceso
            alert('No tienes permisos para acceder al Panel de Gestión.');
        }
    };

    const handleOpenTermsAndConditions = () => {
        // Navegar a la pantalla de términos y condiciones en lugar de abrir URL directamente
        navigation.navigate('TermsCondition');
    };

    return (
        <View style={styles.container}>
            <StatusBar
                    barStyle="dark-content" // Para iconos oscuros en fondo claro
                    backgroundColor="#ffffff" // Fondo blanco para Android
                    translucent={false} // No translúcido para evitar superposiciones
                  />
            {/* Avatar */}
            <Image source={require('../../../shared/assets/Avatar.png')} style={styles.avatar} />

            {/* Saludo */}
            <Text style={styles.greeting}>Hola, <Text style={styles.strong}>{userName}</Text></Text>

            <View style={styles.menuLine} />

            {/* Opciones del menú */}
            <View style={styles.menu}>
                <MenuItem 
                    title="Mi Información" 
                    onPress={handleNavigateToInformation} 
                />
                <MenuItem 
                    title="Mis Favoritos" 
                    onPress={handleNavigateToFavorites}
                />
                <MenuItem 
                    title="Panel de Gestión" 
                    onPress={handleNavigateToDashboard}
                />
                <MenuItem 
                    title="Términos y Condiciones" 
                    isLast={true}
                    onPress={handleOpenTermsAndConditions} 
                />
            </View>
            
            <CustomButton 
                style={{width: "75%"}}
                titletext={'Cerrar sesión'}
                onPress={handleLogout}
                type="Primary"
                size='Small'
            />
        </View>
    );
};

// Componente de ítems del menú
const MenuItem = ({ title, isLast, onPress }) => (
    <TouchableOpacity 
        style={[styles.menuItem, isLast && styles.menuItemLast]} 
        onPress={onPress}
    >
        <Text style={[TextStyles.PoppinsRegular15, styles.menuItemText]}>{title}</Text>
        <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
container: {
    ...GlobalStyles.ScreenBaseStyle,
    flex: 1,
    alignItems: "center",
    },


avatar: {
    width: 100,
    height: 100,
    marginBottom:70,
    marginTop: 50,
},

greeting: {
    ...TextStyles.PoppinsSemiBold15,
    textAlign: 'center',
    marginHorizontal: 30,   
},

strong: {
    ...TextStyles.PoppinsSemiBold15,
    color: Colors.ColorPrimary,
},

menuLine: {
    height: 1,
    backgroundColor: withOpacity(Colors.ColorPrimary, 0.3),
    width: "100%",
    marginTop: 35,
},


menu: {
    width: "100%", // Ahora ocupa todo el ancho disponible
    // paddingVertical: 20,
    
},

menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Se mantiene, pero ahora dentro de un contenedor con width limitado
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: withOpacity(Colors.ColorPrimary, 0.3), // Ahora sí usa el color primario con opacidad
},

menuItemText: {
    position: "relative",
    top: 2, // Mueve el texto un poco hacia abajo
},

arrow: {
    fontSize: 30,
    color: Colors.Black,
    paddingRight: 10,
    position: "relative",
    top: -3, // Mueve la flecha un poco hacia arriba
},
menuItemLast: {
        marginBottom: 80, // Espacio adicional solo en el último elemento
    },

});

export default ProfileScreen;