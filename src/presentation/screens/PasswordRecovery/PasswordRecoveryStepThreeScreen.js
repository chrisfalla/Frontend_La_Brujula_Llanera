import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import { Colors, TextStyles } from "../../styles/styles";

// imports chris validate recovery password
import { useDispatch } from "react-redux";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import { resetPasswordUseCase } from "../../../domain/usecases/passwordRecovery/getPasswordRecoveryUseCase";
import { userStorage } from "../../../infrastructure/storage/userStorage";
import { login } from "../../../shared/store/authSlice/authSlice";

const PasswordRecoveryStepThreeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { email, code, userId } = route.params || { email: "", code: "", userId: 0 };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validación de contraseña más completa
  const validatePassword = (pass) => {
    // Requisito mínimo de longitud
    if (pass.length < 8) {
      return {
        isValid: false,
        message: "La contraseña debe tener al menos 8 caracteres"
      };
    }
    
    // Verifica si contiene al menos un número
    if (!/\d/.test(pass)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos un número"
      };
    }
    
    // Verifica si contiene al menos una letra
    if (!/[a-zA-Z]/.test(pass)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos una letra"
      };
    }
    
    // Si pasa todas las validaciones
    return {
      isValid: true,
      message: ""
    };
  };

  const handleContinue = async () => {
    let hasError = false;

    // Validación para el campo de contraseña
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      hasError = true;
    } else {
      const validationResult = validatePassword(password);
      if (!validationResult.isValid) {
        setPasswordError(validationResult.message);
        hasError = true;
      } else {
        setPasswordError(null);
      }
    }

    // Validación para el campo de confirmación de contraseña
    if (!confirmPassword) {
      setConfirmPasswordError("Debe confirmar la contraseña");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      hasError = true;
    } else {
      setConfirmPasswordError(null);
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      // Registramos todos los parámetros para diagnóstico
      console.log('📝 [RESET] Datos para reseteo de contraseña:');
      console.log('- Email:', email);
      console.log('- Código:', code);
      console.log('- Password Length:', password ? password.length : 0);

      // Verificamos que todos los datos necesarios estén presentes
      if (!email) {
        throw new Error('El email es requerido para restablecer la contraseña');
      }
      if (!code) {
        throw new Error('El código de verificación es requerido para restablecer la contraseña');
      }
      if (!password) {
        throw new Error('Debe ingresar una nueva contraseña');
      }

      console.log('🚀 [RESET] Iniciando proceso de reseteo con datos verificados');

      try {
        const response = await resetPasswordUseCase(usersRepository)(
          email,
          password
        );

        console.log('✅ [RESET] Respuesta exitosa de reseteo:', response);

        if (response && response.user) {
          await userStorage.save(response.user);
          dispatch(login(response.user));
        }

        Alert.alert("¡Éxito!", "Tu contraseña ha sido actualizada correctamente.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (resetError) {
        console.error('❌ [RESET] Error durante el reseteo:', resetError);
        
        // Extraer mensaje de error para mostrar al usuario
        let errorMessage = "No se pudo actualizar la contraseña";
        
        if (resetError.response) {
          console.error('📄 [RESET] Detalles del error de respuesta:', {
            status: resetError.response.status,
            data: JSON.stringify(resetError.response.data)
          });
          
          if (resetError.response.data && resetError.response.data.message) {
            errorMessage = resetError.response.data.message;
          } else if (resetError.response.status === 500) {
            errorMessage = "Error interno del servidor. Intente más tarde o con otro código.";
          }
        } else if (resetError.message) {
          errorMessage = resetError.message;
        }
        
        // Mostrar opciones al usuario
        Alert.alert(
          "Error al cambiar contraseña", 
          errorMessage, 
          [
            {
              text: "Solicitar nuevo código",
              onPress: () => navigation.navigate("RecoveryOne")
            },
            {
              text: "Intentar de nuevo"
            }
          ]
        );
      }
    } catch (error) {
      console.error("❌ [RESET] Error general:", error);
      Alert.alert("Error", "Ha ocurrido un error inesperado. Por favor intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
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
              <CustomStepper step={3} />
            </View>

            <Text style={styles.subtitle}>Ingrese la nueva contraseña:</Text>
            
            <Text style={styles.passwordRequirements}>
              La contraseña debe tener al menos 8 caracteres, incluir números y letras.
            </Text>

            <CustomInputText
              style={{ marginBottom: 20 }}
              LabelText="Ingrese su nueva contraseña"
              PlaceholderText="********"
              HasError={passwordError}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(null);
              }}
              value={password}
              IsPassword={true}
              SupportingText={passwordError}
              editable={!isLoading}
            />

            <CustomInputText
              LabelText="Confirmar"
              PlaceholderText="********"
              HasError={confirmPasswordError}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordError(null);
              }}
              value={confirmPassword}
              IsPassword={true}
              SupportingText={confirmPasswordError}
              editable={!isLoading}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          ) : (
            <CustomButton
              titletext="Finalizar"
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
  subtitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  passwordRequirements: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.DarkGray,
    marginBottom: 15,
    textAlign: "center",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
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

export default PasswordRecoveryStepThreeScreen;
