import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from "../../styles/styles";

const CategoryCardSmall = ({ 
    nameCategory, 
    iconCategory = "pricetag-outline", 
    isSelectedCategory, 
    onPressCard, 
    isViewMore 
}) => {
    const [pressed, setPressed] = useState(false);

    if (isViewMore) {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity 
                    style={styles.card} // Añadimos el mismo estilo card que en las categorías normales
                    onPress={onPressCard}
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                >
                    <View style={[
                        styles.iconContainer, 
                        pressed && styles.iconContainerPressed // Cambiamos a iconContainerPressed para no confundir con selected
                    ]}>
                        <Ionicons 
                            color="black" 
                            style={styles.icon}
                            size={30}
                            name="grid-outline" // Icono de cuadrícula para representar "Ver Más"
                        />
                    </View>
                    <Text 
                        style={[styles.text, pressed && styles.textSelected]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        Más
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity 
                style={styles.card}
                onPress={onPressCard}
            >
                <View style={[
                    styles.iconContainer,
                    isSelectedCategory && styles.iconContainerSelected
                ]}>
                    <Ionicons 
                        color={isSelectedCategory ? "white" : "black"} 
                        style={[styles.icon, isSelectedCategory && styles.iconSelected]}
                        size={isSelectedCategory ? 40 : 30}  
                        name={iconCategory} 
                    />
                </View>
                <Text
                    style={[
                        styles.text, 
                        isSelectedCategory && styles.textSelected
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {nameCategory}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
       alignItems: 'center',
       justifyContent: 'flex-start',
       width: '100%',
       height: 110, // Alto fijo para todas las cards (ajusta si lo necesitas)
    },
    iconContainer: {
        backgroundColor: Colors.LightGray,
        borderRadius: GlobalStyles.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        width: 65,
        height: 65,
        marginBottom: 5,
    },
    iconContainerSelected: {
        backgroundColor: Colors.ColorPrimary,
        borderRadius: GlobalStyles.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        // Aplicamos la sombra directamente al icono cuando está seleccionado
        elevation: GlobalStyles.elevation,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    iconContainerPressed: {
        backgroundColor: Colors.LightGray, // Mantenemos el gris pero con un tono diferente para indicar presión
        opacity: 0.8,
    },
    icon: {
        margin: 14,
    },
    iconSelected: {
        margin: 11,
    },
    text: {
        ...TextStyles.PoppinsRegular13,
        textAlign: 'center',
    },
    textSelected: {
        ...TextStyles.PoppinsSemibold13,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'transparent', // Cambiado a transparente para que no interfiera con la sombra
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: '100%',
        overflow: 'visible', // Permite que la sombra sea visible
    },
});

export default CategoryCardSmall;
