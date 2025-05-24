import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomButton from "../../components/CustomButton/CustomButton";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import { GlobalStyles, TextStyles, Colors } from "../../styles/styles";

const InformationScreen = ({ navigation }) => {
  const [isEditable, setIsEditable] = useState(false); // Estado para editar inputs

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev); // alternar entre true/false
  };

  const handleSave = () => {
      setIsEditable(false); // volver a bloquear los inputs
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
          <CustomInputText LabelText={"Nombre"} IsDisabled={!isEditable} />
          <CustomInputText LabelText={"Email"} IsDisabled={!isEditable} />
          <CustomInputText LabelText={"Teléfono"} IsDisabled={!isEditable} />
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
    paddingVertical: 10,
    
    
  },
  containerInformation: {
    marginTop: 10,
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
