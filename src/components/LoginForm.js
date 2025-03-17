import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Pressable } from 'react-native';

const LoginForm =() =>{
    const [email, setEmail] = useState ('');
    const [password, SetPassword] = useState ('');

    const handleLogin  = () => {
        if (email ==='' && password === ''){
            Alert.alert('Ha iniciado sesión!');
        } else{
            Alert.alert('Verifique el correo o la contaseña');
        }
    };

    const handleForgotPassword = () =>{
        Alert.alert('pantalla de recuperación de contraseña')
    };
  
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Correo electroníco</Text>
            <TextInput
            style={styles.input}
            placeholder='ejemplo@ejemplo.com'
            keyboardType='email-address'
            value={email}
            onChange={setEmail}
        />
        <Text style={styles.title}>Contraseña</Text>
            <TextInput
            style={styles.input}
            placeholder='********'
            secureTextEntry
            value={password}
            onChange={SetPassword}
            />

        <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
        </TouchableOpacity>
       
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
        <Text style={styles.googleButtonText}>Iniciar con Google</Text>
        </TouchableOpacity>
        
        
       
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', padding: 10, marginTop: 8,},
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:5,
        textAlign: '',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
      
        paddingLeft: 2,
        borderRadius: 8,

    },
    forgotPassword:{
        color: '#1E90FF',  // Color azul para simular un enlace
        textAlign: 'flex-start',
        marginBottom: 10,
        textDecorationLine: 'underline', 
    },
    loginButton: {
        backgroundColor: '#28A745',
        marginTop: 10,
        width: '100%',
        height: 35,
        borderRadius:8,
    },
    loginButtonButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 'auto',
        
    },
    googleButton: {
        backgroundColor: '#28A745',
        marginTop: 10,
        width: '100%',
        height: 35,
        borderRadius:8,
        
    },
    googleButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 'auto',
        
    },
    
});

export default LoginForm;