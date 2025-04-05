import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Status from '../components/Recovery/Status2';
import LogoTitle from '../components/LogoTitle';
import CustomButton from '../components/Button/CustomButton';
import CustomInputText from '../components/CustomInput/CustomInputText';

const RecoveryScreen2 = () => {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Recovery3');
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
                Ingrese el código que se le ha enviado a su correo electronico
                </Text>
            </View>
            <View style={styles.containerInput}>
            <CustomInputText
                 LabelText={'Ingrese el código de validación'} 
                 PlaceholderText={'BL-253665'}
            />
            </View>
          
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
        padding: 40,
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

export default RecoveryScreen2;