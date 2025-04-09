import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStepper from '../components/Steper/CustomSteper';
import LogoTitle from '../components/LogoTitle';
import CustomButton from '../components/Button/CustomButton';
import CustomInputText from '../components/CustomInput/CustomInputText';

const RecoveryScreen1 = () => {
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Recovery2');
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
                            <CustomStepper step={2} />
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.subtitle}>
                                A continuación se le guiará en el proceso de recuperación de su contraseña. 
                                Primero vamos a validar la existencia de su correo electrónico.
                            </Text>

                            <CustomInputText
                                LabelText="Ingresa correo electrónico registrado"
                                PlaceholderText="ejemplo@ejemplo.com"
                                IsPassword={false}
                                IsDisabled={false}
                                HasError={false}
                                SupportingText=""
                            />
                        </View>
                    </ScrollView>
                </View>

                {/* Botón al fondo */}
                <View style={styles.footer}>
                    <CustomButton titletext="Continuar" onPress={handleContinue} />
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
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: '#fff',
    },
});

export default RecoveryScreen1;
