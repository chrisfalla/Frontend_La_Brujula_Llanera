import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDecoration from "../../components/CustomDecoration/CustomDecoration";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

//imports login chris
import { loginUserUseCase } from "../../../domain/usecases/user/loginUserUseCase";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import { userLogin } from "../../../domain/models/users/userLogin";
import { login } from "../../../shared/store/authSlice/authSlice";
import { userStorage } from "../../../infrastructure/storage/userStorage";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleLogin = async () => {
    let localErrors = {};
    if (!formData.email) localErrors.email = "Email es requerido";
    if (!formData.password) localErrors.password = "Contraseña es requerida";
    setErrors(localErrors);
    if (Object.keys(localErrors).length > 0) return;

    setLoading(true);
    try {
      const credentials = new userLogin({
        email: formData.email,
        password: formData.password,
      });
      const response = await loginUserUseCase(usersRepository)(credentials);

      if (response && response.user && response.token) {
        await userStorage.save(response.user);
        dispatch(login(response.user));
      } else {
        setErrors({ password: "Credenciales incorrectas" });
      }
    } catch (error) {
      setErrors({ password: "Error al iniciar sesión" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("RecoveryOne");
  };

  const handleRegister = () => {
    navigation.navigate("RegisterStepOne");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { flexGrow: 1, justifyContent: 'center' }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.logoLeft}
          source={require("../../../shared/assets/logoLeft.png")}
        />
        <Image
          style={styles.logoRight}
          source={require("../../../shared/assets/logoRigth.png")}
        />
        <Image
          style={styles.img}
          source={require("../../../shared/assets/MainLogo.png")}
        />

        <Text style={styles.title}>
          Iniciar <Text style={styles.titleText}>Sesión </Text>{" "}
        </Text>
        <View style={styles.formContainer}>
          <CustomInputText
            style={styles.input}
            LabelText={"Ingresa su email"}
            PlaceholderText={"ejemplo@ejemplo.com"}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            HasError={!!errors.email}
            SupportingText={errors.email}
          />
          <CustomInputText
            style={styles.input}
            LabelText={"Ingresa su contraseña"}
            PlaceholderText={"*********"}
            IsPassword={true}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            HasError={!!errors.password}
            SupportingText={errors.password}
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
          </TouchableOpacity>

          <CustomButton
            style={styles.buttonOne}
            titletext={loading ? "Cargando..." : "Iniciar sesión"}
            onPress={handleLogin}
            type="Primary"
            size="Big"
            disabled={loading}
          />
          <Text style={styles.separator}>ó</Text>
          <CustomButton
            style={styles.buttonTwo}
            titletext="Registrarse"
            onPress={handleRegister}
            type="Secondary"
            size="Big"
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>
            Al ingresar, aceptas nuestros Términos y condiciones, y Política de
            privacidad
          </Text>
        </View>
        <CustomDecoration type="Left" styles={styles.divider} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  logoRight: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  logoLeft: {
    position: "absolute",
    marginVertical: 150,
    left: 0,
    top: 0,
  },
  img: {
    width: 164,
    height: 151,
    marginTop: 0,
    marginBottom: 60,
  },
  title: {
    color: Colors.Black,
    ...TextStyles.PoppinsSemibold20,
    textAlign: "center",
  },
  titleText: {
    color: Colors.ColorPrimary,
    ...TextStyles.PoppinsSemibold20,
  },
  formContainer: {
    width: "99%",
    paddingHorizontal: 16,
    marginTop: 20,
    fontSize: 12,
    marginBottom: 40,
  },
  input: {
    marginBottom: 20,
  },
  forgotPassword: {
    color: Colors.DarkGray,
    fontFamily: "Regular",
    fontSize: 12,
    textAlign: "right",
    marginRight: 5,
    textDecorationLine: "underline",
    marginBottom: 40,
  },
  buttonOne: {
    marginTop: 35,
    marginBottom: 10,
  },
  buttonTwo: {
    marginTop: 0,
    marginBottom: -30,
  },
  separator: {
    color: Colors.DarkGray,
    fontFamily: "Poppins",
    fontSize: 14,
    marginBottom: 15,
    marginTop: 0,
    textAlign: "center",
  },
  footerContainer: {
    width: "75%",
    position: "relative",
    marginBottom: 0,
    marginTop: 10,
  },
  footer: {
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.Black,
    margin: 0,
  },
});

export default LoginScreen;
