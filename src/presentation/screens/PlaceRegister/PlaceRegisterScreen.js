import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, PermissionsAndroid, Platform, Alert } from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";
import {launchImageLibrary} from 'react-native-image-picker';

const PlaceRegisterScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([null, null, null, null]);
  const [logo, setLogo] = useState(null);

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permiso para acceder a la galería',
          message: 'La aplicación necesita acceso a tus fotos',
          buttonNeutral: 'Preguntar luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async (index) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permiso denegado', 'No se puede acceder a la galería sin permiso.');
      return;
    }
    launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'No se pudo abrir la galería.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const newPhotos = [...photos];
          newPhotos[index] = response.assets[0].uri;
          setPhotos(newPhotos);
        }
      }
    );
  };

  const pickLogo = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permiso denegado', 'No se puede acceder a la galería sin permiso.');
      return;
    }
    launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'No se pudo abrir la galería.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setLogo(response.assets[0].uri);
        }
      }
    );
  };

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
          PlaceholderText={"Ej: Restaurante El Buen Sabor"}
        />
        <CustomInputText
          style={styles.inputBig}
          LabelText={"Descripción"}
          PlaceholderText={"Restaurante con comida típica"}
          multiline={true}
          numberOfLines={4}
        />
      
        <View style={styles.formrow} >
          <CustomInputText
          style={styles.input}
          LabelText={"Dirección"}
          PlaceholderText={"Calle 24 # 45-67"}
          />
          <CustomDropdown style={styles.dropdown}
          LabelText={'Ciudad'}
          placeholder={"Selecciona una ciudad"}
          
          />
          <CustomInputText style={styles.input}
          LabelText={'Teléfono'}
          PlaceholderText={"Ej: 3001234567"}
          />
          <CustomInputText style={styles.input}
          LabelText={'WhatsApp'} 
          PlaceholderText={"Ej: 3001234567"} />
          <CustomInputText style={styles.input}
          LabelText={'Email'} 
          PlaceholderText={"eje@correo.com"} />
          <CustomInputText style={styles.input}
          LabelText={'Facebook'} 
          PlaceholderText={"El buen sabor"} />
          <CustomInputText style={styles.input}
          LabelText={'Instagram'} 
          PlaceholderText={"@elbuensabor"} />
          <CustomInputText style={styles.input}
          LabelText={'Sitio web'} 
          PlaceholderText={"www.sabor.com"} />
          <CustomDropdown style={styles.dropdown}
          LabelText={'Categoría'} 
          placeholder={"Selecciona una categoría"}
          />
          <CustomDropdown style={styles.dropdown}
          LabelText={'Tags'}
          placeholder={"Selecciona una o más opciones"}
          />

        </View>
        <View style={styles.containerGallery} >
          <Text style={styles.galleryTitle}>Galeria</Text>
          <View style={styles.containerPhoto}>
            {[0,1,2,3].map((item) => (
              <View key={item} style={styles.photoContainer}>
                <TouchableOpacity style={styles.photoIconButton} onPress={() => pickImage(item)}>
                  {photos[item] ? (
                    <Image source={{ uri: photos[item] }} style={styles.photoImage} />
                  ) : (
                    <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
                  )}
                </TouchableOpacity>
                <Text style={styles.photoText}>Foto {item + 1}</Text>
              </View>
            ))}
          </View>
          <View style={styles.containerPhoto}>
            <View style={styles.logoContainer}>
              <TouchableOpacity style={styles.photoIconButton} onPress={pickLogo}>
                {logo ? (
                  <Image source={{ uri: logo }} style={styles.photoImage} />
                ) : (
                  <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
                )}
              </TouchableOpacity>
              <Text style={styles.photoText}>Logo</Text>
            </View>
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
    marginTop: -10,
  width: "48%",

},

  containerPhoto: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    
  },
  photoContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  photoIconButton: {
    padding: 10,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  photoImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  photoText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.ColorPrimary,
    textAlign: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  containerGallery: { 
    ...TextStyles.PoppinsRegular13,

     marginTop: 20, 
     marginBottom: 20,
    
  },
  galleryTitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginBottom: 10,
    color: Colors.ColorPrimary,
  },

});

export default PlaceRegisterScreen;
