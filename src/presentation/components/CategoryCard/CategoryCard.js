import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const CategoryCard = ({nameCategory, iconCategory, isSelectedCategory, onPressCard}) => {
    
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
        alignSelf:"flex-start",
        marginRight:10,
        alignItems: "center",
        
    },
    iconContainer: {
        backgroundColor:"#E0E0E0", 
        borderRadius:10, 
        alignItems:"center", 
        justifyContent:"center",
        width: 70, // más ancho
        height: 70, // más alto
    },
    iconContainerSelected: {
        backgroundColor:"#61CB7C", 
        borderRadius:10, 
        alignItems:"center", 
        justifyContent:"center",
        elevation: 4,
    },
    icon: {
        margin:14,

    },
    iconSelected: {
        margin:11
    
    },
    text:{
        alignSelf:"center",
        fontWeight:"regular",
        margin: 8,
    },
    textSelected:{
        fontWeight:"bold"
    }
});

export default CategoryCard;
