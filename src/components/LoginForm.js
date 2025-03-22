import React, { useState } from "react";
import {  View,  TextInput,  StyleSheet,  Alert,  Text,  TouchableOpacity,  Pressable,} from "react-native";
import RowLine from "../components/RowLine";




const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Ha iniciado sesión!");
    } else {
      Alert.alert("Verifique el correo o la contaseña");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Recovery');
  };
      


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correo electroníco</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@ejemplo.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.title}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={password}
        onChangeText={SetPassword}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>¿Olvido su Contraseña?</Text>
              </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
        <RowLine style={styles.rowLine} />
       
    

      <TouchableOpacity style={styles.registrerButton} onPress={handleLogin}>
        <Text style={styles.registrerButtonText}>Registrarse</Text>
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
    
    width: 350,
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 20,
  },
  forgotPassword: {
    color: "#747474", // Color azul para simular un enlace
    paddingLeft: 200,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#236A34",
    marginTop: 15,
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
  registrerButton: {
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor:'#236A34',
    width: 350,
    height: 48,
    borderRadius: 20,
  },
  registrerButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#236A34",
    textAlign: "center",
    margin: 'auto',
  },

  rowLine: {
    marginVertical: 10, // Espacio entre los botones
  }

});

export default LoginForm;
