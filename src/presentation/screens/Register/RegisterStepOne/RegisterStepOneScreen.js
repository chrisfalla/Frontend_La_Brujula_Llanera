import React, { useState } from "react";
import {  View,  StyleSheet,  ScrollView,  Text,  KeyboardAvoidingView,  Platform,  Dimensions,  Image, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputText from "../../../components/CustomInput/CustomInputText";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomDropdown from "../../../components/Dropdown/CustomDropdown";
import CustomStepper from "../../../components/Steper/CustomSteper";
import { GlobalStyles, Colors, TextStyles } from "../../../styles/styles";
import CustomDecoration from "../../../components/CustomDecoration/CustomDecoration";

import { navigate } from "../../../../infrastructure/services/navigationService";



const RegisterStepOneScreen = () => {
  const [form, setForm] = useState({ gender: null });

  const handleChange = (field, value) => {
       setForm((prev) => ({ ...prev, [field]: value }));
  };

  const GENDER_OPTIONS = [
    { label: "Masculino", value: 1 },
    { label: "Femenino", value: 2 },
    { label: "Otro", value: 3 },
  ];
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState({});

 

  const validateForm = () => {
    let currentErrors = {};
    let currentHasErrors = {};

    console.log("Estado actual del formulario:", form);

    if (!form.name || form.name.trim() === "") {
      currentErrors.name = "El nombre es requerido";
      currentHasErrors.name = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      currentErrors.email = "Correo inválido";
      currentHasErrors.email = true;
    }    // Validación de teléfono: solo números y 10 dígitos
    if (!form.phone || form.phone.trim() === "") {
      currentErrors.phone = "El teléfono es requerido";
      currentHasErrors.phone = true;
    } else {
      const phoneRegex = /^\d{10}$/; // Exactamente 10 dígitos
      if (!phoneRegex.test(form.phone)) {
        if (!/^\d+$/.test(form.phone)) {
          currentErrors.phone = "Solo Números";
        } else if (form.phone.length < 10) {
          currentErrors.phone = "Faltan " + (10 - form.phone.length) + " dígitos";
        } else if (form.phone.length > 10) {
          currentErrors.phone = "Sobran " + (form.phone.length - 10) + " dígitos";
        }
        currentHasErrors.phone = true;
      }
    }

    if (!form.birthdate) {
      currentErrors.birthdate = "Fecha requerida";
      currentHasErrors.birthdate = true;
    }

    if (!form.gender) {
      currentErrors.gender = "Seleccione una opción";
      currentHasErrors.gender = true;
    }

    setErrors(currentErrors);
    setHasErrors(currentHasErrors);

    if (Object.keys(currentErrors).length === 0) {
      const userData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
        gender: form.gender,
      };
      console.log("Datos enviados a Step 2:", userData);
      navigate("RegisterStepTwo", userData);
    } else {
      console.log("❌ No puedo avanzar. Errores:", currentErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <StatusBar
              barStyle="dark-content" // Para iconos oscuros en fondo claro
              backgroundColor="#ffffff" // Fondo blanco para Android
              translucent={false} // No translúcido para evitar superposiciones
            />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image source={require("../../../../shared/assets/MainLogo.png")} />

          <Text style={styles.title}>
            Registrar <Text style={styles.highlight}>nuevo usuario</Text>
          </Text>

          <CustomStepper step={1} totalSteps={2} />

          <View
            style={{
              marginTop: 16,
              marginBottom: 6,
              flexDirection: "column",
              gap: 10,
              width: "100%",
            }}
          >
            <CustomInputText
              LabelText="Ingrese su nombre"
              PlaceholderText="Nombres y apellidos"
              SupportingText={hasErrors.name ? errors.name : ""}
              HasError={hasErrors.name}
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
             
            />

            <CustomInputText
              LabelText="Ingrese su email"
              PlaceholderText="ejemplo@email.com"
              SupportingText={hasErrors.email ? errors.email : ""}
              HasError={hasErrors.email}
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            />            <CustomInputText
              LabelText="Ingrese su teléfono"
              PlaceholderText="Escriba el teléfono"
              SupportingText={hasErrors.phone ? errors.phone : ""}
              HasError={hasErrors.phone}
              value={form.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="numeric"
            />

            <CustomDropdown
              LabelText="Seleccione su género"
              items={GENDER_OPTIONS}
              value={form.gender}
              setValue={(value) => handleChange("gender", value)}
              placeholder="Seleccione una opción"
              HasError={hasErrors.gender && errors.gender}
              SupportingText={hasErrors.gender ? errors.gender : ""}
              zIndex={3000} // Más alto que el de la fecha
              zIndexInverse={1000}
            />

            <CustomDropdown
              LabelText="Seleccione su fecha de nacimiento"
              value={form.birthdate}
              setValue={(value) => handleChange("birthdate", value)}
              placeholder="dd/mm/aaaa"
              isDatePicker={true}
              HasError={hasErrors.birthdate && errors.birthdate}
              SupportingText={hasErrors.birthdate ? errors.birthdate : ""}
              zIndex={2000}
              zIndexInverse={500}
              
            />
          </View>
          <CustomButton
            style={{ marginTop: 40 , marginBottom: 40}}
            titletext="Continuar"
            type="Primary"
            size="Big"
            onPress={validateForm}
          />
        </View>

        <CustomDecoration type="Rigth" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
   
    paddingTop: 20,
    justifyContent: "center",
    ...GlobalStyles.ScreenBaseStyle,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    ...TextStyles.PoppinsSemibold20,
    marginVertical: 16,
  },
  highlight: {
    color: "#236A34",
    marginBottom: 16,
  },
});

export default RegisterStepOneScreen;
