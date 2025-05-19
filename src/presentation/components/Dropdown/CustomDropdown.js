import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { Colors, TextStyles, GlobalStyles } from "../../styles/styles";

const CustomDropdown = ({
  LabelText,
  items = [],
  value,
  setValue,
  placeholder = "Seleccionar",
  HasError,
  SupportingText,
  style,
  zIndex = 1000,
  zIndexInverse = 3000,
  onOpen,
  onClose,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <View style={[styles.container, style, { zIndex }]}>
      {LabelText && (
        <Text style={[styles.label, HasError && styles.labelError]}>
          {LabelText}
        </Text>
      )}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={handleOpen}
        setValue={setValue}
        placeholder={placeholder}
        style={[
          styles.dropdown,
          HasError && styles.dropdownError,
          disabled && styles.dropdownDisabled,
          value !== null && value !== undefined && styles.dropdownSelected,
        ]}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderText}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        onOpen={handleOpen}
        onClose={handleClose}
        disabled={disabled}
        dropDownContainerStyle={styles.dropDownContainer}
      />

      {HasError && typeof HasError === "string" && (
        <Text style={styles.errorText}>{HasError}</Text>
      )}

      {SupportingText && !HasError && (
        <Text style={styles.supportingText}>{SupportingText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
  },
  label: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Black,
    paddingLeft: 15,
  },
  labelError: {
    color: Colors.ErrorAdvertisingColor,
  },
  dropdown: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: Colors.DarkGray,
    ...TextStyles.PoppinsRegular15,
  },
  dropdownSelected: {
    borderColor: Colors.ColorOnPrimary,
    borderWidth: 1,
  },
  dropdownError: {
    borderColor: Colors.ErrorAdvertisingColor,
    borderWidth: 1.3,
  },
  dropdownDisabled: {
    backgroundColor: Colors.LightGray,
    borderColor: Colors.LightGray,
  },
  dropdownText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.Black,
  },
  placeholderText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
  },
  dropDownContainer: {
    borderColor: Colors.DarkGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.ErrorAdvertisingColor,
    marginTop: 2,
    paddingLeft: 15,
  },
  supportingText: {
    ...TextStyles.PoppinsRegular13,
    color: Colors.Black,
    marginTop: 10,
    paddingLeft: 15,
  },
});

export default CustomDropdown;
