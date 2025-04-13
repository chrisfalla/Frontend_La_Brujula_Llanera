import React, { useState } from 'react';
import {View,StyleSheet,ScrollView,Text,KeyboardAvoidingView,Platform,Alert,Dimensions,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInputText from '../../components/CustomInput/CustomInputText';
import CustomButton from '../../components/Button/CustomButton';
import LogoTitle from '../../components/LogoTitle';
import CornerImage from '../../components/Vector/CornerImagen';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    if (value.trim() !== '') {
      setFormErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleRegister = () => {
    const { name, email, password, confirmPassword } = form;

    const errors = {
      name: name.trim() === '',
      email: email.trim() === '',
      password: password.trim() === '',
      confirmPassword: confirmPassword.trim() === '',
    };

    setFormErrors(errors);

    if (Object.values(errors).some((e) => e)) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: true,
        confirmPassword: true,
      }));
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    Alert.alert('Éxito', 'Formulario enviado correctamente');
    console.log('Formulario enviado', form);
  };

  const handleGoogleRegister = () => {
    console.log('Registro con Google');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LogoTitle />
          <View style={styles.content}>
            <Text style={styles.title}>
              Registrar <Text style={styles.highlight}>nuevo usuario</Text>
            </Text>

            <CustomInputText
              LabelText="Ingrese su nombre"
              PlaceholderText="Nombres y apellidos"
              HasError={formErrors.name}
              SupportingText={formErrors.name ? 'Este campo es obligatorio' : ''}
              IsDisabled={false}
              IsPassword={false}
              onChangeText={(value) => handleChange('name', value)}
            />

            <CustomInputText
              LabelText="Ingrese su email"
              PlaceholderText="ejemplo@email.com"
              HasError={formErrors.email}
              SupportingText={formErrors.email ? 'Este campo es obligatorio' : ''}
              IsDisabled={false}
              IsPassword={false}
              onChangeText={(value) => handleChange('email', value)}
            />

            <CustomInputText
              LabelText="Ingrese su contraseña"
              PlaceholderText="**********"
              HasError={formErrors.password}
              SupportingText={
                formErrors.password ? 'Las contraseñas no coinciden o está vacío' : ''
              }
              IsDisabled={false}
              IsPassword={true}
              onChangeText={(value) => handleChange('password', value)}
            />

            <CustomInputText
              LabelText="Confirme su contraseña"
              PlaceholderText="**********"
              HasError={formErrors.confirmPassword}
              SupportingText={
                formErrors.confirmPassword ? 'Las contraseñas no coinciden o está vacío' : ''
              }
              IsDisabled={false}
              IsPassword={true}
              onChangeText={(value) => handleChange('confirmPassword', value)}
            />

            <View style={styles.divider} />

            <CustomButton
              titletext="Registrarse"
              onPress={handleRegister}
              type="Secondary"
              size="Big"
            />

            <CustomButton
              titletext="Registro con Google"
              onPress={handleGoogleRegister}
              type="Primary"
              size="Big"
            />
          </View>
          <CornerImage />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: height * 0.02,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  highlight: {
    color: '#236A34',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#CFCFCF',
    marginVertical: height * 0.03,
    borderRadius: 1,
  },
});

export default RegisterScreen;
