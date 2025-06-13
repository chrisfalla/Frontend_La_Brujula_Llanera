import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import { Colors, TextStyles } from "../../styles/styles";

//imports para manejo de recuperación de contraseña
import { ActivityIndicator, Alert } from "react-native";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import { requestPasswordRecoveryCodeUseCase } from "../../../domain/usecases/passwordRecovery/getPasswordRecoveryUseCase";

const PasswordRecoveryStepOneScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      await requestPasswordRecoveryCodeUseCase(usersRepository)(email);
      navigation.navigate("RecoveryTwo", { email });
    } catch (error) {
      handleEmailError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("El correo electrónico es obligatorio");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor ingrese un correo válido");
      return false;
    }

    setEmailError(null);
    return true;
  };

  const handleEmailError = (error) => {
    let errorMessage = "Ocurrió un error al enviar el código de recuperación";

    if (error.userMessage) {
      errorMessage = error.userMessage;
    } else if (error.response) {
      if (error.response.status === 503) {
        errorMessage =
          "El sistema de recuperación está temporalmente no disponible. Por favor intenta más tarde.";
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 404) {
        errorMessage = "El correo electrónico no está registrado en el sistema";
      } else if (error.response.status === 429) {
        errorMessage = "Demasiados intentos. Por favor espere unos minutos";
      }
    } else if (error.message?.includes("Network Error")) {
      errorMessage =
        "Error de conexión. Verifica tu conexión a internet e intenta nuevamente.";
    }

    Alert.alert("Error", errorMessage, [
      { text: "Reintentar", onPress: () => handleContinue() },
      { text: "OK" },
    ]);

    setEmailError(
      "Error al enviar el código. Verifique su conexión e intente nuevamente"
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
              editable={!isLoading}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          ) : (
            <CustomButton
              titletext="Continuar"
              onPress={handleContinue}
              type="Primary"
              size="Big"
            />
          )}
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
    justifyContent: "space-between",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  content: {
    width: "100%",
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: Colors.BackgroundPage,
  },
  logo: {
    alignSelf: "center",
    width: 164,
    height: 151,
    marginBottom: 35,
    marginTop: 20,
  },
  recoveryTitleContainer: {
    flexDirection: "row",
    alignSelf: "center",
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
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Black,
    paddingLeft: 15,
    textAlign: "left",
  },
  textInput: {
    color: Colors.Black,
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: Colors.DarkGray,
    ...TextStyles.PoppinsRegular15,
  },
  textInputFocused: {
    backgroundColor: Colors.LightGray,
    borderColor: Colors.DarkGray, // Mantenemos el color del borde
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
