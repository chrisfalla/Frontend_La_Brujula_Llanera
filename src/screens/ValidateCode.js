import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Status from '../components/Recovery/Status2';

const RecoveryScreen2 = () => {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Recovery3');
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
                Ingrese el código que se le ha enviado a su correo electronico
                </Text>
            </View>
            <Text style={styles.title3}>Ingrese el código de validación</Text>
            <TextInput
                style={styles.input}
                placeholder="1234"
                secureTextEntry               
            />
          
            <TouchableOpacity style={styles.recoveryButton} onPress={handleContinue}>
                <Text style={styles.recoveryButtonText}>Validar codigo</Text>
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
        paddingTop: 50,
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
        padding: 40,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    title3: {
        fontSize: 14,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginBottom: 10,
        paddingLeft: 20,
    },
    input: {
        width: 350,
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: 'white',
        marginBottom: 15,
    },
    recoveryButton: {
        width: 350,
        height: 48,
        borderRadius: 20,
        backgroundColor: '#236A34',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 101,
    },
    recoveryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default RecoveryScreen2;