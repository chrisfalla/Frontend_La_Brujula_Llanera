import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Status from '../components/Recovery/Status';

const RecoveryScreen = () => {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Recovery1');
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
                    keyboardType="email-address"
                />
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
        paddingTop: 50,
    },
    logo: {
        alignItems:'center',
        width: 101,
        height: 99,
        marginBottom: 0,
        resizeMode: 'contain'
    },
    logo2: {
        width: 207,
        height: 95,
        marginBottom: 50,
        resizeMode: 'contain'
    },
    title: {
        textAlign:'auto',
        fontSize: 24,
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
    formContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    statusContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
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
        marginBottom: 15,
        width: 350,
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 15,
        borderRadius: 20,
        },
    recoveryButton: {
        backgroundColor: "#747474",
        marginTop: 80,
        width: 350,
        height: 48,
        borderRadius: 20,
        justifyContent:'center',
    },
    recoveryButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        margin: 'auto',
      },
    

});

export default RecoveryScreen;