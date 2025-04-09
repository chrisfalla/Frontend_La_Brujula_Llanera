import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import RowLine from '../components/RowLine';
import CustomInputText from '../components/CustomInput/CustomInputText';
import CustomButton from '../components/Button/CustomButton';
import LogoTitle from '../components/LogoTitle';

const LoginScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        if (!formData.email || !formData.password) {
            setErrors({
                email: !formData.email ? 'Email es requerido' : '',
                password: !formData.password ? 'Contraseña es requerida' : ''
            });
            return;
        }

        setErrors({});
        navigation.replace('TabNavigator');
    };

    const handleForgotPassword = () => {
        navigation.navigate('Recovery');
    };

    const handleRegister = () => {
        navigation.navigate('Registro');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <LogoTitle />

                    <Text style={styles.title}>
                        Iniciar <Text style={styles.title2}>Sesión</Text>
                    </Text>

                    <View style={styles.formContainer}>
                        <CustomInputText  
                                                   LabelText="Ingresa tu email"
                            PlaceholderText="ejemplo@correo.com"
                            HasError={!!errors.email}
                            SupportingText={errors.email}
                            IsDisabled={false}
                            IsPassword={false}
                        />

                        <CustomInputText 
                            LabelText="Ingresa tu contraseña"
                            PlaceholderText="********"
                            HasError={!!errors.password}
                            SupportingText={errors.password}
                            IsDisabled={false}
                            IsPassword={true}
                        />

                        <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
                            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonGroup}>
                        <CustomButton titletext="Iniciar sesión" onPress={handleLogin} />
                        <RowLine style={styles.rowLine} />
                        <CustomButton type="Secondary" titletext="Registrarse" onPress={handleRegister} />
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footer}>
                            Al ingresar, aceptas nuestros Términos y condiciones, y Política de privacidad.
                        </Text>
                    </View>

                    <CurvedBackground />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    title2: {
        color: '#236A34',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
       
    },
    forgotContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 10,       
    },
  
   
    forgotPassword: {
        color: '#747474',
        textDecorationLine: 'underline',
        fontSize: 13,
    },
    buttonGroup: {
        width: '100%',
        alignItems: 'center',
    },
    rowLine: {
        marginVertical: 10,
    },
    footerContainer: {
        width: '100%',
    },
    footer: {
        textAlign: 'center',
        fontSize: 12,
        color: '#7a7a7a',
    },
});

export default LoginScreen;
