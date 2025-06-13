import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, TextStyles } from "../../../presentation/styles/styles";
import { useSelector } from "react-redux";

const MainHeader = ({ username, onNotificationPress }) => {
    const usernames = useSelector(state => state.auth.user?.name || state.auth.user?.names || "Invitado");
    return (
        <View style={styles.header}>
            <Image source={require('../../../shared/assets/Avatar.png')} style={styles.avatar} />
            <View style={styles.containertitle}>
                <Text style={styles.title}> Hola, </Text>
                <Text style={styles.username} >{usernames} </Text>
            </View>
            {/* ( muestra los iconos en la parte derecha de la pantalla ) */}
            <View style={styles.iconContainer}>
                <TouchableOpacity 
                    style={styles.notificationContainer} 
                    onPress={onNotificationPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="notifications" size={26} color={Colors.ColorPrimary} />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
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
        marginBottom: 20,
        padding: 5,
        paddingVertical: 5,
        backgroundColor: Colors.BackgroundPage,
        width: "100%",
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginLeft: -2,
    },
    containertitle: {
        marginRight: 50,
        flexDirection: 'row',
        flex: 1,
    },
    title: {
        ...TextStyles.PoppinsRegular15,
        marginTop: 5,
    },
    username: {
        ...TextStyles.PoppinsSemiBold15,
        marginTop: 5,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: 23,
        color: Colors.ColorPrimary,
        marginLeft: 10,
    },
    notificationContainer: {
        position: 'relative',
        padding: 5,
        marginLeft: -10, // Ajustar posición hacia la izquierda
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FF3B30', // Color rojo para el indicador
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    notificationBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        includeFontPadding: false, // Mejora el centrado del texto
        lineHeight: 14,
    },
});

export default MainHeader;