import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomSearch = ({ placeholder, value, onChangeText, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = () => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escriba la Categoria, o Tipo de Servicio.</Text>
      <View style={[
        styles.searchContainer,
        isFocused && styles.searchContainerFocused
      ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Buscar..."}
          placeholderTextColor="#747474"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={true}
        />
        
        <View style={styles.iconsContainer}>
          {value?.length > 0 && (
            <TouchableOpacity 
              onPress={() => onChangeText('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#747474" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSubmit}>
            <Ionicons name="search" size={24} color="#236A34" style={styles.searchIcon} />
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
    fontWeight: 'semibold',
    fontSize: 15,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 1.3,
    borderColor: 'black',
    paddingHorizontal: 15,
    height: 50,
  },
  searchContainerFocused: {
    borderColor: '#236A34',
    borderWidth: 1.3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
  },
  clearButton: {
    padding: 5,
  },
});

export default CustomSearch;