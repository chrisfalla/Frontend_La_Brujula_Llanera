import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, Platform, Dimensions, Image, Alert } from 'react-native';
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
import { navigate } from '../../../../infraestructure/services/navigationService';
import { userStorage } from '../../../../infraestructure/storage/userStorage';

const RegisterStepTwoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const { name, email, phone } = route.params || {};
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
          birthday: '2025-05-09', // ← Puedes recibirlo desde el paso 1 más adelante
          idGender: 1,
          avatar: 1
        });

        const response = await registerUserUseCase(usersRepository)(userData);
        await userStorage.save(response.user);
        dispatch(login(response.user));
      } catch (error) {
        Alert.alert('Error', 'No se pudo registrar el usuario. Inténtalo más tarde.');
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image source={require('../../../../shared/assets/MainLogo.png')} />
          <Text style={styles.title}>
            Registrar <Text style={styles.highlight}>nuevo usuario</Text>
          </Text>

          <CustomStepper step={2} />

          <View style={{ marginTop: 16, flexDirection: 'column', gap: 10, width: '100%' }}>
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
            style={{ marginTop: 40 }}
            titletext="Registrarse"
            type="Secondary"
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
    ...GlobalStyles.ScreenBaseStyle
  },
  content: {
    width: '100%',
    alignItems: 'center'
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
