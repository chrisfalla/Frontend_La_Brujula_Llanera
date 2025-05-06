import React from "react";
import { View, StyleSheet,  TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MainHeader = ({ primarytIcon = "notifications", SecondIcon = "settings", username }) => {  {/* propiedades para llamar los iconos */}
return (
    <View style={styles.header}>
        <Image source={require('../../../shared/assets/Avatar.png') } style={styles.avatar}/>
        <View style={styles.containertitle}>
        <Text style={styles.title}> Hola, </Text>
        <Text style={styles.username} >{username} </Text>
        </View>
        {/* ( muestra los iconos en la parte derecha de la pantalla ) */}
        <View style={styles.iconContainer}>          
        <TouchableOpacity onPress={() => {}}>
            <Ionicons style={styles.icon} name={primarytIcon}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
            <Ionicons style={styles.icon} name={SecondIcon} />
        </TouchableOpacity>
        </View>   
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: "center",
    padding: 20,
    paddingVertical:40,  
    backgroundColor: "#fff",
    width: "100%",
},
avatar:{       
    width: 40,
    height: 40,
    marginRigth:10, 
     
},
containertitle:{
    marginRight: 50,
    flexDirection: 'row',
    flex: 1,
},
title: {
    fontSize: 20, 
    fontWeight: 'normal'
},
username: {
    fontSize: 20,
    fontWeight: 'bold',
},
iconContainer: {
    flexDirection: 'row',    
},
icon:{
    fontSize:23,
    color: "#236A34",
    marginLeft:10,
}
});

export default MainHeader;