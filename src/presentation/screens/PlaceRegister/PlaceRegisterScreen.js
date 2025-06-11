import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const PlaceRegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationTopBar
        title={"Información del sitio "}
        useBackground={false}
        SecondIcon={false}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
      <View style={styles.formContainer}>
        <CustomInputText style={styles.inputBig}
          LabelText={"Nombre del sitio"}
        />
        <CustomInputText style={styles.inputBig}
          LabelText={"Dirección"}
        />
         <CustomInputText style={styles.inputBig}
          LabelText={"Dirección"}
        />
        <View style={styles.formrow} >
          <CustomInputText style={styles.input}
          LabelText={'Telefono'}  />
          <CustomInputText style={styles.input}
          LabelText={'Whatsapp'}  />
          <CustomInputText style={styles.input}
          LabelText={'Email'}  />
          <CustomInputText style={styles.input}
          LabelText={'Facebook'}  />
          <CustomInputText style={styles.input}
          LabelText={'Instagram'}  />
          <CustomInputText style={styles.input}
          LabelText={'Sitio web'}  />
          <CustomDropdown style={styles.dropdown}
          LabelText={'Categoria'}  />
          
          <CustomDropdown style={styles.dropdown}
          LabelText={'Tags'}  />

        </View>
        <View style={styles.containerPhoto} >
          <View style={{ alignItems: "flex-start", marginRight: 24 }}>
            <TouchableOpacity style={styles.photoIconButton}>
              <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.photoPreviewPlaceholder} />
            
          </View>
        </View>
        </View>
      <CustomButton
        type="Primary"
        titletext={"Guardar"}
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
formrow: { 
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},


  formContainer: {
    padding: 16,
    backgroundColor: Colors.ColorWhite,
    borderRadius: 10,
    marginBottom: 20,
  },

  inputBig: {
    marginBottom: 16,
  },
input: {
    width: "48%",
    marginBottom: 16,
    
  },
  dropdown: {
  width: "48%",

},

  containerPhoto: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
  },
  photoIconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  photoPreviewPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    backgroundColor: "#f0f0f0",
  },
});

export default PlaceRegisterScreen;
