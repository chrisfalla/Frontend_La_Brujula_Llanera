import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInputText from '../../../components/CustomInput/CustomInputText';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomDecoratione from '../../../components/CustomDecoration/CustomDecoration';
import { GlobalStyles, TextStyles } from '../../../styles/styles';
import CustomStepper from '../../../components/Steper/CustomSteper';
import { navigate } from '../../../../infrastructure/services/navigationService';


const RegisterStepOneScreen = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorPhone, setHasErrorPhone] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    let hasErrors = false;
  
    if (form.name.trim() === '') {
      setErrors(prev => ({ ...prev, name: 'El nombre es requerido' }));
      setHasErrorName(true);
      hasErrors = true;
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
      setHasErrorName(false);
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Correo inválido' }));
      setHasErrorEmail(true);
      hasErrors = true;
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
      setHasErrorEmail(false);
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Teléfono inválido (10 dígitos)' }));
      setHasErrorPhone(true);
      hasErrors = true;
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
      setHasErrorPhone(false);
    }
  
    if (!hasErrors) {
      console.log("✅ Puedo avanzar");
      navigate('RegisterStepTwo', {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
    } else {
      console.log("❌ No puedo avanzar");
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image source={require('../../../../shared/assets/MainLogo.png')} />

          <Text style={styles.title}>
            Registrar <Text style={styles.highlight}>nuevo usuario</Text>
          </Text>

          <CustomStepper step={1} />

          <View style={{ marginTop: 16, flexDirection: 'column', gap: 10, width: '100%' }}>
            <CustomInputText
              LabelText="Ingrese su nombre"
              PlaceholderText="Nombres y apellidos"
              SupportingText={hasErrorName ? errors.name : ''}
              HasError={hasErrorName}
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
            />
            <CustomInputText
              LabelText="Ingrese su email"
              PlaceholderText="ejemplo@email.com"
              SupportingText={hasErrorEmail ? errors.email : ''}
              HasError={hasErrorEmail}
              value={form.email}
              onChangeText={(value) => handleChange('email', value)}
            />
            <CustomInputText
              LabelText="Ingrese su teléfono"
              PlaceholderText="Escriba el teléfono"
              SupportingText={hasErrorPhone ? errors.phone : ''}
              HasError={hasErrorPhone}
              value={form.phone}
              onChangeText={(value) => handleChange('phone', value)}
            />
          </View>

          <CustomButton
            style={{ marginTop: 40 }}
            titletext="Continuar"
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
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#CFCFCF',
    marginVertical: 25,
    borderRadius: 1
  }
});

export default RegisterStepOneScreen;
