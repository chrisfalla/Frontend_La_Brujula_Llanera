import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStepper from '../../components/Steper/CustomSteper';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputText from '../../components/CustomInput/CustomInputText';

const PasswordRecoveryStepTwoScreen = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Recovery3');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={styles.container}
    >
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>          
          <View style={styles.content}>
            <Image 
              source={require('../../../shared/assets/MainLogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            
            <Text style={styles.title}>
              Recuperación de Contraseña - Paso 2
            </Text>

            <View style={styles.statusContainer}>
              <CustomStepper step={2} />
            </View>

            <Text style={styles.subtitle}>
              Ingrese el código que se le ha enviado a su correo electrónico
            </Text>

            <CustomInputText
              LabelText={'Ingrese el código de validación'}
              PlaceholderText={'BL-253665'}
              HasError={null}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            titletext="Continuar"
            onPress={handleContinue}
            type="Primary"
            size="Big"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  content: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highlight: {
    color: '#236A34',
  },
  statusContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    alignSelf: 'center',
    width: 200, 
    height: 120,
    marginBottom: 10
  },
});

export default PasswordRecoveryStepTwoScreen;
