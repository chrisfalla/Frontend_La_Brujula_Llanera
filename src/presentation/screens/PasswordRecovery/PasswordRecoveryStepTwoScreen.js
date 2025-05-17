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

const PasswordRecoveryStepTwoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || { email: "" };

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);

  const handleContinue = () => {
    if (!code) {
      setCodeError("Por favor ingrese el código de validación");
      return;
    }

    if (code.length < 6) {
      setCodeError("El código debe tener al menos 6 caracteres");
      return;
    }

    setCodeError(null);
    navigation.navigate("Recovery3", { email, code });
  };

  const handleResendCode = () => {
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
          <CustomButton
            titletext="Validar Código"
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
