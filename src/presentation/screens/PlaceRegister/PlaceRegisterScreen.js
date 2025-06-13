import React, { useState } from "react";
import {  StyleSheet,  View,  ScrollView,  Image,  TouchableOpacity,  Text,  
  PermissionsAndroid,  Platform,  Alert,  StatusBar,
} from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";
import { launchImageLibrary } from "react-native-image-picker";

const PlaceRegisterScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([null, null, null, null]);
  const [logo, setLogo] = useState(null);

  const requestGalleryPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permiso para acceder a la galería",
          message: "La aplicación necesita acceso a tus fotos",
          buttonNeutral: "Preguntar luego",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async (index) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso denegado",
        "No se puede acceder a la galería sin permiso."
      );
      return;
    }
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "No se pudo abrir la galería.");
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const newPhotos = [...photos];
        newPhotos[index] = response.assets[0].uri;
        setPhotos(newPhotos);
      }
    });
  };

  const pickLogo = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso denegado",
        "No se puede acceder a la galería sin permiso."
      );
      return;
    }
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "No se pudo abrir la galería.");
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setLogo(response.assets[0].uri);
      }
    });
  };

  // Estados para nuevas imágenes
  const [logoExtra, setLogoExtra] = useState(null);
  const [masVistado, setMasVistado] = useState(null);
  const [fotoPequena, setFotoPequena] = useState(null);

  const pickLogoExtra = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso denegado",
        "No se puede acceder a la galería sin permiso."
      );
      return;
    }
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "No se pudo abrir la galería.");
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setLogoExtra(response.assets[0].uri);
      }
    });
  };
  const pickMasVistado = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso denegado",
        "No se puede acceder a la galería sin permiso."
      );
      return;
    }
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "No se pudo abrir la galería.");
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setMasVistado(response.assets[0].uri);
      }
    });
  };
  const pickFotoPequena = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso denegado",
        "No se puede acceder a la galería sin permiso."
      );
      return;
    }
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "No se pudo abrir la galería.");
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setFotoPequena(response.assets[0].uri);
      }
    });
  };

  // 1. Estado para los valores y errores del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    telefono: "",
    whatsapp: "",
    email: "",
    facebook: "",
    instagram: "",
    sitioWeb: "",
    // agrega los demás campos si los necesitas
  });
  const [errors, setErrors] = useState({});

  // 2. Manejar cambios en los campos
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: undefined }); // limpia el error al escribir
    console.log("Nuevo valor de", field, ":", value); // <-- Agrega esto
  };

  // 3. Validar campos
  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.descripcion)
      newErrors.descripcion = "La descripción es obligatoria";
    if (!form.direccion) {
      newErrors.direccion = "La dirección es obligatoria";
    } else if (!form.direccion.includes("#")) {
      newErrors.direccion = "La dirección debe contener el carácter #";
    }
    if (!form.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{10}$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 números";
    }
    if (!form.whatsapp) {
      newErrors.whatsapp = "El WhatsApp es obligatorio";
    } else if (!/^\d{10}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "El WhatsApp debe tener exactamente 10 números";
    }
    if (!form.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "El email no es válido";
    } else {
      const allowedDomains = ["@gmail.com", "@hotmail.com", "@outlook.com"];
      const emailLower = form.email.toLowerCase();
      if (!allowedDomains.some((domain) => emailLower.endsWith(domain))) {
        newErrors.email =
          "Solo se permiten correos @gmail, @hotmail o @outlook";
      }
    }
    // Validación de imágenes
    if (!photos.some((uri) => !!uri))
      newErrors.galeria = "Agrega las 4 fotos, es obligatorio";
    if (!logo) newErrors.logo = "El logo es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <View style={styles.headerTopBar}>
        <NavigationTopBar
          title={"Información del sitio "}
          useBackground={false}
          SecondIcon={false}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <CustomInputText
            style={styles.inputBig}
            LabelText={"Nombre del sitio"}
            PlaceholderText={"Ej: Restaurante El Buen Sabor"}
            value={form.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
            HasError={errors.nombre}
          />
          <CustomInputText
            style={styles.inputBig}
            LabelText={"Descripción"}
            PlaceholderText={"Restaurante con comida típica"}
            multiline={true}
            numberOfLines={4}
            value={form.descripcion}
            onChangeText={(text) => handleChange("descripcion", text)}
            HasError={errors.descripcion}
          />

          <View style={styles.formrow}>
            <CustomInputText
              style={styles.input}
              LabelText={"Dirección"}
              PlaceholderText={"Calle 24 # 45-67"}
              value={form.direccion}
              onChangeText={(text) => handleChange("direccion", text)}
              HasError={errors.direccion}
            />
            <CustomDropdown
              style={styles.dropdown}
              LabelText={"Ciudad"}
              placeholder={"Selecciona una ciudad"}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"Teléfono"}
              PlaceholderText={"Ej: 3001234567"}
              value={form.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
              HasError={errors.telefono}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"WhatsApp"}
              PlaceholderText={"Ej: 3001234567"}
              value={form.whatsapp}
              onChangeText={(text) => handleChange("whatsapp", text)}
              HasError={errors.whatsapp}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"Email"}
              PlaceholderText={"eje@correo.com"}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              HasError={errors.email}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"Facebook"}
              PlaceholderText={"El buen sabor"}
              value={form.facebook}
              onChangeText={(text) => handleChange("facebook", text)}
              HasError={errors.facebook}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"Instagram"}
              PlaceholderText={"@elbuensabor"}
              value={form.instagram}
              onChangeText={(text) => handleChange("instagram", text)}
              HasError={errors.instagram}
            />
            <CustomInputText
              style={styles.input}
              LabelText={"Sitio web"}
              PlaceholderText={"www.sabor.com"}
              value={form.sitioWeb}
              onChangeText={(text) => handleChange("sitioWeb", text)}
              HasError={errors.sitioWeb}
            />
            <CustomDropdown
              style={styles.dropdown}
              LabelText={"Categoría"}
              placeholder={"Selecciona una categoría"}
            />
            <CustomDropdown
              style={styles.dropdown}
              LabelText={"Tags"}
              placeholder={"Selecciona una o más opciones"}
            />
          </View>
          <View style={styles.containerGallery}>
            <Text style={styles.galleryTitle}>Galeria</Text>
            <View style={styles.galleryRow}>
              <View style={styles.galleryImagesContainer}>
                {[0, 1, 2].map((item) => (
                  <View key={item} style={styles.photoContainer}>
                    <TouchableOpacity
                      style={styles.photoIconButton}
                      onPress={() => pickImage(item)}
                    >
                      {photos[item] ? (
                        <Image
                          source={{ uri: photos[item] }}
                          style={styles.photoImage}
                        />
                      ) : (
                        <Ionicons
                          name="camera"
                          size={24}
                          color={Colors.ColorPrimary}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.photoText}>Foto {item + 1}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.logoContainerGallery}>
                <TouchableOpacity
                  style={styles.photoIconButton}
                  onPress={pickLogo}
                >
                  {logo ? (
                    <Image source={{ uri: logo }} style={styles.photoImage} />
                  ) : (
                    <Ionicons
                      name="camera"
                      size={24}
                      color={Colors.ColorPrimary}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.photoText}>Perfil</Text>
                {errors.logo && (
                  <Text style={styles.errorText}>{errors.logo}</Text>
                )}
              </View>
              
            </View>
            {errors.galeria && (
              <Text style={styles.errorText}>{errors.galeria}</Text>
            )}
          </View>
          <Text style={styles.galleryTitle}>Otras imágenes</Text>
          <View style={styles.extraImagesRow}>
            <View style={styles.extraImageContainer}>
              <TouchableOpacity style={styles.photoIconButton} onPress={pickLogoExtra}>
                {logoExtra ? (
                  <Image source={{ uri: logoExtra }} style={styles.photoImage} />
                ) : (
                  <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
                )}
              </TouchableOpacity>
              <Text style={styles.photoText}>Logo</Text>
            </View>
            <View style={styles.extraImageContainer}>
              <TouchableOpacity style={styles.photoIconButton} onPress={pickMasVistado}>
                {masVistado ? (
                  <Image source={{ uri: masVistado }} style={styles.photoImage} />
                ) : (
                  <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
                )}
              </TouchableOpacity>
              <Text style={styles.photoText}>Más visitado</Text>
            </View>
            <View style={styles.extraImageContainer}>
              <TouchableOpacity style={styles.photoIconButton} onPress={pickFotoPequena}>
                {fotoPequena ? (
                  <Image source={{ uri: fotoPequena }} style={styles.photoImage} />
                ) : (
                  <Ionicons name="camera" size={24} color={Colors.ColorPrimary} />
                )}
              </TouchableOpacity>
              <Text style={styles.photoText}>Foto pequeña</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            type="Primary"
            size="Small"
            titletext={"Guardar"}
            onPress={() => {
              if (validate()) {
                // Aquí puedes enviar el formulario o guardar los datos
                Alert.alert(
                  "Formulario válido",
                  "¡Datos guardados correctamente!"
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    flex: 1,
    backgroundColor: Colors.BackgroundPage,

  },
  headerTopBar: {
    marginTop: 0,
    marginBottom: 50,
  },
  formrow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    alignItems: "center",
    marginRight: 16,
    
  },
  photoIconButton: {
    padding: 10,
    ...GlobalStyles.CardBaseStyle,
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
    textAlign: "center",
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  logoContainerGallery: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  galleryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",    
    marginBottom: 20,
  },
  galleryImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  containerGallery: {
    ...TextStyles.PoppinsRegular13,
    marginTop: 20,
    
  },
  galleryTitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginBottom: 10,
    color: Colors.ColorPrimary,
  },
  errorText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.ErrorAdvertisingColor,
    marginTop: 2,
    paddingLeft: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 24, // opcional, para separar del borde inferior
  },
  extraImagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  extraImageContainer: {
    alignItems: 'center',
    flex: 1,
  },
});

export default PlaceRegisterScreen;
