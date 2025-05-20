import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText"; // Volvemos a usar CustomInputText
import { Colors, TextStyles } from "../../styles/styles";

const PasswordRecoveryStepOneScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Nuevo estado

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleContinue = () => {
    if (!email) {
      setEmailError("El correo electrónico es obligatorio");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Por favor ingrese un correo válido");
      return;
    }
    
    setEmailError(null);
    navigation.navigate("Recovery2", { email });
  };

  const handleResendCode = () => {
    if (!email) {
      setEmailError("Ingrese un correo para enviar el código");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Por favor ingrese un correo válido");
      return;
    }
    
    setEmailError(null);
    Alert.alert(
      "Código reenviado",
      `Hemos enviado un nuevo código a ${email}.`,
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={styles.container}
    >
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Image
              source={require("../../../shared/assets/MainLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            
            <View style={styles.recoveryTitleContainer}>
              <Text style={styles.recoveryText}>Recuperar </Text>
              <Text style={styles.recoveryTextHighlight}>contraseña</Text>
            </View>
            
            <View style={styles.statusContainer}>
              <CustomStepper step={1} />
            </View>
            
            <Text style={styles.subtitle}>
              A continuación se le guiará en el proceso de recuperación de su
              contraseña. Primero vamos a validar la existencia de su correo
              electrónico.
            </Text>
            
            <CustomInputText
              LabelText="Ingresa correo electrónico registrado"
              PlaceholderText="ejemplo@email.com"
              HasError={emailError}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError(null);
              }}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          {isFocused && (
            <CustomButton
              titletext="Enviar código nuevamente"
              onPress={handleResendCode}
              type="Secondary"
              size="Big"
              style={{ marginBottom: 2 }}
            />
          )}
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
    backgroundColor: Colors.BackgroundPage,
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
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    alignSelf: "center",
    width: 164,
    height: 151,
    marginBottom: 35,
    marginTop: 20,
  },
  recoveryTitleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // marginBottom: 20,
  },
  recoveryText: {
    ...TextStyles.PoppinsSemibold20,
    color: Colors.Black,
  },
  recoveryTextHighlight: {
    ...TextStyles.PoppinsSemibold20,
    color: Colors.ColorPrimary,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Black,
    paddingLeft: 15,
    textAlign: 'left',
  },
  textInput: {
    color: Colors.Black,
    width: '100%',
    height: 48,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: Colors.DarkGray,
    ...TextStyles.PoppinsRegular15,
  },
  textInputFocused: {
    backgroundColor: Colors.LightGray,
    borderColor: Colors.DarkGray,  // Mantenemos el color del borde
  },
  textInputError: {
    borderColor: Colors.ErrorAdvertisingColor,
    borderWidth: 1,
  },
  errorText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.ErrorAdvertisingColor,
    marginTop: 2,
    paddingLeft: 15,
  },
});

export default PasswordRecoveryStepOneScreen;
