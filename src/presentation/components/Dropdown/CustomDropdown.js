import React, { useState } from "react";
import {  View,  Text,  StyleSheet,  Pressable,  Platform,} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors, TextStyles } from "../../styles/styles";

/** si se va a usar  DropDownPicker y DateTimePicker en la misma pantalla se debe usar scrollView **/

const CustomDropdown = ({
  LabelText,
  items = [],
  value,
  setValue,
  placeholder,
  HasError,
  SupportingText,
  style,
  zIndex = 1000,
  zIndexInverse = 3000,
  onOpen,
  onClose,
  disabled = false,
  isDatePicker = false,
  minimumDate,
  maximumDate,
}) => {
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS !== "ios") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setValue(selectedDate.toISOString());
    }
  };

  return (
    <View style={[styles.container, style, { zIndex }]}>
      {LabelText && (
        <Text style={[styles.label, HasError && styles.labelError]}>
          {LabelText}
        </Text>
      )}

      {isDatePicker ? (
        <>
          <Pressable
            onPress={() => !disabled && setShowDatePicker(true)}
            style={[
              styles.dropdown,
              HasError && styles.dropdownError,
              disabled && styles.dropdownDisabled,
              value && styles.dropdownSelected,
              { justifyContent: "center" },
            ]}
            disabled={disabled}
          >
            <Text
              style={[
                styles.dropdownText,
                !value && styles.placeholderText,
              ]}
            >
              {value
                ? new Date(value).toLocaleDateString()
                : placeholder}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )}
        </>
      ) : (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
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
      )}

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
    paddingTop: 10,
   
    width: "100%",
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
    borderWidth: 1,
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
    backgroundColor: Colors.White,
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
