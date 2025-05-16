import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, GlobalStyles, TextStyles } from '../../../presentation/styles/styles';

const CustomInputText = ({
  LabelText,
  PlaceholderText,
  HasError,
  SupportingText,
  IsDisabled,
  IsPassword,
  value,
  onChangeText,
  style,
  onFocus,
  onBlur,
  useBgColorOnFocus = false,  // Nuevo prop con valor predeterminado false
  customInputStyle, // Nuevo prop para estilos específicos del input
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, HasError && styles.labelError]}>{LabelText}</Text>

      <TextInput
        value={value}
        onChangeText={(text) => {
          console.log(`🧪 [CustomInputText] onChangeText (${LabelText}):`, text);
          if (typeof onChangeText === 'function') {
            onChangeText(text);
          }
        }}
        style={[
          styles.input,
          IsDisabled && styles.inputDisabled,
          isFocused && !HasError && styles.inputFocused,
          HasError && styles.inputError,
          customInputStyle, // Aplicamos estilos personalizados si existen
        ]}
        placeholder={PlaceholderText}
        secureTextEntry={IsPassword}
        editable={IsDisabled !== true}
        placeholderTextColor={Colors.DarkGray}
        onFocus={(e) => {
          setIsFocused(true);
          if (typeof onFocus === 'function') {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (typeof onBlur === 'function') {
            onBlur(e);
          }
        }}
      />

      {HasError ? (
        <Text style={styles.errorText}>
          {typeof HasError === 'string' ? HasError : 'Error de validación'}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Black,
    paddingLeft: 15,
    textAlign: 'left',
  },
  labelError: {
    color: Colors.ErrorAdvertisingColor,
  },
  input: {
    color: Colors.Black,
    width: '100%',
    height: 48,
    borderWidth: 1,
    paddingLeft: 15,
    paddingBottom: 8,
    borderRadius: 20,
    borderColor: Colors.DarkGray,
    ...TextStyles.PoppinsRegular15,
  },
  inputDisabled: {
    backgroundColor: Colors.LightGray,
    borderColor: Colors.LightGray,
  },
  inputFocused: {
    borderColor: Colors.ColorOnPrimary,
    borderWidth: 1,
    // Removemos la línea de backgroundColor para no afectar globalmente
  },
  inputError: {
    borderColor: Colors.ErrorAdvertisingColor,
    borderWidth: 1,
  },
  errorText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.ErrorAdvertisingColor,
    marginTop: 2,
    paddingLeft: 15,
  },
});

export default CustomInputText;
