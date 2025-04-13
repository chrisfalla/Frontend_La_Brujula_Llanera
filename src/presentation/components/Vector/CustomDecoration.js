import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const TypeLine = Object.freeze({
    LEFT: "Left",
    RIGHT: "Right",
}); 


const CustomDecoration = ({ type = "Left"}) => {
    return (
        
        <Image source={ type === TypeLine.LEFT ? require('../../../shared/assets/Vector.png'): require('../../../shared/assets/Vector2.png') }
        style={[
            styles.touchableBase,
            type === TypeLine.LEFT ? styles.LeftVertor : styles.RightVector,]} />
        
        
    );
};
const styles = StyleSheet.create({
    
    LeftVertor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 180,
    height: 250,
    resizeMode: 'contain',
    zIndex: -1,
    },
    RightVector:  {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 180,
        height: 250,
        resizeMode: 'contain',
        zIndex: -1,
    },
    
});

export default CustomDecoration;
