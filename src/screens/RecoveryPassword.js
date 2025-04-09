import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStepper from '../components/Steper/CustomSteper';
import LogoTitle from '../components/LogoTitle';
import CustomButton from '../components/Button/CustomButton';
import CustomInputText from '../components/CustomInput/CustomInputText';

const RecoveryScreen3 = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleContinue = () => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        // Aquí iría la lógica para actualizar la contraseña
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
           <LogoTitle />
            <Text style={styles.title}>Recuperar <Text style={styles.title2}>Contraseña</Text></Text>
            <View style={styles.statusContainer}>
                <CustomStepper step={4}/>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Ingrese la nueva contraseña:</Text>
            </View>
            <View style={styles.containerInput}>
            <CustomInputText
                 LabelText={'Ingrese su nueva contraseña'} 
                 PlaceholderText={'*********'}
                 IsPassword={true}
                 
                
            />
             <CustomInputText
                 LabelText={'Confirme su nueva contraseña'} 
                 PlaceholderText={'*********'}
                 IsPassword={true}
            />
            </View>
            <CustomButton titletext='Guardar contraseña' onPress={handleContinue}/>
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
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#236A34',
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
    containerInput:{
        flex: 1,
    },
});

export default RecoveryScreen3;