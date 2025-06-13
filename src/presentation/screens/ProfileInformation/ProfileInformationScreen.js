import React, { useState } from "react";
import { View, Image, StyleSheet, Alert, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomButton from "../../components/CustomButton/CustomButton";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import { update } from "../../../shared/store/authSlice/authSlice";
import { updateUserUseCase } from "../../../domain/usecases/user/updateUserUseCase";
import { userStorage } from "../../../infrastructure/storage/userStorage";
import { changePasswordUseCase } from "../../../domain/usecases/user/changePasswordUseCase";

const InformationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isEditable, setIsEditable] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const toggleEditMode = () => {
    if (!isEditable) {
      setEditName(user?.name || "");
      setEditEmail(user?.email || "");
      setEditPhone(user?.phone || "");
    }
    setIsEditable((prev) => !prev);
  };

  const handleSave = async () => {
    if (!editName || !editEmail || !editPhone) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    updateUserUseCase({
      id: user.id,
      name: editName,
      email: editEmail,
      phone: editPhone,
    })
      .then((updatedUser) => {
        // Construir el usuario completo con todos los campos esperados
        const userToSave = {
          ...user,
          id: updatedUser.id || user.id,
          idUser: updatedUser.id || user.idUser || user.id,
          name: updatedUser.name || updatedUser.names || editName,
          names: updatedUser.name || updatedUser.names || editName,
          email: updatedUser.email || updatedUser.email || editEmail,
          phone: updatedUser.phone || updatedUser.phone || editPhone,
          birthDate: user.birthDate,
          roleId: user.roleId,
          genderId: user.genderId,
        };

        dispatch(
          update({
            name: updatedUser.name || updatedUser.names || editName,
            names: updatedUser.names || updatedUser.name || editName,
            email: updatedUser.email || updatedUser.email || editEmail,
            phone: updatedUser.phone || updatedUser.phone || editPhone,
          })
        );

        // Guardar el usuario actualizado en el almacenamiento local
        return userStorage.save(userToSave);
      })
      .then(() => {
        setIsEditable(false);
        Alert.alert("Éxito", "Información actualizada correctamente");
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo actualizar la información");
      });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=(?:.*\d){2,}).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    // Validar contraseñas
    let hasErrors = false;

    if (!newPassword) {
      setNewPasswordError("La contraseña es requerida");
      hasErrors = true;
    } else if (!validatePassword(newPassword)) {
      setNewPasswordError(
        "Formato inválido: mínimo 6 caracteres, una mayúscula y dos números"
      );
      hasErrors = true;
    } else {
      setNewPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Debe confirmar la contraseña");
      hasErrors = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      hasErrors = true;
    } else {
      setConfirmPasswordError(null);
    }

    if (hasErrors) return;

    setIsChangingPassword(true);
    
    changePasswordUseCase(usersRepository)(user.email, newPassword)
      .then(() => {
        Alert.alert("Éxito", "Tu contraseña ha sido actualizada correctamente");
        setShowPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        let errorMessage = "No se pudo actualizar la contraseña";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setIsChangingPassword(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInformation}>
        <NavigationTopBar
          primaryIcon="chevron-back"
          onBackPress={() => navigation.goBack()}
          navigation={navigation}
          SecondIcon="pencil"
          useBackground={false}
          title={"Mí información"}
          onSecondIconPress={toggleEditMode} // Al presionar el lápiz
        />

        <Image
          style={styles.image}
          source={require("../../../shared/assets/Avatar.png")}
        />

        <View style={styles.information}>
          <CustomInputText
            LabelText={"Nombre"}
            IsDisabled={!isEditable}
            value={editName}
            onChangeText={setEditName}
          />
          <CustomInputText
            LabelText={"Email"}
            IsDisabled={!isEditable}
            value={editEmail}
            onChangeText={setEditEmail}
          />
          <CustomInputText
            LabelText={"Teléfono"}
            IsDisabled={!isEditable}
            value={editPhone}
            onChangeText={setEditPhone}
          />
        </View>
      </View>

      <View style={styles.button}>
        {!isEditable ? (
          <CustomButton
            titletext={"Cambiar contraseña"}
            type="Secondary"
            onPress={() => setShowPasswordModal(true)}
          />
        ) : (
          <CustomButton
            titletext={"Guardar cambios"}
            type="Primary"
            onPress={handleSave}
          />
        )}
      </View>

      {/* Modal para cambiar contraseña */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTopBar}>
              <NavigationTopBar
                primaryIcon="chevron-back"
                SecondIcon={false}
                onBackPress={() => setShowPasswordModal(false)}
                title="Cambiar contraseña"
                useBackground={false}
              />
            </View>
            <CustomInputText
              LabelText="Nueva contraseña"
              PlaceholderText="********"
              HasError={newPasswordError}
              SupportingText={newPasswordError}
              IsPassword
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              style={styles.modalInput}
              editable={!isChangingPassword}
            />
            <CustomInputText
              LabelText="Confirmar contraseña"
              PlaceholderText="********"
              HasError={confirmPasswordError}
              SupportingText={confirmPasswordError}
              IsPassword
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.modalInput}
              editable={!isChangingPassword}
            />
            <CustomButton
              titletext={isChangingPassword ? "Guardando..." : "Guardar"}
              type="Primary"
              onPress={handleChangePassword}
              disabled={isChangingPassword}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 0,
  },
  containerInformation: {
    marginTop: 0,
    marginBottom: 50,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center", // reemplaza marginHorizontal: 'auto'
    marginTop: 20,
    top: 20,
  },
  information: {
    marginTop: 40,
    marginBottom: 40,
    padding: 10,
    top: 30,
  },
  button: {
    marginTop: 50,
    top: 50,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "stretch",
  },
  modalTopBar: {
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 16,
  },
});

export default InformationScreen;