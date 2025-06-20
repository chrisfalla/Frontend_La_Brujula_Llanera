import React from 'react';
import { StyleSheet, Image } from 'react-native';

const TypeLine = Object.freeze({
    LEFT: "Left",
    RIGHT: "Right",
});


const CustomDecoration = ({ type = "Left" }) => {
    return (

        <Image source={type === TypeLine.LEFT ? require('../../../shared/assets/LeftDecoration.png') : require('../../../shared/assets/RightDecoration.png')}
            style={[
                styles.touchableBase,
                type === TypeLine.LEFT ? styles.LeftVertor : styles.RightVector,]} />


    );
};
const styles = StyleSheet.create({

    LeftVertor: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        width: 180,
        height: 250,
        resizeMode: 'contain',
        zIndex: -1,
    },
    RightVector: {
        position: 'absolute',
        bottom: -3,
        right: 0,
        width: 180,
        height: 250,
        resizeMode: 'contain',
        zIndex: -1,
    },

});

export default CustomDecoration;
