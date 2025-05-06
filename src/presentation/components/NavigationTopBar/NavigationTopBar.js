import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const NavigationTopBar = ( { primaryIcon = "chevron-back", SecondIcon = "heart-outline" ,onBackPress, useBackground = true, useHeart = true, title} ) => {
  const [isHeartActive, setIsHeartActive] = useState(false);

  const handleHeartPress = () => {
    setIsHeartActive(!isHeartActive);
  };
   {/* aparece icono heart cuando se presiona*/}
  const heartIconName = isHeartActive ? "heart" : SecondIcon;
 {/*color del icono al presionar*/}
  
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <TouchableOpacity style={useBackground ? styles.iconContainer : styles.iconNoBackground} onPress={onBackPress}>
        <Ionicons 
        style={styles.icon}
        name={primaryIcon}
        />
        </TouchableOpacity>

        <Text style={[styles.title, !title && styles.titleHidden]}>
          {title ? title : null}
        </Text>

        {/* Botón de corazón */}
        <TouchableOpacity style={[styles.iconContainer,!useHeart && styles.hiddenIcon]}
          onPress={useHeart ? handleHeartPress : null}
          disabled={!useHeart}
        >
        <Ionicons
        style={[styles.icon, isHeartActive && styles.heartActive]}
        name={heartIconName}           
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    header: {
      width: '100%',
      paddingHorizontal: 40,
       
      },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',    
    },
    iconContainer: {
      backgroundColor: 'white',
      borderRadius: 30,
      borderWidth: 3,
      borderColor: '#d5dbda',
      padding: 7,   
    },
    icon: {
      color:'#236A34',
      fontSize: 22,
    },
    iconNoBackground: {
      color: '#236A34',
      paddingHorizontal: 10,
      },
    heartActive: {
      color: '#236A34',
    },
    hiddenIcon: {
      opacity: 0, // 👈 oculta visualmente
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      color: '#236A34',
    },
    titleHidden: {
      opacity: 0,
    },
  
  });
export default NavigationTopBar;