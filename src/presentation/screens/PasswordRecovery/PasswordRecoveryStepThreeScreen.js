import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStepper from '../../components/Steper/CustomSteper';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputText from '../../components/CustomInput/CustomInputText';

const PasswordRecoveryStepThreeScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContinue = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí iría la lógica para actualizar la contraseña
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image 
            source={require('../../../shared/assets/MainLogo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>
            Recuperar <Text style={styles.highlight}>Contraseña</Text>
          </Text>

          <View style={styles.statusContainer}>
            <CustomStepper step={3} />
          </View>
          <Text style={styles.subtitle}>
            Ingrese la nueva contraseña:
          </Text>

          <CustomInputText
            LabelText="Ingrese su nueva contraseña"
            PlaceholderText="********"
            HasError={null}
          />
          <CustomInputText
            LabelText="Confirme su nueva contraseña"
            PlaceholderText="********"
            HasError={null}
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
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  content: {
    marginBottom: 0,
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
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 120,
    marginBottom: 10
  },
});

export default PasswordRecoveryStepThreeScreen;
