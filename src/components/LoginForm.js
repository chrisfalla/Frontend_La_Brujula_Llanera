import React, { useState } from "react";
import {  View,  TextInput,  StyleSheet,  Alert,  Text,  TouchableOpacity,  Pressable,} from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Ha iniciado sesión!");
    } else {
      Alert.alert("Verifique el correo o la contaseña");
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correo electroníco</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@ejemplo.com"
        keyboardType="email-address"
        value={email}
        onChange={setEmail}
      />
      <Text style={styles.title}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={password}
        onChange={SetPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleRegistrer} onPress={handleLogin}>
        <Text style={styles.googleRegistrerText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    marginTop: 8,
    alignItems: "center",
  },

  title: {
    alignItems: "",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 15,

    textAlign: "left",
    alignSelf: "flex-start",
  },
  input: {
    marginBottom: 15,
    padding: 25,
    width: 350,
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
  },
  forgotPassword: {
    color: "#1E90FF", // Color azul para simular un enlace
    textAlign: "flex-start",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#28A745",
    marginTop: 10,
    width: 350,
    height: 48,
    borderRadius: 20,
  },
  loginButtonButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: "auto",
  },
  googleRegistrer: {
    backgroundColor: "#28A745",
    marginTop: 10,
    width: 350,
    height: 48,
    borderRadius: 20,
  },
  googleRegistrerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: "auto",
  },
});

export default LoginForm;
