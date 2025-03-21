import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: "https://example.com/avatar.png" }} // Reemplaza con tu imagen
        style={styles.avatar}
      />

      {/* Nombre del usuario */}
      <Text style={styles.greeting}>
        Hola, <Text style={styles.username}>Canserbero Ibai Lopez</Text>
      </Text>

      {/* Opciones del menú */}
      <View style={styles.menu}>
        <MenuItem title="Mi información" />
        <MenuItem title="Mis favoritos" />
        <MenuItem title="Términos y condiciones" />
        <MenuItem title="Acerca de" />
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente de ítems del menú
const MenuItem = ({ title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>{title}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    color: "#0B6623",
  },
  menu: {
    width: "90%",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: "#666",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#0B6623",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
