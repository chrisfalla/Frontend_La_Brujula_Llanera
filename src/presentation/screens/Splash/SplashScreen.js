import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, StatusBar } from 'react-native';
import { TextStyles, Colors } from '../../styles/styles';

const SplashScreen = () => {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.7)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animar logo y texto juntos
    Animated.parallel([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleLogo, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Animar rotación del arrow
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar
              barStyle="dark-content" // Para iconos oscuros en fondo claro
              backgroundColor="#ffffff" // Fondo blanco para Android
              translucent={false} // No translúcido para evitar superposiciones
            />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeLogo,
            transform: [{ scale: scaleLogo }],
          },
        ]}
      >
        <Image
          source={require('../../../shared/assets/Capsule.png')}
          style={[styles.capsule, { resizeMode: 'contain' }]}
        />
        <Animated.Image
          source={require('../../../shared/assets/OrientationArrow.png')}
          style={[styles.arrow, { transform: [{ rotate: spin }] }]}
        />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: fadeLogo,
            transform: [{ scale: scaleLogo }],
          },
        ]}
      >
        <Text style={styles.titleTextSmall}>
          <Text style={styles.titleTextBlack}>BRÚJ</Text>
          <Text style={styles.titleTextPrimary}>ULA</Text>
        </Text>
        <Text style={styles.titleText}>
          <Text style={styles.titleTextBlack}>LLA</Text>
          <Text style={styles.titleTextPrimary}>NERA</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDF5', // Verde muy claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capsule: {
    position: 'absolute',
    width: 160,
    height: 160,
  },
  arrow: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    ...TextStyles.MerriweatherBold45,
    lineHeight: 50,
  },
  titleTextSmall: {
    ...TextStyles.MerriweatherBold40,
    lineHeight: 45,
  },
  titleTextBlack: {
    color: Colors.Black,
  },
  titleTextPrimary: {
    color: Colors.ColorPrimary,
  },
});

export default SplashScreen;
