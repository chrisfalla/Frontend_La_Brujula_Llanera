import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import CurvedBackground from '../components/CurvedBackground';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo.jpg')}
            style={styles.logo}/>
            <Image source={require('../assets/LogoName.jpg')}
            style={styles.logo2}/>
            <Text style={styles.title}> Iniciar <Text style={styles.title2}>Sesion</Text></Text>
            <LoginForm style={styles.form} />
            <View style={styles.footerContainer}>
            <Text style={styles.footer}>Al ingresar, aceptas nuestros Terminos y condiciones,
            y Politica de privacidad</Text>
            </View>
            <CurvedBackground />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
        padding: 10,
    },
    logo:{
        alignItems:'center',
        width: 101, // Ajusta el ancho de la imagen
        height: 99, // Ajusta la altura de la imagen
        marginBottom: 0, // Espacio entre la imagen y el texto
        resizeMode: 'contain'
    },
    logo2:{
        width: 207, // Ajusta el ancho de la imagen
        height: 95, // Ajusta la altura de la imagen
        marginBottom: 0, // Espacio entre la imagen y el texto
        resizeMode: 'contain'
    },
    title: {
        textAlign:'auto',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 0,
    },
    title2: {
        textAlign:'auto',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 0,
        color: '#236A34'
    },
    form:{
        alignItems: 'center',
    },
    footerContainer:{
        marginTop: 20,
        width: '80%',
    },
    footer:{
        textAlign: 'center',
        fontSize: 12,
    },
});

export default LoginScreen;