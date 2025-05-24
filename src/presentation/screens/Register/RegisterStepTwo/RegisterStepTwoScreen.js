import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, Platform, Dimensions, Image, Alert, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../../../shared/store/authSlice/authSlice';
import CustomInputText from '../../../components/CustomInput/CustomInputText';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomDecoratione from '../../../components/CustomDecoration/CustomDecoration';
import CustomStepper from '../../../components/Steper/CustomSteper';
import { GlobalStyles, TextStyles } from '../../../styles/styles';
import { registerUserUseCase } from '../../../../domain/usecases/user/registerUserUseCase';
import { usersRepository } from '../../../../data/repositories/users/usersRepository';
import { userRegisterRequest } from '../../../../domain/models/users/userRegisterRequest';
import { navigate } from '../../../../infrastructure/services/navigationService';
import { userStorage } from '../../../../infrastructure/storage/userStorage';

const RegisterStepTwoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const { name, email, phone, birthdate, gender } = route.params || {};
  console.log('Datos recibidos en Step 2:', { name, email, phone, birthdate, gender }); // ← Agrega esto
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [hasErrorPassword, setHasErrorPassword] = useState(false);
  const [hasErrorConfirmPassword, setHasErrorConfirmPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = async () => {
    let hasErrors = false;
    const passwordRegex = /^(?=.*[A-Z])(?=(?:.*\d){2,}).{6,}$/;

    if (form.password.trim() === '') {
      setErrors(prev => ({ ...prev, password: 'La contraseña es requerida' }));
      setHasErrorPassword(true);
      hasErrors = true;
    } else if (!passwordRegex.test(form.password)) {
      setErrors(prev => ({ ...prev, password: 'Formato inválido: mínimo 6 caracteres, una mayúscula y dos números' }));
      setHasErrorPassword(true);
      hasErrors = true;
    } else {
      setHasErrorPassword(false);
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

    if (!hasErrors) {
      try {
        const userData = new userRegisterRequest({
          names: name,
          email: email,
          phone: phone,
          password: form.password,
          birthday: birthdate, // ← Puedes recibirlo desde el paso 1 más adelante
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
              barStyle="dark-content" // Para iconos oscuros en fondo claro
              backgroundColor="#ffffff" // Fondo blanco para Android
              translucent={false} // No translúcido para evitar superposiciones
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
            />
            <CustomInputText
              LabelText="Confirme su contraseña"
              PlaceholderText="******"
              SupportingText={hasErrorConfirmPassword ? errors.confirmPassword : ''}
              HasError={hasErrorConfirmPassword}
              value={form.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
            />
          </View>

          <CustomButton
            style={{ marginTop: 150 }}
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
  }
});

export default RegisterStepTwoScreen;
