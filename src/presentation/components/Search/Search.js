import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomSearch = ({ placeholder, value, onChangeText, onSearch }) => {
  const handleSubmit = () => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="search" size={20} color="#236A34" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Buscar..."}
          placeholderTextColor="#747474"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
        {value?.length > 0 && (
          <TouchableOpacity 
            onPress={() => onChangeText('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#747474" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  clearButton: {
    padding: 5,
  },
});

export default CustomSearch;