import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const VerticalPlaceCard = ({NameCard, ImagenPlaceCard }) => {
    
return (
    <View style={styles.mainContainer}>
        <Image source={ImagenPlaceCard} style={styles.iamgenContainer} />
        <View style={styles.visitContainer}>
            <Ionicons name="star" size={20} color="gold" /> 
        </View>
        <Text style={styles.textStyle}>{NameCard}</Text>
        <View style={styles.iconStyle}>
        <Ionicons name= "location" size={20} color="green" /> 
        <Ionicons name= "caret-forward-circle" size={20} color="green"/> 
        </View>

        
    </View>
  );
};

 styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:"white",
        width:170, 
        height:200,
        alignItems:"center",
        borderRadius:10,
        elevation: 4,
        position: 'relative',
        overflow: 'visible',
        marginRight:12, 
        
    },
    iamgenContainer: {
        backgroundColor:"#000000",
        width: 170,
        height: 120,
        borderRadius:10,
        elevation: 4,
    },
    visitContainer:{
        zIndex: 1,
        width:80,
        height:20,
        position: 'absolute', // Posicionamiento absoluto
        top: 108,            // 50% del height de la imagen (120/2 = 60) - ajusta según necesidad
        left: "center",            // Distancia desde la izquierda
        zIndex: 1,
        alignItems:"center",
        backgroundColor:"white", 
        borderRadius:20,
        elevation: 4,
        
        
    },
    textStyle:{
        fontSize:12,
        color:"#000000",
        fontWeight:"bold",
        marginTop:15,
    },
    iconStyle:{ flexDirection: 'row', 
        alignItems: 'center',
        marginTop:5,
    },
   
    
});

export default VerticalPlaceCard;
