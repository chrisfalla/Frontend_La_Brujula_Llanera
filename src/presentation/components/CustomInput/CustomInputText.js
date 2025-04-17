import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


const CustomInputText = ({ LabelText, PlaceholderText, HasError, SupportingText, IsDisabled, IsPassword, value, onChangeText,     showIcon = false,  icon = null,    onIconPress = () => {}
}) => {
 
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <View  style={styles.container}>
            {/* Label encima del input */}
            <Text style={[styles.label, HasError && styles.labelError]}>{LabelText}</Text>

            {/* Input con ícono a la derecha */}
            <View style={styles.inputcontainer}>
            <TextInput 
                style={[
                    styles.input, 
                    showIcon && styles.inputWithIcon,  //icon
                    IsDisabled && styles.inputDisabled,
                    isFocused && !HasError && styles.inputFocused, // El focus tiene prioridad si no hay error
                    HasError && styles.inputError, // Si hay error, el borde es rojo sin importar el focus
                ]} 
                placeholder={PlaceholderText} 
                secureTextEntry={IsPassword} 
                editable={!IsDisabled} 
                placeholderTextColor="#B0B0B0"
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
            />
             {showIcon && (
                    <TouchableOpacity onPress={onIconPress} style={styles.icon}>
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
            {/* Texto de error debajo del input */}
            {HasError && <Text style={styles.errorText}>{SupportingText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:"100%",
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        color: '#000',
        marginBottom: 4,
        fontWeight: "bold",
        paddingLeft: 15,
        textAlign: "left",
    },
    labelError: {
        color: 'red',
    },
    inputcontainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 5,
        width: "100%",
        height: 48,
        borderWidth: 2, // Definimos el grosor
        paddingLeft: 15,
        borderRadius: 20,
        borderColor: "gray", // Color base
    },
    inputWithIcon: {
        paddingRight: 50, // Espacio para el ícono
    },
     icon: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
    },
    inputDisabled: {
        backgroundColor: '#E0E0E0',
    },
   
    inputFocused: {
        borderColor: '#61CB7C', // Solo cambia el color sin tocar el grosor
        borderWidth: 2, // Mantiene el mismo tamaño para evitar bordes dobles
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 10,
        fontWeight: "bold",
        paddingLeft: 15,
    },
});

export default CustomInputText;