import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import { Colors, TextStyles } from "../../styles/styles";

//imports chris validate recovery password
import { ActivityIndicator} from "react-native";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import {
  requestPasswordRecoveryCodeUseCase,
  verifyPasswordRecoveryCodeUseCase
} from "../../../domain/usecases/passwordRecovery/getPasswordRecoveryUseCase";



const PasswordRecoveryStepTwoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || { email: "" };

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);

  const handleContinue = async () => {
    if (!code) {
      setCodeError("Por favor ingrese el código de validación");
      return;
    }

    if (code.length < 6) {
      setCodeError("El código debe tener al menos 6 caracteres");
      return;
    }

    setCodeError(null);
    setIsLoading(true);

    try {
      console.log("🔑 Intentando validar código:", code, "para email:", email);
      
      // Formatear y limpiar el código antes de enviarlo
      const formattedCode = code.trim();
      
      const response = await verifyPasswordRecoveryCodeUseCase(usersRepository)(email, formattedCode);
      console.log("✅ Validación exitosa, respuesta:", response);
      
      // Extraer el ID de usuario de la respuesta (cuando esté disponible)
      const userId = response.idUser || response.userId || 0;
      
      if (!userId) {
        console.warn("⚠️ No se recibió ID de usuario en la respuesta");
      }
      
      navigation.navigate("RecoveryThree", { email, code: formattedCode, userId });
    } catch (error) {
      console.error("❌ Error detallado al validar código:", error);
      
      let errorMessage = "Código inválido o expirado";
      
      // Usar el mensaje personalizado si está disponible
      if (error.userMessage) {
        errorMessage = error.userMessage;
      } else if (error.response) {
        console.error("📄 Respuesta de error del servidor:", {
          status: error.response.status,
          data: error.response.data
        });
        
        if (error.response.status === 400) {
          const apiMessage = error.response.data?.message;
          if (apiMessage === "Invalid code") {
            errorMessage = "El código ingresado es incorrecto. Por favor verifique e intente nuevamente.";
          } else {
            errorMessage = "Código inválido. Verifique que haya ingresado correctamente el código.";
          }
        } else if (error.response.status === 404) {
          errorMessage = "No se encontró una solicitud de recuperación activa para este email.";
        } else if (error.response.status === 401 || error.response.status === 410) {
          errorMessage = "El código ha expirado. Por favor solicite un código nuevo.";
        } else if (error.response.status === 429) {
          errorMessage = "Demasiados intentos de validación. Por favor espere unos minutos.";
        }
      } else if (error.message && error.message.includes('Network Error')) {
        errorMessage = "Error de conexión. Verifique su conexión a internet.";
      } else if (error.message) {
        // Para errores de validación del lado del cliente
        errorMessage = error.message;
      }
      
      setCodeError(errorMessage);
      Alert.alert("Error de validación", errorMessage, [
        {
          text: "Solicitar nuevo código",
          onPress: () => handleResendCode()
        },
        {
          text: "Intentar de nuevo"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await requestPasswordRecoveryCodeUseCase(usersRepository)(email);
      Alert.alert(
        "Código reenviado",
        `Hemos enviado un nuevo código a ${email}.`,
        [{ text: "OK" }]
      );
    } catch (error) {
      let errorMessage = "No se pudo reenviar el código";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  //add states load chris
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

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
              <CustomStepper step={2} />
            </View>

            <Text style={styles.subtitle}>
              Ingrese el código que se le ha enviado a su correo electrónico
            </Text>

            <CustomInputText
              LabelText={"Ingrese el código de validación"}
              PlaceholderText={"BL-253665"}
              HasError={codeError}
              onChangeText={(text) => {
                setCode(text);
                if (codeError) setCodeError(null);
              }}
              value={code}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {isResending ? (
            <ActivityIndicator size="large" color={Colors.ColorSecondary} style={{ marginBottom: 10 }} />
          ) : (
            <CustomButton
              titletext="Enviar código nuevamente"
              onPress={handleResendCode}
              type="Secondary"
              size="Big"
              style={{ marginBottom: 10 }}
              disabled={isLoading}
            />
          )}

          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          ) : (
            <CustomButton
              titletext="Validar Código"
              onPress={handleContinue}
              type="Primary"
              size="Big"
              disabled={isResending}
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
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlight: {
    color: Colors.ColorPrimary,
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  subtitle: {
    ...TextStyles.PoppinsSemiBold15,
    textAlign: "center",
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
    marginBottom: 20,
  },
  recoveryText: {
    ...TextStyles.PoppinsSemibold20,
    color: Colors.Black,
  },
  recoveryTextHighlight: {
    ...TextStyles.PoppinsSemibold20,
    color: Colors.ColorPrimary,
  },
});

export default PasswordRecoveryStepTwoScreen;
