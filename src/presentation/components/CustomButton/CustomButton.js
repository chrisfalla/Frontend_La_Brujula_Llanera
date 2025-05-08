import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, TextStyles, GlobalStyles } from '../../../presentation/styles/styles';

const TypeButton = Object.freeze({
    PRIMARY: "Primary",
    SECONDARY: "Secondary",
});

const SizeButton = Object.freeze({
    SMALL: "Small",
    BIG: "Big",
});

const CustomButton = ({ onPress, titletext, IsDisabled = false, type = "Primary", size = "Big" }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={IsDisabled}
            style={[
                styles.touchableBase,
                type === TypeButton.PRIMARY ?
                    (isPressed ? styles.primaryPressedTouchable : styles.primaryTouchable) :
                    styles.secondaryTouchable,
                size === SizeButton.BIG ? styles.bigTouchable : styles.smallTouchable,
                IsDisabled && styles.disabledButton
            ]}
        >
            <Text style={[
                styles.buttonText,
                type === TypeButton.SECONDARY && styles.secondaryText
            ]}>
                {titletext}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableBase: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: GlobalStyles.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    primaryTouchable: {
        backgroundColor: Colors.ColorPrimary,
        borderColor: Colors.ColorPrimary,
        borderWidth: 2,
    },
    primaryPressedTouchable: {
        backgroundColor: Colors.ColorOnPrimary,
        borderColor: Colors.ColorPrimary,
        borderWidth: 2,
    },
    secondaryTouchable: {
        backgroundColor: 'white',
        borderColor: Colors.ColorPrimary,
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
        ...TextStyles.PoppinsSemiBold15,
        color: 'white',
        textAlign: 'center',
    },
    secondaryText: {
        color: Colors.ColorPrimary,
    },
});

export default CustomButton;
