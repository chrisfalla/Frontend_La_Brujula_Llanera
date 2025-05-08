import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, GlobalStyles, TextStyles } from '../../../presentation/styles/styles';

const CustomInputText = ({ LabelText, PlaceholderText, HasError, SupportingText, IsDisabled, IsPassword }) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <View style={styles.container}>
            {/* Label encima del input */}
            <Text style={[styles.label, HasError && styles.labelError]}>{LabelText}</Text>

            {/* Input */}
            <TextInput 
                style={[
                    styles.input, 
                    IsDisabled && styles.inputDisabled,
                    isFocused && !HasError && styles.inputFocused,
                    HasError && styles.inputError,
                ]} 
                placeholder={PlaceholderText} 
                secureTextEntry={IsPassword} 
                editable={!IsDisabled} 
                placeholderTextColor={Colors.DarkGray}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
            />
            
            {/* Texto de error debajo del input */}
            {HasError && <Text style={styles.errorText}>{SupportingText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        ...TextStyles.PoppinsRegular15,
        color: Colors.Black,
        marginBottom: 4,
        paddingLeft: 15,
        textAlign: "left",
    },
    labelError: {
        color: Colors.ErrorAdvertisingColor,
    },
    input: {
        marginBottom: 5,
        width: "100%",
        height: 48,
        borderWidth: 2,
        paddingLeft: 15,
        borderRadius:20,
        borderColor: Colors.DarkGray,
    },
    inputDisabled: {
        backgroundColor: Colors.LightGray,
        borderColor: Colors.LightGray,
    },
    inputFocused: {
        borderColor: Colors.ColorOnPrimary,
        borderWidth: 2,
    },
    inputError: {
        borderColor: Colors.ErrorAdvertisingColor,
        borderWidth: 2,
    },
    errorText: {
        ...TextStyles.PoppinsRegular13,
        color: Colors.ErrorAdvertisingColor,
        marginTop: 2,
        marginBottom: 10,
        paddingLeft: 15,
    },
});

export default CustomInputText;