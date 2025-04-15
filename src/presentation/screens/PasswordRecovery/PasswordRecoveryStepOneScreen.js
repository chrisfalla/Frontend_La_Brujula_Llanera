import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Status from '../../components/Recovery/Status1';
import LogoTitle from '../../components/LogoTitle';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputText from '../../components/CustomInput/CustomInputText';



const PasswordRecoveryStepOneScreen = () => {
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
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <LogoTitle />
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
            <View style={styles.containerInput}>
            <CustomInputText
                 LabelText={'Ingresa correo electronico registrado'} 
                 PlaceholderText={'ejemplo@ejemplo.com'}
            />
            </View>
            <CustomButton titletext='Enviar código nuevamente'  type='Secondary' onPress={handleResendCode} />
            <CustomButton titletext='Continuar' onPress={handleContinue}/>
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
        marginBottom: 10,
        fontWeight: 'bold',
    },
   
    containerInput:{
        flex: 1,
    },
});

export default PasswordRecoveryStepOneScreen;