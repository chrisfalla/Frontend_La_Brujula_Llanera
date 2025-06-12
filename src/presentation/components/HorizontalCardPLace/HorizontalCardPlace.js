// components/Cards/HorizontalCardPlace.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from '../../styles/styles';
import { useLogVisit } from '../../../shared/context/LogVisitContext';

const defaultImage = 'https://via.placeholder.com/50';

const HorizontalCardPlace = ({
  name,
  category,
  address,
  image,
  onMapPress, 
  onDetailPress,
  idPlace
}) => {
  const { logVisit } = useLogVisit();

  // Handler para toda la card
  const handleCardPress = () => {
    if (idPlace) {
      logVisit(idPlace);
    }
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
          onPress={onDetailPress}
        >
          <FontAwesome5 name="chevron-right" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMapPress} // <- Aquí se usa el prop para navegación al mapa
        >
          <FontAwesome5 name="map-marker-alt" size={16} color="#FFFFFF" />
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
