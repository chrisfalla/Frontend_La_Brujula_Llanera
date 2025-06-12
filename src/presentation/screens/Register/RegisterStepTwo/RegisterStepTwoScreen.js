import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, Platform, Dimensions, Image, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../../../shared/store/authSlice/authSlice';
import CustomInputText from '../../../components/CustomInput/CustomInputText';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomDecoratione from '../../../components/CustomDecoration/CustomDecoration';
import CustomStepper from '../../../components/Steper/CustomSteper';
import { Colors, TextStyles, GlobalStyles } from '../../../styles/styles';
import { registerUserUseCase } from '../../../../domain/usecases/user/registerUserUseCase';
import { usersRepository } from '../../../../data/repositories/users/usersRepository';
import { userRegisterRequest } from '../../../../domain/models/users/userRegisterRequest';
import { navigate } from '../../../../infrastructure/services/navigationService';
import { userStorage } from '../../../../infrastructure/storage/userStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterStepTwoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Aseguro tener la navegación disponible

  const { name, email, phone, birthdate, gender } = route.params || {};
  console.log('Datos recibidos en Step 2:', { name, email, phone, birthdate, gender }); 
  
  // Declaración correcta del estado form
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ password: '', confirmPassword: '', terms: '' });
  const [hasErrorPassword, setHasErrorPassword] = useState(false);
  const [hasErrorConfirmPassword, setHasErrorConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false); // Estado para el checkbox
  const [hasErrorTerms, setHasErrorTerms] = useState(false); // Estado para error de términos

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleTermsPress = () => {
    // Navegar a la pantalla de términos y condiciones
    navigation.navigate('TermsCondition');
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push(`Faltan ${8 - password.length} caracteres (mínimo 8)`);
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Falta al menos una mayúscula');
    }
    
    if (!/\d.*\d/.test(password)) {
      errors.push('Faltan números (mínimo 2)');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Falta al menos un carácter especial (!@#$%^&*)');
    }
    
    return errors;
  };
  const validateForm = async () => {
    let hasErrors = false;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    // Validación de contraseña con mensajes específicos
    if (form.password.trim() === '') {
      setErrors(prev => ({ ...prev, password: 'La contraseña es requerida' }));
      setHasErrorPassword(true);
      hasErrors = true;
    } else {
      const passwordErrors = validatePassword(form.password);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({ ...prev, password: passwordErrors.join(', ') }));
        setHasErrorPassword(true);
        hasErrors = true;
      } else {
        setHasErrorPassword(false);
      }
    }

    if (form.confirmPassword.trim() === '') {
      setErrors(prev => ({ ...prev, confirmPassword: 'Confirma tu contraseña' }));
      setHasErrorConfirmPassword(true);
      hasErrors = true;
    } else if (form.confirmPassword.trim() !== form.password.trim()) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      setHasErrorConfirmPassword(true);
      hasErrors = true;
    } else {
      setHasErrorConfirmPassword(false);
    }

    // Validación de términos y condiciones
    if (!acceptTerms) {
      setErrors(prev => ({ ...prev, terms: 'Debes aceptar los términos y condiciones' }));
      setHasErrorTerms(true);
      hasErrors = true;
    } else {
      setHasErrorTerms(false);
    }

    if (!hasErrors) {
      try {
        const userData = new userRegisterRequest({
          names: name,
          email: email,
          phone: phone,
          password: form.password,
          birthday: birthdate,
          idGender: gender,
          avatar: 1
        });

        const response = await registerUserUseCase(usersRepository)(userData);
        
        if (!response || !response.user) {
          throw new Error('Respuesta inválida del servidor');
        }
        
        const saveResult = await userStorage.save(response.user);
        if (saveResult) {
          dispatch(login(response.user));
          navigate('Home');
        } else {
          throw new Error('No se pudo guardar la información del usuario');
        }
      } catch (error) {
        let errorMsg = 'No se pudo registrar el usuario. Inténtalo más tarde.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        Alert.alert('Error', errorMsg);
        console.error('Error durante el registro:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <StatusBar
              barStyle="dark-content"
              backgroundColor="#ffffff"
              translucent={false}
            />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image source={require('../../../../shared/assets/MainLogo.png')} />
          <Text style={styles.title}>
            Registrar <Text style={styles.highlight}>nuevo usuario</Text>
          </Text>

          <CustomStepper step={2} totalSteps={2} />

          <View style={{ marginTop: 25, marginBottom: 25, flexDirection: 'column', gap: 10, width: '100%' }}>
            <CustomInputText
              LabelText="Ingrese su contraseña"
              PlaceholderText="******"
              SupportingText={hasErrorPassword ? errors.password : ''}
              HasError={hasErrorPassword}
              value={form.password}
              onChangeText={(value) => handleChange('password', value)}
              IsPassword={true}
            />
            <CustomInputText
              LabelText="Confirme su contraseña"
              PlaceholderText="******"
              SupportingText={hasErrorConfirmPassword ? errors.confirmPassword : ''}
              HasError={hasErrorConfirmPassword}
              value={form.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              IsPassword={true}
            />

            {/* Checkbox de términos y condiciones */}
            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                <View style={[
                  styles.checkbox, 
                  acceptTerms ? styles.checkboxChecked : styles.checkboxUnchecked
                ]}>
                  {acceptTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    Acepto los {' '}
                    <Text 
                      style={styles.termsLink}
                      onPress={handleTermsPress}
                    >
                      términos y condiciones
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
              {hasErrorTerms && (
                <Text style={styles.errorText}>{errors.terms}</Text>
              )}
            </View>
          </View>

          <CustomButton
            style={{ marginTop: 100 }}
            titletext="Registrarse"
            type="Primary"
            size="Big"
            onPress={validateForm}
          />
        </View>

        <CustomDecoratione type="Rigth" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
    ...GlobalStyles.ScreenBaseStyle,
   
  },
  content: {
    width: '100%',
    alignItems: 'center',
   
  },
  title: {
    ...TextStyles.PoppinsSemibold20,
    marginVertical: 16
  },
  highlight: {
    color: '#236A34',
    marginBottom: 16
  },
  termsContainer: {
    marginTop: 10,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxUnchecked: {
    borderWidth: 1,
    borderColor: Colors.DarkGray,
  },
  checkboxChecked: {
    backgroundColor: Colors.ColorPrimary,
    borderWidth: 1,
    borderColor: Colors.ColorPrimary,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.Black,
  },
  termsLink: {
    ...TextStyles.PoppinsSemibold13,
    color: Colors.ColorPrimary,
    textDecorationLine: 'underline',
  },
  errorText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.ErrorAdvertisingColor,
    marginTop: 5,
    marginLeft: 15,
  },
});

export default RegisterStepTwoScreen;