import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.7)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const slideText1 = useRef(new Animated.Value(30)).current;
  const slideText2 = useRef(new Animated.Value(30)).current;
  const fadeText1 = useRef(new Animated.Value(0)).current;
  const fadeText2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animar logo y rotación
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

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ).start();

    // Animar texto
    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(slideText1, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeText1, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(slideText2, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeText2, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []); // Limpiamos dependencias

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
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
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capsule: {
    position: 'absolute',
    width: 240,
    height: 240,
  },
  arrow: {
    width: 90,
    height: 90,
  },
});

export default SplashScreen;
