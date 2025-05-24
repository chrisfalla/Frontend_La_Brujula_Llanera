import React from "react";
import { View, Text, Image,  StyleSheet, TouchableOpacity, Linking, StatusBar } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { GlobalStyles, Colors,TextStyles } from "../../styles/styles";
import { useNavigation } from '@react-navigation/native';
import { getTermsAndConditionsUrlUseCase } from '../../../domain/usecases/termsAndConditions/getTermsAndConditionsUrlUseCase';

const AnonymousProfileScreen = () => {
    const navigation = useNavigation();
    
    const handleRegister = () => {
        navigation.navigate('Registro');
    };
    
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleOpenTermsAndConditions = async () => {
        try {
            const url = await getTermsAndConditionsUrlUseCase();
            if (await Linking.canOpenURL(url)) {
                await Linking.openURL(url);
            } else {
                console.log('No se puede abrir la URL:', url);
            }
        } catch (error) {
            console.error('Error al abrir los términos y condiciones:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                    barStyle="dark-content" // Para iconos oscuros en fondo claro
                    backgroundColor="#ffffff" // Fondo blanco para Android
                    translucent={false} // No translúcido para evitar superposiciones
                  />            {/* Avatar */}
            <Image source={require('../../../shared/assets/AvatarHeader.png')} style={styles.avatar} />

            {/* Saludo */}
            <Text style={styles.greeting}>Actualmente esta usando la app como visitante</Text>

            <Text style={styles.text}>Si desea poder acceder a contactar los diferentes sitios que estan en 
            <Text style= {styles.strong}>La Brujula Llanera </Text> inicie sesion o registrese.</Text>
            
            <CustomButton 
                titletext={'Iniciar sesión'}
                onPress={handleLogin}
                type="Primary"
                size='Small'
            />
            <CustomButton 
                titletext={'Registrarse'}
                onPress={handleRegister} 
                type="Secondary"
                size='Small'
            />
            <View style={styles.menuLine} />

            {/* Opciones del menú */}
            <View style={styles.menu}>
                <MenuItem 
                    title="Términos y condiciones" 
                    onPress={handleOpenTermsAndConditions}
                />
                <MenuItem title="Acerca de" />
            </View>
        </View>
    );
};

// Componente de ítems del menú
const MenuItem = ({ title, onPress }) => (
    <TouchableOpacity 
        style={styles.menuItem} 
        onPress={onPress}
    >
        <Text style= {{...TextStyles.PoppinsRegular15}}>{title}</Text>
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
    marginBottom:30,
    marginTop: 30,
},

greeting: {
    ...TextStyles.PoppinsSemiBold15,
    textAlign: 'center',
    marginHorizontal: 30,   
},
text:{
    ...TextStyles.PoppinsRegular15,
    marginTop:20,
    marginBottom:5,
    marginHorizontal: 30,
    textAlign: 'center',
},

strong: {
    ...TextStyles.PoppinsSemiBold15,
    color: Colors.ColorPrimary,
},

menuLine: {
        height: 1,
        backgroundColor: Colors.LightGray,
        width: "100%",
        marginVertical: 5,
        marginTop: 35,
    },


menu: {
    width: "100%", // Ahora ocupa todo el ancho disponible
    alignSelf: "stretch", // Asegura que se extienda completamente
    
},

menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Se mantiene, pero ahora dentro de un contenedor con width limitado
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
},

arrow: {
    fontSize: 30,
    color: Colors.Black,
    paddingRight: 10,
},

});

export default AnonymousProfileScreen;