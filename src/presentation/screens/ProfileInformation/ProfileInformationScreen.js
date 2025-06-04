import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomButton from "../../components/CustomButton/CustomButton";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";
import { usersRepository } from "../../../data/repositories/users/usersRepository";
import { update } from "../../../shared/store/authSlice/authSlice";
import { updateUserUseCase } from "../../../domain/usecases/user/updateUserUseCase";
import { userStorage } from "../../../infrastructure/storage/userStorage";

const InformationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isEditable, setIsEditable] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

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

    try {
      const updatedUser = await updateUserUseCase({
        id: user.id,
        name: editName,
        email: editEmail,
        phone: editPhone,
      });

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
      await userStorage.save(userToSave);

      setIsEditable(false);
      Alert.alert(
        "Éxito",
        updatedUser.message || "Información actualizada correctamente"
      );
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar la información");
    }
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
          <CustomButton titletext={"Cambiar contraseña"} type="Secondary" />
        ) : (
          <CustomButton
            titletext={"Guardar cambios"}
            type="Primary"
            onPress={handleSave}
          />
        )}
      </View>
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
});

export default InformationScreen;
