import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Status from '../components/Recovery/Status1';


const RecoveryScreen1 = () => {
    const navigation = useNavigation();
    const handleContinue = () => {
        // Navegar a la siguiente pantalla o realizar otra acción
        navigation.navigate('Recovery2'); // Reemplazar 'NextScreen' con tu siguiente pantalla
    };

    const handleResendCode = () => {
        // Lógica para reenviar el código
        console.log('Código reenviado');
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo.jpg')}
                style={styles.logo}/>
            <Image source={require('../assets/LogoName.jpg')}
                style={styles.logo2}/>
            <Text style={styles.title}>Recuperar <Text style={styles.title2}>Contraseña</Text></Text>
            <View style={styles.statusContainer}>
                <Status />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                A continuación se le guiara en el proceso de recuperación de su
                contraseña, primero vamos a validar la existencia de su correo electronico
                </Text>
            </View>
            <Text style={styles.title3}>Ingrese el correo electrónico registrado</Text>
            <TextInput
                   style={styles.input}
                    placeholder="ejemplo@ejemplo.com"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleResendCode}>
                <Text style={styles.sendButtonText}>Enviar código nuevamente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.recoveryButton} onPress={handleContinue}>
                <Text style={styles.recoveryButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffff',
        padding: 20,
        paddingTop: 50, // Añadido para dar espacio en la parte superior
    },
    logo: {
        width: 101,
        height: 99,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    logo2: {
        width: 207,
        height: 95,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#236A34',
    },
    statusContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    formContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    title3: {
        fontWeight: 'semibold',
        margin:10,
        alignItems: "",
        fontSize: 14,        
        marginBottom: 5,
        paddingLeft: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    input: {
        width: 350,
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: '#E0E0E0',
        marginBottom: 15,
    },
    sendButton: {
        width: 350,
        height: 48,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#236A34',
        backgroundColor: '"#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    sendButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#236A34',
    },
    recoveryButton: {
        width: 350,
        height: 48,
        borderRadius: 20,
        backgroundColor: '#747474',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    recoveryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default RecoveryScreen1;