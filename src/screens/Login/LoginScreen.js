import React, { useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, ScrollView } from 'react-native';
import CurvedBackground from '../../components/CurvedBackground';
import RowLine from '../../components/RowLine';
import CustomInputText from '../../components/CustomInput/CustomInputText';
import CustomButton from '../../components/Button/CustomButton';
import LogoTitle from '../../components/LogoTitle';


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
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <LogoTitle />
                <Text style={styles.title}>Iniciar <Text style={styles.title2}>Sesión</Text></Text>

                <View style={styles.formContainer}>
                    <CustomInputText
                        LabelText={'Ingresa su email'}
                        PlaceholderText={'ejemplo@ejemplo.com'}
                        HasError={errors.email}
                    />
                    <CustomInputText
                        LabelText={'Ingresa su contraseña'}
                        PlaceholderText={'*********'}
                        IsPassword={true}
                        HasError={errors.password}                        
                    />

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
                    </TouchableOpacity>

                    <CustomButton titletext='Iniciar sesión' onPress={handleLogin} />
                    <RowLine style={styles.rowLine} />
                    <CustomButton type='Secondary'  titletext={'Registrarse '} onPress={handleRegister} />
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footer}>
                        Al ingresar, aceptas nuestros Términos y condiciones, y Política de privacidad
                    </Text>
                </View>
                <CurvedBackground />
            </ScrollView>
       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
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
        color: '#236A34',
    },
   
    formContainer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    forgotPassword: {
        color: "#747474",
        marginLeft: 150,
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    rowLine: {
        marginVertical: 10,
    },
    footerContainer: {
       
        marginBottom:20,
        width: '80%',
    },
    footer: {
        textAlign: 'center',
        fontSize: 12,
    },
});

export default LoginScreen;