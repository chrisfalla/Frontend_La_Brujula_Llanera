import React, { useState } from "react";
import {  StyleSheet,  View,  ScrollView,  Image,  TouchableOpacity,  Text,  
  Alert,  StatusBar,  Modal
} from "react-native";
import NavigationTopBar from "../../components/NavigationTopBar/NavigationTopBar";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputText from "../../components/CustomInput/CustomInputText";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";
import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';

const PlaceRegisterScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([null, null, null, null]);
  const [logo, setLogo] = useState(null);

  const requestPermissions = async () => {
    // Para Expo, los permisos se solicitan automáticamente
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return {
      camera: cameraStatus === 'granted',
      media: mediaStatus === 'granted'
    };
  };

  const convertToWebP = async (uri, imageType = 'gallery') => {
    try {
      // Configuraciones optimizadas para tu UI actual
      const configs = {
        profile: { width: 150, height: 150, quality: 75 },    // Para logos circulares (50x50 UI)
        gallery: { width: 400, height: 300, quality: 80 },    // Para cards verticales (140px altura UI)
        thumbnail: { width: 100, height: 100, quality: 70 },  // Para miniaturas muy pequeñas
        featured: { width: 600, height: 400, quality: 85 }    // Para destacadas del carrusel
      };
      
      const config = configs[imageType] || configs.gallery;
      
      const result = await ImageResizer.createResizedImage(
        uri,
        config.width,
        config.height,
        'WEBP',
        config.quality,
        0, // rotación
        null, // outputPath
        false, // keepMeta
        {
          mode: 'contain', // 'contain' mantiene aspecto, 'cover' rellena
          onlyScaleDown: true // Solo redimensiona si es más grande
        }
      );
      return result.uri;
    } catch (error) {
      console.log('Error al convertir imagen:', error);
      Alert.alert('Error', 'No se pudo procesar la imagen.');
      return uri;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [onImageSelectedCallback, setOnImageSelectedCallback] = useState(null);
  const [currentImageType, setCurrentImageType] = useState('gallery');

  const openImagePickerModal = (onImageSelected, imageType = 'gallery') => {
    setOnImageSelectedCallback(() => onImageSelected);
    setCurrentImageType(imageType);
    setModalVisible(true);
  };

  const handleCamera = async () => {
    setModalVisible(false);
    const permissions = await requestPermissions();
    if (!permissions.camera) {
      Alert.alert('Permiso denegado', 'No se puede acceder a la cámara sin permiso.');
      return;
    }
    
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.9, // Alta calidad inicial para luego procesar
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const webpUri = await convertToWebP(result.assets[0].uri, currentImageType);
        if (onImageSelectedCallback) onImageSelectedCallback(webpUri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la cámara.');
    }
  };

  const handleGallery = async () => {
    setModalVisible(false);
    const permissions = await requestPermissions();
    if (!permissions.media) {
      Alert.alert('Permiso denegado', 'No se puede acceder a la galería sin permiso.');
      return;
    }
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.9, // Alta calidad inicial para luego procesar
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const webpUri = await convertToWebP(result.assets[0].uri, currentImageType);
        if (onImageSelectedCallback) onImageSelectedCallback(webpUri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  };

  const pickImage = (index) => {
    openImagePickerModal((uri) => {
      const newPhotos = [...photos];
      newPhotos[index] = uri;
      setPhotos(newPhotos);
    }, 'gallery'); // Fotos de galería
  };

  const pickLogo = () => {
    openImagePickerModal((uri) => setLogo(uri), 'profile'); // Logo/perfil
  };

  // Estados para nuevas imágenes
  const [logoExtra, setLogoExtra] = useState(null);
  const [masVistado, setMasVistado] = useState(null);
  const [fotoPequena, setFotoPequena] = useState(null);

  const pickLogoExtra = () => {
    openImagePickerModal((uri) => setLogoExtra(uri), 'profile'); // Logo
  };
  const pickMasVistado = () => {
    openImagePickerModal((uri) => setMasVistado(uri), 'featured'); // Imagen destacada
  };
  const pickFotoPequena = () => {
    openImagePickerModal((uri) => setFotoPequena(uri), 'thumbnail'); // Miniatura
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
      <Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Selecciona una opción</Text>
      <View style={styles.modalOptionsRow}>
        <TouchableOpacity onPress={handleCamera} style={styles.modalOption}>
          <Ionicons name="camera" size={40} color={Colors.ColorPrimary} />
          <Text style={styles.modalOptionText}>Usar cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGallery} style={styles.modalOption}>
          <Ionicons name="folder" size={40} color={Colors.ColorPrimary} />
          <Text style={styles.modalOptionText}>Desde galería</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
        <Text style={styles.modalCancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: 250,
  },
  modalTitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginBottom: 16,
    color: Colors.ColorPrimary,
    textAlign: 'center',
  },
  modalOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalOption: {
    alignItems: 'center',
    flex: 1,
  },
  modalOptionText: {
    ...TextStyles.PoppinsRegular13,
    marginTop: 8,
    textAlign: 'center',
  },
  modalCancel: {
    marginTop: 20,
  },
  modalCancelText: {
    ...TextStyles.PoppinsSemiBold15,
    color: Colors.ColorPrimary,
    textAlign: 'center',
  },
});

export default PlaceRegisterScreen;
