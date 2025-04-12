import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Group405Component = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line7} />
      <View style={styles.line8} />
      <View style={styles.ellipse144} />
      <View style={styles.ellipse145} />
      <View style={styles.ellipse142} />
      <Text style={styles.text1}>1</Text>
      <Text style={styles.text2}>2</Text>
      <Text style={styles.text3}>3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250, // Reducido de 359
    height: 48,
    position: 'relative', // Cambiado de absolute a relative
    alignSelf: 'center', // Centra el componente
    marginVertical: 10, // Añade espacio vertical
  },
  line7: {
    position: 'absolute',
    width: 100, // Reducido de 156
    borderTopWidth: 3,
   borderTopColor: '#747474',
    left: 35, // Ajustado
    top: 25, // Ajustado
  },
  line8: {
    position: 'absolute',
    width: 100, // Reducido de 156
    borderTopWidth: 3,
    borderTopColor: '#747474',
    left: 135, // Ajustado
    top: 25, // Ajustado
  },
  ellipse144: {
    position: 'absolute',
    width: 35, // Reducido de 47
    height: 35, // Reducido de 47
    right: 0, // Ajustado
    top: 8,
    backgroundColor: '#747474',
    borderRadius: 17.5,
  },
  ellipse145: {
    position: 'absolute',
    width: 35, // Reducido de 47
    height: 35, // Reducido de 47
    left: 107, // Centrado
    top: 8,
    backgroundColor: '#747474',
    borderRadius: 17.5,
  },
  ellipse142: {
    position: 'absolute',
    width: 35, // Reducido de 47
    height: 35, // Reducido de 47
    left: 0,
    top: 8,
    backgroundColor: '#61CB7C',
    borderWidth: 1,
    borderColor: '#61CB7C',
    borderRadius: 17.5,
  },
  text1: {
    position: 'absolute',
    left: 14, // Ajustado
    top: 14,
    fontSize: 15, // Reducido de 15
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  text2: {
    position: 'absolute',
    left: 121, // Ajustado
    top: 14,
    fontSize: 15, // Reducido de 15
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  text3: {
    position: 'absolute',
    right: 14, // Ajustado
    top: 14,
    fontSize: 15, // Reducido de 15
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
});

export default Group405Component;
