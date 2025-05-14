import React from "react";
import { View, Text, Image,  StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { GlobalStyles, Colors,TextStyles } from "../../styles/styles";

const handleRegister = () => {
    navigation.navigate('Registro');
};
const handleLogin =() => {
    navigation.navigate('Login');

};

const LoginProfileScreen = () => {
return (
    <View style={styles.container}>

      {/* Avatar */}
    <Image source={require('../../../shared/assets/Avatar.png')} style={styles.avatar} />

      {/* Saludo */}
    <Text style={styles.greeting}>Hola, <Text style= {styles.strong}>Damian Caro </Text> </Text>

    <View style={styles.menuLine} />

      {/* Opciones del menú */}
    <View style={styles.menu}>
        <MenuItem title="Mi informacion" />
        <MenuItem title="Mis favoritos" />
        <MenuItem title="Terminos y condiones" isLast={true}/>
    </View>
    
    <CustomButton 
    titletext={'Cerrar sesión'}
    onPress={handleLogin}
    type="Primary"
    size='Small'
    />
    
    
    </View>
);
};


// Componente de ítems del menú
const MenuItem = ({ title, isLast }) => (
<TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast ]}>
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
menuItemLast: {
        marginBottom: 80, // Espacio adicional solo en el último elemento
    },

});

export default LoginProfileScreen;