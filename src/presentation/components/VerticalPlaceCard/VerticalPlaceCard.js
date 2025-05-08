import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors, TextStyles, GlobalStyles } from "../../../presentation/styles/styles";

const VerticalPlaceCard = ({ NameCard, ImagenPlaceCard }) => {

    return (
        <View style={[styles.mainContainer, { ...GlobalStyles.CardBaseStyle, padding: 0 }]}>
            <Image source={{ uri: ImagenPlaceCard }} style={styles.iamgenContainer} />
            <View style={styles.visitContainer}>
                <Ionicons name="star" size={22} color="gold" />
            </View>
            <Text style={styles.textStyle}>{NameCard}</Text>
            <View style={styles.iconStyle}>
                <Ionicons name="location" size={22} color={Colors.ColorPrimary} />
                <Ionicons name="caret-forward-circle" size={22} color={Colors.ColorPrimary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: 174,
        height: 230,
        marginBottom: 16,
        alignItems: "center",
        position: 'relative',
        overflow: 'visible',
        marginRight: 12,
        borderRadius: GlobalStyles.cornerRadius,
        elevation: GlobalStyles.elevation,
    },
    iamgenContainer: {
        width: 174,
        height: 150,
        borderRadius: GlobalStyles.cornerRadius,
    },
    visitContainer: {
        zIndex: 1,
        width: 116,
        height: 30,
        position: 'absolute',
        top: 136,
        left: 29,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: GlobalStyles.cornerRadius,
        elevation: GlobalStyles.elevation,
    },
    textStyle: {
        ...TextStyles.PoppinsBold15,
        marginTop: 22,
    },
    iconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});

export default VerticalPlaceCard;