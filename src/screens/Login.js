import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import RowLine from '../components/RowLine';
import CustomInputText from '../components/CustomInput/CustomInputText';

const LoginScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        if (!formData.email || !formData.password) {
            setErrors({
                email: !formData.email ? "Email es requerido" : "",
                password: !formData.password ? "Contraseña es requerida" : ""
            });
            return;
        }
        navigation.replace('TabNavigator');
    };

    const handleForgotPassword = () => {
        navigation.navigate('Recovery');
    };

    const handleRegister = () => {
        navigation.navigate('Registro');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/log.png')}
                style={styles.logo} />
                <View style={styles.containertitle}>
                 <Text style={styles.title3}>LA BRÚJULA <Text style={styles.title4}>LLANERA</Text></Text>
                 </View>
            <Text style={styles.title}>Iniciar <Text style={styles.title2}>Sesión</Text></Text>

            <View style={styles.formContainer}>

                <CustomInputText
                LabelText={'Ingresa su email'}
                PlaceholderText={'ejemplo@ejemplo.com'}
                HasError={''}
                />
                <CustomInputText
                LabelText={'Ingresa su contraseña'}
                PlaceholderText={'*********'}
                HasError={''}/>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
                </TouchableOpacity>

             
                <RowLine style={styles.rowLine} />

              
            </View>

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
        backgroundColor: '#ffff',
        padding: 10,
    },
    logo: {
        width: 90,
        height: 90,
        marginTop:'auto',
        marginBottom: 0,
        resizeMode: 'contain'
    },
    containertitle: {
        
        margin: 10,
    },
 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 0,
        color: '#236A34'
    },

    title3: {
        fontSize: 20,
        fontWeight: '900',
        margin: 0,
    },
    title4: {
        
        fontSize: 54,
        fontWeight: '900',
        margin: 0,
        color: '#236A34'
        
    },

    formContainer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    inputTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 15,
        textAlign: "left",
        alignSelf: "flex-start"
    },
    input: {
        marginBottom: 15,
        width: 350,
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 15,
        borderRadius: 20,
    },
    forgotPassword: {
        color: "#747474",
        paddingLeft: 200,
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    loginButton: {
        backgroundColor: "#236A34",
        marginTop: 15,
        width: 350,
        height: 48,
        borderRadius: 20,
        justifyContent: 'center',
    },
    loginButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    registrerButton: {
        backgroundColor: "#ffff",
        borderWidth: 2,
        borderColor: '#236A34',
        width: 350,
        height: 48,
        borderRadius: 20,
        justifyContent: 'center',
    },
    registrerButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#236A34",
        textAlign: "center",
    },
    rowLine: {
        marginVertical: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        paddingLeft: 15,
        alignSelf: "flex-start",
    },
    footerContainer: {
        marginTop: 20,
        width: '80%',
    },
    footer: {
        textAlign: 'center',
        fontSize: 12,
    },
});

export default LoginScreen;