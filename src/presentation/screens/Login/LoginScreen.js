import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, SafeAreaView } from 'react-native';
import CustomInputText from '../../components/CustomInput/CustomInputText';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomDecoration from '../../components/CustomDecoration/CustomDecoration';
import { GlobalStyles, Colors, TextStyles } from '../../styles/styles';

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
        // Asegúrate de que este nombre coincida con el definido en LoginStack
        navigation.navigate('RecoveryOne');
    };

    const handleRegister = () => {
        navigation.navigate('RegisterStepOne');
    };
    

    return (
        <SafeAreaView style={styles.container}> 
        <StatusBar
                barStyle="dark-content"  // Para iconos oscuros en fondo claro
                backgroundColor="#ffffff" // Fondo blanco para Android
                translucent={false}      // No translúcido para evitar superposiciones
            />                 
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Image style={styles.logoLeft}
                    source={require('../../../shared/assets/logoLeft.png')} />
                <Image style={styles.logoRight}
                    source={require('../../../shared/assets/logoRigth.png')} />
                <Image style={styles.img}
                    source={require('../../../shared/assets/MainLogo.png')} />

                <Text style={styles.title}>Iniciar <Text style={styles.titleText}>Sesión </Text> </Text>
                <View style={styles.formContainer}>
                    <CustomInputText style={styles.input}
                        LabelText={'Ingresa su email'}
                        PlaceholderText={'ejemplo@ejemplo.com'}
                        HasError={errors.email}
                    />
                    <CustomInputText
                        style={styles.input}
                        LabelText={'Ingresa su contraseña'}
                        PlaceholderText={'*********'}
                        IsPassword={true}
                        HasError={errors.password}                        
                    />
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
                    </TouchableOpacity>
                    
                    <CustomButton style={styles.buttonOne}
                    titletext='Iniciar sesión'
                    onPress={handleLogin} 
                    type="Primary"
                    size="Big"
                    />
                    <Text style={styles.separator}>ó</Text>
                    <CustomButton style={styles.buttonTwo} 
                    titletext='Registrarse'
                    onPress={handleRegister} 
                    type="Secondary"
                    size="Big"/>
               
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footer}>
                        Al ingresar, aceptas nuestros Términos y condiciones, y Política de privacidad
                    </Text>
                </View>
                <CustomDecoration 
                type='Left' styles={styles.divider}
                />
            </ScrollView>

        </SafeAreaView>
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

    },
    logoRight:{ 
        position: 'absolute',    
        right: 0,
        top: 0,
        zIndex: 1,
    },

    logoLeft:{
        position: 'absolute',
        marginVertical: 150,
        left: 0,
        top: 0,    
    },
    
    img:{
        width: 164,
        height: 151,
        marginTop: 30,
        marginBottom: 30,
    },
    title:{
        color: Colors.Black,
        ...TextStyles.PoppinsSemibold20,
        textAlign: 'center',      
    },
    titleText:{
      color: Colors.ColorPrimary,
      ...TextStyles.PoppinsSemibold20
    },   
    formContainer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
        fontSize: 12,
    },
    input: {
        marginBottom: 20,
    },
    forgotPassword: {
        color: Colors.DarkGray,
        fontFamily: 'Poppins',
        fontSize: 12,
        left: 90,
        marginBottom: 0,
        textDecorationLine: "underline",
    },
    buttonOne: {
        marginTop: 50,
        marginBottom: 10,
    },
    buttonTwo: {
        marginTop: 10,
        marginBottom: 10,
    },
    separator: {
        color: Colors.DarkGray,
        fontFamily: 'Poppins',
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'center',
    },
    footerContainer: {
        width: '90%',
        marginTop: 50,
        marginBottom: 50,
    },
    footer: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 12,
        color: Colors.Black,
    },
  
});

export default LoginScreen;