import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from '../../styles/styles';

const defaultImage = 'https://via.placeholder.com/50';

const HorizontalCardPlace = ({
  name,
  category,
  address,
  image,
  onMapPress, 
  onDetailPress,
  detailIconName = "chevron-right", // Nuevo prop con valor por defecto
  mapIconName = "map-marker-alt",    // Nuevo prop con valor por defecto
  onDetailIconPress, // Nuevo handler para el ícono de detalle
  onMapIconPress     // Nuevo handler para el ícono de mapa
}) => {
  // Handler para toda la card
  const handleCardPress = () => {
    if (onDetailPress) onDetailPress();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image || defaultImage }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {category || "Categoría desconocida"}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {address || "Dirección no disponible"}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onDetailIconPress || onDetailPress} // Usa el nuevo handler si existe
        >
          <FontAwesome5 name={detailIconName} size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMapIconPress || onMapPress} // Usa el nuevo handler si existe
        >
          <FontAwesome5 name={mapIconName} size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.CardBaseStyle,
    flexDirection: 'row',
    height: 91,
    marginBottom: 16,
    alignSelf: 'center',

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginLeft: -4
  },
  textContainer: {
    flex: 1,
    marginHorizontal:16,
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.ColorPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    ...TextStyles.PoppinsRegular13,
    color: Colors.Black,
    marginBottom: 2,
  },
  description: {
    ...TextStyles.PoppinsRegular13,
    textAlign: 'center',
    color: Colors.Black,
    lineHeight: 16,
    marginBottom: 3,
  },
  actionsContainer: {
    width: 25,
    height: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    paddingVertical: 12,
  },
  iconButton: {
    width: 30,
    height: 30,
    backgroundColor: '#236A34',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default HorizontalCardPlace;