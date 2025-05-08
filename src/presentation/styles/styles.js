// src/presentation/styles/styles.js

const Colors = {
    ColorPrimary: '#236A34',
    ColorOnPrimary: '#61CB7C',
    Black: '#000000',
    LightGray: '#E0E0E0',
    DarkGray: '#747474',
    ErrorAdvertisingColor: '#BD0000',
    BackgroundPage: '#F9FAFE',
  };
  
  const TextStyles = {
    PoppinsBold15: {
      fontFamily: 'Poppins-Bold',
      fontSize: 15,
    },
    PoppinsSemiBold15: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
    },
    PoppinsRegular15: {
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
    },
    PoppinsSemibold13: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 13,
    },
    PoppinsRegular13: {
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
    },
    PoppinsSemibold20: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
    },
  };
  
  const GlobalStyles = {
    borderRadius: 10,
    elevation: 4,
    CardBaseStyle: {
      backgroundColor: Colors.BackgroundPage,
      borderRadius: 10,
      elevation: 4,
      padding: 14,
    },
    ScreenBaseStyle: {
      padding: 16,
      backgroundColor: Colors.BackgroundPage,
    },
  };
  
  export { Colors, TextStyles, GlobalStyles };
  