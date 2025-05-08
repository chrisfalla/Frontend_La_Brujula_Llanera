import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";


const CategoryCardSmall = ({nameCategory, iconCategory, isSelectedCategory, onPressCard}) => {
    
return (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => onPressCard(nameCategory)}>
            <View style={[styles.iconContainer,
                isSelectedCategory && styles.iconContainerSelected
            ]}>
                <Ionicons color={isSelectedCategory ? "white" : "black"} 
                style={[styles.icon, isSelectedCategory && styles.iconSelected]}
                size={isSelectedCategory ? 40 : 30}  name={iconCategory}></Ionicons>
            </View>
            <Text style={[styles.text, isSelectedCategory && styles.textSelected]}>{nameCategory.length > 4 ? `${nameCategory.substring(0, 4)}...` : nameCategory}</Text>
        </TouchableOpacity>
    </View>
);
};

styles = StyleSheet.create({
    mainContainer: {
       justifyContent:'flex-start',
       alignItems:'center',
    
        
    },
    iconContainer: {
        backgroundColor: Colors.LightGray,
        borderRadius:10, 
        alignItems:"center", 
        justifyContent:"center",
        marginHorizontal: 6,
        width: 70, // más ancho
        height: 70, // más alto
    },
    iconContainerSelected: {
        backgroundColor:Colors.ColorOnPrimary, 
        borderRadius:10, 
        alignItems:"center", 
        justifyContent:"center",      
    },
    icon: {
        margin:14,
    },
    iconSelected: {
        margin:11,
    
    },
    text:{
        ...TextStyles.PoppinsRegular13,
        margin: 8,
        textAlign:'center',
    },
    textSelected:{
        ...TextStyles.PoppinsSemibold13,
        textAlign:'center',
    }
});

export default CategoryCardSmall;
