import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SelectTag = () => {
  const [selected, setSelected] = useState(true);

  const toggleSelect = () => {
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={[styles.tag, selected ? styles.tagSelected : styles.tagUnselected]}
      onPress={toggleSelect}
    >
      <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>
       
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
  },
  tagUnselected: {
    borderColor: 'black',
  },
  tagSelected: {
    borderColor: '#236A34',
    shadowColor: 'white',
   shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontSize: 14,
  },
  textUnselected: {
    color: 'black',
  },
  textSelected: {
    color: '#236A34',
  },
});

export default SelectTag;