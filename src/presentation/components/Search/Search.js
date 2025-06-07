import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, TextStyles, Colors } from '../../styles/styles';

const CustomSearch = ({ placeholder, value, onChangeText, onSearch, style}) => {
    const [isFocused, setIsFocused] = useState(false);
    const showCustomPlaceholder = !value && !isFocused;

    const handleSubmit = () => {
        if (onSearch && value.trim()) {
            onSearch(value);
        }
    };

    return (
        <View style={[styles.container, style]}>
            <View style={[
                styles.searchContainer,
                isFocused && styles.searchContainerFocused                
            ]}>
                {showCustomPlaceholder && (
                    <Text style={styles.customPlaceholder}>{placeholder || "Buscar..."}</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="" // Placeholder se deja vacío para evitar problemas de fuente                   
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="search"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus={false} // se deja en false para evitar que al cambiar la pantalla se enfoque automáticamente
                    // y mantenga oculto el teclado y se active solo al tocar el campo de búsqueda
                />
                <View style={styles.iconsContainer}>
                    {value?.length > 0 && (
                        <TouchableOpacity
                            onPress={() => onChangeText('')}
                            style={styles.clearButton}
                        >
                            <Ionicons name="close-circle" size={20} color= {Colors.DarkGray} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleSubmit}>
                        <Ionicons name="search" size={24} color= {Colors.ColorPrimary} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 20,
        
    },
    label: {
        ...TextStyles.PoppinsRegular15,
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    searchContainer: {
        backgroundColor: Colors.BackgroundPage,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.Black,
        paddingHorizontal: 15,
        height: 50,
        
    },
    searchContainerFocused: {
        borderColor: Colors.ColorPrimary,
        borderWidth: 1.3,
    },
    // se crrea estilo para personalizar el placeholder
    customPlaceholder: {
        position: 'absolute',
        left: 15,
        ...TextStyles.PoppinsRegular15,
        color: Colors.DarkGray,
        zIndex: 1,
    },
    input: {
        ...TextStyles.PoppinsRegular15,
        flex: 1,
        color: Colors.Black,
        height: '100%',
        zIndex: 2,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 3,
    },
    searchIcon: {
        marginLeft: 10,
    },
    clearButton: {
        padding: 5,
    },
});

export default CustomSearch;