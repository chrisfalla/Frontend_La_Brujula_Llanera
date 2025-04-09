import React, { useState } from 'react';
import {View,
    Text, StyleSheet, SafeAreaView,KeyboardAvoidingView,Platform,ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStepper from '../components/Steper/CustomSteper';
import LogoTitle from '../components/LogoTitle';
import CustomButton from '../components/Button/CustomButton';
import CustomInputText from '../components/CustomInput/CustomInputText';

const RecoveryScreen3 = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleContinue = () => {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Lógica para guardar la nueva contraseña
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <View style={styles.content}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <LogoTitle />

                        <Text style={styles.title}>
                            Recuperar <Text style={styles.title2}>Contraseña</Text>
                        </Text>

                        <View style={styles.statusContainer}>
                            <CustomStepper step={4} />
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.subtitle}>Ingrese la nueva contraseña:</Text>

                            <CustomInputText
                                LabelText="Ingrese su nueva contraseña"
                                PlaceholderText="*********"
                                IsPassword={true}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <CustomInputText
                                LabelText="Confirme su nueva contraseña"
                                PlaceholderText="*********"
                                IsPassword={true}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <CustomButton titletext="Guardar contraseña" onPress={handleContinue} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    title2: {
        color: '#236A34',
    },
    statusContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: '#fff',
    },
});

export default RecoveryScreen3;
