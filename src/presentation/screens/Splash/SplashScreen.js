import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loadInitialData } from '../../../shared/store/appThunks/appThunks';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.7)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const slideText1 = useRef(new Animated.Value(30)).current;
  const fadeText1 = useRef(new Animated.Value(0)).current;

  // Acceder al estado desde Redux
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isGuest = useSelector(state => state.auth.isGuest);
  const appReady = useSelector(state => state.app.isAppReady); // <- Cambia según tu slice

  // Disparar carga inicial al montar splash
  useEffect(() => {
    dispatch(loadInitialData());
  }, [dispatch]);

  
  useEffect(() => {
    // Animaciones del logo y textos
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
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ),
    ]).start();

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
    ]).start();
  }, []);

  // Navegación controlada por estado de la app
  useEffect(() => {
    if (appReady) {
      const timeout = setTimeout(() => {
        navigation.replace(isLoggedIn || isGuest ? 'Root' : 'Auth');
      }, 4000); // Tiempo suficiente para animación + carga de datos

      return () => clearTimeout(timeout);
    }
  }, [appReady, isLoggedIn, isGuest]);

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

      <Animated.Image
        source={require('../../../shared/assets/NameText.png')}
        resizeMode="contain"
        style={[
          styles.textLine,
          {
            transform: [{ translateY: slideText1 }],
            opacity: fadeText1,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 260,
    height: 260,
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
  textLine: {
    marginTop: 20,
    width: 400,
    height: 100,
    alignSelf: 'center',
  },
});

export default SplashScreen;
