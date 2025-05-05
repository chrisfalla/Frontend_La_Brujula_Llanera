import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TypeButton = Object.freeze({
    PRIMARY: "Primary",
    SECONDARY: "Secondary",
}); 

const SizeButton = Object.freeze({
    SMALL: "Small",
    BIG: "Big",
});

const CustomButton = ({ onPress, titletext, IsDisabled = false, type = "Primary", size = "Big" }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={IsDisabled}
            style={[
                styles.touchableBase,
                type === TypeButton.PRIMARY ? styles.primaryTouchable : styles.secondaryTouchable,
                size === SizeButton.BIG ? styles.bigTouchable : styles.smallTouchable,
                IsDisabled && styles.disabledButton
            ]}
        >
            <Text style={[styles.buttonText, 
                type === TypeButton.SECONDARY && styles.secondaryText]}>
                {titletext}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableBase: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    primaryTouchable: {
        backgroundColor: '#236A34', // Verde principal
        borderColor: '#236A34',
        borderWidth: 2,
    },
    secondaryTouchable: {
        backgroundColor: 'white',
        borderColor: '#236A34',
        borderWidth: 2,
    },
    bigTouchable: {
        width: '100%',
    },
    smallTouchable: {
        width: '60%',
    },
    disabledButton: {
        backgroundColor: '#A9A9A9', // Gris deshabilitado
        borderColor: '#A9A9A9',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    secondaryText: {
        color: '#236A34', // Verde para los botones secundarios
    },
});

export default CustomButton;
