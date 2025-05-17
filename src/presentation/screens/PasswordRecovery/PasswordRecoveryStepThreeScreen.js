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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import { Colors, TextStyles } from "../../styles/styles";

const PasswordRecoveryStepThreeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, code } = route.params || { email: "", code: "" };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const validatePassword = (pass) => {
    return pass.length >= 8; // Requisito mínimo
  };

  const handleContinue = () => {
    let hasError = false;

    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      hasError = true;
    } else {
      setPasswordError(null);
    }

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

    // Simulación de actualización de contraseña exitosa
    Alert.alert("¡Éxito!", "Tu contraseña ha sido actualizada correctamente.", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
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

            <CustomInputText
              style={{ marginBottom: 20}}
              LabelText="Ingrese su nueva contraseña"
              PlaceholderText="********"
              HasError={passwordError}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(null);
              }}
              value={password}
              secureTextEntry={true}
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
              secureTextEntry={true}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            titletext="Finalizar"
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
    backgroundColor: "#fff",
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
    marginVertical: 20,
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
