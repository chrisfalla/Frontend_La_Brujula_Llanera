import React from "react";
import {  View,  Text,  StyleSheet,  ScrollView,  KeyboardAvoidingView,  Platform, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomStepper from "../../components/Steper/CustomSteper";
import LogoTitle from "../../components/LogoTitle";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";

const PasswordRecoveryStepOneScreen = () => {
  const navigation = useNavigation();
  const handleContinue = () => {
    // Navegar a la siguiente pantalla o realizar otra acción
    navigation.navigate("Recovery2"); // Reemplazar 'NextScreen' con tu siguiente pantalla
  };

  const handleResendCode = () => {
    // ✅ Muestra una alerta al usuario
    Alert.alert(
      "Código reenviado",
      "Hemos enviado un nuevo código a tu correo electrónico.",
      [{ text: "OK" }]
    );
};
return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LogoTitle />
      
        <View style={styles.content}>
          <Text style={styles.title}>
            Recuperar <Text style={styles.highlight}>Contraseña</Text>
          </Text>

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
            HasError={''}
            
          />

          <CustomButton
            titletext="Enviar código nuevamente"
            onPress={handleResendCode}
            type="Secondary"
            size="Big"
          />

          <CustomButton
            titletext="Continuar"
            onPress={handleContinue}
            type="Primary"
            size="Big"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
    paddingBottom:0,
    backgroundColor: "#fff",
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
    
  },
  content: {
   
    marginBottom:0,
    marginTop: 0,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlight: {
    color: "#236A34",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },

});


export default PasswordRecoveryStepOneScreen;
