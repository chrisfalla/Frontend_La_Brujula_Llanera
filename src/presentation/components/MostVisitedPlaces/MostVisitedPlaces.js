import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';

const MostVisitedPlaces = ({ place, onPress, cardWidth, cardMargin }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth, marginRight: cardMargin }]} // Usamos cardMargin
      onPress={() => onPress(place)}
    >
      <Image source={{ uri: place.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.labelContainer}>
        <Text style={styles.labelText} numberOfLines={1} ellipsizeMode="tail">
          {place.placeName}
        </Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Ver más</Text>
      </View>
    </TouchableOpacity>
  );
};

MostVisitedPlaces.propTypes = {
  place: PropTypes.shape({
    idPlace: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  cardWidth: PropTypes.number.isRequired,
  cardMargin: PropTypes.number.isRequired, // Nueva prop
};

const styles = StyleSheet.create({
  card: {
    borderRadius: GlobalStyles.borderRadius,
    elevation: GlobalStyles.elevation,
    height: 209,
    borderColor: '#fff',
    borderWidth: 3,
    overflow: 'hidden',
    marginBottom: 6,
    
  },
  image: {
    width: '100%',
    height: '100%',
    // objectFit: '',
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    backgroundColor: Colors.ColorPrimary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    maxWidth: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
  },
  labelText: {
    ...TextStyles.PoppinsSemiBold15,
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: GlobalStyles.borderRadius,
    paddingVertical: 2,
    paddingHorizontal: 18,
  },
  buttonText: {
    ...TextStyles.PoppinsSemibold13,
    color: '#fff',
    marginTop: 2,
  },
});

export default MostVisitedPlaces;